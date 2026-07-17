/**
 * 构建触发 API (SSE 流式推送)
 */
import { Router } from 'express'
import { spawn, execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const router = Router()

let buildState = {
  running: false,
  lastResult: null, // { success, time, error? }
}

/**
 * 解析 VitePress 构建输出，提取结构化错误信息
 * VitePress 原始日志冗长晦涩，此函数提取关键信息并给出中文修复建议
 */
function parseBuildErrors(output) {
  const errors = []

  // 1. 死链: "Found dead link /xxx in file xxx.md"
  const deadLinkRe = /Found dead link\s+(\S+)\s+in file\s+(\S+)/g
  let m
  while ((m = deadLinkRe.exec(output)) !== null) {
    const link = m[1], file = m[2]
    const fm = file.match(/^(merchant|supplier)\/(.+)\.md$/)
    const dir = fm ? fm[1] : ''
    const docId = fm ? fm[2] : file.replace(/\.md$/, '')
    errors.push({
      type: 'dead_link',
      link,
      file,
      docId,
      dir,
      message: `文档「${file}」中包含死链 "${link}"`,
      fix: `在后台打开文档「${docId}」，找到 "${link}" 链接，修改为有效文档地址或删除该链接。`,
    })
  }

  // 2. Vue SFC 编译错误
  const vueErrRe = /\[plugin:vite:vue\]\s*([^\n]+)/g
  while ((m = vueErrRe.exec(output)) !== null) {
    const msg = m[1].trim()
    if (!errors.some(e => e.message.includes(msg))) {
      errors.push({
        type: 'vue_compiler',
        message: 'Vue 模板编译错误: ' + msg,
        fix: '某篇文档中可能有未转义的 &lt;script&gt;/&lt;template&gt;/&lt;style&gt; 标签，或 HTML 标签未闭合。请检查最近修改的文档。',
      })
    }
  }

  // 3. HTML 标签未闭合: "Element is missing end tag"
  if (/Element is missing end tag/i.test(output)) {
    errors.push({
      type: 'unclosed_tag',
      message: '某篇文档中存在未闭合的 HTML 标签（Element is missing end tag）',
      fix: '检查最近修改的文档，找到缺少闭合标签的 HTML 元素（如 <font>、<div> 等），补上对应的闭合标签。',
    })
  }

  // 4. 导入解析失败
  const importErrRe = /Rollup failed to resolve import "([^"]+)"/g
  while ((m = importErrRe.exec(output)) !== null) {
    errors.push({
      type: 'import_error',
      message: `无法解析导入 "${m[1]}"`,
      fix: '某篇文档引用了不存在的文件路径或组件，请检查文档中的 import 或引用语句。',
    })
  }

  // 5. 若以上都没匹配到，提取最后几行关键错误
  if (errors.length === 0) {
    const errorLines = output.split('\n').filter(l =>
      /error|Error|fail|Fail/.test(l) && !/vitepress v|building|rendering/.test(l)
    ).slice(-5)
    if (errorLines.length > 0) {
      errors.push({
        type: 'unknown',
        message: '构建失败，错误摘要: ' + errorLines.join('; '),
        fix: '请查看下方完整构建日志定位问题，常见原因：文档语法错误、死链、或文件损坏。',
      })
    }
  }

  return errors
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

  // 缓存全部输出用于构建失败时解析
  let allOutput = ''

  child.stdout.on('data', (chunk) => {
    const text = chunk.toString()
    allOutput += text
    const lines = text.split('\n').filter(Boolean)
    for (const line of lines) {
      send('log', { line })
    }
  })

  child.stderr.on('data', (chunk) => {
    const text = chunk.toString()
    allOutput += text
    const lines = text.split('\n').filter(Boolean)
    for (const line of lines) {
      send('log', { line, level: 'warn' })
    }
  })

  child.on('close', (code) => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    buildState.running = false

    if (code === 0) {
      // 构建成功后，如果存在 Nginx 静态目录则同步（Docker / 生产环境）
      // 本地开发环境没有 /usr/share/nginx/html，跳过同步不报错
      try {
        const distDir = path.resolve(process.cwd(), 'docs/.vitepress/dist')
        const nginxDir = '/usr/share/nginx/html'
        if (fs.existsSync(nginxDir) && fs.statSync(nginxDir).isDirectory()) {
          send('log', { line: '正在同步文件到 Nginx...' })
          execSync(`cp -r ${distDir}/* ${nginxDir}/`, { stdio: 'pipe' })
          send('log', { line: '文件同步完成' })
        } else {
          send('log', { line: '本地开发环境，无需同步 Nginx 目录', level: 'info' })
        }
      } catch (syncErr) {
        send('log', { line: `同步失败: ${syncErr.message}`, level: 'warn' })
      }

      buildState.lastResult = { success: true, time: elapsed }
      send('status', { phase: 'done', message: `构建完成，耗时 ${elapsed}s，网站已更新` })
    } else {
      buildState.lastResult = { success: false, time: elapsed, error: `退出码: ${code}` }

      // 先解析并推送结构化错误摘要
      const errors = parseBuildErrors(allOutput)
      if (errors.length > 0) {
        send('error_summary', { errors })
      }

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
