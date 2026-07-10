/**
 * Express 管理后台服务 - 主入口
 */
import express from 'express'
import session from 'express-session'
import createFileStore from 'session-file-store'
import crypto from 'node:crypto'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

import { authMiddleware, handleLogin, handleLogout, checkAuth } from './auth.js'
import documentsRouter from './routes/documents.js'
import sidebarRouter from './routes/sidebar.js'
import imagesRouter from './routes/images.js'
import buildRouter from './routes/build.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.ADMIN_PORT || 3001

// --- 会话持久化目录 ---
const sessionsDir = path.resolve(process.cwd(), 'data/sessions')
fs.mkdirSync(sessionsDir, { recursive: true })

const FileStore = createFileStore(session)

// --- 会话密钥 ---
const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex')

if (!process.env.SESSION_SECRET) {
  console.warn('[Admin] ⚠️  未设置 SESSION_SECRET 环境变量，使用随机密钥（重启后所有会话失效）')
  console.warn(`[Admin] 建议在 .env 中设置: SESSION_SECRET=${sessionSecret}`)
} else {
  console.log('[Admin] ✅ 使用环境变量中的 SESSION_SECRET')
}

// --- 中间件 ---
app.use(express.json({ limit: '10mb' }))
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      path: sessionsDir,
      ttl: 8 * 60 * 60, // 8小时过期
      retries: 0,
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000, // 8小时
      secure: process.env.NODE_ENV === 'production' ? false : false,
    },
  })
)

// --- 公开路由（无需认证） ---
app.post('/api/admin/login', handleLogin)
app.get('/api/admin/check', checkAuth)

// --- 认证保护的路由 ---
app.use('/api/admin/documents', authMiddleware, documentsRouter)
app.use('/api/admin/sidebar', authMiddleware, sidebarRouter)
app.use('/api/admin/images', authMiddleware, imagesRouter)
app.use('/api/admin/build', authMiddleware, buildRouter)
app.post('/api/admin/logout', authMiddleware, handleLogout)

// --- Admin SPA 静态文件 ---
const clientDist = path.resolve(__dirname, '../client')
app.use('/admin', express.static(clientDist, { extensions: ['html'] }))

// --- 错误处理 ---
app.use((err, req, res, _next) => {
  console.error('[Admin Error]', err.message)
  res.status(err.status || 500).json({
    error: err.code || 'INTERNAL_ERROR',
    message: err.message || '服务器内部错误',
  })
})

app.listen(PORT, () => {
  console.log(`[Admin] 管理后台已启动: http://0.0.0.0:${PORT}`)
})

export default app
