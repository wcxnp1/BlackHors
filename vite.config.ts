import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: true,
      proxy: {
        [env.VITE_APP_TITLE]: {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_TITLE), '')
        }
      }
    }
  }
})
