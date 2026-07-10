#!/usr/bin/env node
/**
 * 简易预览服务器：用于 vitepress preview 替代方案
 * - 提供 dist 目录的静态文件
 * - 代理 /api/chat 到 DeepSeek（保护 API Key）
 *
 * 启动：node tools/preview-server.js
 * 端口：4173（或通过 PORT 环境变量）
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'docs', '.vitepress', 'dist')
const PORT = Number(process.env.PORT || 4173)
const HOST = process.env.HOST || '0.0.0.0'

// 加载 .env 中的 VITE_DEEPSEEK_API_KEY
const env = loadEnv('', ROOT, 'VITE_')
const API_KEY = env.VITE_DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || ''
if (!API_KEY) {
  console.warn('[warn] 未检测到 VITE_DEEPSEEK_API_KEY，AI 聊天代理将返回 401')
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
}

// 读取 404 页面（如果存在）
let notFoundHtml = '<h1>404 Not Found</h1>'
const notFoundPath = path.join(DIST, '404.html')
if (fs.existsSync(notFoundPath)) {
  notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8')
}

// 代理 /api/chat 到 DeepSeek
const proxyToDeepSeek = (req, res) => {
  const chunks = []
  req.on('data', (c) => chunks.push(c))
  req.on('end', async () => {
    const body = Buffer.concat(chunks).toString('utf-8')
    console.log(`[proxy] ${req.method} /api/chat (${body.length} bytes)`)

    try {
      const upstream = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: req.headers.accept || 'text/event-stream',
          Authorization: `Bearer ${API_KEY}`,
        },
        body,
      })

      res.statusCode = upstream.status
      res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Access-Control-Allow-Origin', '*')

      if (!upstream.ok) {
        const errText = await upstream.text()
        console.error(`[proxy] upstream error ${upstream.status}: ${errText.slice(0, 200)}`)
        res.end(errText)
        return
      }

      // 流式响应
      if (!upstream.body) {
        res.end()
        return
      }
      const reader = upstream.body.getReader()
      const pump = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            if (!res.write(Buffer.from(value))) {
              await new Promise((r) => res.once('drain', r))
            }
          }
          res.end()
        } catch (err) {
          console.error('[proxy] stream error:', err.message)
          res.end()
        }
      }
      pump()
    } catch (err) {
      console.error('[proxy] fetch error:', err.message)
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: { message: err.message } }))
    }
  })
  req.on('error', (err) => console.error('[proxy] req error:', err.message))
}

const serveStatic = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  let pathname = decodeURIComponent(url.pathname)
  if (pathname === '/') pathname = '/index.html'

  // 1) 直接命中文件
  let filePath = path.join(DIST, pathname)
  // 安全：防止目录穿越
  if (!filePath.startsWith(DIST)) {
    res.statusCode = 403
    res.end('Forbidden')
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    streamFile(req, res, filePath)
    return
  }

  // 2) cleanUrls 兼容：xxx → xxx.html
  if (fs.existsSync(filePath + '.html') && fs.statSync(filePath + '.html').isFile()) {
    streamFile(req, res, filePath + '.html')
    return
  }

  // 3) cleanUrls 兼容：xxx/ → xxx/index.html
  const indexPath = path.join(filePath, 'index.html')
  if (fs.existsSync(indexPath)) {
    streamFile(req, res, indexPath)
    return
  }

  // 4) 404
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(notFoundHtml)
}

const streamFile = (req, res, filePath) => {
  const ext = path.extname(filePath).toLowerCase()
  const mime = MIME[ext] || 'application/octet-stream'
  const stat = fs.statSync(filePath)
  res.statusCode = 200
  res.setHeader('Content-Type', mime)
  res.setHeader('Content-Length', stat.size)
  if (ext === '.html' || ext === '.md') {
    res.setHeader('Cache-Control', 'no-cache')
  } else {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  }
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer((req, res) => {
  // 处理 CORS 预检
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.statusCode = 204
    res.end()
    return
  }

  // 健康检查端点
  if (req.url === '/health' || req.url === '/health/') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }))
    return
  }

  if (req.url && req.url.startsWith('/api/chat')) {
    proxyToDeepSeek(req, res)
    return
  }

  serveStatic(req, res)
})

server.listen(PORT, HOST, () => {
  console.log(`[preview] 静态服务: http://localhost:${PORT}/`)
  console.log(`[preview] AI 代理:   /api/chat → DeepSeek`)
  console.log(`[preview] DIST:      ${DIST}`)
  if (API_KEY) console.log(`[preview] API Key:   ${API_KEY.slice(0, 8)}...`)
})
