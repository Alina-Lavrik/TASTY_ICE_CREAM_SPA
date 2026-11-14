import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { qrcode } from 'vite-plugin-qrcode'
import svgr from "vite-plugin-svgr";
import { vitePages } from '@kingironman2011/vite-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), qrcode(), svgr(), vitePages({ verbose: true })],
  base: '/TASTY_ICE_CREAM_SPA/', 
  server: {
    port: 4000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});


