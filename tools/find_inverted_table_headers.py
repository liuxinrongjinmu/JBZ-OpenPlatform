#!/usr/bin/env python3
"""
扫描所有 .md 文件，查找 "分隔行在前、表头行在后" 的倒置表格。
Markdown 表格要求：表头行在前，分隔行在后。
"""
import os
import re
from pathlib import Path

DOCS_ROOT = Path(__file__).resolve().parent.parent / "docs"
SEPARATOR_RE = re.compile(r"^\|([\s\-:|]+\|)+\s*$")
HEADER_RE = re.compile(r"^\|[^|\n]+\|[^|\n]+.*\|\s*$")


def is_separator(line: str) -> bool:
    return bool(SEPARATOR_RE.match(line)) and "---" in line


def is_header(line: str) -> bool:
    # 非分隔行，但至少有两列
    if not line.strip().startswith("|") or not line.strip().endswith("|"):
        return False
    if is_separator(line):
        return False
    return line.count("|") >= 3


def find_issues(file_path: Path):
    lines = file_path.read_text(encoding="utf-8").splitlines()
    issues = []
    for i, line in enumerate(lines):
        if not is_separator(line):
            continue
        # 只看紧邻的上一行：若为空或非表格行，且下一非空行是表头 => 倒置
        prev_line = lines[i - 1] if i - 1 >= 0 else ""
        next_idx = i + 1
        while next_idx < len(lines) and lines[next_idx].strip() == "":
            next_idx += 1
        next_line = lines[next_idx] if next_idx < len(lines) else ""

        prev_is_table_row = prev_line.strip().startswith("|") and prev_line.strip().endswith("|")
        if (prev_line.strip() == "" or not prev_is_table_row) and is_header(next_line):
            issues.append((i, line, next_idx, next_line))
    return issues


def main():
    files_with_issues = []
    for md in sorted(DOCS_ROOT.rglob("*.md")):
        # 排除管理/工具目录
        if any(part.startswith(("tools", "dist", "cache", "node_modules")) for part in md.parts):
            continue
        issues = find_issues(md)
        if issues:
            files_with_issues.append((md, issues))

    print(f"发现 {len(files_with_issues)} 个文件存在倒置表格：\n")
    for md, issues in files_with_issues:
        rel = md.relative_to(DOCS_ROOT)
        print(f"{rel}: {len(issues)} 处")
        for sep_idx, sep_line, hdr_idx, hdr_line in issues:
            print(f"  行 {sep_idx + 1}: {sep_line.strip()}")
            print(f"  行 {hdr_idx + 1}: {hdr_line.strip()}")
        print()


if __name__ == "__main__":
    main()
