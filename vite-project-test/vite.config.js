import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url'; // Needed for URL resolution
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Alias '@' to the './src' directory
    },
  },
  plugins: [vue()],
});