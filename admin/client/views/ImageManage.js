/**
 * 图片管理 - 上传、预览、删除、复制引用
 */
import { api } from '../api/index.js'

export default {
  name: 'ImageManage',
  template: `
    <div>
      <!-- 上传区域 -->
      <div style="margin-bottom:20px;">
        <div @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="handleDrop"
             style="border:2px dashed #d1d5db;border-radius:8px;padding:36px;text-align:center;cursor:pointer;transition:all .2s;background:#fff;"
             :style="dragover ? 'border-color:#3b82f6;background:#eff6ff;' : ''">
          <div style="font-size:36px;margin-bottom:8px;">🖼️</div>
          <div style="font-size:14px;color:#6b7280;">拖拽图片到此处，或点击上传</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:4px;">支持 PNG / JPG / GIF / SVG / WebP，最大 5MB</div>
        </div>
        <input type="file" ref="fileInput" accept="image/*" @change="handleFile" style="display:none;" />
      </div>

      <!-- 上传进度 -->
      <div v-if="uploading" style="background:#eff6ff;padding:12px 16px;border-radius:8px;font-size:14px;color:#3b82f6;margin-bottom:16px;">
        上传中...
      </div>

      <!-- 图片网格 -->
      <div v-if="items.length" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;">
        <div v-for="img of items" style="background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden;position:relative;"
             @mouseover="hoverId = img.filename" @mouseleave="hoverId = null">
          <div style="aspect-ratio:16/10;background:#f3f4f6;display:flex;align-items:center;justify-content:center;overflow:hidden;">
            <img :src="img.url" :alt="img.filename" style="max-width:100%;max-height:100%;object-fit:contain;" loading="lazy" />
          </div>
          <div style="padding:8px 10px;">
            <div style="font-size:12px;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" :title="img.filename">
              {{ img.filename }}
            </div>
            <div style="font-size:11px;color:#9ca3af;margin-top:2px;">{{ formatSize(img.size) }}</div>
          </div>
          <!-- 悬浮操作 -->
          <div v-if="hoverId === img.filename" style="position:absolute;top:4px;right:4px;display:flex;gap:4px;">
            <button @click="copyRef(img)" title="复制 Markdown 引用"
                    style="background:rgba(0,0,0,.7);color:#fff;border:none;border-radius:4px;padding:4px 8px;font-size:11px;cursor:pointer;">
              复制 ![]()
            </button>
            <button @click="deleteImg(img)" title="删除"
                    style="background:rgba(239,68,68,.8);color:#fff;border:none;border-radius:4px;padding:4px 8px;font-size:11px;cursor:pointer;">
              删除
            </button>
          </div>
        </div>
      </div>

      <div v-else style="text-align:center;padding:40px;color:#9ca3af;">暂无图片</div>

      <!-- 分页 -->
      <div v-if="total > size" style="display:flex;gap:4px;margin-top:16px;justify-content:center;align-items:center;">
        <button v-if="page > 1" @click="page--;load()" style="padding:6px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">上一页</button>
        <span style="font-size:13px;color:#6b7280;">第 {{ page }} / {{ Math.ceil(total / size) }} 页</span>
        <button v-if="page * size < total" @click="page++;load()" style="padding:6px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">下一页</button>
      </div>
    </div>
  `,
  data() {
    return {
      items: [],
      total: 0,
      page: 1,
      size: 20,
      uploading: false,
      dragover: false,
      hoverId: null,
    }
  },
  mounted() { this.load() },
  methods: {
    async load() {
      try {
        const result = await api.getImages({ page: String(this.page), size: String(this.size) })
        this.items = result.items
        this.total = result.total
      } catch (err) { console.error(err) }
    },
    async uploadFile(file) {
      if (!file) return
      this.uploading = true
      try {
        await api.uploadImage(file)
        this.page = 1
        await this.load()
      } catch (err) {
        alert('上传失败: ' + err.message)
      } finally {
        this.uploading = false
      }
    },
    handleFile(e) {
      this.uploadFile(e.target.files[0])
      e.target.value = ''
    },
    handleDrop(e) {
      this.dragover = false
      const file = e.dataTransfer.files[0]
      if (file) this.uploadFile(file)
    },
    async deleteImg(img) {
      if (!confirm(`确认删除图片 "${img.filename}"？`)) return
      try {
        await api.deleteImage(img.filename)
        await this.load()
      } catch (err) {
        alert('删除失败: ' + err.message)
      }
    },
    copyRef(img) {
      const md = `![](${img.url})`
      navigator.clipboard.writeText(md).then(() => {
        alert('已复制: ' + md)
      }).catch(() => {
        // 降级方案
        const ta = document.createElement('textarea')
        ta.value = md
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        alert('已复制: ' + md)
      })
    },
    formatSize(bytes) {
      if (!bytes) return '0 B'
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
      return (bytes / 1048576).toFixed(1) + ' MB'
    },
  },
}
