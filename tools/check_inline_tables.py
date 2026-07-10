#!/usr/bin/env python3
"""
扫描 Markdown 文件，查找表格行与其他内容位于同一行的情况。
例如："### 标题| 参数 | 类型 |" 会导致表格无法渲染。
"""
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = PROJECT_ROOT / "docs"
ACTIVE_DIRS = [DOCS_DIR / "merchant", DOCS_DIR / "supplier"]

# 匹配表格行：以 | 开头和结尾，中间至少有两个 |（即至少一列）
TABLE_ROW_RE = re.compile(r"^.*\|[^|\n]+\|[^|\n]+.*\|\s*$")


def is_table_only_line(line: str) -> bool:
    """判断是否仅为表格行（行首到第一个 | 之前只有空白，行尾到最后一个 | 之后只有空白）"""
    stripped = line.strip()
    if not (stripped.startswith("|") and stripped.endswith("|")):
        return False
    # 检查整行是否只由 | ... | 组成（允许前后空白）
    inner = stripped[1:-1]
    # 至少包含一个 |
    return "|" in inner


def check_file(file_path: Path):
    issues = []
    lines = file_path.read_text(encoding="utf-8").splitlines()
    for i, line in enumerate(lines):
        if not line.strip():
            continue
        if not is_table_only_line(line) and TABLE_ROW_RE.match(line):
            # 行内包含表格语法但不仅限于表格
            issues.append((i + 1, line.strip()))
    return issues


def main():
    total_files = 0
    total_issues = 0
    for d in ACTIVE_DIRS:
        for md_file in sorted(d.glob("*.md")):
            issues = check_file(md_file)
            if issues:
                total_files += 1
                total_issues += len(issues)
                rel = md_file.relative_to(PROJECT_ROOT)
                print(f"\n{rel}: {len(issues)} 处")
                for line_no, snippet in issues:
                    print(f"  行 {line_no}: {snippet[:120]}")

    print(f"\n{'='*60}")
    print(f"共 {total_files} 个文件存在行内表格问题，总计 {total_issues} 处")


if __name__ == "__main__":
    main()
