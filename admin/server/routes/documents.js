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
} from '../services/fileService.js'
import { execSync } from 'node:child_process'

const router = Router()

// GET 文档列表 (分页+搜索)
router.get('/', async (req, res, next) => {
  try {
    const { dir = 'merchant', search, page = '1', size = '20' } = req.query
    const result = await listDocuments(dir, {
      search,
      page: parseInt(page, 10),
      size: Math.min(parseInt(size, 10), 100),
    })
    res.json(result)
  } catch (err) {
    next(err)
  }
})

// GET 文档详情
router.get('/:id', async (req, res, next) => {
  try {
    const { dir = 'merchant' } = req.query
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
    const result = await createDocument(dir, title, content)
    // Git 提交
    gitCommit(`docs: add ${title} (${dir})`)
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
    const result = await updateDocument(dir, req.params.id, title, content)
    gitCommit(`docs: update ${title} (${dir})`)
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
    await deleteDocument(dir, req.params.id)
    gitCommit(`docs: delete ${req.params.id} (${dir})`)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// GET 文档修改历史 (git log)
router.get('/:id/history', async (req, res, next) => {
  try {
    const { dir = 'merchant' } = req.query
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

/**
 * git add + commit（静默，失败不影响主流程）
 */
function gitCommit(message) {
  try {
    execSync('git add -A docs/', { cwd: process.cwd(), stdio: 'ignore' })
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, {
      cwd: process.cwd(),
      stdio: 'ignore',
    })
  } catch {
    // 静默失败：可能是无变更或非 git 环境
  }
}

export default router
