import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // en github pages la pagina queda en usuario.github.io/dulce-realeza/
  base: '/dulce-realeza/',
})
