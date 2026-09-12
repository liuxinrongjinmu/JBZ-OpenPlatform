/**
 * API 请求封装 - 自动带 credentials，401 跳登录
 */
const BASE = '/api/admin'

async function request(url, options = {}) {
  const config = {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  }
  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body)
  }

  let res
  try {
    res = await fetch(`${BASE}${url}`, config)
  } catch (err) {
    throw new Error('网络错误，请检查连接')
  }

  if (res.status === 401) {
    // 防止并发 401 导致重定向链嵌套
    if (!window.location.hash.startsWith('#/login')) {
      const current = window.location.hash || '#/'
      window.location.hash = '#/login?redirect=' + encodeURIComponent(current)
    }
    throw new Error('请先登录')
  }

  if (res.status === 429) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || '请求过于频繁')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || `请求失败 (${res.status})`)
  }

  return res.json()
}

export const api = {
  // 认证
  login: (password) => request('/login', { method: 'POST', body: { password } }),
  logout: () => request('/logout', { method: 'POST' }),
  check: () => request('/check'),

  // 文档
  getDocuments: (params) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/documents?${qs}`)
  },
  getDocument: (id, dir) => request(`/documents/${id}?dir=${dir}`),
  createDocument: (data) => request('/documents', { method: 'POST', body: data }),
  updateDocument: (id, data) => request(`/documents/${id}`, { method: 'PUT', body: data }),
  deleteDocument: (id, dir) => request(`/documents/${id}`, { method: 'DELETE', body: { dir } }),
  getHistory: (id, dir) => request(`/documents/${id}/history?dir=${dir}`),

  // 侧边栏
  getSidebar: (dir) => request(`/sidebar?dir=${dir}`),
  saveSidebar: (data) => request('/sidebar', { method: 'PUT', body: data }),
  addSidebarNode: (data) => request('/sidebar/node', { method: 'POST', body: data }),
  updateSidebarNode: (nodeId, data) => request(`/sidebar/node/${nodeId}`, { method: 'PUT', body: data }),
  deleteSidebarNode: (nodeId, dir) => request(`/sidebar/node/${nodeId}`, { method: 'DELETE', body: { dir } }),
  moveSidebarNode: (nodeId, dir, direction) =>
    request('/sidebar/node/move', { method: 'POST', body: { nodeId, dir, direction } }),

  // 图片
  getImages: (params) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/images?${qs}`)
  },
  uploadImage: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`${BASE}/images/upload`, { method: 'POST', body: formData, credentials: 'same-origin' })
    if (res.status === 401 && !window.location.hash.startsWith('#/login')) window.location.hash = '#/login'
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || '上传失败')
    }
    return res.json()
  },
  deleteImage: (filename) => request(`/images/${encodeURIComponent(filename)}`, { method: 'DELETE' }),

  // 构建
  getBuildStatus: () => request('/build/status'),
}
