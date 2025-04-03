import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    outDir: 'build', // Ensure Vercel is deploying from 'dist'
  },
})
