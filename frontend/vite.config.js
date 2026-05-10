import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This "activates" Tailwind v4
  ],
   
   build: {
    // This tells Vite to make the code readable for older mobile browsers
    target: 'es2015', 
    // This ensures Tailwind v4 features work on mobile Safari/Chrome
    cssTarget: 'chrome61' 
  }
})