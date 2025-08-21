import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: './build',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'views', replacement: '/src/views' },
      { find: 'components', replacement: '/src/components' },
    ],
  },
  server: {
    open: true,
  },
  define: {},
});
