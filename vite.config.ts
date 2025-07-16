import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          // 将React相关库分离到vendor chunk
          vendor: ['react', 'react-dom'],
          // 将路由相关库分离
          router: ['react-router-dom'],
          // 将Markdown相关库分离
          markdown: ['react-markdown', 'react-syntax-highlighter'],
          // 将搜索库分离
          search: ['fuse.js'],
        },
      },
    },
    // 启用压缩
    minify: 'terser',
    // 生成source map用于调试
    sourcemap: false,
    // 设置chunk大小警告限制
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
