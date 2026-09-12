import { defineConfig } from 'vitepress'
import sidebar from './sidebar.js'

// 开发/预览模式下的 /api/chat 代理：转发到本地 admin server（Express），
// 与生产环境链路一致（nginx → Express :3001 → MiniMax，含 RAG 增强）。
// 使用前需先启动：npm run admin:dev
const ADMIN_PORT = process.env.ADMIN_PORT || 3001
const chatProxy = {
  target: `http://127.0.0.1:${ADMIN_PORT}`,
  changeOrigin: true,
  secure: true,
}

export default defineConfig({
  title: '聚宝赞开放平台',
  description: '聚宝赞开放平台API文档',
  lang: 'zh-CN',
  cleanUrls: true,
  ignoreDeadLinks: [/^\/files\//],
  markdown: {
    linkify: false,
    config: (md) => {
      const defaultLinkOpen = md.renderer.rules.link_open
      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const href = token.attrGet('href')
        if (href && href.toLowerCase().endsWith('.xlsx')) {
          token.attrSet('download', '')
          token.attrSet('target', '_blank')
        }
        return defaultLinkOpen
          ? defaultLinkOpen(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }
    },
  },
  srcExclude: ['**/语雀API文档迁移/**', '**/docs-management/**', '**/.backup_before_reconstruct/**', '**/tools/**', '**/cache/**', '**/dist/**', '**/node_modules/**'],
  // 开发/预览模式下的 /api/chat 代理（生产环境由 nginx 处理），
  // 转发到本地 admin server（Express → MiniMax），需先启动 npm run admin:dev
  vite: {
    server: { proxy: { '/api/chat': chatProxy } },
    preview: { proxy: { '/api/chat': chatProxy } },
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '商家版', link: '/merchant/' },
      { text: '供应商版', link: '/supplier/' },
    ],
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
            },
          },
        },
      },
    },
    footer: {
      copyright: 'Copyright © 2024 长沙市希尚网络科技有限公司',
    },
    outline: {
      label: '本页目录',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '最后更新于',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  },
})
