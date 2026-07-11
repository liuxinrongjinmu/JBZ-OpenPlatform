/**
 * 文档索引生成器
 * 扫描 docs/merchant/*.md 和 docs/supplier/*.md，提取 H1 标题，
 * 生成 docs/public/doc-index.json，供 AIChat 组件在 System Prompt 中注入文档目录。
 *
 * 运行: node tools/generate-doc-index.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DOCS_DIR = path.join(ROOT, 'docs')
const OUTPUT = path.join(DOCS_DIR, 'public', 'doc-index.json')

const DIRS = [
  { dir: 'merchant', category: '商家版' },
  { dir: 'supplier', category: '供应商版' },
]

const indexes = []

for (const { dir, category } of DIRS) {
  const dirPath = path.join(DOCS_DIR, dir)
  if (!fs.existsSync(dirPath)) continue

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && f !== 'index.md')
  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)/m)
    const title = match ? match[1].trim() : file.replace('.md', '')
    const docId = file.replace('.md', '')
    indexes.push({
      title,
      path: `/${dir}/${docId}`,
      category,
    })
  }
}

// 按 category + title 排序
indexes.sort((a, b) => {
  if (a.category !== b.category) return a.category.localeCompare(b.category)
  return a.title.localeCompare(b.title, 'zh-CN')
})

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
fs.writeFileSync(OUTPUT, JSON.stringify(indexes, null, 2), 'utf-8')

console.log(`[doc-index] 已生成文档索引: ${OUTPUT}`)
console.log(`[doc-index] 共 ${indexes.length} 篇文档 (商家版: ${indexes.filter(i => i.category === '商家版').length}, 供应商版: ${indexes.filter(i => i.category === '供应商版').length})`)
