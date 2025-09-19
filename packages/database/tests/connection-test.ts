import { describe, expect, it } from 'vitest';

import { getTestDBInstance } from '../src/core/dbForTest';

/**
 * Basic database connection and functionality test
 * This test verifies that the database connection works without hanging
 */
describe('Database Connection Test', () => {
  it(
    'should connect to database without hanging',
    async () => {
      console.log('🧪 Testing database connection...');

      const startTime = Date.now();
      const db = await getTestDBInstance();
      const connectionTime = Date.now() - startTime;

      console.log(`✅ Database connected in ${connectionTime}ms`);

      // Verify we can run a simple query
      const result = await db.execute('SELECT 1 as test_value');
      expect(result.rows).toBeDefined();
      expect(result.rows.length).toBeGreaterThan(0);

      console.log('✅ Database query executed successfully');
    },
    { timeout: 30_000 },
  ); // 30 second timeout for this test

  it(
    'should handle database queries with reasonable performance',
    async () => {
      console.log('🚀 Testing database query performance...');

      const db = await getTestDBInstance();

      const startTime = Date.now();
      await db.execute('SELECT NOW(), version()');
      const queryTime = Date.now() - startTime;

      console.log(`⚡ Query executed in ${queryTime}ms`);

      // Ensure queries complete within reasonable time (not hanging)
      expect(queryTime).toBeLessThan(5000); // 5 seconds max
    },
    { timeout: 30_000 },
  );
});
