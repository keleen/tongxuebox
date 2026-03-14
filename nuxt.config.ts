// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SPA 模式 - 完全静态
  ssr: false,

  // 或者使用 SSG 模式（推荐）
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
});
