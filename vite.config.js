import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configuration Vite : React + Tailwind CSS v4 (via le plugin officiel).
// `base: './'` rend le build déployable sous n'importe quel sous-chemin
// (ex. GitHub Pages : https://<utilisateur>.github.io/fridgy/).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
