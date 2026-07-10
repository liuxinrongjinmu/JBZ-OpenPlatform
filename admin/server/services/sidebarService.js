/**
 * 侧边栏服务 - 解析和修改 sidebar.js 菜单配置
 * sidebar.js 是一个 ESM 模块：export default { "/merchant/": [...], "/supplier/": [...] }
 *
 * 采用全量解析-修改-序列化策略，不使用正则替换，确保可靠性。
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SIDEBAR_PATH = path.resolve(__dirname, '../../../docs/.vitepress/sidebar.js')

/**
 * 读取并解析整个 sidebar.js 配置对象
 * 使用 Function 构造器执行 JS 字面量，安全高效
 */
async function readFullSidebar() {
  const raw = await fs.readFile(SIDEBAR_PATH, 'utf-8')
  // 提取 export default 后的对象字面量
  const match = raw.match(/export\s+default\s+({[\s\S]*})/m)
  if (!match) throw new Error('Cannot parse sidebar.js: no export default found')
  const evalFn = new Function(`return ${match[1]}`)
  return evalFn()
}

/**
 * 将完整 sidebar 对象写回文件
 */
async function writeFullSidebar(sidebar) {
  const content = 'export default ' + formatObject(sidebar, 0) + '\n'
  await fs.writeFile(SIDEBAR_PATH, content, 'utf-8')
}

/**
 * 格式化 JS 对象字面量（支持嵌套对象和数组）
 */
function formatObject(obj, indent) {
  const pad = '  '.repeat(indent)
  const pad1 = '  '.repeat(indent + 1)

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    const items = obj.map(item => {
      if (typeof item === 'object' && item !== null) {
        return pad1 + formatObject(item, indent + 1)
      }
      return pad1 + JSON.stringify(item)
    })
    return '[\n' + items.join(',\n') + '\n' + pad + ']'
  }

  if (typeof obj === 'object' && obj !== null) {
    const entries = []
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined) continue
      let valStr
      if (Array.isArray(value)) {
        valStr = formatObject(value, indent + 1)
      } else if (typeof value === 'object' && value !== null) {
        valStr = formatObject(value, indent + 1)
      } else {
        valStr = JSON.stringify(value)
      }
      entries.push(`${pad1}${JSON.stringify(key)}: ${valStr}`)
    }
    if (entries.length === 0) return '{}'
    return '{\n' + entries.join(',\n') + '\n' + pad + '}'
  }

  return JSON.stringify(obj)
}

/**
 * 获取指定目录的菜单树（带节点 id）
 */
export async function parseSidebar(dir) {
  const sidebar = await readFullSidebar()
  const key = `/${dir}/`
  const tree = sidebar[key] || []
  return addNodeIds(structuredClone ? structuredClone(tree) : JSON.parse(JSON.stringify(tree)), key)
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
 * 将 JSON 树序列化回 sidebar.js（全量写回）
 */
export async function serializeSidebar(dir, tree) {
  const sidebar = await readFullSidebar()
  const key = `/${dir}/`
  // 去掉节点 id，还原为 VitePress sidebar 格式
  sidebar[key] = cleanNodeIds(tree)
  await writeFullSidebar(sidebar)
  return true
}

/**
 * 移除节点中的 id 属性（递归）
 */
function cleanNodeIds(nodes) {
  return nodes.map(({ id, ...rest }) => ({
    ...rest,
    items: rest.items ? cleanNodeIds(rest.items) : undefined,
  }))
}

/**
 * 在指定父节点下新增菜单项
 */
export async function addSidebarNode(dir, parentId, newNode) {
  const tree = await parseSidebar(dir)

  if (!parentId) {
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
