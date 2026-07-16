/**
 * 文档编辑器 - 左右分栏 Markdown 编辑 + 预览
 */
import { api } from '../api/index.js'

export default {
  name: 'DocumentEdit',
  props: { dir: String, id: String },
  template: `
    <div>
      <!-- 标题栏 -->
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px;">
        <input v-model="title" placeholder="文档标题" style="flex:1;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;font-weight:600;outline:none;" />
        <button @click="saveDocument" :disabled="saving"
                style="padding:10px 24px;background:#16a34a;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;"
                :style="saving ? 'opacity:.6;cursor:not-allowed;' : ''">
          {{ saving ? '保存中...' : '保存' }}
        </button>
        <a :href="'#/documents/' + dir" style="padding:10px 16px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;color:#6b7280;white-space:nowrap;">取消</a>
      </div>

      <div v-if="saved" style="background:#ecfdf5;color:#065f46;padding:10px 16px;border-radius:8px;font-size:13px;margin-bottom:12px;">
        已保存
      </div>

      <div v-if="error" style="background:#fef2f2;color:#991b1b;padding:10px 16px;border-radius:8px;font-size:13px;margin-bottom:12px;">
        {{ error }}
      </div>

      <!-- 编辑器 + 预览 -->
      <div ref="splitContainer" style="display:flex;gap:0;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden;min-height:calc(100vh - 220px);">
        <!-- 编辑区 -->
        <div ref="editorPane" style="flex:0 0 auto;width:50%;display:flex;flex-direction:column;border-right:1px solid #e5e7eb;min-width:240px;">
          <div style="padding:8px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
            Markdown 编辑
          </div>
          <textarea v-model="content" ref="editor" @keydown="handleKeydown"
                    style="flex:1;padding:16px;border:none;outline:none;font-size:14px;font-family:'SF Mono',Monaco,Menlo,monospace;line-height:1.7;resize:none;"
                    spellcheck="false"></textarea>
        </div>
        <!-- 拖动条 -->
        <div ref="splitter" @mousedown="startResize"
             style="flex:0 0 auto;width:6px;background:#f3f4f6;cursor:col-resize;display:flex;align-items:center;justify-content:center;transition:background .15s;"
             @mouseover="$event.target.style.background='#e5e7eb'"
             @mouseleave="$event.target.style.background='#f3f4f6'">
          <div style="width:2px;height:24px;background:#d1d5db;border-radius:1px;"></div>
        </div>
        <!-- 预览区 -->
        <div ref="previewPane" style="flex:1 1 auto;display:flex;flex-direction:column;min-width:240px;">
          <div style="padding:8px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
            预览
          </div>
          <div style="flex:1;padding:16px;overflow-y:auto;line-height:1.8;font-size:14px;" v-html="previewHtml"></div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      title: '',
      content: '',
      error: '',
      saving: false,
      saved: false,
      isNew: true,
      resizing: false,
    }
  },
  computed: {
    previewHtml() {
      if (!this.content) return '<p style="color:#9ca3af;">预览区域</p>'
      return this.renderMarkdown(this.content)
    },
  },
  async mounted() {
    if (this.id) {
      this.isNew = false
      try {
        const doc = await api.getDocument(this.id, this.dir)
        this.title = doc.title
        this.content = doc.content
      } catch (err) {
        this.error = '加载文档失败: ' + err.message
      }
    }
  },
  methods: {
    renderMarkdown(text) {
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      // 代码块
      html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:#1e293b;color:#e2e8f0;padding:12px;border-radius:6px;overflow-x:auto;font-size:13px;"><code>$2</code></pre>')
      // 行内代码
      html = html.replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:13px;color:#e11d48;">$1</code>')
      // 标题
      html = html.replace(/^#### (.+)$/gm, '<h4 style="margin:16px 0 8px;font-size:15px;font-weight:600;">$1</h4>')
      html = html.replace(/^### (.+)$/gm, '<h3 style="margin:20px 0 10px;font-size:17px;font-weight:700;">$1</h3>')
      html = html.replace(/^## (.+)$/gm, '<h2 style="margin:24px 0 12px;font-size:20px;font-weight:700;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">$1</h2>')
      html = html.replace(/^# (.+)$/gm, '<h1 style="margin:24px 0 12px;font-size:24px;font-weight:800;">$1</h1>')
      // 加粗 / 斜体
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
      // 链接
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#3b82f6;">$1</a>')
      // 水平线
      html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />')
      // 段落
      html = html.split('\n\n').map(p => {
        if (p.trim().startsWith('<h') || p.trim().startsWith('<pre') || p.trim().startsWith('<hr') || p.trim().startsWith('<table')) return p
        if (p.trim().startsWith('<ul') || p.trim().startsWith('<ol')) return p
        return '<p style="margin:8px 0;">' + p + '</p>'
      }).join('')
      // 行内换行
      html = html.replace(/\n/g, '<br />')
      return html
    },
    handleKeydown(e) {
      // Ctrl/Cmd + S 保存
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        this.saveDocument()
      }
    },
    async saveDocument() {
      if (!this.title.trim()) {
        this.error = '请输入文档标题'
        return
      }
      this.saving = true
      this.error = ''
      this.saved = false
      try {
        if (this.isNew) {
          const result = await api.createDocument({ dir: this.dir, title: this.title.trim(), content: this.content })
          this.isNew = false
          this.id = result.id
          window.location.hash = `#/documents/${this.dir}/edit/${result.id}`
        } else {
          await api.updateDocument(this.id, { dir: this.dir, title: this.title.trim(), content: this.content })
        }
        this.saved = true
        setTimeout(() => { this.saved = false }, 3000)
      } catch (err) {
        this.error = '保存失败: ' + err.message
      } finally {
        this.saving = false
      }
    },

    startResize(e) {
      this.resizing = true
      const container = this.$refs.splitContainer
      const startX = e.clientX
      const startWidth = this.$refs.editorPane.offsetWidth
      const containerWidth = container.offsetWidth
      const splitterWidth = this.$refs.splitter.offsetWidth

      const onMove = (ev) => {
        if (!this.resizing) return
        const delta = ev.clientX - startX
        let newWidth = startWidth + delta
        const minWidth = 240
        const maxWidth = containerWidth - splitterWidth - minWidth
        if (newWidth < minWidth) newWidth = minWidth
        if (newWidth > maxWidth) newWidth = maxWidth
        this.$refs.editorPane.style.width = newWidth + 'px'
      }

      const onUp = () => {
        this.resizing = false
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
        document.body.style.userSelect = ''
        document.body.style.cursor = ''
      }

      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    },
  },
}
