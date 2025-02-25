import { rateLimit } from 'express-rate-limit';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { Express, Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

// Create cache with increased TTL for better performance
export const cache = new NodeCache({ 
  stdTTL: 600, // 10 minutes default TTL
  checkperiod: 120, // Check for expired keys every 2 minutes instead of every 60 seconds
  useClones: false // Disable cloning for better performance
}); 

// Create a more permissive rate limiter for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Higher limit in development
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for local development
    const ip = req.ip || req.connection.remoteAddress;
    return ip === '127.0.0.1' || ip === '::1';
  }
});

export { limiter };

export const setupMiddleware = (app: Express) => {
  // In development mode, disable helmet to avoid CSP issues with Vite
  if (process.env.NODE_ENV === 'production') {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:', 'blob:'],
            connectSrc: ["'self'", 'ws:', 'wss:'],
          },
        },
      })
    );
  } else {
    // For development, completely disable helmet to avoid CSP issues
    console.log('Development mode: Helmet disabled for Vite compatibility');
  }
  
  // Configure CORS to be permissive
  app.use(cors({
    origin: true,
    credentials: true
  }));

  // Apply compression but only to text-based responses
  app.use(compression({
    level: 6, // Balance between compression ratio and CPU usage (default is 6)
    filter: (req: Request, res: Response) => {
      // Only compress responses with content types that benefit from compression
      const contentType = res.getHeader('Content-Type') as string || '';
      return /text|javascript|json|xml|html|css/i.test(contentType);
    }
  }));
  
  // Apply rate limiting only in production
  if (process.env.NODE_ENV === 'production') {
    app.use(limiter);
  }

  // Optimize cache middleware: Only apply to specific API routes that benefit from caching
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests for specific routes
    if (req.method !== 'GET') return next();
    
    // Only cache certain API endpoints (blog posts, templates, etc)
    if (!req.path.match(/^\/api\/(blog|whatsapp\/template)/)) return next();

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    // Store the original json method
    const originalJson = res.json;
    
    // Override the json method
    res.json = function(body) {
      // Only cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, body);
      }
      return originalJson.call(this, body);
    };

    next();
  });
};