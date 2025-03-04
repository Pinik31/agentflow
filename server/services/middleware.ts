import express, { type Express, Request, Response, NextFunction } from 'express';
import { errorHandler } from './errorHandler';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Setup middleware for the Express application
export function setupMiddleware(app: Express) {
  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production'
  }));

  // CORS setup
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://agentflow.io', /\.agentflow\.io$/] 
      : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Request body parsers
  app.use(express.json({ 
    limit: '1mb',
    verify: (req: Request, res: Response, buf: Buffer) => {
      try {
        JSON.parse(buf.toString());
      } catch(e) {
        res.status(400).json({ error: 'Invalid JSON' });
        throw new Error('Invalid JSON');
      }
    }
  }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Performance middleware
  app.use(compression());

  // Global rate limiting
  const globalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500, // limit each IP to 500 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later'
  });
  app.use(globalLimiter);

  // Request ID middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = req.headers['x-request-id'] || 
      `req-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;

    req.headers['x-request-id'] = requestId as string;
    res.setHeader('X-Request-ID', requestId as string);
    next();
  });

  // Add timestamp to request object for performance measurement
  app.use((req: Request, _res: Response, next: NextFunction) => {
    (req as any).__startTime = Date.now();
    next();
  });

  // Global error handler should be registered after all routes
  app.use(errorHandler);
}