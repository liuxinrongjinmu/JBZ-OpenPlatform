#!/usr/bin/env python3
"""
后处理脚本：转义Markdown中的Java泛型语法（List<X>、Map<K,V>、Set<X>等）
避免VitePress/Vue将其误解析为HTML标签导致构建失败
"""
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
DOCS_DIR = PROJECT_ROOT / "docs"

# 匹配 JavaType<...> 形式的泛型（含嵌套）
# 例如：List<Long>、Map<String,Object>、List<Map<String,Object>>
GENERIC_PATTERN = re.compile(
    r'\b(List|Map|Set|Collection|Array|ArrayList|HashMap|HashSet|LinkedList|TreeMap|TreeSet|Optional|Pair|Tuple|Long|Integer|String|Boolean|Object)<([^<>]*(?:<[^<>]*>[^<>]*)*)>'
)


def escape_generics(content: str) -> str:
    """
    转义泛型语法：将 List<X> 转为 List&lt;X&gt;
    仅在代码块外处理（避免影响 ```java 代码块中的真实代码）
    """
    result = []
    in_code_block = False
    in_inline_code = False

    i = 0
    while i < len(content):
        line = content[i] if i < len(content) else ""

        # 检测代码块边界
        if line.lstrip().startswith("```"):
            in_code_block = not in_code_block
            result.append(line)
            i += 1
            continue

        if in_code_block:
            result.append(line)
            i += 1
            continue

        # 行内代码（反引号）处理 - 整行处理
        # 先按反引号分段，仅对非代码段做替换
        parts = re.split(r'(`[^`]*`)', line)
        new_parts = []
        for part in parts:
            if part.startswith('`') and part.endswith('`'):
                new_parts.append(part)
            else:
                # 转义泛型
                new_parts.append(GENERIC_PATTERN.sub(
                    lambda m: f'{m.group(1)}&lt;{m.group(2)}&gt;',
                    part
                ))
        result.append(''.join(new_parts))
        i += 1

    return '\n'.join(result) if isinstance(content, str) else content


def process_file(filepath: Path) -> int:
    """
    处理单个文件
    :return: 替换次数
    """
    original = filepath.read_text(encoding="utf-8")
    # 统计替换次数
    count = len(GENERIC_PATTERN.findall(original))
    if count == 0:
        return 0
    new_content = escape_generics(original)
    filepath.write_text(new_content, encoding="utf-8")
    return count


def main():
    print("=" * 60)
    print("泛型语法转义工具")
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
