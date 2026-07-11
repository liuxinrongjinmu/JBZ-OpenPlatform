<script setup lang="ts">
/**
 * AIChat - 聚宝赞开放平台智能问答助手
 * 支持文档索引注入、流式对话、预设问题、XSS 防护
 */
import { ref, nextTick, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

// ──────────────────────────── 类型定义 ────────────────────────────

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface DocEntry {
  title: string
  path: string
  category: string
}

// ──────────────────────────── 常量 ────────────────────────────

const MAX_CONTEXT_ROUNDS = 10

const PRESET_QUESTIONS = [
  { label: '如何获取 access_token？', question: '如何获取 access_token？请给出具体的接口地址和参数说明。' },
  { label: '商品上架接口参数', question: '商品上架接口有哪些参数？' },
  { label: '订单发货怎么调用', question: '订单发货接口怎么调用？需要传哪些参数？' },
  { label: '创建会员接口说明', question: '如何创建会员？接口地址和参数是什么？' },
  { label: '查询订单列表', question: '如何查询订单列表？请给出接口说明。' },
]

// 备用 System Prompt（文档索引未加载时使用）
const FALLBACK_SYSTEM_PROMPT = `你是"聚宝赞开放平台"的AI技术助手，精通本平台的全部API接口。

## 平台概述
聚宝赞开放平台为商家版和供应商版提供以下API能力：
- **商家版**：第三方ERP接入、会员管理、商品管理、订单管理、门店管理、消息推送、数据统计
- **供应商版**：商品同步、订单同步、售后发货、消息订阅

## 接口调用规范
- 请求地址：https://api.c3tech.cn/oauthentry/...
- 认证方式：基于OAuth 2.0的access_token
- 请求方式：GET/POST
- 响应格式：JSON

回答时请：
1. 优先使用中文，回答简洁准确
2. 给出具体的接口名称、参数说明
3. 如有不确定，明确告知`

// ──────────────────────────── 响应式状态 ────────────────────────────

const isOpen = ref(false)
const input = ref('')
const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '你好！我是聚宝赞开放平台AI助手，可以帮你解答商家版和供应商版的API问题。',
  },
])
const isLoading = ref(false)
const messagesEl = ref<HTMLElement | null>(null)
const docIndex = ref<DocEntry[]>([])
const abortController = ref<AbortController | null>(null)

// ──────────────────────────── 文档索引加载 ────────────────────────────

onMounted(async () => {
  try {
    const resp = await fetch('/doc-index.json')
    if (resp.ok) {
      docIndex.value = await resp.json()
      console.log(`[AIChat] 文档索引已加载: ${docIndex.value.length} 篇`)

      // 🔧 链接验证：更新 markdown-it 渲染器，标注文档链接有效性
      setupLinkValidation()
    }
  } catch (err) {
    console.warn('[AIChat] 文档索引加载失败，使用备用提示词:', err)
  }
})

// ──────────────────────────── 链接验证 ────────────────────────────

/** 替换 markdown-it 链接渲染器，增加文档路径有效性检查和 CSS 标注 */
const setupLinkValidation = () => {
  const originalRule = md.renderer.rules.link_open
  if (!originalRule) return

  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]
    const href = token.attrGet('href')
    if (href && (href.startsWith('/merchant/') || href.startsWith('/supplier/'))) {
      const exists = docIndex.value.some((d) => d.path === href)
      const existingClass = token.attrGet('class') || ''
      token.attrSet('class', (existingClass + ' ' + (exists ? 'doc-link-verified' : 'doc-link-unverified')).trim())
    }
    return originalRule(tokens, idx, options, _env, self)
  }
}

// ──────────────────────────── 当前页面上下文 ────────────────────────────

/** 根据当前 URL 路径获取对应文档摘要 */
const getCurrentPageDoc = (): DocEntry | null => {
  const pathname = window.location.pathname
  // 匹配路径如 /merchant/xxx 或 /supplier/xxx（排除 index）
  const match = pathname.match(/^\/(merchant|supplier)\/([a-z0-9]+)/)
  if (!match) return null
  const fullPath = `/${match[1]}/${match[2]}`
  return docIndex.value.find((d) => d.path === fullPath) || null
}

// ──────────────────────────── System Prompt 构建 ────────────────────────────

