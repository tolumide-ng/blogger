import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    setupFiles: './vitest.setup.ts',
    environment: 'jsdom',
  },
});
