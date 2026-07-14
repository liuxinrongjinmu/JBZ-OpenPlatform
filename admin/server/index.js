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
import chatRouter from './routes/chat.js'
import searchService from './services/searchService.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.ADMIN_PORT || 3001

// --- 构建全文检索索引 ---
const docsDir = path.resolve(process.cwd(), 'docs')
console.log(`[Admin] 构建文档索引: ${docsDir}`)
try {
  searchService.buildIndex(docsDir)
  console.log(`[Admin] 索引构建完成:`, searchService.stats())
} catch (err) {
  console.error('[Admin] 索引构建失败:', err.message)
}

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

// --- 信任反向代理（HTTPS 反向代理 → HTTP 容器） ---
// 读取 X-Forwarded-Proto 判断真实请求协议，以正确设置 secure cookie
app.set('trust proxy', 1)

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
      sameSite: 'lax',       // lax 兼容性更好，允许从同站导航携带 cookie
      maxAge: 8 * 60 * 60 * 1000, // 8小时
      secure: 'auto',        // 自动：HTTPS 请求设 true，HTTP 请求设 false
    },
  })
)

// --- 公开路由（无需认证） ---
app.post('/api/admin/login', handleLogin)
app.get('/api/admin/check', checkAuth)

// RAG 聊天代理（公开，无需认证）
app.use('/api/chat', chatRouter)

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
