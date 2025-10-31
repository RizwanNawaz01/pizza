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
    transpile: ['@prisma/client']  // Process Prisma code properly
  },

  // Nitro configuration - FIXED
  nitro: {
    preset: 'vercel',
    // Include Prisma in the bundle instead of excluding it
    externals: {
      inline: ['@prisma/client']  // This ensures Prisma is bundled
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