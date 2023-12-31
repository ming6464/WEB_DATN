import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: { 'process.env' : {
    VITE_API : process.env.VITE_API
  }},
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
