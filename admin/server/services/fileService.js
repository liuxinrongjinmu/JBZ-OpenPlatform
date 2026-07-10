/**
 * 文件系统服务 - 文档 .md 文件的增删改查
 * 数据即文件，不依赖数据库
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { nanoid } from 'nanoid'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS_ROOT = path.resolve(__dirname, '../../../docs')

const VALID_DIRS = ['merchant', 'supplier']

/**
 * 列出指定目录下所有文档的元数据
 * @param {string} dir - 目录名 (merchant/supplier)
 * @param {object} options - { search, page, size }
 * @returns {{ items: Array, total: number }}
 */
export async function listDocuments(dir, options = {}) {
  if (!VALID_DIRS.includes(dir)) throw new Error(`Invalid dir: ${dir}`)
  const { search = '', page = 1, size = 20 } = options
  const dirPath = path.join(DOCS_ROOT, dir)

  await fs.mkdir(dirPath, { recursive: true })
  const files = await fs.readdir(dirPath)

  let items = []
  for (const file of files) {
    if (!file.endsWith('.md') || file === 'index.md') continue
    const filePath = path.join(dirPath, file)
    const stat = await fs.stat(filePath)
    const content = await fs.readFile(filePath, 'utf-8')
    const { data } = matter(content)
    const id = file.replace('.md', '')

    // 优先 YAML frontmatter title，其次 # 标题，最后用 id
    let title = data.title || ''
    if (!title) {
      const match = content.match(/^#\s+(.+)/m)
      title = match ? match[1].trim() : id
    }

    items.push({
      id,
      title,
      dir,
      updatedAt: stat.mtime.toISOString(),
      size: stat.size,
    })
  }

  // 搜索过滤
  if (search) {
    const kw = search.toLowerCase()
    items = items.filter(
      (d) =>
        d.title.toLowerCase().includes(kw) || d.id.toLowerCase().includes(kw)
    )
  }

  // 按更新时间倒序
  items.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  const total = items.length
  const start = (page - 1) * size
  items = items.slice(start, start + size)

  return { items, total, page, size }
}

/**
 * 获取单个文档详情
 */
export async function getDocument(dir, id) {
  if (!VALID_DIRS.includes(dir)) throw new Error(`Invalid dir: ${dir}`)
  const filePath = path.join(DOCS_ROOT, dir, `${id}.md`)

  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return {
      id,
      dir,
      title: data.title || '',
      content: content.trim(),
      frontmatter: data,
      raw,
    }
  } catch (err) {
    if (err.code === 'ENOENT') return null
    throw err
  }
}

/**
 * 创建新文档
 */
export async function createDocument(dir, title, content = '') {
  if (!VALID_DIRS.includes(dir)) throw new Error(`Invalid dir: ${dir}`)
  const id = nanoid(12)
  const filePath = path.join(DOCS_ROOT, dir, `${id}.md`)
  const frontmatter = `---\ntitle: ${title}\ndate: ${new Date().toISOString()}\n---\n\n`
  const fullContent = frontmatter + content

  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, fullContent, 'utf-8')

  return { id, path: filePath }
}

/**
 * 更新文档
 */
export async function updateDocument(dir, id, title, content) {
  if (!VALID_DIRS.includes(dir)) throw new Error(`Invalid dir: ${dir}`)
  const filePath = path.join(DOCS_ROOT, dir, `${id}.md`)

  const existing = await getDocument(dir, id)
  if (!existing) throw new Error('DOC_NOT_FOUND')

  const frontmatter = { ...existing.frontmatter, title }
  frontmatter.updatedAt = new Date().toISOString()
  const fmStr = matter.stringify(content, frontmatter)
  await fs.writeFile(filePath, fmStr, 'utf-8')

  return { id, path: filePath }
}

/**
 * 删除文档
 */
export async function deleteDocument(dir, id) {
  if (!VALID_DIRS.includes(dir)) throw new Error(`Invalid dir: ${dir}`)
  const filePath = path.join(DOCS_ROOT, dir, `${id}.md`)
  await fs.unlink(filePath)
  return { success: true }
}

/**
 * 获取文档的 Git 历史
 */
export function getDocsRoot() {
  return DOCS_ROOT
}
