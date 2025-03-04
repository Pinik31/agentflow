import { Express, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import MemoryStore from 'memorystore';
import { setupSecurity } from './security';
import { apiLimiter, contactFormLimiter, newsletterLimiter, webhookLimiter } from './rateLimit';
import { logger } from './logger';
import { apiCache, blogCache } from './cache';

// Create memory store for sessions
const MemoryStoreSession = MemoryStore(session);

/**
 * Configures all middleware for the application
 */
export const setupMiddleware = (app: Express) => {
  // Setup security middleware (helmet, etc.)
  const isDevelopment = process.env.NODE_ENV !== 'production';
  setupSecurity(app, isDevelopment);
  
  // Configure CORS to be permissive
  app.use(cors({
    origin: true,
    credentials: true
  }));
  
  // Session middleware with proper store and security settings
  app.use(session({
    secret: process.env.SESSION_SECRET || 'agent-flow-secret',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax'
    }
  }));
  
  // Apply compression but only to text-based responses
  app.use(compression({
    level: 6, // Balance between compression ratio and CPU usage
    filter: (req: Request, res: Response) => {
      // Only compress responses with content types that benefit from compression
      const contentType = res.getHeader('Content-Type') as string || '';
      return /text|javascript|json|xml|html|css/i.test(contentType);
    }
  }));
  
  // Apply rate limiting to different routes
  if (process.env.NODE_ENV === 'production') {
    app.use('/api/', apiLimiter);
    app.use('/api/lead', contactFormLimiter);
    app.use('/api/leads', contactFormLimiter);
    app.use('/api/newsletter', newsletterLimiter);
    app.use('/api/whatsapp', webhookLimiter);
  }
  
  // Cache middleware for GET requests with different cache settings per route
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only apply caching to GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Determine which cache to use based on path
    let cache: typeof apiCache | null = null;
    let ttl: number | undefined;
    
    if (req.path.startsWith('/api/blog')) {
      cache = blogCache;
      ttl = 1800; // 30 minutes for blog content
    } else if (req.path.includes('/api/') && !req.path.includes('/admin/')) {
      // Don't cache admin routes
      cache = apiCache;
      ttl = 300; // 5 minutes for other API responses
    }
    
    // Skip if not cacheable
    if (!cache) {
      return next();
    }
    
    const key = `${req.path}:${JSON.stringify(req.query)}`;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      logger.debug(`Cache hit for ${req.path}`, { key });
      return res.json(cachedResponse);
    }
    
    // Store the original json method
    const originalJson = res.json;
    
    // Override json method to cache response
    res.json = function(body) {
      // Don't cache error responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        if (cache) {
          cache.set(key, body, ttl);
          logger.debug(`Cached response for ${req.path}`, { key, ttl });
        }
      }
      return originalJson.call(this, body);
    };
    
    next();
  });
  
  // Add request ID tracking
  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = req.headers['x-request-id'] || 
                     `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    res.locals.requestId = requestId;
    next();
  });
  
  logger.info('Application middleware configured successfully');
};