/**
 * RAG 聊天代理路由
 *
 * 拦截前端 /api/chat 请求 → 文档检索 → 增强 System Prompt → MiniMax API → SSE 流式返回
 * 支持双 API Key 故障切换：主 Key 失效（欠费/限流/无效）时自动切换备用 Key
 */
import express from 'express'
import searchService from '../services/searchService.js'

const router = express.Router()

const MINIMAX_MODEL = 'MiniMax-M2.5'
const MINIMAX_API_URL = 'https://api.minimaxi.com/v1/text/chatcompletion_v2'
const MAX_SEARCH_RESULTS = 5
const MAX_MESSAGES_LENGTH = 50
const MIN_TEMPERATURE = 0
const MAX_TEMPERATURE = 2
const CURRENT_PAGE_REGEX = /^\/\w+\/[a-z0-9]+$/

// 环境控制日志级别（LOG_LEVEL=debug 时输出详细日志，生产默认无日志）
const isDebug = process.env.LOG_LEVEL === 'debug'
const log = (prefix, ...args) => { if (isDebug) console.log(prefix, ...args) }
const logError = (...args) => console.error(...args)  // 错误始终记录

/**
 * 安全截断：限制字符串长度，防止注入
 */
const safeStr = (val, maxLen = 5000) => {
  if (typeof val !== 'string') return null
  return val.slice(0, maxLen)
}

router.post('/', async (req, res) => {
  const { messages, stream = true, temperature = 0.2, currentPage = null } = req.body

  // ── 输入验证 ──
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: '缺少 messages 参数' })
  }
  if (messages.length > MAX_MESSAGES_LENGTH) {
    return res.status(400).json({ error: `messages 数量不能超过 ${MAX_MESSAGES_LENGTH}` })
  }
  if (typeof temperature !== 'number' || temperature < MIN_TEMPERATURE || temperature > MAX_TEMPERATURE) {
    return res.status(400).json({ error: `temperature 必须在 ${MIN_TEMPERATURE}-${MAX_TEMPERATURE} 之间` })
  }
  if (currentPage && typeof currentPage === 'string' && currentPage.length > 200) {
    return res.status(400).json({ error: 'currentPage 格式无效' })
  }

  // 提取用户最新问题
  const userMessages = messages.filter(m => m.role === 'user')
  const lastQuery = userMessages[userMessages.length - 1]?.content || ''

  // ── 文档检索 + 加载完整内容 ──
  let contextBlock = ''
  try {
    const results = searchService.search(lastQuery, MAX_SEARCH_RESULTS)

    // 如果用户正在浏览某个具体文档页面，优先加载该文档
    const docPaths = new Set()
    if (currentPage && CURRENT_PAGE_REGEX.test(currentPage)) {
      docPaths.add(currentPage)
      log('[RAG Chat] 用户当前浏览页面:', currentPage)
    }

    // 加入检索结果中的文档路径（去重）
    for (const r of results) {
      docPaths.add(r.path)
    }

    if (docPaths.size > 0) {
      log('[RAG Chat] 共加载', docPaths.size, '篇文档作为上下文')
      contextBlock = '\n\n---\n## 🔍 参考文档完整内容\n\n'
      contextBlock += '回答用户问题时，请严格基于以下文档的完整内容，不要编造任何文档中不存在的参数、字段或示例。如果信息不足，明确告知用户。\n\n'

      let loadedCount = 0
      for (const docPath of docPaths) {
        const content = searchService.loadDocumentContent(docPath)
        if (!content) continue
        loadedCount++

        const title = content.match(/^#\s+(.+)/m)?.[1]?.trim() || docPath
        log('  -', title, `(${docPath})`)

        const truncated = content.length > 12000
          ? content.slice(0, 12000) + '\n\n...（文档内容过长，已截断）'
          : content

        contextBlock += `### [${title}](${docPath})\n\n${truncated}\n\n---\n\n`
      }

      contextBlock += '## 回答要求\n1. 严格基于上述文档内容回答，禁止编造参数或示例\n2. 回答末尾必须添加「📖 参考文档」小节，用 Markdown 链接列出引用的文档，格式如下：\n```\n📖 参考文档：\n- [文档标题](/merchant/xxx)\n- [文档标题](/supplier/xxx)\n```\n3. 如果文档中找不到答案，明确说明'
      log('[RAG Chat] 成功加载', loadedCount, '篇文档完整内容')
    } else {
      log('[RAG Chat] 未找到相关文档，使用纯 Prompt 模式')
    }
  } catch (err) {
    logError('[RAG Chat] 检索失败:', err.message)
  }

  // ── 增强 System Prompt ──
  const apiMessages = [...messages]
  const sysIdx = apiMessages.findIndex(m => m.role === 'system')
  if (sysIdx >= 0 && contextBlock) {
    apiMessages[sysIdx] = {
      role: 'system',
      content: apiMessages[sysIdx].content + contextBlock,
    }
  } else if (sysIdx < 0 && contextBlock) {
    apiMessages.unshift({ role: 'system', content: contextBlock })
  }

  // ── 代理到 MiniMax（双 Key 故障切换）──
  const apiKeys = [process.env.MINIMAX_API_KEY_1, process.env.MINIMAX_API_KEY_2].filter(Boolean)
  if (apiKeys.length === 0) {
    return res.status(500).json({ error: 'MINIMAX_API_KEY_1 / MINIMAX_API_KEY_2 环境变量未设置' })
  }

  let aiResp = null
  let lastError = ''
  for (let i = 0; i < apiKeys.length; i++) {
    try {
      const resp = await fetch(MINIMAX_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKeys[i]}`,
        },
        body: JSON.stringify({
          model: MINIMAX_MODEL,
          messages: apiMessages,
          stream,
          temperature,
        }),
      })

      // MiniMax 失败时可能返回非 200，也可能返回 HTTP 200 + JSON(base_resp.status_code != 0)
      // 统一判定：只有 200 + text/event-stream 才视为成功，否则切换下一个 Key
      if (resp.ok && (resp.headers.get('content-type') || '').includes('text/event-stream')) {
        aiResp = resp
        log(`[RAG Chat] 使用 Key#${i + 1} 成功建立连接`)
        break
      }

      const errText = await resp.text().catch(() => '')
      let detail = `HTTP ${resp.status}`
      try {
        const baseResp = JSON.parse(errText).base_resp
        if (baseResp?.status_code) detail = `${baseResp.status_code} ${baseResp.status_msg}`
      } catch { /* 保留 HTTP 状态码描述 */ }
      lastError = detail
      logError(`[RAG Chat] MiniMax Key#${i + 1} 失败: ${detail}`, errText.slice(0, 200))
    } catch (err) {
      lastError = err.message
      logError(`[RAG Chat] MiniMax Key#${i + 1} 请求异常:`, err.message)
    }
  }

  if (!aiResp) {
    if (!res.headersSent) {
      res.status(502).json({ error: `AI 服务异常 (${lastError})` })
    }
    return
  }

  // SSE 流式透传
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')

  const reader = aiResp.body?.getReader?.()
  if (!reader) {
    return res.status(500).json({ error: '无法读取 AI 响应流' })
  }

  const decoder = new TextDecoder()
  const pump = async () => {
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          res.end()
          break
        }
        const chunk = decoder.decode(value, { stream: true })
        if (!res.writableEnded) res.write(chunk)
      }
    } catch (err) {
      if (!res.writableEnded) {
        logError('[RAG Chat] SSE 流错误:', err.message)
        res.end()
      }
    }
  }
  pump()

  req.on('close', () => {
    reader.cancel().catch(() => {})
  })
})

export default router
