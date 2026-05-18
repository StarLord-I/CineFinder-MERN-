import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    open: '/Applications/Google Chrome.app'
  },

  build: {
    target: 'es2015',
    cssTarget: 'chrome61'
  }
})