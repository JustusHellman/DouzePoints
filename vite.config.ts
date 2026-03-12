import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';

const buildHash = new Date().toISOString();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'sw-hash-injection',
      closeBundle() {
        const swPath = './dist/sw.js';
        if (fs.existsSync(swPath)) {
          let content = fs.readFileSync(swPath, 'utf-8');
          content = content.replace(/__BUILD_HASH__/g, buildHash);
          fs.writeFileSync(swPath, content);
          console.log('Injected build hash into sw.js:', buildHash);
        }
      }
    }
  ],
  define: {
    '__BUILD_DATE__': JSON.stringify(buildHash),
  },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
  }
});