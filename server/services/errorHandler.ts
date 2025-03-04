import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from './logger';

// Extended error types for better error handling
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR = 'DATABASE_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  THIRD_PARTY_API_ERROR = 'THIRD_PARTY_API_ERROR'
}

interface ErrorDetails {
  [key: string]: any;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code: ErrorCode = ErrorCode.INTERNAL_ERROR,
    public details: ErrorDetails = {},
    public isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /**
   * Create a 400 Bad Request error
   */
  static badRequest(message: string, details: ErrorDetails = {}): AppError {
    return new AppError(400, message, ErrorCode.BAD_REQUEST, details);
  }

  /**
   * Create a 401 Unauthorized error
   */
  static unauthorized(message: string = 'Unauthorized', details: ErrorDetails = {}): AppError {
    return new AppError(401, message, ErrorCode.UNAUTHORIZED, details);
  }

  /**
   * Create a 403 Forbidden error
   */
  static forbidden(message: string = 'Forbidden', details: ErrorDetails = {}): AppError {
    return new AppError(403, message, ErrorCode.FORBIDDEN, details);
  }

  /**
   * Create a 404 Not Found error
   */
  static notFound(message: string = 'Resource not found', details: ErrorDetails = {}): AppError {
    return new AppError(404, message, ErrorCode.NOT_FOUND, details);
  }

  /**
   * Create a 429 Too Many Requests error
   */
  static rateLimitExceeded(message: string = 'Rate limit exceeded', details: ErrorDetails = {}): AppError {
    return new AppError(429, message, ErrorCode.RATE_LIMIT_EXCEEDED, details);
  }

  /**
   * Create a 500 Internal Server Error
   */
  static internal(message: string = 'Internal server error', details: ErrorDetails = {}): AppError {
    return new AppError(500, message, ErrorCode.INTERNAL_ERROR, details, true);
  }

  /**
   * Create a 503 Service Unavailable error
   */
  static serviceUnavailable(message: string = 'Service unavailable', details: ErrorDetails = {}): AppError {
    return new AppError(503, message, ErrorCode.SERVICE_UNAVAILABLE, details);
  }

  /**
   * Create a Database error
   */
  static database(message: string, details: ErrorDetails = {}): AppError {
    return new AppError(500, message, ErrorCode.DATABASE_ERROR, details);
  }

  /**
   * Create a Third Party API error
   */
  static thirdPartyApi(message: string, details: ErrorDetails = {}): AppError {
    return new AppError(502, message, ErrorCode.THIRD_PARTY_API_ERROR, details);
  }
}

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract useful request information for logging
  const requestInfo = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent') || 'unknown'
  };

  // Handle AppError instances with proper status codes and formatted responses
  if (err instanceof AppError) {
    // Log operational errors as warnings, programming errors as errors
    if (err.isOperational) {
      logger.warn(`${err.code}: ${err.message}`, { 
        ...requestInfo, 
        statusCode: err.statusCode,
        errorDetails: err.details
      });
    } else {
      logger.error(`Unexpected ${err.code}: ${err.message}`, err, { 
        ...requestInfo, 
        statusCode: err.statusCode,
        errorDetails: err.details
      });
    }

    return res.status(err.statusCode).json({
      status: 'error',
      code: err.code,
      message: err.message,
      details: Object.keys(err.details).length > 0 ? err.details : undefined,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    logger.warn('Validation Error', { ...requestInfo, zodErrors: err.errors });
    
    return res.status(400).json({
      status: 'error',
      code: ErrorCode.VALIDATION_ERROR,
      message: 'Validation Error',
      details: {
        errors: err.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      }
    });
  }

  // Handle unknown errors
  const statusCode = 500;
  logger.error('Unhandled server error', err, requestInfo);

  // In production, don't expose error details
  const isProd = process.env.NODE_ENV === 'production';
  
  res.status(statusCode).json({
    status: 'error',
    code: ErrorCode.INTERNAL_ERROR,
    message: isProd ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      name: err.name
    })
  });
};