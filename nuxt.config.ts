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

  // Build configuration - FIXED
  build: {
    transpile: ['@prisma/client']
  },

  // Nitro configuration - FIXED
  nitro: {
    preset: 'vercel',
    // Bundle Prisma instead of externalizing it
    externals: {
      inline: ['@prisma/client']
    }
  },

  modules: ['@nuxt/image', '@nuxt/icon','@pinia/nuxt'], 
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    
    // Public keys (exposed to client)
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  },
})