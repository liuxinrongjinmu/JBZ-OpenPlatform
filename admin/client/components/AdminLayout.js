/**
 * 管理后台布局：左侧菜单 + 顶部标题栏 + 内容区
 */
import { api } from '../api/index.js'

export default {
  name: 'AdminLayout',
  template: `
    <div style="display:flex;height:100vh;">
      <!-- 左侧菜单 -->
      <aside style="width:220px;background:#1e293b;color:#e2e8f0;display:flex;flex-direction:column;flex-shrink:0;">
        <div style="padding:20px 16px;font-size:16px;font-weight:700;border-bottom:1px solid #334155;">
          管理后台
        </div>
        <nav style="flex:1;overflow-y:auto;padding:8px 0;">
          <a href="#/" style="display:block;padding:10px 20px;color:#94a3b8;font-size:14px;transition:all .2s;"
             :style="activeRoute === '' ? 'color:#fff;background:#334155;' : ''"
             @mouseover="hoverNav($event, true)" @mouseleave="hoverNav($event, false)">
            仪表盘
          </a>
          <div v-for="dir of dirs" :key="dir.key">
            <div style="padding:8px 20px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-top:8px;">
              {{ dir.label }}
            </div>
            <a v-for="item of dir.items" :href="item.href"
               style="display:block;padding:10px 20px;color:#94a3b8;font-size:14px;transition:all .2s;"
               :style="activeRoute === item.active ? 'color:#fff;background:#334155;' : ''"
               @mouseover="hoverNav($event, true)" @mouseleave="hoverNav($event, false)">
              {{ item.text }}
            </a>
          </div>
        </nav>
        <div style="padding:12px 16px;border-top:1px solid #334155;">
          <a href="#/login" @click="doLogout" style="color:#ef4444;font-size:13px;">退出登录</a>
        </div>
      </aside>
      <!-- 右侧内容 -->
      <main style="flex:1;overflow-y:auto;background:#f5f7fa;">
        <header style="background:#fff;padding:0 24px;height:56px;display:flex;align-items:center;border-bottom:1px solid #e5e7eb;gap:16px;">
          <h2 style="font-size:18px;font-weight:600;">{{ pageTitle }}</h2>
          <span style="color:#9ca3af;font-size:13px;flex:1;"></span>
          <a :href="siteUrl" target="_blank" style="font-size:13px;color:#3b82f6;">查看文档站点 &rarr;</a>
        </header>
        <div style="padding:24px;">
          <router-view />
        </div>
      </main>
    </div>
  `,
  data() {
    return {
      siteUrl: window.location.origin + '/',
      dirs: [
        {
          key: 'merchant',
          label: '商家版',
          items: [
            { text: '文档列表', href: '#/documents/merchant', active: 'documents/merchant' },
            { text: '侧边栏管理', href: '#/sidebar/merchant', active: 'sidebar/merchant' },
          ],
        },
        {
          key: 'supplier',
          label: '供应商版',
          items: [
            { text: '文档列表', href: '#/documents/supplier', active: 'documents/supplier' },
            { text: '侧边栏管理', href: '#/sidebar/supplier', active: 'sidebar/supplier' },
          ],
        },
        {
          key: 'common',
          label: '通用',
          items: [
            { text: '图片管理', href: '#/images', active: 'images' },
          ],
        },
      ],
    }
  },
  computed: {
    activeRoute() {
      const hash = this.$route.path
      if (hash === '/') return ''
      if (hash.startsWith('/documents/')) return 'documents/' + hash.split('/')[2]
      if (hash.startsWith('/sidebar/')) return 'sidebar/' + hash.split('/')[2]
      if (hash.startsWith('/images')) return 'images'
      return ''
    },
    pageTitle() {
      const map = {
        '': '仪表盘',
        '/documents/merchant': '商家版文档',
        '/documents/supplier': '供应商版文档',
        '/sidebar/merchant': '商家版侧边栏',
        '/sidebar/supplier': '供应商版侧边栏',
        '/images': '图片管理',
      }
      if (this.$route.path.startsWith('/documents/') && this.$route.path.endsWith('/new')) return '新建文档'
      if (this.$route.path.includes('/edit/')) return '编辑文档'
      return map[this.$route.path] || '管理后台'
    },
  },
  methods: {
    hoverNav(e, enter) {
      if (!enter) e.target.style.backgroundColor = ''
      else if (e.target.style.color !== 'rgb(255, 255, 255)') {
        e.target.style.backgroundColor = '#1e3a5f'
      }
    },
    async doLogout(e) {
      e.preventDefault()
      try { await api.logout() } catch {}
      window.location.hash = '#/login'
    },
  },
}
