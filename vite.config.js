import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['amalia-stolid-chelsey.ngrok-free.dev'] // This allows ngrok and any other tunnel to work
  }
})