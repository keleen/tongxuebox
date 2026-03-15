// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  // 禁用 Google Fonts 模块以避免网络访问问题
  // 完全禁用暗黑模式
  ui: {
    fonts: false,
    colorMode: false, // 完全禁用 @nuxtjs/color-mode 模块
  },

  // SPA 模式 - 完全静态
  ssr: false,

  // 或者使用 SSG 模式（推荐）
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  app: {
    head: {
      title: '童学宝盒 - 让学习变得简单又有趣',
      meta: [
        {
          name: 'description',
          content: '免费生成可打印的字帖、数学题、简笔画和乐谱，专为小学生设计',
        },
      ],
    },
  },
});
