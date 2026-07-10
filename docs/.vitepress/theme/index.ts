/**
 * VitePress主题入口
 * 注册AIChat组件并注入到全局layout-bottom slot，使其在所有页面右下角显示
 */
import DefaultTheme from 'vitepress/theme'
import AIChat from './components/AIChat.vue'
import Layout from './Layout.vue'
import './style.css'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('AIChat', AIChat)
  },
} satisfies Theme
