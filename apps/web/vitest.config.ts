import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    exclude: ['**/node_modules/**', '**/tests/e2e/**'],
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 80,
        functions: 80,
      },
      exclude: ['tests/**', '.next/**', 'node_modules/**'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '@propfreela/db': resolve(__dirname, '../../packages/db/src/index.ts'),
      '@propfreela/validators': resolve(
        __dirname,
        '../../packages/validators/src/index.ts',
      ),
      '@propfreela/ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
      '@propfreela/pdf': resolve(__dirname, '../../packages/pdf/src/index.ts'),
    },
  },
})