const buildSystemPrompt = (): string => {
  const merchantDocs = docIndex.value.filter((d) => d.category === '商家版')
  const supplierDocs = docIndex.value.filter((d) => d.category === '供应商版')

  const formatList = (docs: DocEntry[]) =>
    docs.map((d) => `${d.title} → ${d.path}`).join('\n')

  let prompt = docIndex.value.length === 0 ? FALLBACK_SYSTEM_PROMPT : `你是"聚宝赞开放平台"的AI技术助手，精通本平台的全部API接口。

## 平台概述
聚宝赞开放平台为商家版（${merchantDocs.length}篇文档）和供应商版（${supplierDocs.length}篇文档）提供完整的API接入能力，涵盖商品管理、订单管理、会员管理、门店管理、消息推送、积分营销等场景。

## 接口调用规范
- 请求地址：https://api.c3tech.cn/oauthentry/...
- 认证方式：基于OAuth 2.0的access_token
- 请求方式：GET/POST
- 响应格式：JSON

## 可用文档索引
回答用户问题时，请引用下述文档路径作为答案来源。格式：文档标题 → 可点击路径。

### 商家版文档
${formatList(merchantDocs)}

### 供应商版文档
${formatList(supplierDocs)}`

  prompt += `\n\n## 回答要求
1. 优先引用上述文档索引中的文档路径，如 /merchant/xxx 或 /supplier/xxx
2. 给出具体的接口名称、参数说明、调用示例
3. 回答简洁准确，优先使用中文
4. 如有不确定的内容，明确告知用户并建议查阅具体文档`

  return prompt
}

// ──────────────────────────── 工具函数 ────────────────────────────

const scrollToBottom = async () => {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

// ──────────────────────────── 核心：发送消息 ────────────────────────────

const sendMessage = async (presetText?: string) => {
  const text = (presetText || input.value).trim()
  if (!text || isLoading.value) return

  input.value = ''
  isLoading.value = true

  // 🔧 修复：先捕获当前历史（不含欢迎语），再 push 新消息
  const contextHistory = messages.value
    .filter((m) => {
      // 跳过欢迎消息，避免作为上下文发送
      if (m.role === 'assistant' && m.content.startsWith('你好！') && m === messages.value[0]) {
        return false
      }
      return true
    })
    .slice(-MAX_CONTEXT_ROUNDS * 2)

  // 添加用户消息到界面
  messages.value.push({ role: 'user', content: text })

  // 添加助手占位消息
  const assistantMsg: Message = { role: 'assistant', content: '' }
  messages.value.push(assistantMsg)
  scrollToBottom()

  // 创建中止控制器
  const controller = new AbortController()
  abortController.value = controller

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          ...contextHistory.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: text },
        ],
        stream: true,
        // 🔧 降低 temperature 从 0.7 到 0.2，减少幻觉和编造
        temperature: 0.2,
        // 🔧 页面上下文感知：告诉后端用户正在看哪个文档页面
        currentPage: getCurrentPageDoc()?.path || null,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('AI服务认证失败，请联系管理员检查 API Key 配置')
      }
      throw new Error(`请求失败 (${response.status})，请稍后重试`)
    }

    // 解析 SSE 流式响应
    const reader = response.body?.getReader()
    if (!reader) throw new Error('无法获取响应流')

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data:')) continue
        const data = trimmed.slice(5).trim()
        if (data === '[DONE]') continue

        try {
          const json = JSON.parse(data)
          const delta = json.choices?.[0]?.delta?.content
          if (delta) {
            assistantMsg.content += delta
            scrollToBottom()
          }
        } catch {
          // 忽略解析失败的行
        }
      }
    }
  } catch (err: any) {
    if (err.name === 'AbortError') {
      assistantMsg.content += '\n\n_已停止生成。_'
    } else {
      assistantMsg.content = `出错了：${err.message || '网络请求失败'}\n\n请检查网络或联系管理员。`
      console.error('[AIChat] 请求失败:', err)
    }
  } finally {
    isLoading.value = false
    abortController.value = null
    scrollToBottom()
  }
}

// ──────────────────────────── 停止生成 ────────────────────────────

const stopGeneration = () => {
  if (abortController.value) {
    abortController.value.abort()
  }
}

// ──────────────────────────── 键盘事件 ────────────────────────────

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

// ──────────────────────────── 清空对话 ────────────────────────────

const clearHistory = () => {
  messages.value = [
    {
      role: 'assistant',
      content: '对话已清空。有什么想了解的API问题吗？',
    },
  ]
}
</script>

