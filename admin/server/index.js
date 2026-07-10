/**
 * Express 管理后台服务 - 主入口
 */
import express from 'express'
import session from 'express-session'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { authMiddleware, handleLogin, handleLogout, checkAuth } from './auth.js'
import documentsRouter from './routes/documents.js'
import sidebarRouter from './routes/sidebar.js'
import imagesRouter from './routes/images.js'
import buildRouter from './routes/build.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.ADMIN_PORT || 3001

// --- 中间件 ---
app.use(express.json({ limit: '10mb' }))
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'jbz-admin-secret-' + Date.now(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000, // 8小时
      secure: process.env.NODE_ENV === 'production' ? false : false, // Docker 内不强制 HTTPS
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

// --- Admin SPA 静态文件（开发模式由 Vite 单独处理，生产模式提供文件） ---
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
