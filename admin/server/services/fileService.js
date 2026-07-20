/**
 * 文件系统服务 - 文档 .md 文件的增删改查
 * 数据即文件，不依赖数据库
 */
import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { customAlphabet } from 'nanoid'

// 文档 ID 仅使用小写字母+数字，匹配路由校验 /^[a-z0-9]+$/
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12)

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
    // 优先 YAML frontmatter title，其次 # 标题，最后用 id
    let title = data.title || ''
    if (!title) {
      const match = content.match(/^#\s+(.+)/m)
      title = match ? match[1].trim() : id
    }
    return {
      id,
      dir,
      title,
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
 * 生成 frontmatter 头部（避免 matter.stringify 污染正文中的 ---）
 */
function buildFrontmatter(obj) {
  const lines = ['---']
  for (const [k, v] of Object.entries(obj)) {
    if (v == null || v === '') continue
    lines.push(`${k}: ${String(v)}`)
  }
  lines.push('---')
  lines.push('')
  return lines.join('\n')
}

/**
 * 创建新文档
 */
export async function createDocument(dir, title, content = '') {
  if (!VALID_DIRS.includes(dir)) throw new Error(`Invalid dir: ${dir}`)
  const id = nanoid(12)
  const filePath = path.join(DOCS_ROOT, dir, `${id}.md`)
  const frontmatter = buildFrontmatter({
    title,
    date: new Date().toISOString(),
  })
  const fullContent = frontmatter + '\n' + content

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

  // 不依赖 matter.stringify，手动构建 frontmatter，保留正文原样
  // 避免正文中的 --- 被 gray-matter 误解析导致截断/乱码
  const fm = { ...existing.frontmatter, title, updatedAt: new Date().toISOString() }
  // 如果已有的 title 字段值和更新的一样，覆盖，否则保留
  const updated = buildFrontmatter(fm)
  const fullContent = updated + '\n' + content

  await fs.writeFile(filePath, fullContent, 'utf-8')

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

// HTML 自闭合标签（无需匹配闭合标签）
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
])

/**
 * 保存前校验 Markdown 内容，确保能通过 VitePress 构建
 *
 * VitePress 用 @vitejs/plugin-vue 把 .md 当 Vue SFC 编译，以下情况会导致构建失败：
 *   1. 代码块/正文中出现 <script>、<template>、<style> 标签（Vue 编译器会当成组件块）
 *   2. HTML 标签未正确闭合（如 <font>没有</font>）
 *
 * @param {string} content - Markdown 正文（不含 frontmatter）
 * @returns {{ valid: boolean, errors: Array<{line: number, col: number, code: string, message: string, fix: string}> }}
 */
export function validateContent(content) {
  const errors = []
  const lines = content.split('\n')

  // ── 1. 检查 <script> / <template> / <style> 标签 ──
  // 这三个标签是 Vue SFC 的保留字，即使出现在代码块里也会被 Vue 编译器解析
  const BLOCK_TAGS = [
    { tag: 'script', fix: '&lt;script&gt;', closeFix: '&lt;/script&gt;' },
    { tag: 'template', fix: '&lt;template&gt;', closeFix: '&lt;/template&gt;' },
    { tag: 'style', fix: '&lt;style&gt;', closeFix: '&lt;/style&gt;' },
  ]

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    for (const bt of BLOCK_TAGS) {
      // 已转义的跳过
      if (line.includes(`&lt;${bt.tag}`)) continue

      const openIdx = line.indexOf(`<${bt.tag}`)
      if (openIdx !== -1 && /<\bscript\b|<\btemplate\b|<\bstyle\b/i.test(line.slice(openIdx, openIdx + 10))) {
        errors.push({
          line: i + 1,
          col: openIdx + 1,
          code: 'VUE_BLOCK_TAG',
          message: `第 ${i + 1} 行包含 "&lt;${bt.tag}&gt;" 标签，VitePress 构建时会将其当作 Vue 组件${bt.tag === 'script' ? '脚本' : bt.tag === 'template' ? '模板' : '样式'}块解析，导致构建失败`,
          fix: '请将 "<' + bt.tag + '>" 改为 "' + bt.fix + '"，将 "</' + bt.tag + '>" 改为 "' + bt.closeFix + '"。即使这段代码在代码块（三个反引号）里面也不例外，VitePress 会把代码块中的 <' + bt.tag + '> 也当真实标签处理。',
        })
      }
    }
  }

  // ── 2. 检查未闭合的 HTML 标签 ──
  // 扫描所有 <tagName ...> 和 </tagName>，简单配对
  const openTags = [] // { tag, line, col }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // 匹配所有 <xxx> 和 </xxx> 标签
    const tagRe = /<\/?(\w[\w-]*)([^>]*)>/g
    let tagMatch
    while ((tagMatch = tagRe.exec(line)) !== null) {
      const tagName = tagMatch[1].toLowerCase()
      const isClosing = tagMatch[0].startsWith('</')
      const isVoid = VOID_TAGS.has(tagName)

      if (isClosing) {
        // 找最近的同名开标签
        let found = false
        for (let j = openTags.length - 1; j >= 0; j--) {
          if (openTags[j].tag === tagName) {
            openTags.splice(j, 1)
            found = true
            break
          }
        }
        if (!found && !isVoid) {
          // 只有闭标签没有开标签，可能是内容本身包含 </xxx>
          // 这种情况不报错，因为 Markdown 正文中可能自然出现
        }
      } else if (!isVoid) {
        // 开标签，不是自闭合的
        openTags.push({ tag: tagName, line: i + 1, col: tagMatch.index + 1 })
      }
    }
  }

  // 只报告确实未闭合的标签（排除 Markdown 代码块中可能被误识别的）
  if (openTags.length > 0 && openTags.length <= 5) {
    for (const ot of openTags) {
      errors.push({
        line: ot.line,
        col: ot.col,
        code: 'UNCLOSED_TAG',
        message: `第 ${ot.line} 行有未闭合的 HTML 标签 "&lt;${ot.tag}&gt;"，缺少对应的 "&lt;/${ot.tag}&gt;"。VitePress 构建时会报 "Element is missing end tag" 错误`,
        fix: '请在合适的位置添加 "</' + ot.tag + '>" 闭合标签，或者将 "<' + ot.tag + '>" 改为 "&lt;' + ot.tag + '&gt;" 让浏览器按纯文本显示',
      })
    }
  }

  // ── 3. 检查站内死链 ──
  // 扫描 Markdown 链接 [text](/merchant/xxx.md) 或 [text](/supplier/xxx.md)
  // 检查目标 .md 文件是否真实存在，避免构建时因 dead link 失败
  const mdLinkRe = /\[([^\]]*)\]\(\/(merchant|supplier)\/([a-zA-Z0-9_-]+)\.md\)/g
  let linkMatch
  while ((linkMatch = mdLinkRe.exec(content)) !== null) {
    const linkText = linkMatch[1], linkDir = linkMatch[2], linkId = linkMatch[3]
    const linkPath = path.join(DOCS_ROOT, linkDir, linkId + '.md')
    if (!fsSync.existsSync(linkPath)) {
      const beforeMatch = content.substring(0, linkMatch.index)
      const lineNum = beforeMatch.split('\n').length
      const colNum = linkMatch.index - (beforeMatch.lastIndexOf('\n') + 1) + 1
      errors.push({
        line: lineNum,
        col: colNum,
        code: 'DEAD_LINK',
        message: `第 ${lineNum} 行有无效链接 "[${linkText}](/${linkDir}/${linkId}.md)"，目标文档不存在`,
        fix: `请将链接改为已有的文档ID，或先在「文档列表 > ${linkDir === 'merchant' ? '商家版' : '供应商版'}」中创建对应的文档`,
      })
    }
  }

  return { valid: errors.length === 0, errors }
}

/**
 * 获取文档的 Git 历史
 */
export function getDocsRoot() {
  return DOCS_ROOT
}
