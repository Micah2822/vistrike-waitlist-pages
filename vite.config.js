import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.replit.dev',
      '.worf.replit.dev',
      '.repl.co',
      '.replit.app',
      'tactiqspar.com',
      '.tactiqspar.com'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, '')
          const separator = newPath.includes('?') ? '&' : '?'
          return `${newPath}${separator}api_key=${process.env.APP_API_KEY || ''}`
        }
      }
    }
  }
})
