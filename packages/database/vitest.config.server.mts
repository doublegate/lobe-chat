import { resolve } from 'node:path';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
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
    coverage: {
      all: false,
      exclude: [
        // https://github.com/lobehub/lobe-chat/pull/7265
        ...coverageConfigDefaults.exclude,
        'src/server/core/dbForTest.ts',
      ],
      include: ['src/models/**/*.ts', 'src/server/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'json', 'lcov', 'text-summary'],
    },
    env: {
      TEST_SERVER_DB: '1',
    },
    environment: 'node',
    // Add test timeout configuration to prevent infinite hanging
    testTimeout: 60000, // 60 seconds per test
    hookTimeout: 30000, // 30 seconds for setup/teardown hooks
    // Add global timeout for the entire test suite
    globalSetup: './tests/global-setup.ts',
    globalTeardown: './tests/global-teardown.ts',
    poolOptions: {
      forks: {
        singleFork: true,
        // Add timeout for fork processes
        execArgv: ['--max-old-space-size=4096'],
      },
    },
    setupFiles: './tests/setup-db.ts',
    // Add test retries for flaky database connections
    retry: 2,
    // Add test isolation settings
    isolate: true,
  },
});
