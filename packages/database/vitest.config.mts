import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: {
    exclude: ['crypto', 'util', 'tty'],
    include: ['@lobehub/tts'],
  },
  test: {
    alias: {
      /* eslint-disable sort-keys-fix/sort-keys-fix */
      '@/const': resolve(__dirname, '../const/src'),
      '@/utils/errorResponse': resolve(__dirname, '../../src/utils/errorResponse'),
      '@/utils': resolve(__dirname, '../utils/src'),
      '@/database': resolve(__dirname, '../database/src'),
      '@/libs/model-runtime': resolve(__dirname, '../model-runtime/src'),
      '@/types': resolve(__dirname, '../types/src'),
      '@': resolve(__dirname, '../../src'),
      /* eslint-enable */
    },
    environment: 'happy-dom',
    include: [
      'src/client/**/*.test.*',
      'src/models/**/*.test.*',
      'src/repositories/**/*.test.*',
      'src/utils/**/*.test.*',
    ],
    exclude: [
      'node_modules/**/**',
      'src/server/**/*',
      'src/repositories/dataImporter/deprecated/**/**',
    ],
    // Client test environment configuration
    env: {
      DATABASE_DRIVER: 'pglite',
      NEXT_PUBLIC_SERVICE_MODE: 'client',
    },
    // Add test timeout configuration for client tests (PGLite)
    testTimeout: 60000, // 60 seconds per test
    hookTimeout: 30000, // 30 seconds for setup/teardown hooks
    poolOptions: {
      forks: {
        singleFork: true,
        // Add timeout for fork processes
        execArgv: ['--max-old-space-size=4096'],
      },
    },
    // Add test retries for flaky client tests
    retry: 2,
    // Add test isolation settings
    isolate: true,
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
    },
    setupFiles: './tests/setup-db.ts',
  },
});
