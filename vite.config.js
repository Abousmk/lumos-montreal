import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'three'
            if (id.includes('framer-motion')) return 'framer-motion'
            if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor'
          }
        },
      },
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    hmr: true,
    watch: {
      usePolling: true,
      interval: 800,
    },
  },
})
