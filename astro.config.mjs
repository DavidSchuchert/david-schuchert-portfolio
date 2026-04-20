import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://david-schuchert.de',
  integrations: [tailwind(), sitemap()],
  compressHTML: true,
  build: {
    // Inline small stylesheets for faster rendering
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Rollup output configuration
      rollupOptions: {
        output: {
          // Asset names with content hash for cache busting
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'chunks/[name].[hash].js',
        },
      },
    },
  },
});