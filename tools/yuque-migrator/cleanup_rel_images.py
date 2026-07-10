#!/usr/bin/env python3
"""
后处理脚本：删除Markdown中失效的相对路径图片引用
语雀sourcecode里同时存在相对路径图片(images/xxx.png)和CDN图片，
相对路径图片在VitePress中无法解析，且有CDN图片替代，直接删除。
"""
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
DOCS_DIR = PROJECT_ROOT / "docs"

# 匹配相对路径图片引用 ![](images/xxx.png) 或 ![](./images/xxx.png)
REL_IMG_PATTERN = re.compile(r'!\[[^\]]*\]\((?:\./)?images/[^)]+\)')


def process_file(filepath: Path) -> int:
    """处理单个文件，返回替换次数"""
    original = filepath.read_text(encoding="utf-8")
    count = len(REL_IMG_PATTERN.findall(original))
    if count == 0:
        return 0
    # 删除相对路径图片引用
    new_content = REL_IMG_PATTERN.sub('', original)
    # 清理删除后可能出现的连续空行（超过2个连续空行压缩为2个）
    new_content = re.sub(r'\n{3,}', '\n\n', new_content)
    filepath.write_text(new_content, encoding="utf-8")
    return count


def main():
    print("=" * 60)
    print("相对路径图片引用清理工具")
    print("=" * 60)

    total_files = 0
    total_replacements = 0

    for md_file in DOCS_DIR.rglob("*.md"):
        if ".vitepress" in md_file.parts:
            continue
        count = process_file(md_file)
        if count > 0:
            total_files += 1
            total_replacements += count
            print(f"  {md_file.relative_to(PROJECT_ROOT)}: {count} 处")

    print(f"\n完成: 处理{total_files}个文件, 共{total_replacements}处清理")


if __name__ == "__main__":
    main()
