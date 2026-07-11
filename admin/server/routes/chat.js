/**
 * RAG 聊天代理路由
 *
 * 拦截前端 /api/chat 请求 → 文档检索 → 增强 System Prompt → DeepSeek API → SSE 流式返回
 */
import express from 'express'
import searchService from '../services/searchService.js'

const router = express.Router()

const DEEPSEEK_MODEL = 'deepseek-chat'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const MAX_SEARCH_RESULTS = 5

router.post('/', async (req, res) => {
  const { messages, stream = true, temperature = 0.2 } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: '缺少 messages 参数' })
  }

  // 提取用户最新问题
  const userMessages = messages.filter(m => m.role === 'user')
  const lastQuery = userMessages[userMessages.length - 1]?.content || ''

  // ── 文档检索 ──
  let contextBlock = ''
  try {
    const results = searchService.search(lastQuery, MAX_SEARCH_RESULTS)
    if (results.length > 0) {
      console.log(`[RAG Chat] 检索到 ${results.length} 篇相关文档:`, results.map(r => `${r.title}(${(r.score*100).toFixed(0)}%)`).join(', '))
      contextBlock = '\n\n---\n## 🔍 检索到的最相关文档（请优先引用下述路径和内容回答用户问题）:\n\n'
      for (const r of results) {
        const scorePct = (r.score * 100).toFixed(0)
        contextBlock += `- **[${r.title}](${r.path})** (相关度: ${scorePct}%)\n`
        if (r.heading) contextBlock += `  > 章节: ${r.heading}\n`
        contextBlock += `  > 内容: ${r.snippet.slice(0, 250)}\n\n`
      }
      contextBlock += '请基于以上文档内容回答用户问题，务必引用具体的文档路径。'
    } else {
      console.log(`[RAG Chat] 未找到相关文档，使用纯 Prompt 模式`)
    }
  } catch (err) {
    console.warn('[RAG Chat] 检索失败，继续无检索模式:', err.message)
  }

  // ── 增强 System Prompt ──
  const apiMessages = [...messages]
  const sysIdx = apiMessages.findIndex(m => m.role === 'system')
  if (sysIdx >= 0 && contextBlock) {
    apiMessages[sysIdx] = {
      role: 'system',
      content: apiMessages[sysIdx].content + contextBlock,
    }
  } else if (!sysIdx && contextBlock) {
    apiMessages.unshift({ role: 'system', content: contextBlock })
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'DEEPSEEK_API_KEY 环境变量未设置' })
  }

  // ── 代理到 DeepSeek ──
  try {
    const dsResp = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: apiMessages,
        stream,
        temperature,
      }),
    })

    if (!dsResp.ok) {
      const errText = await dsResp.text().catch(() => '')
      console.error(`[RAG Chat] DeepSeek API 错误 (${dsResp.status}):`, errText.slice(0, 200))
      return res.status(dsResp.status).json({
        error: `AI 服务异常 (${dsResp.status})`,
        detail: errText.slice(0, 300),
      })
    }

    // SSE 流式透传
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')

    const reader = dsResp.body?.getReader?.()
    if (!reader) {
      return res.status(500).json({ error: '无法读取 AI 响应流' })
    }

    // Node 18+ ReadableStream Web API → Node.js Readable 桥接
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
          console.error('[RAG Chat] SSE 流错误:', err.message)
          res.end()
        }
      }
    }
    pump()

    // 客户端断开时取消上游流
    req.on('close', () => {
      reader.cancel().catch(() => {})
    })
  } catch (err) {
    console.error('[RAG Chat] 请求失败:', err.message)
    if (!res.headersSent) {
      res.status(502).json({ error: 'AI 服务不可达: ' + err.message })
    }
  }
})

export default router
