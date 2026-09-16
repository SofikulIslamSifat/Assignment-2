import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Base URL for production deployments (use when hosted under a subpath)
  base: process.env.NODE_ENV === 'production' ? '/Assignment-2/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  }
})
