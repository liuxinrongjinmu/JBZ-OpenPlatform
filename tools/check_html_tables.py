#!/usr/bin/env python3
"""
扫描 VitePress 构建产物中的 HTML，检查是否还有未渲染成 <table> 的 Markdown 表格语法。
如果在文本内容中仍然出现 | --- | 或类似表格行，说明表格渲染异常。
"""
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = PROJECT_ROOT / "docs" / ".vitepress" / "dist"

# 匹配 markdown 表格分隔行或表头行（在 HTML 文本节点中出现即异常）
MARKDOWN_TABLE_RE = re.compile(r"\|\s*[-:]+\s*\|\s*[-:]+\s*\|")
# 更宽泛：连续多行以 | 开头和结尾，且包含 ---


def find_unrendered_tables(html_path: Path):
    content = html_path.read_text(encoding="utf-8")
    issues = []

    # 简单方法：查找 | --- | 模式（通常不会被渲染后保留）
    # 但要排除 pre/code 块中的内容，因为代码示例里可能有
    # 这里用简单判断：如果文本节点中有 "| --- |" 连续出现
    matches = list(MARKDOWN_TABLE_RE.finditer(content))
    if matches:
        # 进一步检查是否在 <pre> 或 <code> 内
        for m in matches:
            pos = m.start()
            # 检查前面最近的 <pre> 或 <code> 和 </pre> 或 </code>
            before = content[:pos]
            after = content[pos:]
            in_pre = before.rfind("<pre") > before.rfind("</pre>")
            in_code = before.rfind("<code") > before.rfind("</code>")
            if not (in_pre or in_code):
                issues.append((content[max(0, pos-30):pos+50],))
                break
    return issues


def main():
    total_files = 0
    for html_file in sorted(DIST_DIR.rglob("*.html")):
        issues = find_unrendered_tables(html_file)
        if issues:
            total_files += 1
            rel = html_file.relative_to(DIST_DIR)
            print(f"\n{rel}: 发现未渲染表格语法")
            for snippet in issues[:3]:
                print(f"  ...{snippet[0]}...")

    print(f"\n{'='*60}")
    if total_files == 0:
        print("所有 HTML 文件表格渲染正常")
    else:
        print(f"共 {total_files} 个 HTML 文件存在未渲染表格语法")


if __name__ == "__main__":
    main()
