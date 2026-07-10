#!/usr/bin/env python3
"""
语雀API文档迁移工具主入口
从语雀平台抓取API文档并转换为VitePress格式的Markdown文件
"""
import json
import os
import re
import sys
import time
import hashlib
import urllib.parse
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import requests

# 项目根目录
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
DOCS_DIR = PROJECT_ROOT / "docs"
IMAGES_DIR = DOCS_DIR / "public" / "images"

# 语雀配置
YUQUE_BASE = "https://jubaozan.yuque.com"
BOOKS = [
    {
        "slug": "merchant",
        "name": "开放平台商家版",
        "url": f"{YUQUE_BASE}/staff-rq30em/api",
        "namespace": "staff-rq30em/api",
    },
    {
        "slug": "supplier",
        "name": "供应商开放平台",
        "url": f"{YUQUE_BASE}/staff-rq30em/di9gff",
        "namespace": "staff-rq30em/di9gff",
    },
]

# HTTP会话
SESSION = requests.Session()
SESSION.headers.update({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36",
})


def get_book_info(book_url: str) -> Tuple[int, List[dict]]:
    """
    从语雀知识库首页HTML提取book_id和TOC
    :param book_url: 知识库URL
    :return: (book_id, toc_list)
    """
    resp = SESSION.get(book_url, timeout=30)
    resp.raise_for_status()
    html = resp.text
    # 匹配 window.appData = JSON.parse(decodeURIComponent("..."))
    matches = re.findall(
        r'window\.appData\s*=\s*JSON\.parse\(decodeURIComponent\("([^"]+)"\)\)',
        html,
    )
    if not matches:
        raise RuntimeError(f"未找到appData，URL: {book_url}")
    # 取最长的匹配（完整数据）
    longest = max(matches, key=len)
    data = json.loads(urllib.parse.unquote(longest))
    book = data["book"]
    return book["id"], book["toc"]