<template>
  <div class="ai-chat-widget">
    <!-- 浮动按钮 -->
    <button
      v-if="!isOpen"
      class="ai-chat-trigger"
      title="AI智能问答"
      aria-label="打开AI智能问答"
      @click="isOpen = true"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path
          d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 14 22v-1c0-.74.4-1.39 1-1.73V18h-1.5a1.5 1.5 0 0 1-1.5-1.5V14a3 3 0 0 0-3-3H7v-.27A7 7 0 0 1 14 4h1V3.73A2 2 0 0 0 14 2a2 2 0 0 1-2 0zM7.5 13A1.5 1.5 0 0 0 6 14.5V18a1.5 1.5 0 0 0 1.5 1.5H9V13H7.5zM4 12a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v-5H4zm16 0v5h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-1z"
        />
      </svg>
      <span class="ai-chat-pulse"></span>
    </button>

    <!-- 对话框 -->
    <div v-else class="ai-chat-panel" role="dialog" aria-label="AI智能问答">
      <header class="ai-chat-header">
        <div class="ai-chat-title">
          <span class="ai-chat-avatar">AI</span>
          <div>
            <div class="ai-chat-name">聚宝赞AI助手</div>
            <div class="ai-chat-status">
              <span class="ai-chat-dot"></span>
              {{ isLoading ? '正在思考...' : '在线' }}
            </div>
          </div>
        </div>
        <div class="ai-chat-actions">
          <button class="ai-chat-icon-btn" title="清空对话" aria-label="清空对话" @click="clearHistory">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
          </button>
          <button class="ai-chat-icon-btn" title="关闭" aria-label="关闭对话框" @click="isOpen = false">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>
      </header>

      <!-- 预设快捷问题 -->
      <div class="ai-chat-presets">
        <button
          v-for="q in PRESET_QUESTIONS"
          :key="q.label"
          class="ai-chat-preset-btn"
          :disabled="isLoading"
          @click="sendMessage(q.question)"
        >
          {{ q.label }}
        </button>
      </div>

      <div ref="messagesEl" class="ai-chat-messages">
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="['ai-chat-msg', `ai-chat-msg-${msg.role}`]"
        >
          <div class="ai-chat-bubble" v-html="formatMsg(msg.content)"></div>
        </div>
        <div v-if="isLoading && !messages[messages.length - 1].content" class="ai-chat-msg ai-chat-msg-assistant">
          <div class="ai-chat-bubble ai-chat-typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <footer class="ai-chat-footer">
        <textarea
          v-model="input"
          class="ai-chat-input"
          placeholder="输入问题，按 Enter 发送，Shift+Enter 换行"
          rows="2"
          :disabled="isLoading"
          @keydown="handleKeydown"
        ></textarea>
        <button
          v-if="!isLoading"
          class="ai-chat-send"
          :disabled="!input.trim()"
          @click="sendMessage()"
        >
          发送
        </button>
        <button v-else class="ai-chat-stop" @click="stopGeneration">
          停止
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
// ──────────────────── Markdown 渲染（含 XSS 防护）────────────────────

import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true,
})

// 🔧 XSS 防护：自定义链接渲染规则，仅放行安全协议和平台内部路径
md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
  const token = tokens[idx]
  const href = token.attrGet('href')
  if (href) {
    if (
      href.startsWith('https://') ||
      href.startsWith('http://') ||
      href.startsWith('/merchant/') ||
      href.startsWith('/supplier/') ||
      href.startsWith('#') ||
      href.startsWith('mailto:')
    ) {
      // 外部链接新标签页打开
      if (href.startsWith('http')) {
        token.attrSet('target', '_blank')
        token.attrSet('rel', 'noopener noreferrer')
      }
    } else {
      // 移除危险协议（javascript: / data: 等）
      token.attrSet('href', '#')
    }
  }
  return self.renderToken(tokens, idx, options)
}

// 渲染函数：将 Markdown 文本转为安全 HTML
const formatMsg = (content: string) => {
  return md.render(content || '')
}

export default { name: 'AIChat' }
</script>

<style scoped>
.ai-chat-widget {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
  font-family: var(--vp-font-family-base);
}

/* ── 浮动按钮 ── */
.ai-chat-trigger {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f8cff 0%, #2667ff 100%);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(38, 103, 255, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}
.ai-chat-trigger:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(38, 103, 255, 0.45);
}
.ai-chat-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #4f8cff;
  animation: ai-pulse 2s ease-out infinite;
  z-index: -1;
}
@keyframes ai-pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.6); opacity: 0; }
}

/* ── 对话框容器 ── */
.ai-chat-panel {
  width: 400px;
  height: 620px;
  max-height: calc(100vh - 48px);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

/* ── 头部 ── */
.ai-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #4f8cff 0%, #2667ff 100%);
  color: #fff;
  flex-shrink: 0;
}
.ai-chat-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ai-chat-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}
.ai-chat-name {
  font-size: 14px;
  font-weight: 600;
}
.ai-chat-status {
  font-size: 11px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
}
.ai-chat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 4px #4ade80;
}
.ai-chat-actions {
  display: flex;
  gap: 4px;
}
.ai-chat-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s, background 0.2s;
}
.ai-chat-icon-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.15);
}

