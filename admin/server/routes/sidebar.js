/**
 * 侧边栏管理 API
 */
import { Router } from 'express'
import {
  parseSidebar,
  serializeSidebar,
  addSidebarNode,
  removeSidebarNode,
  updateSidebarNode,
  moveSidebarNode,
  validateSidebarLinks,
  validateSingleNode,
} from '../services/sidebarService.js'

const router = Router()

const VALID_DIRS = ['merchant', 'supplier']
const MAX_NODE_TEXT_LEN = 200
const MAX_NODE_LINK_LEN = 200
const MAX_TREE_DEPTH = 5
const MAX_TREE_SIZE_MB = 2

const validateDir = (dir) => {
  if (typeof dir !== 'string' || !VALID_DIRS.includes(dir)) {
    return { valid: false, message: `dir 必须为 ${VALID_DIRS.join(' 或 ')}` }
  }
  return { valid: true }
}

// GET 获取完整菜单树
router.get('/', async (req, res, next) => {
  try {
    const { dir = 'merchant' } = req.query
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    const tree = await parseSidebar(dir)
    res.json({ tree, dir })
  } catch (err) {
    next(err)
  }
})

// PUT 全量更新菜单树（保存前校验所有链接）
router.put('/', async (req, res, next) => {
  try {
    const { dir, tree } = req.body
    if (!dir || !tree) return res.status(400).json({ error: 'MISSING_FIELDS' })
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    // 限制树大小
    const treeJson = JSON.stringify(tree)
    if (treeJson.length > MAX_TREE_SIZE_MB * 1024 * 1024) {
      return res.status(400).json({ error: 'TREE_TOO_LARGE', message: `菜单树不能超过 ${MAX_TREE_SIZE_MB}MB` })
    }
    // 保存前校验：所有链接必须指向存在的文档
    const validation = validateSidebarLinks(dir, tree)
    if (!validation.valid) {
      return res.status(422).json({
        error: 'SIDEBAR_LINK_INVALID',
        message: `侧边栏中有 ${validation.errors.length} 个链接指向不存在的文档，构建后将无法访问（404），请修正后再保存`,
        details: validation.errors,
      })
    }
    await serializeSidebar(dir, tree)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// POST 新增节点（保存前校验链接）
router.post('/node', async (req, res, next) => {
  try {
    const { dir, parentId, node } = req.body
    if (!dir || !node || !node.text) {
      return res.status(400).json({ error: 'MISSING_FIELDS' })
    }
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (String(node.text).length > MAX_NODE_TEXT_LEN) {
      return res.status(400).json({ error: 'TEXT_TOO_LONG' })
    }
    if (node.link && String(node.link).length > MAX_NODE_LINK_LEN) {
      return res.status(400).json({ error: 'LINK_TOO_LONG' })
    }
    if (parentId && String(parentId).length > 200) {
      return res.status(400).json({ error: 'INVALID_PARENT_ID' })
    }
    // 保存前校验：链接必须指向存在的文档
    const validation = validateSingleNode(node)
    if (!validation.valid) {
      return res.status(422).json({
        error: 'SIDEBAR_LINK_INVALID',
        message: validation.errors[0].message,
        details: validation.errors,
      })
    }
    await addSidebarNode(dir, parentId || null, node)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// PUT 修改节点（保存前校验链接）
router.put('/node/:nodeId', async (req, res, next) => {
  try {
    const { dir, patch } = req.body
    if (!dir || !patch) return res.status(400).json({ error: 'MISSING_FIELDS' })
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (patch.text && String(patch.text).length > MAX_NODE_TEXT_LEN) {
      return res.status(400).json({ error: 'TEXT_TOO_LONG' })
    }
    if (patch.link && String(patch.link).length > MAX_NODE_LINK_LEN) {
      return res.status(400).json({ error: 'LINK_TOO_LONG' })
    }
    // 保存前校验：如果修改了链接，必须指向存在的文档
    if (patch.link !== undefined) {
      const validation = validateSingleNode({ text: patch.text || '', link: patch.link })
      if (!validation.valid) {
        return res.status(422).json({
          error: 'SIDEBAR_LINK_INVALID',
          message: validation.errors[0].message,
          details: validation.errors,
        })
      }
    }
    await updateSidebarNode(dir, req.params.nodeId, patch)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// DELETE 删除节点
router.delete('/node/:nodeId', async (req, res, next) => {
  try {
    const { dir } = req.body
    if (!dir) return res.status(400).json({ error: 'MISSING_FIELDS' })
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    await removeSidebarNode(dir, req.params.nodeId)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// POST 移动节点顺序（上移/下移，实时写回 sidebar.js）
router.post('/node/move', async (req, res, next) => {
  try {
    const { dir, nodeId, direction } = req.body
    if (!dir || !nodeId || !direction) return res.status(400).json({ error: 'MISSING_FIELDS' })
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (String(nodeId).length > 200) return res.status(400).json({ error: 'INVALID_NODE_ID' })
    await moveSidebarNode(dir, nodeId, direction)
    res.json({ success: true })
  } catch (err) {
    if (['INVALID_DIRECTION', 'PARENT_NOT_FOUND', 'NODE_NOT_FOUND', 'ALREADY_AT_EDGE'].includes(err.message)) {
      return res.status(400).json({ error: err.message, message: `移动失败: ${err.message}` })
    }
    next(err)
  }
})

export default router
