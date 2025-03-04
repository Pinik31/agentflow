/**
 * Database helper for optimizing database interactions
 */
import { Pool, QueryResult } from 'pg';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { dbLogger as logger } from './logger';
import { AppError, ErrorCode } from './errorHandler';
import * as schema from '@shared/schema';

// Postgres connection pool configuration with optimized settings
export const createDbPool = (connectionString: string): Pool => {
  const pool = new Pool({
    connectionString,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 5000, // Return an error after 5 seconds if connection could not be established
    maxUses: 7500, // Close and replace a connection after 7500 uses (prevents memory leaks)
  });

  // Log pool events for better monitoring
  pool.on('connect', () => {
    logger.debug('New database connection established');
  });

  pool.on('error', (err) => {
    logger.error('Unexpected error on idle database client', err);
  });

  // Verify database connection is working
  pool.query('SELECT NOW()')
    .then(() => logger.info('Database connection successful'))
    .catch(err => logger.error('Database connection failed', err));

  return pool;
};

// Enhance query function with logging and error handling
export const enhanceDb = (db: PostgresJsDatabase<typeof schema>) => {
  // Store original execute function
  const originalExecute = db.execute;

  // Override execute with enhanced version
  db.execute = async function<T>(query: any): Promise<T> {
    const startTime = performance.now();
    
    try {
      // Extract query info for logging
      const sqlQuery = typeof query === 'string' ? query : query.toSQL();
      const queryInfo = {
        sql: sqlQuery.sql || sqlQuery,
        params: sqlQuery.params || [],
      };
      
      // Log query execution
      logger.debug('Executing database query', {
        sql: queryInfo.sql.substring(0, 200) + (queryInfo.sql.length > 200 ? '...' : ''),
        paramCount: queryInfo.params?.length || 0,
      });
      
      // Execute the query
      const result = await originalExecute.apply(this, [query]);
      
      // Log query performance
      const duration = performance.now() - startTime;
      logger.debug(`Query executed in ${duration.toFixed(2)}ms`);
      
      return result;
    } catch (error: any) {
      // Enhanced error handling and logging
      const duration = performance.now() - startTime;
      
      logger.error('Database query error', error, {
        duration: `${duration.toFixed(2)}ms`,
        message: error.message,
        code: error.code,
      });
      
      // Transform database errors into AppErrors for consistent error handling
      const dbError = new AppError(
        500,
        `Database error: ${error.message}`,
        ErrorCode.DATABASE_ERROR,
        { code: error.code, constraint: error.constraint }
      );
      
      throw dbError;
    }
  };
  
  return db;
};

/**
 * Execute a query with automatic retries for transient errors
 */
export const executeWithRetry = async <T>(
  pool: Pool,
  query: string,
  params: any[] = [],
  maxRetries = 3
): Promise<QueryResult<T>> => {
  let lastError: any;
  let retryCount = 0;
  
  // Transient error codes that are safe to retry
  const RETRY_ERROR_CODES = [
    '08006', // Connection failure
    '08001', // Unable to connect
    '40001', // Serialization failure
    '40P01', // Deadlock detected
    '57P01', // Database not available
    '57P02', // Idle session timeout
    '57P03', // Cannot connect now
  ];
  
  while (retryCount < maxRetries) {
    try {
      const startTime = performance.now();
      const result = await pool.query<T>(query, params);
      const duration = performance.now() - startTime;
      
      logger.debug(`Query executed in ${duration.toFixed(2)}ms`, {
        rowCount: result.rowCount,
        queryText: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      });
      
      return result;
    } catch (error: any) {
      lastError = error;
      
      // Only retry on specific transient errors
      if (RETRY_ERROR_CODES.includes(error.code) && retryCount < maxRetries - 1) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 100; // Exponential backoff
        
        logger.warn(`Database error, retrying (${retryCount}/${maxRetries})`, {
          error: error.message,
          code: error.code,
          delay: `${delay}ms`,
        });
        
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }
  
  // If we got here, all retries failed
  logger.error('All database retries failed', lastError, {
    retryCount,
    queryText: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
  });
  
  throw new AppError(
    500,
    `Database error after ${retryCount} retries: ${lastError.message}`,
    ErrorCode.DATABASE_ERROR,
    { code: lastError.code, constraint: lastError.constraint }
  );
};