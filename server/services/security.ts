/**
 * Security enhancements for the Agent Flow application
 */
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { logger } from './logger';
import { AppError, ErrorCode } from './errorHandler';

// CSP Configuration based on best practices
const cspConfig = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts for development
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  imgSrc: ["'self'", 'data:', 'blob:'],
  connectSrc: ["'self'", 'ws:', 'wss:'],
};

/**
 * Setup security middleware
 */
export const setupSecurity = (app: any, isDevelopment: boolean) => {
  // Configure Helmet in production, or with relaxed settings in development
  if (!isDevelopment) {
    app.use(helmet({
      contentSecurityPolicy: {
        directives: cspConfig
      },
      crossOriginEmbedderPolicy: false, // Allow embedding resources
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow cross-origin resource sharing
    }));
    
    logger.info('Security middleware initialized in production mode');
  } else {
    // For development, use more relaxed security settings
    app.use(helmet({
      contentSecurityPolicy: false, // Disable CSP in development
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    }));
    
    logger.info('Security middleware initialized in development mode (relaxed settings)');
  }
  
  // Add X-Request-ID header to track requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = req.headers['x-request-id'] || 
                      req.headers['x-correlation-id'] || 
                      `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    req.headers['x-request-id'] = requestId as string;
    res.setHeader('X-Request-ID', requestId);
    next();
  });
  
  // Add security headers and CORS configuration
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Set common security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
    
    next();
  });
};

/**
 * Detect common security attack patterns in request parameters
 */
export const detectAttackPatterns = (req: Request, res: Response, next: NextFunction) => {
  const suspiciousPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i, // SQL Injection
    /<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/i, // XSS
    /(exec\()|(eval\()|(alert\()|(document\.)/i, // JS Injection
    /(\.\.\/)|(\.\.\\)|(%2e%2e%2f)/i, // Path Traversal
  ];
  
  const params = { ...req.query, ...req.body };
  
  // Check for attack patterns
  for (const param in params) {
    if (typeof params[param] === 'string') {
      const value = params[param];
      
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(value as string)) {
          logger.warn('Potential attack detected', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
            param,
            value,
            pattern: pattern.toString()
          });
          
          // Don't reveal the exact reason to potential attackers
          return next(new AppError(400, 'Invalid request parameters', ErrorCode.BAD_REQUEST));
        }
      }
    }
  }
  
  next();
};

/**
 * Validate API key for protected routes
 */
export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  // Skip API key validation for development or if API_KEY is not configured
  if (process.env.NODE_ENV !== 'production' || !process.env.API_KEY) {
    return next();
  }
  
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    logger.warn('Invalid API key attempt', {
      ip: req.ip,
      method: req.method,
      url: req.originalUrl
    });
    
    return next(new AppError(401, 'Invalid API key', ErrorCode.UNAUTHORIZED));
  }
  
  next();
};

/**
 * Check for required environment variables
 */
export const checkRequiredEnvVars = (requiredVars: string[]) => {
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    logger.warn(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
};