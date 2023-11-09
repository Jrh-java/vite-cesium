import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'; 
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  server: {
    port: 3333,
    proxy: {
      '/api': {
        target: 'http://map.geoq.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/localhostapi': {
        target: 'http://47.98.133.36:8181',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/localhostapi/, ''),
      },
      '/localhost8080': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/localhost8080/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
