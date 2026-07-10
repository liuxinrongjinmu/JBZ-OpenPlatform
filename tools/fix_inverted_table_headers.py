#!/usr/bin/env python3
"""
修复 Markdown 中 "分隔行在前、表头行在后" 的倒置表格。
规则：若一行是表格分隔行，且其紧邻上一行为空或非表格行，同时下一非空行是表头行，
则交换这两行，使表头在前、分隔行在后。
"""
import re
from pathlib import Path

DOCS_ROOT = Path(__file__).resolve().parent.parent / "docs"
SEPARATOR_RE = re.compile(r"^\|([\s\-:|]+\|)+\s*$")


def is_separator(line: str) -> bool:
    return bool(SEPARATOR_RE.match(line)) and "---" in line


def is_header_row(line: str) -> bool:
    s = line.strip()
    if not (s.startswith("|") and s.endswith("|")):
        return False
    if is_separator(line):
        return False
    return line.count("|") >= 3


def fix_file(file_path: Path) -> int:
    lines = file_path.read_text(encoding="utf-8").splitlines()
    fixed = 0
    i = 0
    while i < len(lines):
        line = lines[i]
        if not is_separator(line):
            i += 1
            continue

        prev_line = lines[i - 1] if i - 1 >= 0 else ""
        next_idx = i + 1
        while next_idx < len(lines) and lines[next_idx].strip() == "":
            next_idx += 1
        if next_idx >= len(lines):
            i += 1
            continue
        next_line = lines[next_idx]

        prev_is_table_row = prev_line.strip().startswith("|") and prev_line.strip().endswith("|")
        if (prev_line.strip() == "" or not prev_is_table_row) and is_header_row(next_line):
            # 交换分隔行与表头行
            lines[i], lines[next_idx] = lines[next_idx], lines[i]
            fixed += 1
            i = next_idx + 1
            continue
        i += 1

    if fixed:
        file_path.write_text("\n".join(lines) + ("\n" if lines and lines[-1] else ""), encoding="utf-8")
    return fixed


def main():
    total = 0
    for md in sorted(DOCS_ROOT.rglob("*.md")):
        if any(part.startswith(("tools", "dist", "cache", "node_modules")) for part in md.parts):
            continue
        fixed = fix_file(md)
        if fixed:
            rel = md.relative_to(DOCS_ROOT)
            print(f"已修复 {rel}: {fixed} 处")
            total += fixed
    print(f"\n共修复 {total} 处倒置表格")


if __name__ == "__main__":
    main()
