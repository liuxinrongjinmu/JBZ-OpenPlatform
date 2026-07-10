<!--
  VitePress 主题 Layout 扩展
  将 AIChat 注入到 layout-bottom 插槽，使其在所有页面右下角显示
-->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import AIChat from './components/AIChat.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <AIChat />
    </template>
  </Layout>
</template>
