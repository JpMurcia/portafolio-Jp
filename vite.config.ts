import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // El workflow de GitHub Actions (.github/workflows/deploy.yml) construye
  // dentro de GITHUB_ACTIONS=true; ahí el sitio se sirve bajo /portafolio-Jp/
  // (GitHub Pages de proyecto, no de usuario). Local dev/build/preview no se ven afectados.
  base: process.env.GITHUB_ACTIONS ? '/portafolio-Jp/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 6300,
  },
  preview: {
    port: 6300,
  },
})
