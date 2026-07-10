/**
 * 构建触发 API (SSE 流式推送)
 */
import { Router } from 'express'
import { spawn } from 'node:child_process'

const router = Router()

let buildState = {
  running: false,
  lastResult: null, // { success, time, error? }
}

// POST 触发构建 (SSE)
router.post('/', (req, res) => {
  if (buildState.running) {
    return res.status(409).json({ error: 'BUILD_IN_PROGRESS', message: '正在构建中，请稍后再试' })
  }

  buildState.running = true
  buildState.lastResult = null

  // SSE 头
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  })

  const send = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
  }

  send('status', { phase: 'building', message: '开始构建...' })

  const startTime = Date.now()
  const child = spawn('npx', ['vitepress', 'build', 'docs'], {
    cwd: process.cwd(),
    env: { ...process.env },
  })

  child.stdout.on('data', (chunk) => {
    const lines = chunk.toString().split('\n').filter(Boolean)
    for (const line of lines) {
      send('log', { line })
    }
  })

  child.stderr.on('data', (chunk) => {
    const lines = chunk.toString().split('\n').filter(Boolean)
    for (const line of lines) {
      send('log', { line, level: 'warn' })
    }
  })

  child.on('close', (code) => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    buildState.running = false

    if (code === 0) {
      buildState.lastResult = { success: true, time: elapsed }
      send('status', { phase: 'done', message: `构建完成，耗时 ${elapsed}s` })
    } else {
      buildState.lastResult = { success: false, time: elapsed, error: `退出码: ${code}` }
      send('error', { message: `构建失败 (退出码: ${code})`, code })
    }
    res.end()
  })

  child.on('error', (err) => {
    buildState.running = false
    buildState.lastResult = { success: false, error: err.message }
    send('error', { message: `构建进程启动失败: ${err.message}` })
    res.end()
  })

  // 客户端断开连接时终止构建
  req.on('close', () => {
    if (buildState.running && child.exitCode === null) {
      child.kill('SIGTERM')
      buildState.running = false
    }
  })
})

// GET 构建状态
router.get('/status', (_req, res) => {
  res.json(buildState)
})

export default router
