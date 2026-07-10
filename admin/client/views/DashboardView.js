/**
 * 仪表盘 - 概览统计 + 快捷操作 + 构建面板
 */
import { api } from '../api/index.js'

export default {
  name: 'DashboardView',
  template: `
    <div>
      <!-- 统计卡片 -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div v-for="card of cards" style="background:#fff;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);">
          <div style="font-size:13px;color:#6b7280;margin-bottom:8px;">{{ card.label }}</div>
          <div style="font-size:28px;font-weight:700;color:#1f2937;">{{ card.value }}</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <!-- 快捷操作 -->
        <div style="background:#fff;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);">
          <h3 style="font-size:16px;font-weight:600;margin-bottom:16px;">快捷操作</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <a v-for="op of quickOps" :key="op.href" :href="op.href"
               style="display:flex;align-items:center;gap:8px;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;color:#374151;font-size:14px;transition:all .15s;">
               <span style="font-size:18px;">{{ op.icon }}</span>
               <span>{{ op.label }}</span>
            </a>
          </div>
        </div>

        <!-- 构建面板 -->
        <div style="background:#fff;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);">
          <h3 style="font-size:16px;font-weight:600;margin-bottom:16px;">重新构建</h3>
          <p style="font-size:13px;color:#6b7280;margin-bottom:12px;">
            修改文档或侧边栏后，点击构建生成最新静态站点。
          </p>
          <div v-if="buildStatus.lastResult" style="font-size:13px;margin-bottom:12px;"
               :style="'color:' + (buildStatus.lastResult.success ? '#16a34a' : '#ef4444')">
            上次构建: {{ buildStatus.lastResult.success ? '成功' : '失败' }}
            ({{ buildStatus.lastResult.time }}s)
          </div>
          <button @click="triggerBuild"
                  :disabled="building"
                  style="padding:10px 24px;background:#3b82f6;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;"
                  :style="building ? 'opacity:.6;cursor:not-allowed;' : ''">
            {{ building ? '构建中...' : '重新构建' }}
          </button>
          <!-- 构建日志 -->
          <div v-if="buildLogs.length" style="margin-top:16px;background:#1e293b;color:#e2e8f0;border-radius:8px;padding:12px;max-height:300px;overflow-y:auto;font-family:monospace;font-size:12px;">
            <div v-for="(log, i) of buildLogs" :key="i" :style="log.level === 'warn' ? 'color:#fbbf24;' : ''">{{ log.line }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      cards: [
        { label: '商家版文档', value: '...' },
        { label: '供应商版文档', value: '...' },
        { label: '上次构建', value: '...' },
        { label: '图片资源', value: '...' },
      ],
      quickOps: [
        { label: '新建商家版文档', href: '#/documents/merchant/new', icon: '📝' },
        { label: '新建供应商版文档', href: '#/documents/supplier/new', icon: '📝' },
        { label: '管理商家版侧边栏', href: '#/sidebar/merchant', icon: '📋' },
        { label: '管理供应商版侧边栏', href: '#/sidebar/supplier', icon: '📋' },
      ],
      buildStatus: {},
      building: false,
      buildLogs: [],
    }
  },
  async mounted() {
    try {
      const [mResult, sResult, imgResult, bs] = await Promise.all([
        api.getDocuments({ dir: 'merchant', size: '1' }),
        api.getDocuments({ dir: 'supplier', size: '1' }),
        api.getImages({ size: '1' }),
        api.getBuildStatus(),
      ])
      this.cards[0].value = mResult.total
      this.cards[1].value = sResult.total
      this.cards[2].value = bs.lastResult
        ? (bs.lastResult.success ? '成功' : '失败') + ' (' + bs.lastResult.time + 's)'
        : '无记录'
      this.cards[3].value = imgResult.total
      this.buildStatus = bs
    } catch (err) {
      console.error('Dashboard load error:', err)
    }
  },
  methods: {
    triggerBuild() {
      if (this.building) return
      this.building = true
      this.buildLogs = []

      const eventSource = new EventSource('/api/admin/build', { withCredentials: true })
      // SSE 不直接支持 POST，这里改为先尝试直接 fetch SSE
      // 用 fetch + ReadableStream 替代
      fetch('/api/admin/build', { method: 'POST', credentials: 'same-origin' })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message || '构建触发失败')
          }
          const reader = res.body.getReader()
          const decoder = new TextDecoder()
          let buffer = ''

          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop()
            for (const line of lines) {
              if (line.startsWith('data:')) {
                try {
                  const data = JSON.parse(line.slice(5).trim())
                  if (data.line) {
                    this.buildLogs.push(data)
                  } else if (data.phase === 'done') {
                    this.buildLogs.push({ line: '✅ ' + data.message, level: 'info' })
                    this.building = false
                  } else if (data.message) {
                    this.buildLogs.push({ line: '❌ ' + data.message, level: 'warn' })
                    this.building = false
                  }
                } catch {}
              }
            }
          }
        })
        .catch((err) => {
          this.buildLogs.push({ line: '❌ ' + err.message, level: 'warn' })
          this.building = false
        })
    },
  },
}
