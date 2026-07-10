/**
 * 文档列表页 - 表格展示，搜索/筛选/编辑/删除
 */
import { api } from '../api/index.js'

export default {
  name: 'DocumentList',
  props: { dir: String },
  template: `
    <div>
      <!-- 搜索栏 -->
      <div style="display:flex;gap:12px;margin-bottom:20px;align-items:center;">
        <input v-model="search" placeholder="搜索文档标题..." @input="doSearch"
               style="padding:8px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;width:280px;outline:none;" />
        <a :href="'#/documents/' + dir + '/new'"
           style="padding:8px 18px;background:#3b82f6;color:#fff;border-radius:8px;font-size:14px;font-weight:600;margin-left:auto;">
          + 新建文档
        </a>
      </div>

      <!-- 表格 -->
      <div style="background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#f9fafb;border-bottom:1px solid #e5e7eb;">
              <th style="padding:12px 16px;text-align:left;font-size:13px;font-weight:600;color:#6b7280;">标题</th>
              <th style="padding:12px 16px;text-align:left;font-size:13px;font-weight:600;color:#6b7280;width:100px;">文档ID</th>
              <th style="padding:12px 16px;text-align:left;font-size:13px;font-weight:600;color:#6b7280;width:180px;">更新时间</th>
              <th style="padding:12px 16px;text-align:right;font-size:13px;font-weight:600;color:#6b7280;width:160px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="items.length === 0">
              <td colspan="4" style="padding:40px;text-align:center;color:#9ca3af;">{{ loading ? '加载中...' : '暂无文档' }}</td>
            </tr>
            <tr v-for="doc of items" :key="doc.id" style="border-bottom:1px solid #f3f4f6;transition:background .15s;"
                @mouseover="e => e.currentTarget.style.background='#f9fafb'" @mouseleave="e => e.currentTarget.style.background=''">
              <td style="padding:12px 16px;">
                <a :href="'#/documents/' + dir + '/edit/' + doc.id" style="font-size:14px;font-weight:500;color:#1f2937;">
                  {{ doc.title }}
                </a>
              </td>
              <td style="padding:12px 16px;font-size:12px;color:#9ca3af;font-family:monospace;">{{ doc.id }}</td>
              <td style="padding:12px 16px;font-size:13px;color:#6b7280;">{{ formatDate(doc.updatedAt) }}</td>
              <td style="padding:12px 16px;text-align:right;">
                <a :href="'#/documents/' + dir + '/edit/' + doc.id"
                   style="color:#3b82f6;font-size:13px;margin-right:12px;">编辑</a>
                <a :href="'/' + dir + '/' + doc.id + '.html'" target="_blank"
                   style="color:#6b7280;font-size:13px;margin-right:12px;">预览</a>
                <button @click="confirmDelete(doc)" style="color:#ef4444;font-size:13px;background:none;border:none;cursor:pointer;">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div v-if="total > size" style="display:flex;gap:4px;margin-top:16px;justify-content:center;align-items:center;">
        <button v-if="page > 1" @click="page--;load()" style="padding:6px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">上一页</button>
        <span style="font-size:13px;color:#6b7280;">第 {{ page }} / {{ Math.ceil(total / size) }} 页 (共 {{ total }} 篇)</span>
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
      search: '',
      loading: false,
      searchTimer: null,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      try {
        const result = await api.getDocuments({ dir: this.dir, page: String(this.page), size: String(this.size), search: this.search })
        this.items = result.items
        this.total = result.total
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    doSearch() {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.page = 1
        this.load()
      }, 300)
    },
    async confirmDelete(doc) {
      if (!confirm(`确认删除文档"${doc.title}"？此操作不可撤销。`)) return
      try {
        await api.deleteDocument(doc.id, this.dir)
        this.load()
      } catch (err) {
        alert('删除失败: ' + err.message)
      }
    },
    formatDate(iso) {
      if (!iso) return '-'
      const d = new Date(iso)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    },
  },
}
