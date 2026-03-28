import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],

  /* Use '/' if deploying to Vercel, otherwise use './' for local preview.
  This ensures custom 404s trigger correctly on nested paths (e.g., folder/subfolder/)
  instead of loading a broken layout. */
  base: process.env.VERCEL ? '/' : './',
})
