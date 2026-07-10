/**
 * 应用入口 - 创建 Vue 3 应用
 */
import LoginView from './views/LoginView.js'
import DashboardView from './views/DashboardView.js'
import DocumentList from './views/DocumentList.js'
import DocumentEdit from './views/DocumentEdit.js'
import SidebarManage from './views/SidebarManage.js'
import ImageManage from './views/ImageManage.js'
import AdminLayout from './components/AdminLayout.js'

const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

const routes = [
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
      { path: 'images', component: ImageManage },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 全局认证守卫
router.beforeEach(async (to) => {
  if (to.meta.noAuth) return true

  try {
    await fetch('/api/admin/check', { credentials: 'same-origin' })
    return true
  } catch {
    return '/login?redirect=' + encodeURIComponent(to.fullPath)
  }
})

const app = createApp({ template: '<router-view />' })
app.use(router)
app.mount('#app')
