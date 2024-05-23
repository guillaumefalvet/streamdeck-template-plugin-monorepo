import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    emptyOutDir: true,
    outDir: "../com.falvet-guillaume.template-plugin-ws.sdPlugin/bin/pi",
  },
})
