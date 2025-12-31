// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/test-utils", "@nuxt/hints", "@nuxtjs/i18n"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    plugins: [vuetify({ autoImport: true }), tailwindcss()],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: ["./app/assets/css/main.css"],
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fa", name: "Farsi", file: "fa.json" },
    ],
  },
});
