/**
 * Advanced logging service for the Agent Flow application
 * Provides structured, consistent logging across the application
 */

interface LogMetadata {
  [key: string]: any;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private context: string;
  private defaultMetadata: LogMetadata;

  constructor(context: string = 'app', defaultMetadata: LogMetadata = {}) {
    this.context = context;
    this.defaultMetadata = defaultMetadata;
  }

  /**
   * Create a child logger with additional context and metadata
   */
  child(context: string, metadata: LogMetadata = {}): Logger {
    return new Logger(
      `${this.context}:${context}`,
      { ...this.defaultMetadata, ...metadata }
    );
  }

  /**
   * Format log message with timestamp, level, and context
   */
  private formatMessage(level: LogLevel, message: string, metadata: LogMetadata = {}): string {
    const timestamp = new Date().toISOString();
    const metadataString = Object.keys(metadata).length > 0 
      ? `\n${JSON.stringify({ ...this.defaultMetadata, ...metadata }, null, 2)}`
      : '';
    
    return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}${metadataString}`;
  }

  /**
   * Log debug level message
   */
  debug(message: string, metadata: LogMetadata = {}): void {
    if (process.env.NODE_ENV !== 'production' || process.env.LOG_LEVEL === 'debug') {
      console.debug(this.formatMessage('debug', message, metadata));
    }
  }

  /**
   * Log info level message
   */
  info(message: string, metadata: LogMetadata = {}): void {
    console.info(this.formatMessage('info', message, metadata));
  }

  /**
   * Log warning level message
   */
  warn(message: string, metadata: LogMetadata = {}): void {
    console.warn(this.formatMessage('warn', message, metadata));
  }

  /**
   * Log error level message
   */
  error(message: string, error?: Error, metadata: LogMetadata = {}): void {
    const errorMetadata = error 
      ? { 
          ...metadata, 
          errorName: error.name, 
          stack: error.stack,
          cause: (error as any).cause
        }
      : metadata;
    
    console.error(this.formatMessage('error', message, errorMetadata));
  }

  /**
   * Create a performance timer and return a function to end it
   */
  startTimer(operation: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.debug(`${operation} completed in ${duration.toFixed(2)}ms`);
    };
  }

  /**
   * Log API request with standardized format
   */
  logRequest(req: any, res: any, duration: number): void {
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;
    const userAgent = req.get('user-agent') || 'unknown';
    
    this.info(`${method} ${originalUrl} ${statusCode} ${duration.toFixed(2)}ms`, {
      method,
      url: originalUrl,
      statusCode,
      ip,
      duration,
      userAgent
    });
  }
}

// Create root logger instance
export const logger = new Logger('agent-flow');

// Create specialized loggers
export const apiLogger = logger.child('api');
export const dbLogger = logger.child('db');
export const authLogger = logger.child('auth');
export const whatsappLogger = logger.child('whatsapp');

// Helper function for measuring API performance
export const measureApiPerformance = (req: any, res: any, next: any) => {
  const start = performance.now();
  
  res.on('finish', () => {
    const duration = performance.now() - start;
    
    // Only log API requests, not static files or other requests
    if (req.originalUrl.startsWith('/api')) {
      apiLogger.logRequest(req, res, duration);
    }
  });
  
  next();
};