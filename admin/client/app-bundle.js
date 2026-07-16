(function() {

// ============================================================
// api/index.js - API 请求封装
// ============================================================

var BASE = '/api/admin'

async function request(url, options) {
  if (!options) options = {}
  var config = {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
  }
  Object.keys(options).forEach(function(k) {
    config[k] = options[k]
  })
  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body)
  }

  var res
  try {
    res = await fetch('' + BASE + url, config)
  } catch (err) {
    throw new Error('网络错误，请检查连接')
  }

  if (res.status === 401) {
    if (!window.location.hash.startsWith('#/login')) {
      var current = window.location.hash || '#/'
      window.location.hash = '#/login?redirect=' + encodeURIComponent(current)
    }
    throw new Error('请先登录')
  }

  if (res.status === 429) {
    var data = await res.json().catch(function() { return {} })
    throw new Error(data.message || '请求过于频繁')
  }

  if (!res.ok) {
    var data = await res.json().catch(function() { return {} })
    var err = new Error(data.message || '请求失败 (' + res.status + ')')
    err.status = res.status
    err.details = data.details || null
    throw err
  }

  return res.json()
}

var api = {
  // 认证
  login: function(password) { return request('/login', { method: 'POST', body: { password: password } }) },
  logout: function() { return request('/logout', { method: 'POST' }) },
  check: function() { return request('/check') },

  // 文档
  getDocuments: function(params) {
    var qs = new URLSearchParams(params).toString()
    return request('/documents?' + qs)
  },
  getDocument: function(id, dir) { return request('/documents/' + id + '?dir=' + dir) },
  createDocument: function(data) { return request('/documents', { method: 'POST', body: data }) },
  updateDocument: function(id, data) { return request('/documents/' + id, { method: 'PUT', body: data }) },
  deleteDocument: function(id, dir) { return request('/documents/' + id, { method: 'DELETE', body: { dir: dir } }) },
  getHistory: function(id, dir) { return request('/documents/' + id + '/history?dir=' + dir) },

  // 侧边栏
  getSidebar: function(dir) { return request('/sidebar?dir=' + dir) },
  saveSidebar: function(data) { return request('/sidebar', { method: 'PUT', body: data }) },
  addSidebarNode: function(data) { return request('/sidebar/node', { method: 'POST', body: data }) },
  updateSidebarNode: function(nodeId, data) { return request('/sidebar/node/' + nodeId, { method: 'PUT', body: data }) },
  deleteSidebarNode: function(nodeId, dir) { return request('/sidebar/node/' + nodeId, { method: 'DELETE', body: { dir: dir } }) },

  // 图片
  getImages: function(params) {
    var qs = new URLSearchParams(params).toString()
    return request('/images?' + qs)
  },
  uploadImage: async function(file) {
    var formData = new FormData()
    formData.append('file', file)
    var res = await fetch('' + BASE + '/images/upload', { method: 'POST', body: formData, credentials: 'same-origin' })
    if (res.status === 401 && !window.location.hash.startsWith('#/login')) window.location.hash = '#/login'
    if (!res.ok) {
      var data = await res.json().catch(function() { return {} })
      throw new Error(data.message || '上传失败')
    }
    return res.json()
  },
  deleteImage: function(filename) { return request('/images/' + encodeURIComponent(filename), { method: 'DELETE' }) },

  // 构建
  getBuildStatus: function() { return request('/build/status') }
}

// ============================================================
// views/LoginView.js - 登录页
// ============================================================

