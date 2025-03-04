import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema"; // Assuming this schema is compatible with node-postgres

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Create drizzle instance
export const db = drizzle(pool, { schema });

// Health check function
export async function getDbHealth() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    return { 
      healthy: true, 
      message: `Database connected, current time: ${result.rows[0].current_time}` 
    };
  } catch (err) {
    return { 
      healthy: false, 
      message: err instanceof Error ? err.message : 'Unknown database error' 
    };
  } finally {
    if (client) client.release();
  }
}

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

export default db;