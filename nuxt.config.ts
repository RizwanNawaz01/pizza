// https://nuxt.com/docs/api/configuration/nuxt-config
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

  nitro: {
    // Completely externalize Prisma
    externals: {
      inline: []
    },
    alias: {
      '.prisma/client': './.prisma/client'
    },
    moduleSideEffects: [
      '@prisma/client'
    ],
    rollupConfig: {
      external: ['@prisma/client', '.prisma/client']
    }
  },

  // Add this hook to force externalization
  hooks: {
    'nitro:config': (nitroConfig) => {
      nitroConfig.externals = nitroConfig.externals || {}
      nitroConfig.externals.inline = nitroConfig.externals.inline || []
      // Remove @prisma/client from inline if it exists
      nitroConfig.externals.inline = nitroConfig.externals.inline.filter(
        (i: string) => !i.includes('@prisma/client')
      )
      
      // Add to external
      if (!nitroConfig.rollupConfig) {
        nitroConfig.rollupConfig = {}
      }
      if (!nitroConfig.rollupConfig.external) {
        nitroConfig.rollupConfig.external = []
      }
      
      const external = nitroConfig.rollupConfig.external as string[]
      if (!external.includes('@prisma/client')) {
        external.push('@prisma/client')
      }
      if (!external.includes('.prisma/client')) {
        external.push('.prisma/client')
      }
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