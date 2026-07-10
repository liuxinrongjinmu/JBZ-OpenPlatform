#!/usr/bin/env python3
"""综合检查：死链、无效JSON、接口说明分行、短文件、Excel路径"""
import json
import re
from pathlib import Path

PROJECT_ROOT = Path("/Users/jinmu/Desktop/JBZ-OpenPlatform")
DOCS_DIR = PROJECT_ROOT / "docs"
ACTIVE_DIRS = [DOCS_DIR / "merchant", DOCS_DIR / "supplier"]


def find_markdown_links(content: str):
    """找出所有 [text](url) 形式的链接"""
    return re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)


def check_broken_links():
    """检查内部 .md 链接是否指向存在的文件"""
    issues = []
    for d in ACTIVE_DIRS:
        for md_file in d.glob("*.md"):
            content = md_file.read_text(encoding="utf-8")
            for text, url in find_markdown_links(content):
                if url.startswith("./") and url.endswith(".md"):
                    target = (md_file.parent / url).resolve()
                    if not target.exists():
                        issues.append(f"{md_file.relative_to(PROJECT_ROOT)}: 死链 [{text}]({url})")
    return issues


def check_invalid_json():
    """检查 json 代码块是否为有效 JSON"""
    issues = []
    for d in ACTIVE_DIRS:
        for md_file in d.glob("*.md"):
            content = md_file.read_text(encoding="utf-8")
            blocks = re.findall(r'```json\n(.*?)\n```', content, re.DOTALL)
            for block in blocks:
                # 跳过明显非纯 JSON 的块（如包含注释、变量）
                stripped = block.strip()
                if not stripped:
                    continue
                if stripped.startswith("//") or "OFFICIAL" in stripped and '"OFFICIAL"' not in stripped:
                    continue
                try:
                    json.loads(stripped)
                except json.JSONDecodeError as e:
                    issues.append(f"{md_file.relative_to(PROJECT_ROOT)}: JSON解析失败 - {e.msg} (line {e.lineno})")
                    break  # 每个文件只报一次
    return issues


def check_api_desc_format():
    """检查接口说明/请求方式/请求头/请求地址是否分行"""
    issues = []
    patterns = [
        (r'\*\*接口说明\*\*\s*\n\s*([^\n]+)', "接口说明"),
        (r'\*\*请求方式\*\*\s*\n\s*([^\n]+)', "请求方式"),
        (r'\*\*请求头\*\*\s*\n\s*([^\n]+)', "请求头"),
        (r'\*\*请求地址\*\*\s*\n\s*([^\n]+)', "请求地址"),
    ]
    for d in ACTIVE_DIRS:
        for md_file in d.glob("*.md"):
            content = md_file.read_text(encoding="utf-8")
            for pattern, name in patterns:
                for m in re.finditer(pattern, content):
                    # 如果匹配到的说明文字前面没有 **...**： 则为错误分行
                    desc = m.group(1).strip()
                    if not desc.startswith("**") and not desc.startswith("`"):
                        issues.append(f"{md_file.relative_to(PROJECT_ROOT)}: {name} 与描述分行")
                        break
    return issues


def check_short_files():
    """检查可能内容缺失的短文件"""
    issues = []
    for d in ACTIVE_DIRS:
        for md_file in d.glob("*.md"):
            content = md_file.read_text(encoding="utf-8")
            if len(content.strip()) < 200:
                issues.append(f"{md_file.relative_to(PROJECT_ROOT)}: 文件内容过短 ({len(content.strip())} 字符)")
    return issues


def check_excel_links():
    """检查 Excel 下载链接指向的文件是否存在"""
    issues = []
    for d in ACTIVE_DIRS:
        for md_file in d.glob("*.md"):
            content = md_file.read_text(encoding="utf-8")
            for text, url in find_markdown_links(content):
                if ".xlsx" in url.lower():
                    if url.startswith("/"):
                        target = (DOCS_DIR / ".vitepress" / "dist" / url.lstrip("/")).resolve()
                    elif url.startswith("./"):
                        target = (md_file.parent / url).resolve()
                    else:
                        continue
                    if not target.exists():
                        issues.append(f"{md_file.relative_to(PROJECT_ROOT)}: Excel文件缺失 [{text}]({url})")
    return issues


def main():
    print("=" * 70)
    print("综合系统检查")
    print("=" * 70)

    checks = [
        ("死链检查", check_broken_links),
        ("无效JSON代码块", check_invalid_json),
        ("接口说明分行", check_api_desc_format),
        ("内容缺失短文件", check_short_files),
        ("Excel文件缺失", check_excel_links),
    ]

    total = 0
    for name, fn in checks:
        issues = fn()
        print(f"\n{name}: {len(issues)} 个问题")
        for issue in issues[:20]:
            print(f"  - {issue}")
        if len(issues) > 20:
            print(f"  ... 还有 {len(issues)-20} 个问题")
        total += len(issues)

    print(f"\n{'='*70}")
    print(f"总计问题数: {total}")


if __name__ == "__main__":
    main()
