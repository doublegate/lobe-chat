import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless';
import * as migrator from 'drizzle-orm/neon-serverless/migrator';
import { drizzle as nodeDrizzle } from 'drizzle-orm/node-postgres';
import * as nodeMigrator from 'drizzle-orm/node-postgres/migrator';
import { join } from 'node:path';
import { Pool as NodePool } from 'pg';
import ws from 'ws';

import { serverDBEnv } from '@/config/db';

import * as schema from '../schemas';

const migrationsFolder = join(__dirname, '../../migrations');

export const getTestDBInstance = async () => {
  let connectionString = serverDBEnv.DATABASE_TEST_URL;

  if (!connectionString) {
    throw new Error(`You are try to use database, but "DATABASE_TEST_URL" is not set correctly`);
  }

  console.log('🔄 Initializing test database instance...');

  if (serverDBEnv.DATABASE_DRIVER === 'node') {
    const client = new NodePool({
      connectionString,

      connectionTimeoutMillis: 10_000,

      idleTimeoutMillis: 10_000,
      // Add connection pool configuration to prevent hanging
      max: 10,
      query_timeout: 30_000,
      statement_timeout: 30_000,
    });

    // Test connection before proceeding
    try {
      await client.query('SELECT 1 as test');
      console.log('✅ Database connection verified');
    } catch (error) {
      const err = error as Error;
      console.error('❌ Database connection test failed:', err.message);
      throw new Error(`Database connection failed: ${err.message}`);
    }

    const db = nodeDrizzle(client, { schema });

    console.log('🔄 Running database migrations...');
    try {
      await Promise.race([
        nodeMigrator.migrate(db, { migrationsFolder }),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Migration timeout after 30 seconds')), 30_000);
        }),
      ]);
      console.log('✅ Database migrations completed');
    } catch (error) {
      const err = error as Error;
      console.error('❌ Database migration failed:', err.message);
      throw new Error(`Migration failed: ${err.message}`);
    }

    return db;
  }

  // Configuration for neon serverless WebSocket - see Neon docs
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  neonConfig.webSocketConstructor = ws;

  const client = new NeonPool({
    connectionString,
    // Add connection timeout for Neon
    connectionTimeoutMillis: 15_000,
  });

  const db = neonDrizzle(client, { schema });

  console.log('🔄 Running database migrations (Neon)...');
  try {
    await Promise.race([
      migrator.migrate(db, { migrationsFolder }),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Migration timeout after 30 seconds')), 30_000);
      }),
    ]);
    console.log('✅ Database migrations completed (Neon)');
  } catch (error) {
    const err = error as Error;
    console.error('❌ Database migration failed (Neon):', err.message);
    throw new Error(`Migration failed: ${err.message}`);
  }

  return db;
};
