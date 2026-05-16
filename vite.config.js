import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'speed-insights.js'),
      name: 'SpeedInsights',
      fileName: 'speed-insights',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'speed-insights.js',
      }
    }
  }
});
