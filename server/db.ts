import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Create a PostgreSQL pool with connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  max: 20, // Maximum connection pool size
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000 // Return error after 10 seconds if can't connect
});

// Create drizzle instance with the PostgreSQL pool
const db = drizzle(pool);

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