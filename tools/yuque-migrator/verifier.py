#!/usr/bin/env python3
"""
迁移内容验证器
验证语雀文档迁移的完整性和正确性
"""
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
DOCS_DIR = PROJECT_ROOT / "docs"
IMAGES_DIR = DOCS_DIR / "public" / "images"
REPORT_PATH = PROJECT_ROOT / "docs" / "语雀API文档迁移" / "migration_report.json"


def count_markdown_files(directory: Path) -> int:
    """
    统计目录下的Markdown文件数量
    :param directory: 目录路径
    :return: .md文件数量
    """
    if not directory.exists():
        return 0
    return len(list(directory.rglob("*.md")))


def check_images(directory: Path) -> Tuple[int, int, List[str]]:
    """
    检查Markdown文件中引用的图片是否存在
    :param directory: 文档目录
    :return: (总图片引用数, 存在数, 缺失图片列表)
    """
    total_refs = 0
    found = 0
    missing = []

    for md_file in directory.rglob("*.md"):
        content = md_file.read_text(encoding="utf-8")
        # 匹配本地图片引用 ![alt](/images/xxx)
        pattern = r'!\[[^\]]*\]\((/images/[^)]+)\)'
        for match in re.finditer(pattern, content):
            img_path = match.group(1)
            total_refs += 1
            local_path = DOCS_DIR / "public" / img_path.lstrip("/")
            if local_path.exists():
                found += 1
            else:
                missing.append(str(img_path))

    return total_refs, found, missing


def check_external_images(directory: Path) -> int:
    """
    检查是否还有未本地化的外部图片链接
    :param directory: 文档目录
    :return: 外部图片链接数量
    """
    external = 0
    for md_file in directory.rglob("*.md"):
        content = md_file.read_text(encoding="utf-8")
        # 匹配外部图片链接
        pattern = r'!\[[^\]]*\]\((https?://[^)]+)\)'
        for match in re.finditer(pattern, content):
            url = match.group(1)
            if "cdn.nlark.com" in url or "alipayobjects.com" in url:
                external += 1
    return external


def check_empty_files(directory: Path) -> List[str]:
    """
    检查空文件
    :param directory: 文档目录
    :return: 空文件列表
    """
    empty = []
    for md_file in directory.rglob("*.md"):
        content = md_file.read_text(encoding="utf-8").strip()
        if not content or len(content) < 50:
            empty.append(str(md_file.relative_to(directory)))
    return empty


def check_internal_links(directory: Path) -> Tuple[int, int, List[str]]:
    """
    检查内部链接有效性
    :param directory: 文档目录
    :return: (总内部链接数, 有效数, 无效链接列表)
    """
    total = 0
    valid = 0
    invalid = []

    for md_file in directory.rglob("*.md"):
        content = md_file.read_text(encoding="utf-8")
        # 匹配相对链接 [text](./xxx.md)
        pattern = r'\[[^\]]+\]\((\./[^)]+\.md)\)'
        for match in re.finditer(pattern, content):
            link = match.group(1)
            total += 1
            target = (md_file.parent / link).resolve()
            if target.exists():
                valid += 1
            else:
                invalid.append(f"{md_file.relative_to(directory)} -> {link}")

    return total, valid, invalid


def main():
    """主验证入口"""
    print("=" * 60)
    print("聚宝赞开放平台 - 迁移内容验证器")
    print("=" * 60)

    # 加载迁移报告
    report = {}
    if REPORT_PATH.exists():
        report = json.loads(REPORT_PATH.read_text(encoding="utf-8"))

    errors = 0
    warnings = 0

    for subdir in ["merchant", "supplier"]:
        print(f"\n{'='*40}")
        print(f"验证: {subdir}")
        print(f"{'='*40}")

        doc_dir = DOCS_DIR / subdir
        if not doc_dir.exists():
            print(f"  错误: 目录不存在 {doc_dir}")
            errors += 1
            continue

        # 1. 文档数量
        md_count = count_markdown_files(doc_dir)
        expected = 0
        for book in report.get("books", []):
            if book["slug"] == subdir:
                expected = book["migrated_docs"]
                break
        print(f"  文档数量: {md_count} (预期: {expected})")
        if expected and md_count != expected:
            print(f"  警告: 文档数量不匹配!")
            warnings += 1

        # 2. 图片完整性
        total_imgs, found, missing = check_images(doc_dir)
        print(f"  图片引用: {found}/{total_imgs} 存在")
        if missing:
            print(f"  缺失图片: {len(missing)}个")
            for m in missing[:5]:
                print(f"    - {m}")
            if len(missing) > 5:
                print(f"    ... 还有{len(missing)-5}个")
            errors += len(missing)

        # 3. 外部图片
        external = check_external_images(doc_dir)
        print(f"  未本地化外部图片: {external}")
        if external:
            warnings += 1

        # 4. 空文件
        empty = check_empty_files(doc_dir)
        print(f"  空文件: {len(empty)}个")
        if empty:
            for e in empty[:3]:
                print(f"    - {e}")

        # 5. 内部链接
        total_links, valid_links, invalid_links = check_internal_links(doc_dir)
        print(f"  内部链接: {valid_links}/{total_links} 有效")
        if invalid_links:
            print(f"  无效链接: {len(invalid_links)}个")
            for l in invalid_links[:3]:
                print(f"    - {l}")

    # 图片统计
    print(f"\n{'='*40}")
    print("图片资源统计")
    print(f"{'='*40}")
    for subdir in ["merchant", "supplier"]:
        img_dir = IMAGES_DIR / subdir
        if img_dir.exists():
            count = len(list(img_dir.glob("*")))
            size = sum(f.stat().st_size for f in img_dir.glob("*") if f.is_file())
            print(f"  {subdir}: {count}个文件, {size/1024/1024:.1f}MB")

    # 总结
    print(f"\n{'='*60}")
    print("验证总结")
    print(f"{'='*60}")
    print(f"  错误: {errors}")
    print(f"  警告: {warnings}")
    if errors == 0:
        print("\n  ✅ 验证通过!")
    else:
        print(f"\n  ❌ 有{errors}个错误需要修复")
    if warnings:
        print(f"  ⚠️  有{warnings}个警告")

    return 0 if errors == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
