#!/usr/bin/env python3
"""
后处理脚本：转义Markdown中的 {{xxx}} 插值语法
Vue模板编译器会把 {{xxx}} 当作插值表达式
方案：用 <span v-pre>{{xxx}}</span> 包裹，让Vue跳过编译
"""
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
DOCS_DIR = PROJECT_ROOT / "docs"

# 匹配旧的错误转义 {{ '{{' }}xxx{{ '}}' }}
OLD_ESCAPE_PATTERN = re.compile(r"\{\{ '\{\{' \}\}(.*?)\{\{ '\}\}' \}\}")
# 匹配原始 {{xxx}}
INTERP_PATTERN = re.compile(r'\{\{([^{}]+)\}\}')


def escape_interpolation(content: str) -> str:
    """转义插值语法：将 {{xxx}} 转为 <span v-pre>{{xxx}}</span>"""
    result = []
    in_code_block = False

    for line in content.split('\n'):
        # 检测代码块边界
        if line.lstrip().startswith("```"):
            in_code_block = not in_code_block
            result.append(line)
            continue

        if in_code_block:
            result.append(line)
            continue

        # 行内代码分段处理
        parts = re.split(r'(`[^`]*`)', line)
        new_parts = []
        for part in parts:
            if part.startswith('`') and part.endswith('`'):
                new_parts.append(part)
            else:
                # 转义插值：用 v-pre 包裹
                new_parts.append(INTERP_PATTERN.sub(
                    lambda m: f'<span v-pre>{{{{{m.group(1)}}}}}</span>',
                    part
                ))
        result.append(''.join(new_parts))

    return '\n'.join(result)


def process_file(filepath: Path) -> int:
    """处理单个文件，返回替换次数"""
    original = filepath.read_text(encoding="utf-8")
    # 先撤销旧的错误转义
    original = OLD_ESCAPE_PATTERN.sub(lambda m: f'{{{{{m.group(1)}}}}}', original)
    # 统计原始 {{xxx}} 数量
    count = len(INTERP_PATTERN.findall(original))
    if count == 0:
        # 即使没有插值，也可能需要写回撤销后的内容
        filepath.write_text(original, encoding="utf-8")
        return 0
    new_content = escape_interpolation(original)
    filepath.write_text(new_content, encoding="utf-8")
    return count


def main():
    print("=" * 60)
    print("插值语法转义工具 (v-pre方案)")
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

    print(f"\n完成: 处理{total_files}个文件, 共{total_replacements}处替换")


if __name__ == "__main__":
    main()
