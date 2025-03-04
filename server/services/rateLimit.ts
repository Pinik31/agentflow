/**
 * Rate limiting service for API protection
 * Implements configurable rate limiting for different routes
 */
import { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';
import { logger } from './logger';
import { AppError, ErrorCode } from './errorHandler';

/**
 * Configuration interface for rate limiting
 */
interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
  skipSuccessfulRequests?: boolean;
  keyGenerator?: (req: Request) => string;
}

/**
 * Create a rate limiter middleware with custom configuration
 */
export const createRateLimiter = (config: Partial<RateLimitConfig> = {}) => {
  const defaultMessage = 'Too many requests from this IP, please try again later.';
  
  // Default configuration
  const defaultConfig: RateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: defaultMessage,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skipSuccessfulRequests: false, // count all requests
    keyGenerator: (req: Request) => {
      // Use X-Forwarded-For header if available (for proxied requests)
      const ip = req.ip || 
                req.headers['x-forwarded-for'] as string || 
                req.socket.remoteAddress || 
                'unknown';
                
      return ip;
    }
  };
  
  // Merge with custom config
  const mergedConfig = { ...defaultConfig, ...config };
  
  // Create and return the rate limiter
  return rateLimit({
    windowMs: mergedConfig.windowMs,
    max: mergedConfig.max,
    message: { 
      status: 'error',
      code: ErrorCode.RATE_LIMIT_EXCEEDED,
      message: mergedConfig.message || defaultMessage
    },
    standardHeaders: mergedConfig.standardHeaders,
    legacyHeaders: mergedConfig.legacyHeaders,
    skipSuccessfulRequests: mergedConfig.skipSuccessfulRequests,
    keyGenerator: mergedConfig.keyGenerator,
    handler: (req: Request, res: Response, next: NextFunction, options: any) => {
      // Log rate limit hit
      logger.warn('Rate limit exceeded', { 
        ip: req.ip, 
        path: req.path,
        userAgent: req.get('user-agent') || 'unknown',
        headers: req.headers,
      });
      
      // Send error response
      next(AppError.rateLimitExceeded(options.message?.message || defaultMessage));
    }
  });
};

/**
 * Standard rate limiters for different endpoints
 */
export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
});

export const authLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 login attempts per hour
  message: 'Too many login attempts, please try again later.'
});

export const webhookLimiter = createRateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute for webhooks
});

export const contactFormLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 contact form submissions per hour per IP
  message: 'Too many contact form submissions, please try again later.',
});

export const newsletterLimiter = createRateLimiter({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3, // 3 newsletter signups per day per IP
  message: 'Maximum newsletter signup attempts reached, please try again tomorrow.'
});