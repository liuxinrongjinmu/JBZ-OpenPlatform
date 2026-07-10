/**
 * 侧边栏服务 - 解析和修改 sidebar.js 菜单配置
 * sidebar.js 是一个 ESM 模块：export default { "/merchant/": [...], "/supplier/": [...] }
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SIDEBAR_PATH = path.resolve(__dirname, '../../../docs/.vitepress/sidebar.js')

/**
 * 读取 sidebar.js 并解析为 JSON 树
 * 策略：用 eval（动态 import 在 ESM 中可能有问题），这里用正则解析
 */
export async function parseSidebar(dir) {
  const raw = await fs.readFile(SIDEBAR_PATH, 'utf-8')

  // 用正则提取 export default 后的对象字符串
  const match = raw.match(/export\s+default\s+({[\s\S]*})/m)
  if (!match) throw new Error('Cannot parse sidebar.js')

  // 简单策略：用 Function 构造器执行，安全沙箱返回对象
  const objStr = match[1]
  const evalFn = new Function(`return ${objStr}`)
  const sidebar = evalFn()

  const key = `/${dir}/`
  const tree = sidebar[key] || []

  // 给每个节点加唯一 id (路径索引)
  return addNodeIds(tree, key)
}

/**
 * 递归给节点加 id (基于路径的索引，如 "0.1.2")
 */
function addNodeIds(nodes, prefix = '') {
  return nodes.map((node, i) => {
    const id = prefix ? `${prefix}.${i}` : `${i}`
    const result = {
      id,
      text: node.text || '',
      link: node.link || undefined,
      collapsed: node.collapsed,
    }
    if (node.items && Array.isArray(node.items)) {
      result.items = addNodeIds(node.items, id)
    }
    return result
  })
}

/**
 * 将 JSON 树序列化回 sidebar.js
 */
export async function serializeSidebar(dir, tree) {
  const raw = await fs.readFile(SIDEBAR_PATH, 'utf-8')
  const key = `/${dir}/`

  // 去掉节点 id，还原为 VitePress sidebar 格式
  const cleanTree = cleanNodeIds(tree)

  // 构造替换内容：格式化 JSON 为 JS 对象字面量
  const newSection = formatSidebarSection(cleanTree, 2)

  // 找到对应 section 在文件中的位置并替换
  const regex = new RegExp(
    `("${key.replace(/\//g, '\\/')}"\\s*:\\s*\\[)[\\s\\S]*?(\\n\\s*\\])`,
    'm'
  )
  const updated = raw.replace(regex, `$1${newSection}$2`)

  await fs.writeFile(SIDEBAR_PATH, updated, 'utf-8')
  return true
}

/**
 * 移除节点中的 id 属性
 */
function cleanNodeIds(nodes) {
  return nodes.map(({ id, ...rest }) => ({
    ...rest,
    items: rest.items ? cleanNodeIds(rest.items) : undefined,
  }))
}

/**
 * 格式化 sidebar section 为 JS 对象字面量
 */
function formatSidebarSection(nodes, indentLevel) {
  const indent = '  '.repeat(indentLevel)
  const lines = ['\n']
  for (const node of nodes) {
    lines.push(`${indent}{\n`)
    lines.push(`${indent}  "text": ${JSON.stringify(node.text)}`)
    if (node.link) {
      lines.push(`,\n${indent}  "link": ${JSON.stringify(node.link)}`)
    }
    if (node.collapsed !== undefined) {
      lines.push(`,\n${indent}  "collapsed": ${node.collapsed}`)
    }
    if (node.items && node.items.length > 0) {
      lines.push(`,\n${indent}  "items": [${formatSidebarSection(node.items, indentLevel + 1)}${indent}  ]`)
    }
    lines.push(`\n${indent}}`)
    if (nodes.indexOf(node) < nodes.length - 1) lines.push(',')
    lines.push('\n')
  }
  return lines.join('')
}

/**
 * 在指定父节点下新增菜单项
 */
export async function addSidebarNode(dir, parentId, newNode) {
  const tree = await parseSidebar(dir)

  if (!parentId) {
    // 添加到根级别
    tree.push({
      text: newNode.text,
      link: newNode.link || undefined,
      items: newNode.items || undefined,
    })
  } else {
    const parent = findNodeById(tree, parentId)
    if (!parent) throw new Error('PARENT_NOT_FOUND')
    if (!parent.items) parent.items = []
    parent.items.push({
      text: newNode.text,
      link: newNode.link || undefined,
      items: newNode.items || undefined,
    })
  }

  return serializeSidebar(dir, tree)
}

/**
 * 删除菜单节点
 */
export async function removeSidebarNode(dir, nodeId) {
  const tree = await parseSidebar(dir)
  const parts = nodeId.split('.').map(Number)

  if (parts.length === 1) {
    tree.splice(parts[0], 1)
  } else {
    const parentId = parts.slice(0, -1).join('.')
    const parent = findNodeById(tree, parentId)
    if (!parent || !parent.items) throw new Error('PARENT_NOT_FOUND')
    parent.items.splice(parts[parts.length - 1], 1)
  }

  return serializeSidebar(dir, tree)
}

/**
 * 修改菜单节点
 */
export async function updateSidebarNode(dir, nodeId, patch) {
  const tree = await parseSidebar(dir)
  const node = findNodeById(tree, nodeId)
  if (!node) throw new Error('NODE_NOT_FOUND')

  if (patch.text !== undefined) node.text = patch.text
  if (patch.link !== undefined) node.link = patch.link || undefined

  return serializeSidebar(dir, tree)
}

/**
 * 按 id 路径查找节点
 */
function findNodeById(nodes, id) {
  const parts = id.split('.').map(Number)
  let current = null
  let arr = nodes
  for (const idx of parts) {
    current = arr[idx]
    if (!current) return null
    arr = current.items || []
  }
  return current
}
