// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-10-24",
  modules: [
    "@nuxt/icon",
    "@unocss/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
  ],
  ssr: false,
  devtools: { enabled: true },
  css: ["./app/app.css"],
  srcDir: "app",
  serverDir: "server",
  nitro: {
    experimental: {
      wasm: true,
    },
  },
  unocss: {
    nuxtLayers: true,
  },
  googleFonts: {
    families: {
      Inter: "200..700",
    },
  },
});
