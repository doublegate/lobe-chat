// Import environment configuration
import * as dotenv from 'dotenv';
/**
 * Mock indexedDB to test with dexie
 * Reference: https://github.com/dumbmatter/fakeIndexedDB#dexie-and-other-indexeddb-api-wrappers
 */
import 'fake-indexeddb/auto';
import { afterAll, beforeAll } from 'vitest';

dotenv.config();

// Global test timeouts and cleanup
beforeAll(async () => {
  console.log('🔧 Setting up database tests...');

  // Verify environment variables
  if (process.env.TEST_SERVER_DB === '1' && !process.env.DATABASE_TEST_URL) {
    throw new Error('DATABASE_TEST_URL is required when TEST_SERVER_DB=1');
  }

  console.log('✅ Database test setup completed');
}, 30_000); // 30 second timeout for setup

afterAll(async () => {
  console.log('🧹 Cleaning up database tests...');

  // Give time for any hanging connections to timeout
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1000);
  });

  console.log('✅ Database test cleanup completed');
}, 10_000); // 10 second timeout for cleanup