var LoginView = {
  name: 'LoginView',
  template: [
    '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,#1e293b,#334155);">',
    '  <div style="background:#fff;border-radius:12px;padding:40px;width:400px;box-shadow:0 20px 60px rgba(0,0,0,.3);">',
    '    <h1 style="font-size:24px;font-weight:700;text-align:center;margin-bottom:8px;color:#1e293b;">管理后台</h1>',
    '    <p style="text-align:center;color:#9ca3af;font-size:14px;margin-bottom:32px;">聚宝赞开放平台文档管理</p>',
    '    <div style="margin-bottom:20px;">',
    '      <label style="display:block;font-size:14px;font-weight:500;margin-bottom:6px;color:#374151;">管理员密码</label>',
    '      <input v-model="password" type="password"',
    '             style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;outline:none;"',
    '             :style="error ? \'border-color:#ef4444;\' : \'\'"',
    '             placeholder="请输入密码" @keyup.enter="doLogin" />',
    '    </div>',
    '    <div v-if="error" style="color:#ef4444;font-size:13px;margin-bottom:12px;">{{ error }}</div>',
    '    <button @click="doLogin" :disabled="loading"',
    '            style="width:100%;padding:12px;background:#3b82f6;color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;"',
    '            :style="loading ? \'opacity:.6;cursor:not-allowed;\' : \'\'">',
    '      {{ loading ? \'登录中...\' : \'登 录\' }}',
    '    </button>',
    '    <div v-if="redirect" style="margin-top:16px;text-align:center;font-size:13px;color:#6b7280;">',
    '      登录后自动跳转到目标页面',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n'),
  data: function() {
    return {
      password: '',
      error: '',
      loading: false,
      redirect: ''
    }
  },
  mounted: function() {
    this.redirect = this.$route.query.redirect || ''
  },
  methods: {
    doLogin: async function() {
      if (!this.password) {
        this.error = '请输入密码'
        return
      }
      this.loading = true
      this.error = ''
      try {
        await api.login(this.password)
        window.location.hash = this.redirect || '#/'
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
}

// ============================================================
// views/DashboardView.js - 仪表盘
// ============================================================

var DashboardView = {
  name: 'DashboardView',
  template: [
    '<div>',
    '  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">',
    '    <div v-for="card of cards" style="background:#fff;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);">',
    '      <div style="font-size:13px;color:#6b7280;margin-bottom:8px;">{{ card.label }}</div>',
    '      <div style="font-size:28px;font-weight:700;color:#1f2937;">{{ card.value }}</div>',
    '    </div>',
    '  </div>',
    '  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">',
    '    <div style="background:#fff;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);">',
    '      <h3 style="font-size:16px;font-weight:600;margin-bottom:16px;">快捷操作</h3>',
    '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
    '        <a v-for="op of quickOps" :key="op.href" :href="op.href"',
    '           style="display:flex;align-items:center;gap:8px;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;color:#374151;font-size:14px;transition:all .15s;">',
    '           <span style="font-size:18px;">{{ op.icon }}</span>',
    '           <span>{{ op.label }}</span>',
    '        </a>',
    '      </div>',
    '    </div>',
    '    <div style="background:#fff;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);">',
    '      <h3 style="font-size:16px;font-weight:600;margin-bottom:16px;">重新构建</h3>',
    '      <p style="font-size:13px;color:#6b7280;margin-bottom:12px;">',
    '        修改文档或侧边栏后，点击构建生成最新静态站点。',
    '      </p>',
    '      <div v-if="buildStatus.lastResult" style="font-size:13px;margin-bottom:12px;"',
    '           :style="\'color:\' + (buildStatus.lastResult.success ? \'#16a34a\' : \'#ef4444\')">',
    '        上次构建: {{ buildStatus.lastResult.success ? \'成功\' : \'失败\' }}',
    '        ({{ buildStatus.lastResult.time }}s)',
    '      </div>',
    '      <button @click="triggerBuild"',
    '              :disabled="building"',
    '              style="padding:10px 24px;background:#3b82f6;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;"',
    '              :style="building ? \'opacity:.6;cursor:not-allowed;\' : \'\'">',
    '        {{ building ? \'构建中...\' : \'重新构建\' }}',
    '      </button>',
    '      <div v-if="buildLogs.length" style="margin-top:16px;background:#1e293b;color:#e2e8f0;border-radius:8px;padding:12px;max-height:300px;overflow-y:auto;font-family:monospace;font-size:12px;">',
    '        <div v-for="(log, i) of buildLogs" :key="i" :style="log.level === \'warn\' ? \'color:#fbbf24;\' : \'\'">{{ log.line }}</div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n'),
  data: function() {
    return {
      cards: [
        { label: '商家版文档', value: '...' },
        { label: '供应商版文档', value: '...' },
        { label: '上次构建', value: '...' },
        { label: '图片资源', value: '...' }
      ],
      quickOps: [
        { label: '新建商家版文档', href: '#/documents/merchant/new', icon: '📝' },
        { label: '新建供应商版文档', href: '#/documents/supplier/new', icon: '📝' },
        { label: '管理商家版侧边栏', href: '#/sidebar/merchant', icon: '📋' },
        { label: '管理供应商版侧边栏', href: '#/sidebar/supplier', icon: '📋' }
      ],
      buildStatus: {},
      building: false,
      buildLogs: []
    }
  },
  mounted: async function() {
    var self = this
    try {
      var results = await Promise.all([
        api.getDocuments({ dir: 'merchant', size: '1' }),
        api.getDocuments({ dir: 'supplier', size: '1' }),
        api.getImages({ size: '1' }),
        api.getBuildStatus()
      ])
      var mResult = results[0]
      var sResult = results[1]
      var imgResult = results[2]
      var bs = results[3]
      self.cards[0].value = mResult.total
      self.cards[1].value = sResult.total
      self.cards[2].value = bs.lastResult
        ? (bs.lastResult.success ? '成功' : '失败') + ' (' + bs.lastResult.time + 's)'
        : '无记录'
      self.cards[3].value = imgResult.total
      self.buildStatus = bs
    } catch (err) {
      console.error('Dashboard load error:', err)
    }
  },
  methods: {
    triggerBuild: function() {
      var self = this
      if (self.building) return
      self.building = true
      self.buildLogs = []

      fetch('/api/admin/build', { method: 'POST', credentials: 'same-origin' })
        .then(async function(res) {
          if (!res.ok) {
            var data = await res.json()
            throw new Error(data.message || '构建触发失败')
          }
          var reader = res.body.getReader()
          var decoder = new TextDecoder()
          var buffer = ''

          while (true) {
            var result = await reader.read()
            if (result.done) break
            buffer += decoder.decode(result.value, { stream: true })
            var lines = buffer.split('\n')
            buffer = lines.pop()
            for (var i = 0; i < lines.length; i++) {
              var line = lines[i]
              if (line.startsWith('data:')) {
                try {
                  var data = JSON.parse(line.slice(5).trim())
                  if (data.line) {
                    self.buildLogs.push(data)
                  } else if (data.phase === 'done') {
                    self.buildLogs.push({ line: '✅ ' + data.message, level: 'info' })
                    self.building = false
                  } else if (data.message) {
                    self.buildLogs.push({ line: '❌ ' + data.message, level: 'warn' })
                    self.building = false
                  }
                } catch (e) {}
              }
            }
          }
        })
        .catch(function(err) {
          self.buildLogs.push({ line: '❌ ' + err.message, level: 'warn' })
          self.building = false
        })
    }
  }
}

// ============================================================
// views/DocumentList.js - 文档列表页
// ============================================================

var DocumentList = {
  name: 'DocumentList',
  props: { dir: String },
  template: [
    '<div>',
    '  <div style="display:flex;gap:12px;margin-bottom:20px;align-items:center;">',
    '    <input v-model="search" placeholder="搜索文档标题..." @input="doSearch"',
    '           style="padding:8px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;width:280px;outline:none;" />',
    '    <a :href="\'#/documents/\' + dir + \'/new\'"',
    '       style="padding:8px 18px;background:#3b82f6;color:#fff;border-radius:8px;font-size:14px;font-weight:600;margin-left:auto;">',
    '      + 新建文档',
    '    </a>',
    '  </div>',
    '  <div style="background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden;">',
    '    <table style="width:100%;border-collapse:collapse;">',
    '      <thead>',
    '        <tr style="background:#f9fafb;border-bottom:1px solid #e5e7eb;">',
    '          <th style="padding:12px 16px;text-align:left;font-size:13px;font-weight:600;color:#6b7280;">标题</th>',
    '          <th style="padding:12px 16px;text-align:left;font-size:13px;font-weight:600;color:#6b7280;width:100px;">文档ID</th>',
    '          <th style="padding:12px 16px;text-align:left;font-size:13px;font-weight:600;color:#6b7280;width:180px;">更新时间</th>',
    '          <th style="padding:12px 16px;text-align:right;font-size:13px;font-weight:600;color:#6b7280;width:160px;">操作</th>',
    '        </tr>',
    '      </thead>',
    '      <tbody>',
    '        <tr v-if="items.length === 0">',
    '          <td colspan="4" style="padding:40px;text-align:center;color:#9ca3af;">{{ loading ? \'加载中...\' : \'暂无文档\' }}</td>',
    '        </tr>',
    '        <tr v-for="doc of items" :key="doc.id" style="border-bottom:1px solid #f3f4f6;transition:background .15s;"',
    '            @mouseover="e => e.currentTarget.style.background=\'#f9fafb\'" @mouseleave="e => e.currentTarget.style.background=\'\'">',
    '          <td style="padding:12px 16px;">',
    '            <a :href="\'#/documents/\' + dir + \'/edit/\' + doc.id" style="font-size:14px;font-weight:500;color:#1f2937;">',
    '              {{ doc.title }}',
    '            </a>',
    '          </td>',
    '          <td style="padding:12px 16px;font-size:12px;color:#9ca3af;font-family:monospace;">{{ doc.id }}</td>',
    '          <td style="padding:12px 16px;font-size:13px;color:#6b7280;">{{ formatDate(doc.updatedAt) }}</td>',
    '          <td style="padding:12px 16px;text-align:right;">',
    '            <a :href="\'#/documents/\' + dir + \'/edit/\' + doc.id"',
    '               style="color:#3b82f6;font-size:13px;margin-right:12px;">编辑</a>',
    '            <a :href="\'/\' + dir + \'/\' + doc.id + \'.html\'" target="_blank"',
    '               style="color:#6b7280;font-size:13px;margin-right:12px;">预览</a>',
    '            <button @click="confirmDelete(doc)" style="color:#ef4444;font-size:13px;background:none;border:none;cursor:pointer;">',
    '              删除',
    '            </button>',
    '          </td>',
    '        </tr>',
    '      </tbody>',
    '    </table>',
    '  </div>',
    '  <div v-if="total > size" style="display:flex;gap:4px;margin-top:16px;justify-content:center;align-items:center;">',
    '    <button v-if="page > 1" @click="page--;load()" style="padding:6px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">上一页</button>',
    '    <span style="font-size:13px;color:#6b7280;">第 {{ page }} / {{ Math.ceil(total / size) }} 页 (共 {{ total }} 篇)</span>',
    '    <button v-if="page * size < total" @click="page++;load()" style="padding:6px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">下一页</button>',
    '  </div>',
    '</div>'
  ].join('\n'),
  data: function() {
    return {
      items: [],
      total: 0,
      page: 1,
      size: 20,
      search: '',
      loading: false,
      searchTimer: null
    }
  },
  mounted: function() {
    this.load()
  },
  methods: {
    load: async function() {
      this.loading = true
      try {
        var result = await api.getDocuments({ dir: this.dir, page: String(this.page), size: String(this.size), search: this.search })
        this.items = result.items
        this.total = result.total
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    doSearch: function() {
      var self = this
      clearTimeout(self.searchTimer)
      self.searchTimer = setTimeout(function() {
        self.page = 1
        self.load()
      }, 300)
    },
    confirmDelete: async function(doc) {
      if (!confirm('确认删除文档"' + doc.title + '"?此操作不可撤销。')) return
      try {
        await api.deleteDocument(doc.id, this.dir)
        this.load()
      } catch (err) {
        alert('删除失败: ' + err.message)
      }
    },
    formatDate: function(iso) {
      if (!iso) return '-'
      var d = new Date(iso)
      return '' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
    }
  }
}

// ============================================================
// views/DocumentEdit.js - 文档编辑器
// ============================================================

var DocumentEdit = {
  name: 'DocumentEdit',
  props: { dir: String, id: String },
  template: [
    '<div>',
    '  <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px;">',
    '    <input v-model="title" placeholder="文档标题" style="flex:1;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;font-weight:600;outline:none;" />',
    '    <button @click="saveDocument" :disabled="saving"',
    '            style="padding:10px 24px;background:#16a34a;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;"',
    '            :style="saving ? \'opacity:.6;cursor:not-allowed;\' : \'\'">',
    '      {{ saving ? \'保存中...\' : \'保存\' }}',
    '    </button>',
    '    <a :href="\'#/documents/\' + dir" style="padding:10px 16px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;color:#6b7280;white-space:nowrap;">取消</a>',
    '  </div>',
    '  <div v-if="saved" style="background:#ecfdf5;color:#065f46;padding:10px 16px;border-radius:8px;font-size:13px;margin-bottom:12px;">',
    '    已保存',
    '  </div>',
    '  <div v-if="error" style="background:#fef2f2;color:#991b1b;padding:10px 16px;border-radius:8px;font-size:13px;margin-bottom:12px;">',
    '    {{ error }}',
    '  </div>',
    '  <div v-if="validationErrors.length" style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:16px;margin-bottom:12px;">',
    '    <div style="font-weight:700;color:#92400e;font-size:14px;margin-bottom:12px;">',
    '      \u26A0\uFE0F 文档内容存在 {{ validationErrors.length }} 个问题，保存失败（这些问题会导致 VitePress 构建报错）',
    '    </div>',
    '    <div v-for="(err, i) of validationErrors" :key="i" style="background:#fef3c7;border-radius:6px;padding:10px 14px;margin-bottom:8px;"',
    '         :style="i === validationErrors.length - 1 ? \'margin-bottom:0;\' : \'\'">',
    '      <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:4px;">',
    '        <span style="background:#d97706;color:#fff;font-size:11px;padding:1px 6px;border-radius:3px;white-space:nowrap;margin-top:1px;">第 {{ err.line }} 行</span>',
    '        <span style="color:#92400e;font-size:13px;font-weight:600;">{{ err.message }}</span>',
    '      </div>',
    '      <div style="margin-left:48px;font-size:12px;color:#a16207;line-height:1.6;">',
    '        \uD83D\uDCA1 <strong>怎么改：</strong>{{ err.fix }}',
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div ref="splitContainer" style="display:flex;gap:0;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden;min-height:calc(100vh - 220px);">',
    '    <div ref="editorPane" style="flex:0 0 auto;width:50%;display:flex;flex-direction:column;border-right:1px solid #e5e7eb;min-width:240px;">',
    '      <div style="padding:8px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">',
    '        Markdown 编辑',
    '      </div>',
    '      <textarea v-model="content" ref="editor" @keydown="handleKeydown"',
    '                style="flex:1;padding:16px;border:none;outline:none;font-size:14px;font-family:\'SF Mono\',Monaco,Menlo,monospace;line-height:1.7;resize:none;"',
    '                spellcheck="false"></textarea>',
    '    </div>',
    '    <div ref="splitter" @mousedown="startResize"',
    '         style="flex:0 0 auto;width:6px;background:#f3f4f6;cursor:col-resize;display:flex;align-items:center;justify-content:center;transition:background .15s;"',
    '         @mouseover="$event.target.style.background=\'#e5e7eb\'"',
    '         @mouseleave="$event.target.style.background=\'#f3f4f6\'">',
    '      <div style="width:2px;height:24px;background:#d1d5db;border-radius:1px;"></div>',
    '    </div>',
    '    <div ref="previewPane" style="flex:1 1 auto;display:flex;flex-direction:column;min-width:240px;">',
    '      <div style="padding:8px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">',
    '        预览',
    '      </div>',
    '      <div style="flex:1;padding:16px;overflow-y:auto;line-height:1.8;font-size:14px;" v-html="previewHtml"></div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n'),
  data: function() {
    return {
      title: '',
      content: '',
      error: '',
      saving: false,
      saved: false,
      isNew: true,
      resizing: false,
      validationErrors: [],
    }
  },
  computed: {
    previewHtml: function() {
      if (!this.content) return '<p style="color:#9ca3af;">预览区域</p>'
      return this.renderMarkdown(this.content)
    }
  },
  mounted: async function() {
    if (this.id) {
      this.isNew = false
      try {
        var doc = await api.getDocument(this.id, this.dir)
        this.title = doc.title
        this.content = doc.content
      } catch (err) {
        this.error = '加载文档失败: ' + err.message
      }
    }
  },
  methods: {
    renderMarkdown: function(text) {
      var html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:#1e293b;color:#e2e8f0;padding:12px;border-radius:6px;overflow-x:auto;font-size:13px;"><code>$2</code></pre>')
      html = html.replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:13px;color:#e11d48;">$1</code>')
      html = html.replace(/^#### (.+)$/gm, '<h4 style="margin:16px 0 8px;font-size:15px;font-weight:600;">$1</h4>')
      html = html.replace(/^### (.+)$/gm, '<h3 style="margin:20px 0 10px;font-size:17px;font-weight:700;">$1</h3>')
      html = html.replace(/^## (.+)$/gm, '<h2 style="margin:24px 0 12px;font-size:20px;font-weight:700;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">$1</h2>')
      html = html.replace(/^# (.+)$/gm, '<h1 style="margin:24px 0 12px;font-size:24px;font-weight:800;">$1</h1>')
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#3b82f6;">$1</a>')
      html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />')
      html = html.split('\n\n').map(function(p) {
        if (p.trim().startsWith('<h') || p.trim().startsWith('<pre') || p.trim().startsWith('<hr') || p.trim().startsWith('<table')) return p
        if (p.trim().startsWith('<ul') || p.trim().startsWith('<ol')) return p
        return '<p style="margin:8px 0;">' + p + '</p>'
      }).join('')
      html = html.replace(/\n/g, '<br />')
      return html
    },
    handleKeydown: function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        this.saveDocument()
      }
    },
    saveDocument: async function() {
      if (!this.title.trim()) {
        this.error = '请输入文档标题'
        this.validationErrors = []
        return
      }
      this.saving = true
      this.error = ''
      this.validationErrors = []
      this.saved = false
      try {
        if (this.isNew) {
          var result = await api.createDocument({ dir: this.dir, title: this.title.trim(), content: this.content })
          this.isNew = false
          this.id = result.id
          window.location.hash = '#/documents/' + this.dir + '/edit/' + result.id
        } else {
          await api.updateDocument(this.id, { dir: this.dir, title: this.title.trim(), content: this.content })
        }
        this.saved = true
        var self = this
        setTimeout(function() { self.saved = false }, 3000)
      } catch (err) {
        if (err.status === 422 && err.details) {
          this.error = '文档内容存在 ' + err.details.length + ' 个问题，无法通过 VitePress 构建，请先修正后再保存'
          this.validationErrors = err.details
        } else {
          this.error = '保存失败 [HTTP ' + (err.status || '') + ']: ' + err.message
          this.validationErrors = []
        }
      } finally {
        this.saving = false
      }
  },
  startResize: function(e) {
    this.resizing = true
    var container = this.$refs.splitContainer
    var startX = e.clientX
    var startWidth = this.$refs.editorPane.offsetWidth
    var containerWidth = container.offsetWidth
    var splitterWidth = this.$refs.splitter.offsetWidth
    var editorPane = this.$refs.editorPane

    var onMove = function(ev) {
      if (!this.resizing) return
      var delta = ev.clientX - startX
      var newWidth = startWidth + delta
      var minWidth = 240
      var maxWidth = containerWidth - splitterWidth - minWidth
      if (newWidth < minWidth) newWidth = minWidth
      if (newWidth > maxWidth) newWidth = maxWidth
      editorPane.style.width = newWidth + 'px'
    }.bind(this)

    var onUp = function() {
      this.resizing = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }.bind(this)

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }
}
}

// ============================================================
// views/SidebarManage.js - 侧边栏管理（含 SidebarNode 递归组件）
// ============================================================

var SidebarManage = {
  name: 'SidebarManage',
  props: { dir: String },
  template: [
    '<div>',
    '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">',
    '    <span style="font-size:13px;color:#6b7280;">管理「{{ dir === \'merchant\' ? \'商家版\' : \'供应商版\' }}」侧边栏菜单</span>',
    '    <button @click="addRootNode" style="padding:8px 16px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:13px;cursor:pointer;">+ 添加根节点</button>',
    '  </div>',
    '  <div v-if="sidebarErrors.length" style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:16px;margin-bottom:12px;">',
    '    <div style="font-weight:700;color:#92400e;font-size:14px;margin-bottom:8px;">',
    '      \u26A0\uFE0F 侧边栏保存失败：有 {{ sidebarErrors.length }} 个链接指向不存在的文档',
    '    </div>',
    '    <div v-for="(err, i) of sidebarErrors" :key="i" style="background:#fef3c7;border-radius:6px;padding:10px 14px;margin-bottom:8px;"',
    '         :style="i === sidebarErrors.length - 1 ? \'margin-bottom:0;\' : \'\'">',
    '      <div style="color:#92400e;font-size:13px;font-weight:600;margin-bottom:4px;">{{ err.message }}</div>',
    '      <div style="font-size:12px;color:#a16207;line-height:1.6;">',
    '        \uD83D\uDCA1 <strong>怎么改：</strong>{{ err.fix }}',
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div v-if="loading" style="text-align:center;padding:40px;color:#9ca3af;">加载中...</div>',
    '  <div v-else style="background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px;">',
    '    <sidebar-node v-for="node of tree" :key="node.id"',
    '                  :node="node" :dir="dir" :depth="0"',
    '                  @edit="editNode" @delete="deleteNode" @add-child="addChildNode" />',
    '    <div v-if="tree.length === 0" style="text-align:center;padding:20px;color:#9ca3af;">暂无菜单项</div>',
    '  </div>',
    '  <div v-if="showModal" style="position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:100;">',
    '    <div style="background:#fff;border-radius:12px;padding:24px;width:420px;box-shadow:0 20px 60px rgba(0,0,0,.3);">',
    '      <h3 style="font-size:16px;font-weight:600;margin-bottom:16px;">{{ modalTitle }}</h3>',
    '      <div style="margin-bottom:12px;">',
    '        <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">节点名称</label>',
    '        <input v-model="modalForm.text" placeholder="例如：接口列表"',
    '               style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;outline:none;" />',
    '      </div>',
    '      <div style="margin-bottom:12px;">',
    '        <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">关联文档</label>',
    '        <select v-model="modalDocId" @change="onDocSelect"',
    '                style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;outline:none;background:#fff;">',
    '          <option value="">不关联文档（仅作为菜单分组）</option>',
    '          <option v-for="doc of docs" :key="doc.id" :value="doc.id">{{ doc.title }} ({{ doc.id }})</option>',
    '        </select>',
    '      </div>',
    '      <div v-if="!modalDocId" style="margin-bottom:16px;">',
    '        <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">自定义链接（可选）</label>',
    '        <input v-model="modalForm.link" placeholder="例如：/merchant/xxx.md"',
    '               style="width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;outline:none;" />',
    '      </div>',
    '      <div style="display:flex;gap:8px;justify-content:flex-end;">',
    '        <button @click="showModal = false" style="padding:8px 16px;border:1px solid #d1d5db;border-radius:6px;background:#fff;font-size:13px;cursor:pointer;">取消</button>',
    '        <button @click="confirmModal" style="padding:8px 16px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:13px;cursor:pointer;">确定</button>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n'),
  data: function() {
    return {
      tree: [],
      loading: true,
      showModal: false,
      modalTitle: '',
      modalForm: { text: '', link: '' },
      modalAction: null,
      modalParentId: null,
      modalNodeId: null,
      docs: [],
      modalDocId: '',
      sidebarErrors: [],
    }
  },
  mounted: async function() {
    await this.loadTree()
  },
  methods: {
    loadTree: async function() {
      this.loading = true
      try {
        var result = await api.getSidebar(this.dir)
        this.tree = result.tree
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    loadDocs: async function() {
      try {
        var result = await api.getDocuments({ dir: this.dir, page: '1', size: '1000' })
        this.docs = result.items || []
      } catch (err) {
        console.error(err)
      }
    },
    docLink: function(docId) {
      return '/' + this.dir + '/' + docId + '.md'
    },
    parseDocId: function(link) {
      var re = new RegExp('^/' + this.dir + '/([^/]+)\\.md$')
      var m = String(link).match(re)
      return m ? m[1] : ''
    },
    onDocSelect: function() {
      if (this.modalDocId) {
        this.modalForm.link = this.docLink(this.modalDocId)
      }
    },
    addRootNode: function() {
      this.modalTitle = '新增根节点'
      this.modalForm = { text: '', link: '' }
      this.modalDocId = ''
      this.modalAction = 'add-root'
      this.loadDocs()
      this.showModal = true
    },
    editNode: function(node) {
      this.modalTitle = '编辑节点'
      this.modalForm = { text: node.text, link: node.link || '' }
      this.modalDocId = this.parseDocId(node.link)
      this.modalAction = 'edit'
      this.modalNodeId = node.id
      this.loadDocs()
      this.showModal = true
    },
    deleteNode: async function(node) {
      if (!confirm('确认删除节点「' + node.text + '」？')) return
      try {
        await api.deleteSidebarNode(node.id, this.dir)
        await this.loadTree()
      } catch (err) { alert('删除失败: ' + err.message) }
    },
    addChildNode: function(parentId) {
      this.modalTitle = '新增子节点'
      this.modalForm = { text: '', link: '' }
      this.modalDocId = ''
      this.modalAction = 'add-child'
      this.modalParentId = parentId
      this.loadDocs()
      this.showModal = true
    },
    confirmModal: async function() {
      if (!this.modalForm.text.trim()) {
        alert('请输入节点名称')
        return
      }
      if (this.modalDocId) {
        this.modalForm.link = this.docLink(this.modalDocId)
      } else if (!this.modalForm.link) {
        this.modalForm.link = ''
      }
      this.sidebarErrors = []
      try {
        if (this.modalAction === 'add-root') {
          await api.addSidebarNode({ dir: this.dir, parentId: null, node: this.modalForm })
        } else if (this.modalAction === 'add-child') {
          await api.addSidebarNode({ dir: this.dir, parentId: this.modalParentId, node: this.modalForm })
        } else if (this.modalAction === 'edit') {
          await api.updateSidebarNode(this.modalNodeId, { dir: this.dir, patch: this.modalForm })
        }
        this.showModal = false
        await this.loadTree()
      } catch (err) {
        if (err.status === 422 && err.details) {
          this.sidebarErrors = err.details
        } else {
          alert('操作失败: ' + err.message)
        }
      }
    }
  }
}

var SidebarNode = {
  name: 'SidebarNode',
  props: ['node', 'dir', 'depth'],
  emits: ['edit', 'delete', 'add-child'],
  template: [
    '<div>',
    '  <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;margin:2px 0;border-radius:6px;transition:background .15s;"',
    '       :style="\'padding-left:\' + (depth * 24 + 8) + \'px;\'"',
    '       @mouseover="e => e.currentTarget.style.background=\'#f9fafb\'"',
    '       @mouseleave="e => e.currentTarget.style.background=\'\'">',
    '    <span v-if="node.items && node.items.length" style="cursor:pointer;font-size:12px;user-select:none;" @click="$emit(\'add-child\', node.id)">',
    '      📁',
    '    </span>',
    '    <span v-else style="font-size:12px;">📄</span>',
    '    <span style="flex:1;font-size:14px;">{{ node.text }}</span>',
    '    <span v-if="node.link" style="font-size:11px;color:#9ca3af;font-family:monospace;">{{ node.link }}</span>',
    '    <button @click="$emit(\'add-child\', node.id)" title="添加子节点"',
    '            style="background:none;border:none;cursor:pointer;font-size:14px;color:#9ca3af;padding:2px 4px;">+</button>',
    '    <button @click="$emit(\'edit\', node)" title="编辑"',
    '            style="background:none;border:none;cursor:pointer;font-size:13px;color:#6b7280;padding:2px 4px;">✎</button>',
    '    <button @click="$emit(\'delete\', node)" title="删除"',
    '            style="background:none;border:none;cursor:pointer;font-size:13px;color:#ef4444;padding:2px 4px;">✕</button>',
    '  </div>',
    '  <sidebar-node v-for="child of (node.items || [])" :key="child.id"',
    '                :node="child" :dir="dir" :depth="depth + 1"',
    '                @edit="e => $emit(\'edit\', e)"',
    '                @delete="e => $emit(\'delete\', e)"',
    '                @add-child="e => $emit(\'add-child\', e)" />',
    '</div>'
  ].join('\n')
}

SidebarManage.components = { SidebarNode: SidebarNode }

// ============================================================
// views/ImageManage.js - 图片管理
// ============================================================

var ImageManage = {
  name: 'ImageManage',
  template: [
    '<div>',
    '  <div style="margin-bottom:20px;">',
    '    <div @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="handleDrop"',
    '         style="border:2px dashed #d1d5db;border-radius:8px;padding:36px;text-align:center;cursor:pointer;transition:all .2s;background:#fff;"',
    '         :style="dragover ? \'border-color:#3b82f6;background:#eff6ff;\' : \'\'">',
    '      <div style="font-size:36px;margin-bottom:8px;">🖼️</div>',
    '      <div style="font-size:14px;color:#6b7280;">拖拽图片到此处，或点击上传</div>',
    '      <div style="font-size:12px;color:#9ca3af;margin-top:4px;">支持 PNG / JPG / GIF / SVG / WebP，最大 5MB</div>',
    '    </div>',
    '    <input type="file" ref="fileInput" accept="image/*" @change="handleFile" style="display:none;" />',
    '  </div>',
    '  <div v-if="uploading" style="background:#eff6ff;padding:12px 16px;border-radius:8px;font-size:14px;color:#3b82f6;margin-bottom:16px;">',
    '    上传中...',
    '  </div>',
    '  <div v-if="items.length" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;">',
    '    <div v-for="img of items" style="background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden;position:relative;"',
    '         @mouseover="hoverId = img.filename" @mouseleave="hoverId = null">',
    '      <div style="aspect-ratio:16/10;background:#f3f4f6;display:flex;align-items:center;justify-content:center;overflow:hidden;">',
    '        <img :src="img.url" :alt="img.filename" style="max-width:100%;max-height:100%;object-fit:contain;" loading="lazy" />',
    '      </div>',
    '      <div style="padding:8px 10px;">',
    '        <div style="font-size:12px;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" :title="img.filename">',
    '          {{ img.filename }}',
    '        </div>',
    '        <div style="font-size:11px;color:#9ca3af;margin-top:2px;">{{ formatSize(img.size) }}</div>',
    '      </div>',
    '      <div v-if="hoverId === img.filename" style="position:absolute;top:4px;right:4px;display:flex;gap:4px;">',
    '        <button @click="copyRef(img)" title="复制 Markdown 引用"',
    '                style="background:rgba(0,0,0,.7);color:#fff;border:none;border-radius:4px;padding:4px 8px;font-size:11px;cursor:pointer;">',
    '          复制 ![]()',
    '        </button>',
    '        <button @click="deleteImg(img)" title="删除"',
    '                style="background:rgba(239,68,68,.8);color:#fff;border:none;border-radius:4px;padding:4px 8px;font-size:11px;cursor:pointer;">',
    '          删除',
    '        </button>',
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div v-else style="text-align:center;padding:40px;color:#9ca3af;">暂无图片</div>',
    '  <div v-if="total > size" style="display:flex;gap:4px;margin-top:16px;justify-content:center;align-items:center;">',
    '    <button v-if="page > 1" @click="page--;load()" style="padding:6px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">上一页</button>',
    '    <span style="font-size:13px;color:#6b7280;">第 {{ page }} / {{ Math.ceil(total / size) }} 页</span>',
    '    <button v-if="page * size < total" @click="page++;load()" style="padding:6px 12px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">下一页</button>',
    '  </div>',
    '</div>'
  ].join('\n'),
  data: function() {
    return {
      items: [],
      total: 0,
      page: 1,
      size: 20,
      uploading: false,
      dragover: false,
      hoverId: null
    }
  },
  mounted: function() { this.load() },
  methods: {
    load: async function() {
      try {
        var result = await api.getImages({ page: String(this.page), size: String(this.size) })
        this.items = result.items
        this.total = result.total
      } catch (err) { console.error(err) }
    },
    uploadFile: async function(file) {
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
    handleFile: function(e) {
      this.uploadFile(e.target.files[0])
      e.target.value = ''
    },
    handleDrop: function(e) {
      this.dragover = false
      var file = e.dataTransfer.files[0]
      if (file) this.uploadFile(file)
    },
    deleteImg: async function(img) {
      if (!confirm('确认删除图片 "' + img.filename + '"？')) return
      try {
        await api.deleteImage(img.filename)
        await this.load()
      } catch (err) {
        alert('删除失败: ' + err.message)
      }
    },
    copyRef: function(img) {
      var md = '![](' + img.url + ')'
      navigator.clipboard.writeText(md).then(function() {
        alert('已复制: ' + md)
      }).catch(function() {
        var ta = document.createElement('textarea')
        ta.value = md
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        alert('已复制: ' + md)
      })
    },
    formatSize: function(bytes) {
      if (!bytes) return '0 B'
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
      return (bytes / 1048576).toFixed(1) + ' MB'
    }
  }
}

// ============================================================
// components/AdminLayout.js - 管理后台布局
// ============================================================

var AdminLayout = {
  name: 'AdminLayout',
  template: [
    '<div style="display:flex;height:100vh;">',
    '  <aside style="width:220px;background:#1e293b;color:#e2e8f0;display:flex;flex-direction:column;flex-shrink:0;">',
    '    <div style="padding:20px 16px;font-size:16px;font-weight:700;border-bottom:1px solid #334155;">',
    '      管理后台',
    '    </div>',
    '    <nav style="flex:1;overflow-y:auto;padding:8px 0;">',
    '      <a href="#/" style="display:block;padding:10px 20px;color:#94a3b8;font-size:14px;transition:all .2s;"',
    '         :style="activeRoute === \'\' ? \'color:#fff;background:#334155;\' : \'\'"',
    '         @mouseover="hoverNav($event, true)" @mouseleave="hoverNav($event, false)">',
    '        仪表盘',
    '      </a>',
    '      <div v-for="dir of dirs" :key="dir.key">',
    '        <div style="padding:8px 20px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-top:8px;">',
    '          {{ dir.label }}',
    '        </div>',
    '        <a v-for="item of dir.items" :href="item.href"',
    '           style="display:block;padding:10px 20px;color:#94a3b8;font-size:14px;transition:all .2s;"',
    '           :style="activeRoute === item.active ? \'color:#fff;background:#334155;\' : \'\'"',
    '           @mouseover="hoverNav($event, true)" @mouseleave="hoverNav($event, false)">',
    '          {{ item.text }}',
    '        </a>',
    '      </div>',
    '    </nav>',
    '    <div style="padding:12px 16px;border-top:1px solid #334155;">',
    '      <a href="#/login" @click="doLogout" style="color:#ef4444;font-size:13px;">退出登录</a>',
    '    </div>',
    '  </aside>',
    '  <main style="flex:1;overflow-y:auto;background:#f5f7fa;">',
    '    <header style="background:#fff;padding:0 24px;height:56px;display:flex;align-items:center;border-bottom:1px solid #e5e7eb;gap:16px;">',
    '      <h2 style="font-size:18px;font-weight:600;">{{ pageTitle }}</h2>',
    '      <span style="color:#9ca3af;font-size:13px;flex:1;"></span>',
    '      <a :href="siteUrl" target="_blank" style="font-size:13px;color:#3b82f6;">查看文档站点 &rarr;</a>',
    '    </header>',
    '    <div style="padding:24px;">',
    '      <router-view />',
    '    </div>',
    '  </main>',
    '</div>'
  ].join('\n'),
  data: function() {
    return {
      siteUrl: window.location.origin + '/',
      dirs: [
        {
          key: 'merchant',
          label: '商家版',
          items: [
            { text: '文档列表', href: '#/documents/merchant', active: 'documents/merchant' },
            { text: '侧边栏管理', href: '#/sidebar/merchant', active: 'sidebar/merchant' }
          ]
        },
        {
          key: 'supplier',
          label: '供应商版',
          items: [
            { text: '文档列表', href: '#/documents/supplier', active: 'documents/supplier' },
            { text: '侧边栏管理', href: '#/sidebar/supplier', active: 'sidebar/supplier' }
          ]
        },
        {
          key: 'common',
          label: '通用',
          items: [
            { text: '图片管理', href: '#/images', active: 'images' }
          ]
        }
      ]
    }
  },
  computed: {
    activeRoute: function() {
      var hash = this.$route.path
      if (hash === '/') return ''
      if (hash.startsWith('/documents/')) return 'documents/' + hash.split('/')[2]
      if (hash.startsWith('/sidebar/')) return 'sidebar/' + hash.split('/')[2]
      if (hash.startsWith('/images')) return 'images'
      return ''
    },
    pageTitle: function() {
      var map = {
        '': '仪表盘',
        '/documents/merchant': '商家版文档',
        '/documents/supplier': '供应商版文档',
        '/sidebar/merchant': '商家版侧边栏',
        '/sidebar/supplier': '供应商版侧边栏',
        '/images': '图片管理'
      }
      if (this.$route.path.startsWith('/documents/') && this.$route.path.endsWith('/new')) return '新建文档'
      if (this.$route.path.includes('/edit/')) return '编辑文档'
      return map[this.$route.path] || '管理后台'
    }
  },
  methods: {
    hoverNav: function(e, enter) {
      if (!enter) e.target.style.backgroundColor = ''
      else if (e.target.style.color !== 'rgb(255, 255, 255)') {
        e.target.style.backgroundColor = '#1e3a5f'
      }
    },
    doLogout: async function(e) {
      e.preventDefault()
      try { await api.logout() } catch (err) {}
      window.location.hash = '#/login'
    }
  }
}

// ============================================================
// app.js - 应用入口：路由 + Vue 挂载
// ============================================================

var createApp = Vue.createApp
var createRouter = VueRouter.createRouter
var createWebHashHistory = VueRouter.createWebHashHistory

var routes = [
  { path: '/login', component: LoginView, meta: { noAuth: true } },
  {
    path: '/',
    component: AdminLayout,
    children: [
      { path: '', component: DashboardView },
      { path: 'documents/:dir', component: DocumentList, props: true },
      { path: 'documents/:dir/new', component: DocumentEdit, props: true },
      { path: 'documents/:dir/edit/:id', component: DocumentEdit, props: true },
      { path: 'sidebar/:dir', component: SidebarManage, props: true },
      { path: 'images', component: ImageManage }
    ]
  }
]

var router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach(async function(to) {
  if (to.meta.noAuth) return true
  try {
    await fetch('/api/admin/check', { credentials: 'same-origin' })
    return true
  } catch (err) {
    return '/login?redirect=' + encodeURIComponent(to.fullPath)
  }
})

var app = Vue.createApp({ template: '<router-view />' })
app.use(router)
app.mount('#app')

// 全局错误捕获, 显示在 #error-box 中
window.addEventListener('error', function(e) {
  var box = document.getElementById('error-box')
  if (box) {
    box.textContent = 'Error: ' + (e.error ? (e.error.message || String(e.error)) : e.message)
    box.style.display = 'block'
  }
  console.error(e.error || e.message)
})

})()
