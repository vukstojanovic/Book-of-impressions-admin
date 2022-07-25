import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
  plugins: [react(), eslint()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#f66702',
        },
        javascriptEnabled: true,
      },
    },
  },
})