def fetch_doc_sourcecode(doc_id: int, book_id: int, max_retries: int = 3) -> str:
    """
    调用语雀内部API获取文档的Markdown正文（sourcecode字段）
    :param doc_id: 文档ID
    :param book_id: 知识库ID
    :param max_retries: 最大重试次数
    :return: Markdown字符串
    """
    api_url = f"{YUQUE_BASE}/api/docs/{doc_id}"
    params = {
        "book_id": book_id,
        "merge_dynamic_data": "false",
        "mode": "markdown",
    }
    for attempt in range(max_retries):
        try:
            resp = SESSION.get(api_url, params=params, timeout=30)
            if resp.status_code == 429:
                wait = 2 ** (attempt + 1)
                print(f"  限流，等待{wait}秒后重试...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            data = resp.json().get("data", {})
            return data.get("sourcecode", "") or ""
        except Exception as e:
            if attempt < max_retries - 1:
                wait = 2 ** attempt
                print(f"  请求失败({e})，{wait}秒后重试...")
                time.sleep(wait)
            else:
                raise
    return ""


def extract_and_download_images(
    markdown: str, book_slug: str, downloaded: Dict[str, str]
) -> str:
    """
    提取Markdown中的图片URL，下载到本地，替换链接
    :param markdown: 原始Markdown
    :param book_slug: 知识库slug（用于图片存储子目录）
    :param downloaded: 已下载图片缓存 {url: local_path}
    :return: 处理后的Markdown
    """
    img_dir = IMAGES_DIR / book_slug
    img_dir.mkdir(parents=True, exist_ok=True)

    # 匹配Markdown图片语法 ![alt](url)
    pattern = r'!\[([^\]]*)\]\((https?://[^)]+)\)'

    def replace_image(match):
        alt = match.group(1)
        url = match.group(2)
        # 处理URL中的参数（如x-oss-process）
        clean_url = url.split("?")[0] if "x-oss-process" in url else url
        if url in downloaded:
            local_path = downloaded[url]
        else:
            # 用URL的hash作为文件名，保留原扩展名
            url_hash = hashlib.md5(url.encode()).hexdigest()[:16]
            ext = ".png"
            for e in [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"]:
                if clean_url.lower().endswith(e):
                    ext = e
                    break
            filename = f"{url_hash}{ext}"
            save_path = img_dir / filename
            local_path = f"/images/{book_slug}/{filename}"
            downloaded[url] = local_path
            # 如果图片已存在则跳过下载
            if save_path.exists():
                return f"![{alt}]({local_path})"
            try:
                img_resp = SESSION.get(
                    url, timeout=30,
                    headers={"Referer": YUQUE_BASE},
                )
                img_resp.raise_for_status()
                save_path.write_bytes(img_resp.content)
                local_path = f"/images/{book_slug}/{filename}"
                downloaded[url] = local_path
            except Exception as e:
                print(f"  图片下载失败: {url} ({e})")
                return match.group(0)  # 保留原链接
        return f"![{alt}]({local_path})"

    return re.sub(pattern, replace_image, markdown)


def fix_internal_links(markdown: str, toc_map: Dict[str, str], book_namespace: str) -> str:
    """
    将语雀内部链接转换为VitePress相对路径
    :param markdown: 原始Markdown
    :param toc_map: {doc_url_slug: relative_file_path}
    :param book_namespace: 知识库namespace（如 staff-rq30em/api）
    :return: 处理后的Markdown
    """
    # 匹配语雀内部链接 [text](https://jubaozan.yuque.com/staff-rq30em/api/xxx)
    pattern = re.compile(
        rf'\[([^\]]+)\]\(https?://jubaozan\.yuque\.com/{re.escape(book_namespace)}/([^)]+)\)'
    )

    def replace_link(match):
        text = match.group(1)
        doc_slug = match.group(2).split("?")[0].split("#")[0]
        if doc_slug in toc_map:
            return f"[{text}]({toc_map[doc_slug]})"
        return match.group(0)  # 找不到对应文档，保留原链接

    return pattern.sub(replace_link, markdown)


def build_toc_map(toc: List[dict], book_slug: str) -> Dict[str, str]:
    """
    构建TOC映射表 {doc_url: relative_path} 用于链接修复
    :param toc: TOC列表
    :param book_slug: 知识库slug
    :return: {url_field: relative_md_path}
    """
    toc_map = {}
    for node in toc:
        if node.get("type") != "DOC" or not node.get("url"):
            continue
        # 相对路径：./xxx.md（同目录下引用）
        toc_map[node["url"]] = f"./{node['url']}.md"
    return toc_map


def slugify(title: str) -> str:
    """
    将标题转为安全的文件名
    :param title: 原始标题
    :return: 安全的文件名
    """
    # 移除特殊字符，保留中文、英文、数字、连字符
    safe = re.sub(r'[\\/:*?"<>|]+', '_', title)
    safe = safe.strip(". ")
    return safe[:80] if safe else "untitled"


def generate_markdown_files(
    book_slug: str, toc: List[dict], contents: Dict[int, str]
) -> dict:
    """
    生成VitePress的.md文件（扁平化）和侧边栏配置（保持TOC层级）
    :param book_slug: 知识库slug
    :param toc: TOC列表
    :param contents: {doc_id: markdown_content}
    :return: 侧边栏配置数据
    """
    output_dir = DOCS_DIR / book_slug
    output_dir.mkdir(parents=True, exist_ok=True)

    # 1. 写入所有文档文件（扁平化，用url字段作为文件名）
    written_files = set()
    for node in toc:
        if node.get("type") != "DOC":
            continue
        doc_id = node.get("doc_id")
        if not doc_id or doc_id not in contents:
            continue
        title = node.get("title", "未命名")
        url_field = node.get("url", "")
        content = contents[doc_id]
        # 添加标题（如Markdown中没有H1）
        if not content.lstrip().startswith("# "):
            content = f"# {title}\n\n{content}"
        filename = f"{url_field}.md" if url_field else f"{doc_id}.md"
        filepath = output_dir / filename
        filepath.write_text(content, encoding="utf-8")
        written_files.add(filename)

    # 2. 构建侧边栏（保持TOC层级）
    children_map: Dict[str, List[dict]] = {}
    root_nodes = []
    for node in toc:
        parent = node.get("parent_uuid", "")
        if not parent:
            root_nodes.append(node)
        else:
            children_map.setdefault(parent, []).append(node)

    def build_sidebar(nodes: List[dict]) -> List[dict]:
        """递归构建侧边栏配置"""
        items = []
        for node in nodes:
            ntype = node.get("type", "")
            doc_id = node.get("doc_id")
            title = node.get("title", "未命名")
            url_field = node.get("url", "")
            children = children_map.get(node.get("uuid", ""), [])

            if doc_id and doc_id in contents:
                # 有内容的文档
                filename = f"{url_field}.md" if url_field else f"{doc_id}.md"
                item = {"text": title, "link": f"/{book_slug}/{filename}"}
                if children:
                    sub_items = build_sidebar(children)
                    if sub_items:
                        item["items"] = sub_items
                items.append(item)
            elif children:
                # 无内容但有子节点，作为分组
                sub_items = build_sidebar(children)
                if sub_items:
                    items.append({
                        "text": title,
                        "collapsed": False,
                        "items": sub_items,
                    })
        return items

    sidebar = build_sidebar(root_nodes)
    return {"sidebar": sidebar, "doc_count": len(written_files)}


def migrate_book(book: dict) -> dict:
    """
    迁移单个知识库
    :param book: 知识库配置
    :return: 迁移统计信息
    """
    print(f"\n{'='*60}")
    print(f"开始迁移: {book['name']} ({book['slug']})")
    print(f"URL: {book['url']}")
    print(f"{'='*60}")

    # 1. 获取TOC
    print("[1/4] 获取知识库TOC...")
    book_id, toc = get_book_info(book["url"])
    doc_nodes = [n for n in toc if n.get("type") == "DOC" and n.get("doc_id")]
    print(f"  book_id={book_id}, 文档数={len(doc_nodes)}")

    # 2. 构建链接映射表
    toc_map = build_toc_map(toc, book["slug"])

    # 3. 抓取所有文档
    print(f"[2/4] 抓取{len(doc_nodes)}篇文档...")
    contents = {}
    downloaded_images: Dict[str, str] = {}
    failed_docs = []

    for i, node in enumerate(doc_nodes, 1):
        doc_id = node["doc_id"]
        title = node.get("title", "")
        print(f"  [{i}/{len(doc_nodes)}] {title} (doc_id={doc_id})")

        try:
            sourcecode = fetch_doc_sourcecode(doc_id, book_id)
            if not sourcecode.strip():
                print(f"    警告: 文档内容为空")
                sourcecode = f"# {title}\n\n> 此文档内容为空。\n"
        except Exception as e:
            print(f"    错误: {e}")
            failed_docs.append({"doc_id": doc_id, "title": title, "error": str(e)})
            sourcecode = f"# {title}\n\n> 文档抓取失败: {e}\n"

        # 下载图片并替换链接
        sourcecode = extract_and_download_images(
            sourcecode, book["slug"], downloaded_images
        )
        # 修复内部链接
        sourcecode = fix_internal_links(sourcecode, toc_map, book["namespace"])
        contents[doc_id] = sourcecode

        # 限流：每篇文档间隔0.5秒
        time.sleep(0.5)

    # 4. 生成Markdown文件
    print(f"[3/4] 生成Markdown文件...")
    result = generate_markdown_files(book["slug"], toc, contents)

    print(f"[4/4] 迁移完成: {result['doc_count']}篇文档, "
          f"{len(downloaded_images)}张图片, {len(failed_docs)}个失败")
    return {
        "book_slug": book["slug"],
        "book_name": book["name"],
        "book_id": book_id,
        "total_docs": len(doc_nodes),
        "migrated_docs": len(contents),
        "images": len(downloaded_images),
        "failed": failed_docs,
        "sidebar": result["sidebar"],
    }


def generate_vitepress_config(results: List[dict]) -> None:
    """
    生成VitePress配置文件
    :param results: 各知识库的迁移结果
    """
    config_dir = DOCS_DIR / ".vitepress"
    config_dir.mkdir(parents=True, exist_ok=True)

    # 生成侧边栏配置
    sidebar_data = {}
    for r in results:
        sidebar_data[f"/{r['book_slug']}/"] = r["sidebar"]

    # 写入sidebar配置为JS模块
    sidebar_js = config_dir / "sidebar.js"
    sidebar_js.write_text(
        "export default " + json.dumps(sidebar_data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # 生成config.ts
    config_ts = config_dir / "config.ts"
    config_ts.write_text(CONFIG_TEMPLATE, encoding="utf-8")

    # 生成首页
    index_md = DOCS_DIR / "index.md"
    index_md.write_text(INDEX_TEMPLATE, encoding="utf-8")


CONFIG_TEMPLATE = """import { defineConfig } from 'vitepress'
import sidebar from './sidebar.js'

export default defineConfig({
  title: '聚宝赞开放平台',
  description: '聚宝赞开放平台API文档',
  lang: 'zh-CN',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '商家版', link: '/merchant/' },
      { text: '供应商版', link: '/supplier/' },
    ],
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
            },
          },
        },
      },
    },
    footer: {
      message: '基于语雀平台迁移',
      copyright: 'Copyright © 2024 长沙市希尚网络科技有限公司',
    },
    outline: {
      label: '本页目录',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '最后更新于',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  },
})
"""

INDEX_TEMPLATE = """---
layout: home

hero:
  name: "聚宝赞开放平台"
  text: "API 文档中心"
  tagline: 聚宝赞平台与第三方系统业务协作与数据共享的桥梁
  actions:
    - theme: brand
      text: 商家版文档
      link: /merchant/
    - theme: alt
      text: 供应商版文档
      link: /supplier/

features:
  - title: 平台认证
    details: 鉴权认证机制，基于OAuth 2.0授权调用开放API
  - title: 店铺信息API
    details: 提供店铺基本信息查询
  - title: 商品API
    details: 提供商品基本信息、商品SKU、商品库存查询
  - title: 订单API
    details: 提供订单查询、发货、订单物流查询、订单支付流水查询
  - title: 数据互通
    details: 查询会员信息、第三方会员同步到商城
  - title: 信息推送
    details: 推送订单、会员信息
---
"""


def main():
    """主入口：执行全量迁移"""
    print("=" * 60)
    print("聚宝赞开放平台 - 语雀API文档迁移工具")
    print("=" * 60)

    # 确保目录存在
    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    all_results = []
    for book in BOOKS:
        result = migrate_book(book)
        all_results.append(result)

    # 生成VitePress配置
    print("\n[生成配置] VitePress配置文件...")
    generate_vitepress_config(all_results)

    # 汇总报告
    print("\n" + "=" * 60)
    print("迁移完成汇总")
    print("=" * 60)
    total_docs = 0
    total_images = 0
    total_failed = 0
    for r in all_results:
        print(f"\n{r['book_name']}:")
        print(f"  文档: {r['migrated_docs']}/{r['total_docs']}")
        print(f"  图片: {r['images']}")
        print(f"  失败: {len(r['failed'])}")
        total_docs += r["migrated_docs"]
        total_images += r["images"]
        total_failed += len(r["failed"])

    print(f"\n总计: {total_docs}篇文档, {total_images}张图片, {total_failed}个失败")

    # 保存迁移报告
    report_path = PROJECT_ROOT / "docs" / "语雀API文档迁移" / "migration_report.json"
    report = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "books": [
            {
                "slug": r["book_slug"],
                "name": r["book_name"],
                "total_docs": r["total_docs"],
                "migrated_docs": r["migrated_docs"],
                "images": r["images"],
                "failed": r["failed"],
            }
            for r in all_results
        ],
        "total_docs": total_docs,
        "total_images": total_images,
        "total_failed": total_failed,
    }
    report_path.write_text(
        json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"\n迁移报告已保存: {report_path}")


if __name__ == "__main__":
    main()
