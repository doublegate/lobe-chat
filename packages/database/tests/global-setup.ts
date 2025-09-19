import { Pool } from 'pg';

export default async function globalSetup() {
  console.log('🔧 Setting up global database test environment...');

  const connectionString = process.env.DATABASE_TEST_URL;

  if (!connectionString) {
    throw new Error('DATABASE_TEST_URL environment variable is required for database tests');
  }

  console.log('📡 Testing database connectivity...');

  const clientInitialValue = null as Pool | null;
  const retriesInitialValue = 5;
  const connectedInitialValue = false;

  let client = clientInitialValue;
  let retries = retriesInitialValue;
  let connected = connectedInitialValue;

  while (retries > 0 && !connected) {
    try {
      client = new Pool({
        connectionString,

        connectionTimeoutMillis: 10_000,

        idleTimeoutMillis: 10_000,
        // Add connection pool limits to prevent hanging
        max: 10,
        query_timeout: 30_000,
        statement_timeout: 30_000,
      });

      // Test the connection with a simple query
      const startTime = Date.now();
      const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
      const duration = Date.now() - startTime;

      console.log(`✅ Database connected successfully in ${duration}ms`);
      console.log(`📊 PostgreSQL version: ${result.rows[0].pg_version}`);
      console.log(`⏰ Current database time: ${result.rows[0].current_time}`);

      connected = true;
    } catch (error) {
      retries--;
      const err = error as Error;
      console.warn(`⚠️ Database connection attempt failed (${5 - retries}/5):`, err.message);

      if (retries > 0) {
        console.log(`🔄 Retrying in 2 seconds...`);
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      } else {
        throw new Error(`❌ Failed to connect to database after 5 attempts: ${err.message}`);
      }
    } finally {
      if (client) {
        try {
          await client.end();
        } catch (closeError) {
          const closeErr = closeError as Error;
          console.warn('Warning: Error closing test connection:', closeErr.message);
        }
      }
    }
  }

  console.log('🚀 Global database setup completed successfully');
}
