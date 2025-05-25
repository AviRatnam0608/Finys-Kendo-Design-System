import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'FinysComponents',
      fileName: () => 'finys-components.js',
      formats: ['es'], // Use 'es' for modern browsers
    },
    rollupOptions: {
      // Prevent bundling of external dependencies (optional)
      external: [],
    },
  },
});
