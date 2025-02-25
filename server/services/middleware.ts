import { rateLimit } from 'express-rate-limit';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { Express, Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes default TTL

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
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
  
  // Configure CORS to be permissive in development
  app.use(cors({
    origin: true,
    credentials: true
  }));

  // Rate limiting
  app.use(limiter);

  // Compression
  app.use(compression());

  // Cache middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') return next();

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    const originalJson = res.json;
    res.json = function(body) {
      cache.set(key, body);
      return originalJson.call(this, body);
    };

    next();
  });
};