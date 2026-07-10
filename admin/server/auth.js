/**
 * 认证中间件 - 简单密码认证 + Session 管理
 * 管理员单人使用，无需复杂的 JWT/用户系统
 */
import crypto from 'node:crypto'

// 登录失败记录：{ ip: { count, lockedUntil } }
const loginAttempts = new Map()
const MAX_ATTEMPTS = 5
const LOCK_DURATION = 15 * 60 * 1000 // 15分钟

/**
 * 获取缓存的密码（从环境变量读取后缓存）
 */
let cachedPassword = null
function getAdminPassword() {
  if (!cachedPassword) {
    cachedPassword = process.env.ADMIN_PASSWORD || 'admin123'
  }
  return cachedPassword
}

/**
 * 防时序攻击的密码比较
 */
function comparePassword(input, stored) {
  const inputBuf = Buffer.from(input, 'utf-8')
  const storedBuf = Buffer.from(stored, 'utf-8')
  try {
    return crypto.timingSafeEqual(inputBuf, storedBuf)
  } catch {
    return false
  }
}

/**
 * 登录处理
 */
export function handleLogin(req, res) {
  const { password } = req.body || {}
  const ip = req.ip || req.socket.remoteAddress || 'unknown'

  // 检查是否被锁定
  const record = loginAttempts.get(ip)
  if (record && record.lockedUntil > Date.now()) {
    const remaining = Math.ceil((record.lockedUntil - Date.now()) / 60000)
    return res.status(429).json({
      error: 'TOO_MANY_ATTEMPTS',
      message: `登录失败次数过多，请 ${remaining} 分钟后重试`,
    })
  }

  // 验证密码
  if (!password || !comparePassword(password, getAdminPassword())) {
    // 记录失败
    const count = record ? record.count + 1 : 1
    if (count >= MAX_ATTEMPTS) {
      loginAttempts.set(ip, { count, lockedUntil: Date.now() + LOCK_DURATION })
    } else {
      loginAttempts.set(ip, { count, lockedUntil: 0 })
    }
    return res.status(401).json({
      error: 'INVALID_PASSWORD',
      message: '密码错误',
      remainingAttempts: MAX_ATTEMPTS - count,
    })
  }

  // 登录成功，清除失败记录
  loginAttempts.delete(ip)

  // 设置 Session
  req.session.isAdmin = true
  req.session.loginAt = new Date().toISOString()

  return res.json({ success: true, message: '登录成功' })
}

/**
 * 登出处理
 */
export function handleLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'LOGOUT_FAILED' })
    }
    res.clearCookie('connect.sid')
    return res.json({ success: true })
  })
}

/**
 * 认证中间件 - 检查 Session 中是否有 isAdmin
 */
export function authMiddleware(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next()
  }
  // API 请求返回 401，页面请求返回登录页（后续由前端路由处理）
  if (req.path.startsWith('/api/')) {
    return res.status(401).json({ error: 'UNAUTHORIZED', message: '请先登录' })
  }
  return res.status(401).json({ error: 'UNAUTHORIZED' })
}

/**
 * 健康检查
 */
export function checkAuth(req, res) {
  if (req.session && req.session.isAdmin) {
    return res.json({ authenticated: true })
  }
  return res.status(401).json({ authenticated: false })
}
