import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:5001,
    proxy:5000,
  },
  // build: {
  //   outDir: 'dist',
  //   emptyOutDir: true
  // },
});
