/**
 * 图片上传管理 API
 */
import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.resolve(__dirname, '../../../docs/public/images')

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    await fs.mkdir(IMAGES_DIR, { recursive: true })
    cb(null, IMAGES_DIR)
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    // 清理文件名：只保留字母数字和下划线
    const name = file.originalname
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5_-]/g, '_')
      .substring(0, 50)
    const timestamp = Date.now()
    cb(null, `${name}_${timestamp}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('UNSUPPORTED_TYPE'), false)
    }
  },
})

const router = Router()

// POST 上传图片
router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'FILE_TOO_LARGE', message: '文件不能超过 5MB' })
      }
      if (err.message === 'UNSUPPORTED_TYPE') {
        return res.status(400).json({ error: 'UNSUPPORTED_TYPE', message: '仅支持 png/jpg/gif/svg/webp 格式' })
      }
      return next(err)
    }
    if (!req.file) {
      return res.status(400).json({ error: 'NO_FILE', message: '请选择文件' })
    }
    const filename = req.file.filename
    res.json({
      url: `/images/${filename}`,
      markdown: `![](/images/${filename})`,
      filename,
    })
  })
})

// GET 图片列表
router.get('/', async (req, res, next) => {
  try {
    const { page = '1', size = '20' } = req.query
    await fs.mkdir(IMAGES_DIR, { recursive: true })
    const files = await fs.readdir(IMAGES_DIR)
    const imageFiles = files.filter((f) => {
      const ext = path.extname(f).toLowerCase()
      return ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)
    })

    // 按修改时间倒序
    const items = await Promise.all(
      imageFiles.map(async (f) => {
        const stat = await fs.stat(path.join(IMAGES_DIR, f))
        return {
          filename: f,
          url: `/images/${f}`,
          size: stat.size,
          updatedAt: stat.mtime.toISOString(),
        }
      })
    )
    items.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    const total = items.length
    const p = parseInt(page, 10)
    const s = Math.min(parseInt(size, 10), 50)
    const paged = items.slice((p - 1) * s, p * s)

    res.json({ items: paged, total, page: p, size: s })
  } catch (err) {
    next(err)
  }
})

// DELETE 删除图片
router.delete('/:filename', async (req, res, next) => {
  try {
    const filePath = path.join(IMAGES_DIR, req.params.filename)
    // 安全检查：防止路径穿越
    const resolved = path.resolve(filePath)
    if (!resolved.startsWith(path.resolve(IMAGES_DIR))) {
      return res.status(400).json({ error: 'INVALID_FILENAME' })
    }
    await fs.unlink(filePath)
    res.json({ success: true })
  } catch (err) {
    if (err.code === 'ENOENT') return res.status(404).json({ error: 'FILE_NOT_FOUND' })
    next(err)
  }
})

export default router
