/**
 * 登录页
 */
import { api } from '../api/index.js'

export default {
  name: 'LoginView',
  template: `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,#1e293b,#334155);">
      <div style="background:#fff;border-radius:12px;padding:40px;width:400px;box-shadow:0 20px 60px rgba(0,0,0,.3);">
        <h1 style="font-size:24px;font-weight:700;text-align:center;margin-bottom:8px;color:#1e293b;">管理后台</h1>
        <p style="text-align:center;color:#9ca3af;font-size:14px;margin-bottom:32px;">聚宝赞开放平台文档管理</p>
        <div style="margin-bottom:20px;">
          <label style="display:block;font-size:14px;font-weight:500;margin-bottom:6px;color:#374151;">管理员密码</label>
          <input v-model="password" type="password"
                 style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;outline:none;"
                 :style="error ? 'border-color:#ef4444;' : ''"
                 placeholder="请输入密码" @keyup.enter="doLogin" />
        </div>
        <div v-if="error" style="color:#ef4444;font-size:13px;margin-bottom:12px;">{{ error }}</div>
        <button @click="doLogin" :disabled="loading"
                style="width:100%;padding:12px;background:#3b82f6;color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;"
                :style="loading ? 'opacity:.6;cursor:not-allowed;' : ''">
          {{ loading ? '登录中...' : '登 录' }}
        </button>
        <div v-if="redirect" style="margin-top:16px;text-align:center;font-size:13px;color:#6b7280;">
          登录后自动跳转到目标页面
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      password: '',
      error: '',
      loading: false,
      redirect: '',
    }
  },
  mounted() {
    this.redirect = this.$route.query.redirect || ''
  },
  methods: {
    async doLogin() {
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
    },
  },
}
