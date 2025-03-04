
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle, NeonDatabase } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon serverless to use WebSockets
neonConfig.webSocketConstructor = ws;

// Validate database URL is present
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Set up connection pooling with optimized configuration
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000, // How long to wait for a connection
  ssl: process.env.NODE_ENV === 'production' ? true : false, // Enable SSL in production
});

// Connection event handling for better monitoring
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Add basic health metrics
let totalQueries = 0;
let failedQueries = 0;

const originalConnect = pool.connect;
pool.connect = function(...args: any[]) {
  totalQueries++;
  return originalConnect.apply(this, args)
    .catch((err: any) => {
      failedQueries++;
      console.error('Database connection error:', err.message);
      throw err;
    });
};

// Create drizzle instance with our schema
export const db: NeonDatabase<typeof schema> = drizzle({
  client: pool, 
  schema
});

// Export health check function for monitoring
export const getDbHealth = () => {
  return {
    totalQueries,
    failedQueries,
    successRate: totalQueries > 0 ? ((totalQueries - failedQueries) / totalQueries) * 100 : 100,
    poolSize: pool.totalCount,
    idleConnections: pool.idleCount,
    waitingClients: pool.waitingCount
  };
};

// Create a transaction helper
export const transaction = async <T>(callback: (tx: NeonDatabase<typeof schema>) => Promise<T>): Promise<T> => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const tx = drizzle({ client, schema });
    const result = await callback(tx);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Setup connection testing on startup
(async function testConnection() {
  let retries = 5;
  while (retries > 0) {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT NOW() as current_time');
      client.release();
      console.log('Database connection successful:', result.rows[0].current_time);
      return;
    } catch (err) {
      console.error(`Database connection attempt failed (${retries} retries left):`, err);
      retries--;
      if (retries === 0) {
        console.error('Could not connect to database after multiple attempts');
        // Don't exit process here - let the application decide how to handle this
      } else {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
})();
