import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: false, // JS nicht minimieren
    cssMinify: false, // CSS ebenfalls nicht (optional)
    sourcemap: true, // optional, hilfreich beim Debuggen
  },
});
