#!/usr/bin/env python3
"""
精确扫描关键损坏模式：
1. 标题行被压缩：# .数字.标题---# # # 口说明...
2. 超长行包含多个# 标记
3. 行内的 :::tip / :::
4. 行内的 --- 分割符
"""

import re
from pathlib import Path

PROJECT_ROOT = Path("/Users/jinmu/Desktop/JBZ-OpenPlatform")
DOCS_DIR = PROJECT_ROOT / "docs"


def check_issues(content: str) -> dict:
    """精确检查文档格式问题"""
    issues = {}
    lines = content.split('\n')

    # 1. 检测压缩标题行：包含 # # # 模式 或 # .数字.标题--- 模式
    compressed_count = 0
    for line in lines:
        # 匹配: # 任意内容 --- # # # 任意内容
        if re.search(r'#\s+#\s+#', line) and not re.match(r'^###\s+\S', line.strip()):
            compressed_count += 1
        # 匹配: # .数字.标题--- 这种开头数字丢失
        elif re.match(r'^#\s*\.\d+\.\S+---', line):
            compressed_count += 1
        # 匹配: # 数字.标题--- （数字后直接是标题，无空格）
        elif re.match(r'^#\s+\d+\.\S+---', line):
            compressed_count += 1
    if compressed_count > 0:
        issues['compressed'] = f"压缩标题 {compressed_count}处"

    # 2. 检测超长行（>300字符）且包含 ::: 或 ---
    long_count = 0
    for i, line in enumerate(lines):
        if len(line) > 300 and (':::' in line or '---' in line):
            # 进一步检查：包含至少2个 ::: 或 --- 或 # # #
            markers = line.count(':::') + line.count('# # #') + line.count('# #')
            if markers >= 1 and ':::' in line:
                long_count += 1
            elif markers >= 2:
                long_count += 1
    if long_count > 0:
        issues['long'] = f"超长行 {long_count}处"

    # 3. 检测行内出现 ::: 但不在行首
    inline_count = 0
    for line in lines:
        s = line.strip()
        if s.startswith(':::'):
            continue
        if ':::' in line and len(line) > 100:
            inline_count += 1
    if inline_count > 0:
        issues['inline_container'] = f"行内容器 {inline_count}处"

    # 4. 检测标题行格式错误：# .X 开头
    bad_title_count = 0
    for line in lines:
        if re.match(r'^#\s+\.', line) or re.match(r'^#\s+\d', line):
            # 进一步检查：如果行长度 > 80，可能是压缩
            if len(line) > 60:
                bad_title_count += 1
    if bad_title_count > 0:
        issues['bad_title'] = f"异常标题 {bad_title_count}处"

    return issues


def main():
    print("=" * 70)
    print("精确扫描关键损坏模式")
    print("=" * 70)

    total = 0
    has_issue = 0
    issue_files = []

    for md_file in sorted(list(DOCS_DIR.glob("merchant/*.md")) + list(DOCS_DIR.glob("supplier/*.md"))):
        total += 1
        try:
            content = md_file.read_text(encoding="utf-8")
        except Exception as e:
            continue
        issues = check_issues(content)
        if issues:
            has_issue += 1
            rel_path = md_file.relative_to(PROJECT_ROOT)
            issue_files.append((rel_path, issues))

    print(f"\n扫描 {total} 个文件，有问题 {has_issue} 个\n")

    if issue_files:
        by_type = {}
        for path, issues in issue_files:
            for issue_type in issues:
                if issue_type not in by_type:
                    by_type[issue_type] = []
                by_type[issue_type].append((path, issues[issue_type]))

        for issue_type, files in by_type.items():
            print(f"--- {issue_type} ({len(files)}) ---")
            for path, desc in files:
                print(f"  {path}: {desc}")
            print()

    print("=" * 70)


if __name__ == "__main__":
    main()
