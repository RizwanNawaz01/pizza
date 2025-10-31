// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // Remove all Prisma transpilation - we'll use Data Proxy instead
  build: {
    // Remove '@prisma/client' from transpile
  },

  nitro: {
    preset: 'vercel',
    // Remove all externals configuration
  },

  modules: ['@nuxt/image', '@nuxt/icon','@pinia/nuxt'], 
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  },
})