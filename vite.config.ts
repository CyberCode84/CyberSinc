import {defineConfig} from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: false,
    watch: null
  },
  build: {
    outDir: 'dist',
  }
});
