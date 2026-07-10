/**
 * 侧边栏标准化脚本
 * 规则：
 * 1. 有 items 的父节点：移除 link，必须有 collapsed (默认 false)
 * 2. 无 items 的叶子节点：必须有 link
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sidebarPath = path.resolve(__dirname, '../docs/.vitepress/sidebar.js')

async function readSidebar() {
  const raw = await fs.readFile(sidebarPath, 'utf-8')
  const match = raw.match(/export\s+default\s+({[\s\S]*})/m)
  if (!match) throw new Error('无法解析 sidebar.js')
  const evalFn = new Function(`return ${match[1]}`)
  return evalFn()
}

function formatObject(obj, indent = 0) {
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

function standardizeNode(node) {
  const hasItems = Array.isArray(node.items) && node.items.length > 0

  if (hasItems) {
    // 父节点：必须可折叠，不能跳转；统一属性顺序 text -> collapsed -> items
    const result = {
      text: node.text,
      collapsed: typeof node.collapsed === 'boolean' ? node.collapsed : false,
      items: node.items.map(standardizeNode)
    }
    return result
  }

  // 叶子节点：只保留 text 和 link
  const result = { text: node.text }
  if (node.link) result.link = node.link
  return result
}

async function main() {
  const sidebar = await readSidebar()
  let modified = false

  for (const [key, nodes] of Object.entries(sidebar)) {
    if (Array.isArray(nodes)) {
      const before = JSON.stringify(nodes)
      sidebar[key] = nodes.map(standardizeNode)
      const after = JSON.stringify(sidebar[key])
      if (before !== after) {
        console.log(`[FIXED] ${key}: 已标准化菜单结构`)
        modified = true
      } else {
        console.log(`[OK] ${key}: 无需修改`)
      }
    }
  }

  if (modified) {
    const content = 'export default ' + formatObject(sidebar, 0) + '\n'
    await fs.writeFile(sidebarPath, content, 'utf-8')
    console.log('\n✅ sidebar.js 已更新')
  } else {
    console.log('\n✅ sidebar.js 已经是标准格式')
  }
}

main().catch(err => {
  console.error('❌ 标准化失败:', err.message)
  process.exit(1)
})
