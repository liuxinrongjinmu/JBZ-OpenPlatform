<script setup lang="ts">
/**
 * AIChat - 聚宝赞开放平台智能问答助手
 * 浮动AI机器人图标 + 弹出对话框，支持DeepSeek流式对话
 */
import { ref, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// 最大保留的对话轮数（用户+助手算1轮），超出时截断旧消息以控制 token 用量
const MAX_CONTEXT_ROUNDS = 10

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

// 系统提示词：定义AI角色和文档上下文
const SYSTEM_PROMPT = `你是"聚宝赞开放平台"的AI技术助手，精通本平台的全部API接口。

## 平台概述
聚宝赞开放平台为商家版和供应商版提供以下能力：
- **开放平台商家版（160篇文档）**：第三方ERP接入、会员管理、商品管理、订单管理、门店管理、消息推送、数据统计
- **供应商开放平台（56篇文档）**：商品同步、订单同步、售后发货、消息订阅

## 核心接口类别

### 商家版
- 接入指南：ERP对接、APP对接、H5直播间嵌入
- 通用接口：店铺信息、省市区、商品类目、订单类型、支付渠道
- 会员信息：会员查询、会员等级、会员手机号
- 商品接口：商品CRUD、SKU管理、商品上下架
- 订单接口：订单查询、发货、退款、售后、核销
- 营销接口：优惠券、积分、第三方会员同步
- 门店管理：门店CRUD、店员、片区、客户归属
- 积分管理：积分查询、积分充值、积分扣减
- 消息推送：订阅消息、订单消息、会员消息

### 供应商版
- 接入须知、商品同步、订单同步、售后发货
- 接口列表、消息订阅、消息事件参数

## 接口调用规范
- 请求地址：https://api.c3tech.cn/oauthentry/...
- 认证方式：基于OAuth 2.0的access_token
- 请求方式：GET/POST
- 响应格式：JSON

回答时请：
1. 优先使用中文
2. 结合上述平台知识回答
3. 给出具体的接口名称、参数说明、调用示例
4. 如有不确定，明确告知`

const scrollToBottom = async () => {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

const sendMessage = async () => {
  const text = input.value.trim()
  if (!text || isLoading.value) return

  // 添加用户消息
  messages.value.push({ role: 'user', content: text })
  input.value = ''
  isLoading.value = true
  scrollToBottom()

  // 添加助手占位消息
  const assistantMsg: Message = { role: 'assistant', content: '' }
  messages.value.push(assistantMsg)
  scrollToBottom()

  try {
    // 调用后端代理接口（生产环境走nginx，开发环境走vite proxy）
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          // 截取最近 MAX_CONTEXT_ROUNDS 轮对话，避免 token 超限
          ...messages.value
            .slice(0, -1)
            .filter((m) => m.role !== 'system')
            .slice(-MAX_CONTEXT_ROUNDS * 2)
            .map((m) => ({ role: m.role, content: m.content })),
        ],
        stream: true,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    // 解析SSE流式响应
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
    assistantMsg.content = `❌ 出错了：${err.message || '网络请求失败'}\n\n请检查网络或联系管理员。`
    console.error('[AIChat] 请求失败:', err)
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

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
          <button
            class="ai-chat-icon-btn"
            title="清空对话"
            aria-label="清空对话"
            @click="clearHistory"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
          <button
            class="ai-chat-icon-btn"
            title="关闭"
            aria-label="关闭对话框"
            @click="isOpen = false"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>
      </header>

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
          class="ai-chat-send"
          :disabled="!input.trim() || isLoading"
          @click="sendMessage"
        >
          发送
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
// 使用 markdown-it 进行完整 Markdown 渲染（标题/列表/表格/代码块/链接/加粗等）
const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true,
})

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

/* 浮动按钮 */
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

/* 对话框 */
.ai-chat-panel {
  width: 380px;
  height: 560px;
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

.ai-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #4f8cff 0%, #2667ff 100%);
  color: #fff;
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

.ai-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
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
  max-width: 80%;
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
/* markdown-it 渲染的额外元素样式 */
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

/* 打字指示器 */
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

.ai-chat-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px;
  display: flex;
  gap: 8px;
  align-items: flex-end;
  background: var(--vp-c-bg-soft);
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
}
.ai-chat-send:hover:not(:disabled) {
  background: #1e54d6;
}
.ai-chat-send:disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
}

/* 滚动条 */
.ai-chat-messages::-webkit-scrollbar { width: 6px; }
.ai-chat-messages::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 3px; }
.ai-chat-messages::-webkit-scrollbar-track { background: transparent; }

/* 移动端响应式 */
@media (max-width: 480px) {
  .ai-chat-widget { right: 12px; bottom: 12px; }
  .ai-chat-panel {
    width: calc(100vw - 24px);
    height: calc(100vh - 100px);
  }
}
</style>