/* ── 预设快捷问题 ── */
.ai-chat-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
}
.ai-chat-preset-btn {
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s, background 0.2s;
  line-height: 1.4;
}
.ai-chat-preset-btn:hover:not(:disabled) {
  border-color: #4f8cff;
  background: rgba(79, 140, 255, 0.06);
}
.ai-chat-preset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── 消息区 ── */
.ai-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ai-chat-msg {
  display: flex;
  width: 100%;
}
.ai-chat-msg-user { justify-content: flex-end; }
.ai-chat-msg-assistant { justify-content: flex-start; }
.ai-chat-bubble {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.6;
  word-wrap: break-word;
}
.ai-chat-msg-user .ai-chat-bubble {
  background: #2667ff;
  color: #fff;
  border-bottom-right-radius: 2px;
}
.ai-chat-msg-assistant .ai-chat-bubble {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-bottom-left-radius: 2px;
}
.ai-chat-bubble :deep(code) {
  background: rgba(127, 127, 127, 0.2);
  padding: 1px 5px;
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
}
.ai-chat-bubble :deep(pre) {
  background: rgba(0, 0, 0, 0.06);
  padding: 8px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 6px 0;
}
.ai-chat-bubble :deep(pre code) {
  background: transparent;
  padding: 0;
}
.ai-chat-bubble :deep(strong) {
  font-weight: 600;
}
.ai-chat-bubble :deep(h1),
.ai-chat-bubble :deep(h2),
.ai-chat-bubble :deep(h3),
.ai-chat-bubble :deep(h4) {
  font-weight: 600;
  margin: 8px 0 4px;
  line-height: 1.3;
}
.ai-chat-bubble :deep(h1) { font-size: 16px; }
.ai-chat-bubble :deep(h2) { font-size: 15px; }
.ai-chat-bubble :deep(h3) { font-size: 14px; }
.ai-chat-bubble :deep(h4) { font-size: 13px; }
.ai-chat-bubble :deep(ul),
.ai-chat-bubble :deep(ol) {
  padding-left: 20px;
  margin: 4px 0;
}
.ai-chat-bubble :deep(li) {
  margin: 2px 0;
}
.ai-chat-bubble :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 6px 0;
  font-size: 12px;
}
.ai-chat-bubble :deep(th),
.ai-chat-bubble :deep(td) {
  border: 1px solid var(--vp-c-divider);
  padding: 4px 8px;
  text-align: left;
}
.ai-chat-bubble :deep(th) {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}
.ai-chat-bubble :deep(a) {
  color: #4f8cff;
  text-decoration: none;
}
.ai-chat-bubble :deep(a:hover) {
  text-decoration: underline;
}

/* 文档链接验证状态 */
.ai-chat-bubble :deep(a.doc-link-verified) {
  color: #22c55e;
}
.ai-chat-bubble :deep(a.doc-link-verified::after) {
  content: ' ✓';
  font-size: 10px;
  opacity: 0.7;
}
.ai-chat-bubble :deep(a.doc-link-unverified) {
  color: #f59e0b;
  text-decoration: line-through;
}
.ai-chat-bubble :deep(a.doc-link-unverified::after) {
  content: ' ⚠';
  font-size: 10px;
}
.ai-chat-bubble :deep(blockquote) {
  border-left: 3px solid var(--vp-c-divider);
  padding-left: 10px;
  margin: 6px 0;
  opacity: 0.85;
}
.ai-chat-bubble :deep(p) {
  margin: 4px 0;
}
.ai-chat-bubble :deep(hr) {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 8px 0;
}

/* ── 打字指示器 ── */
.ai-chat-typing {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 12px 14px;
}
.ai-chat-typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: ai-typing 1.4s ease-in-out infinite;
}
.ai-chat-typing span:nth-child(2) { animation-delay: 0.2s; }
.ai-chat-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes ai-typing {
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-4px); }
}

/* ── 输入区 ── */
.ai-chat-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px;
  display: flex;
  gap: 8px;
  align-items: flex-end;
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
}
.ai-chat-input {
  flex: 1;
  resize: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  font-family: inherit;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  max-height: 100px;
  line-height: 1.5;
}
.ai-chat-input:focus {
  border-color: #4f8cff;
}
.ai-chat-send {
  background: #2667ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  height: 36px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.ai-chat-send:hover:not(:disabled) {
  background: #1e54d6;
}
.ai-chat-send:disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
}
.ai-chat-stop {
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  height: 36px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.ai-chat-stop:hover {
  background: #dc2626;
}

/* ── 滚动条 ── */
.ai-chat-messages::-webkit-scrollbar { width: 6px; }
.ai-chat-messages::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 3px; }
.ai-chat-messages::-webkit-scrollbar-track { background: transparent; }

/* ── 移动端 ── */
@media (max-width: 480px) {
  .ai-chat-widget { right: 12px; bottom: 12px; }
  .ai-chat-panel {
    width: calc(100vw - 24px);
    height: calc(100vh - 100px);
  }
  .ai-chat-presets {
    gap: 4px;
    padding: 8px 10px;
  }
  .ai-chat-preset-btn {
    font-size: 11px;
    padding: 4px 8px;
  }
}
</style>
