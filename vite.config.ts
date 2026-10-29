import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'motion', test: /[\\/]node_modules[\\/]motion[\\/]/ },
            { name: 'core-vendor', test: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router-dom|@remix-run|zustand|date-fns|react-hook-form|@hookform|zod)[\\/]/ },
            { name: 'vendor', test: /[\\/]node_modules[\\/]/ },
          ],
        },
      },
    },
  },
})
