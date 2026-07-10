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

// GET 获取完整菜单树
router.get('/', async (req, res, next) => {
  try {
    const { dir = 'merchant' } = req.query
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
    await removeSidebarNode(dir, req.params.nodeId)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

export default router
