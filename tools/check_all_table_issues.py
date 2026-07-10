#!/usr/bin/env python3
"""
全面检查 Markdown 表格异常：
1. 倒置表头（分隔行在表头前）
2. 分隔行中存在空单元格
3. 表头、分隔行、数据行列数不一致
4. 分隔行缺失或格式错误
"""
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = PROJECT_ROOT / "docs"
ACTIVE_DIRS = [DOCS_DIR / "merchant", DOCS_DIR / "supplier"]

SEPARATOR_RE = re.compile(r"^\|([\s\-:|]+\|)+\s*$")
TABLE_ROW_RE = re.compile(r"^\|.*\|\s*$")


def is_separator(line: str) -> bool:
    return bool(SEPARATOR_RE.match(line)) and "---" in line


def column_count(line: str) -> int:
    """计算表格行的列数（按 | 分割，去掉首尾空）"""
    parts = line.strip().split("|")
    # 去掉第一个和最后一个空字符串
    if parts and parts[0].strip() == "":
        parts = parts[1:]
    if parts and parts[-1].strip() == "":
        parts = parts[:-1]
    return len(parts)


def has_empty_separator_cell(line: str) -> bool:
    """分隔行中是否有空单元格（非 --- 内容）"""
    if not is_separator(line):
        return False
    parts = line.strip().split("|")
    if parts and parts[0].strip() == "":
        parts = parts[1:]
    if parts and parts[-1].strip() == "":
        parts = parts[:-1]
    for cell in parts:
        cell = cell.strip()
        if cell == "":
            return True
        # 允许纯 -、:、空格组合
        if not re.match(r"^[-:\s]+$", cell):
            return True
    return False


def find_table_blocks(lines: list[str]):
    """按连续表格行分块，返回每个块的行索引列表"""
    blocks = []
    current = []
    for i, line in enumerate(lines):
        if TABLE_ROW_RE.match(line):
            current.append(i)
        else:
            if current:
                blocks.append(current)
                current = []
    if current:
        blocks.append(current)
    return blocks


def check_file(file_path: Path):
    issues = []
    lines = file_path.read_text(encoding="utf-8").splitlines()
    blocks = find_table_blocks(lines)

    for block in blocks:
        if len(block) < 2:
            continue
        first = lines[block[0]].strip()
        second = lines[block[1]].strip()

        # 情况1：第一行是分隔行，第二行是表头 -> 倒置
        if is_separator(first):
            # 找下一行是否为表头
            if len(block) >= 2 and not is_separator(second):
                issues.append((block[0] + 1, "倒置表头：分隔行在表头之前"))
            continue

        # 正常：第一行表头，第二行分隔行
        if not is_separator(second):
            issues.append((block[0] + 1, "表格缺少正确的分隔行"))
            continue

        # 检查分隔行空单元格
        if has_empty_separator_cell(second):
            issues.append((block[1] + 1, "分隔行存在空单元格"))

        # 检查列数一致性
        header_cols = column_count(first)
        sep_cols = column_count(second)
        if header_cols != sep_cols:
            issues.append((block[1] + 1, f"分隔行列数({sep_cols})与表头列数({header_cols})不一致"))

        for row_idx in block[2:]:
            row = lines[row_idx].strip()
            if is_separator(row):
                # 可能是另一个子表的分隔行，跳过
                continue
            row_cols = column_count(row)
            if row_cols != header_cols:
                issues.append((row_idx + 1, f"数据行列数({row_cols})与表头列数({header_cols})不一致"))

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
                for line_no, desc in issues:
                    print(f"  行 {line_no}: {desc}")

    print(f"\n{'='*60}")
    print(f"共 {total_files} 个文件存在表格问题，总计 {total_issues} 处")


if __name__ == "__main__":
    main()
