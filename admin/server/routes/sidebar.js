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

// PUT 全量更新菜单树
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
    await serializeSidebar(dir, tree)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// POST 新增节点
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
    await addSidebarNode(dir, parentId || null, node)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// PUT 修改节点
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

export default router
