import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/nestlir/portfolio/',
  publicDir: 'assets',
  build: { outDir: 'dist', emptyOutDir: true, sourcemap: false },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    globals: true
  }
});