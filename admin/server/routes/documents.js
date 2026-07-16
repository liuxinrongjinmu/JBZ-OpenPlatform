/**
 * 文档 CRUD API
 */
import { Router } from 'express'
import {
  listDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  validateContent,
} from '../services/fileService.js'
import { execSync } from 'node:child_process'

const router = Router()

const VALID_DIRS = ['merchant', 'supplier']
const ID_PATTERN = /^[a-zA-Z0-9_-]+$/
const MAX_SEARCH_LEN = 100
const MAX_TITLE_LEN = 200
const MAX_CONTENT_LEN = 500000  // 500KB 上限
const MAX_PAGE = 1000
const MAX_SIZE = 100

/** 验证 dir 参数 */
const validateDir = (dir) => {
  if (typeof dir !== 'string' || !VALID_DIRS.includes(dir)) {
    return { valid: false, message: `dir 必须为 ${VALID_DIRS.join(' 或 ')}` }
  }
  return { valid: true }
}

// GET 文档列表 (分页+搜索)
router.get('/', async (req, res, next) => {
  try {
    const { dir = 'merchant', search, page = '1', size = '20' } = req.query
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (search && String(search).length > MAX_SEARCH_LEN) {
      return res.status(400).json({ error: 'SEARCH_TOO_LONG', message: `搜索关键词不能超过 ${MAX_SEARCH_LEN} 个字符` })
    }
    const p = parseInt(page, 10)
    const s = Math.min(parseInt(size, 10), MAX_SIZE)
    if (isNaN(p) || p < 1 || p > MAX_PAGE) {
      return res.status(400).json({ error: 'INVALID_PAGE', message: `page 必须在 1-${MAX_PAGE} 之间` })
    }
    const result = await listDocuments(dir, { search: search ? String(search) : undefined, page: p, size: s })
    res.json(result)
  } catch (err) {
    next(err)
  }
})

// GET 文档详情
router.get('/:id', async (req, res, next) => {
  try {
    const { dir = 'merchant' } = req.query
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (!ID_PATTERN.test(req.params.id)) {
      return res.status(400).json({ error: 'INVALID_ID', message: '文档ID格式不正确' })
    }
    const doc = await getDocument(dir, req.params.id)
    if (!doc) return res.status(404).json({ error: 'DOC_NOT_FOUND' })
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

// POST 新建文档
router.post('/', async (req, res, next) => {
  try {
    const { dir, title, content = '' } = req.body
    if (!dir || !title) {
      return res.status(400).json({ error: 'MISSING_FIELDS', message: 'dir 和 title 为必填' })
    }
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (String(title).length > MAX_TITLE_LEN) {
      return res.status(400).json({ error: 'TITLE_TOO_LONG', message: `标题不能超过 ${MAX_TITLE_LEN} 个字符` })
    }
    if (String(content).length > MAX_CONTENT_LEN) {
      return res.status(400).json({ error: 'CONTENT_TOO_LONG', message: `内容不能超过 ${MAX_CONTENT_LEN / 1000}KB` })
    }
    // 保存前校验：确保内容能通过 VitePress 构建
    const validation = validateContent(String(content))
    if (!validation.valid) {
      return res.status(422).json({
        error: 'CONTENT_VALIDATION_FAILED',
        message: '文档内容存在语法问题，无法通过 VitePress 构建，请先修正后再保存',
        details: validation.errors,
      })
    }
    const result = await createDocument(dir, String(title), String(content))
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

// PUT 更新文档
router.put('/:id', async (req, res, next) => {
  try {
    const { dir, title, content } = req.body
    if (!dir || !title) {
      return res.status(400).json({ error: 'MISSING_FIELDS' })
    }
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (!ID_PATTERN.test(req.params.id)) {
      return res.status(400).json({ error: 'INVALID_ID', message: '文档ID格式不正确' })
    }
    if (String(title).length > MAX_TITLE_LEN) {
      return res.status(400).json({ error: 'TITLE_TOO_LONG' })
    }
    if (typeof content === 'string' && content.length > MAX_CONTENT_LEN) {
      return res.status(400).json({ error: 'CONTENT_TOO_LONG' })
    }
    // 保存前校验：确保内容能通过 VitePress 构建
    const validation = validateContent(String(content))
    if (!validation.valid) {
      return res.status(422).json({
        error: 'CONTENT_VALIDATION_FAILED',
        message: '文档内容存在语法问题，无法通过 VitePress 构建，请先修正后再保存',
        details: validation.errors,
      })
    }
    const result = await updateDocument(dir, req.params.id, String(title), content)
    res.json(result)
  } catch (err) {
    if (err.message === 'DOC_NOT_FOUND') return res.status(404).json({ error: 'DOC_NOT_FOUND' })
    next(err)
  }
})

// DELETE 删除文档
router.delete('/:id', async (req, res, next) => {
  try {
    const { dir } = req.body
    if (!dir) return res.status(400).json({ error: 'MISSING_FIELDS', message: 'dir 为必填' })
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (!ID_PATTERN.test(req.params.id)) {
      return res.status(400).json({ error: 'INVALID_ID', message: '文档ID格式不正确' })
    }
    await deleteDocument(dir, req.params.id)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// GET 文档修改历史 (git log)
router.get('/:id/history', async (req, res, next) => {
  try {
    const { dir = 'merchant' } = req.query
    const dirCheck = validateDir(dir)
    if (!dirCheck.valid) return res.status(400).json({ error: 'INVALID_DIR', message: dirCheck.message })
    if (!ID_PATTERN.test(req.params.id)) {
      return res.status(400).json({ error: 'INVALID_ID', message: '文档ID格式不正确' })
    }
    const filePath = `docs/${dir}/${req.params.id}.md`
    const output = execSync(
      `git log --oneline -20 -- "${filePath}"`,
      { cwd: process.cwd(), encoding: 'utf-8' }
    ).trim()
    const commits = output
      ? output.split('\n').map((line) => {
          const [hash, ...rest] = line.split(' ')
          return { hash, message: rest.join(' ') }
        })
      : []
    res.json({ commits })
  } catch {
    res.json({ commits: [] })
  }
})
export default router
