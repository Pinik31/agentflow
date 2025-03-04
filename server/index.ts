
import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";
import compression from "compression";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { existsSync } from "fs";
import { setupMiddleware } from "./services/middleware";
import { registerRoutes } from "./routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

// Get current file location for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enhanced logging with timestamps and log levels
const logger = {
  info: (message: string) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
  warn: (message: string) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`),
  error: (message: string, error?: any) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '')
};

// Debug logging
console.log("=== SERVER STARTUP DEBUG INFO ===");
console.log(`Current directory: ${process.cwd()}`);
console.log(`Node version: ${process.version}`);
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`__dirname: ${__dirname}`);
console.log(`Client directory exists: ${existsSync(resolve(__dirname, '..', 'client'))}`);
console.log(`Client/index.html exists: ${existsSync(resolve(__dirname, '..', 'client', 'index.html'))}`);
console.log("=================================");

// Create Express application
const app = express();

// Basic Express configuration
app.set('trust proxy', 1);

// Security middleware - should be early in the chain
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production'
}));

// Set up rate limiting - protect against brute force attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Setup JSON body parsing with increased security
app.use(express.json({ 
  limit: '1mb',  // Reduced from 5mb for security
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

// Create HTTP server
const server = createServer(app);

// CORS setup with more specific configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://agentflow.io', /\.agentflow\.io$/] // Example domain - replace with your actual domain
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Compression for efficiency
app.use(compression());

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Frontend setup
const isDevelopment = process.env.NODE_ENV !== 'production';
let viteSetupComplete = false;
let viteFailedToSetup = false;

// Frontend handling middleware
app.use('*', (req, res, next) => {
  // Always allow API and health check requests to pass through
  if (req.originalUrl.startsWith('/api') || req.originalUrl === '/health') {
    return next();
  }
  
  // Handle Vite status
  if (viteFailedToSetup) {
    serveLoadingErrorPage(res);
  } else if (viteSetupComplete) {
    next();
  } else {
    serveLoadingPage(res);
  }
});

// Serve loading page function
function serveLoadingPage(res: Response) {
  res.type('html').send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Loading - Agent Flow</title>
      <style>
        body { 
          font-family: system-ui, sans-serif; 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background-color: #f9fafb;
          color: #1f2937;
        }
        .loader {
          border: 5px solid #f3f3f3;
          border-radius: 50%;
          border-top: 5px solid #3498db;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .message {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        .submessage {
          font-size: 0.9rem;
          color: #6b7280;
        }
      </style>
      <script>
        setTimeout(function() {
          window.location.reload();
        }, 2000);
      </script>
    </head>
    <body>
      <div class="loader"></div>
      <div class="message">Loading application...</div>
      <div class="submessage">This might take a few moments on first startup</div>
    </body>
    </html>
  `);
}

// Serve error page function
function serveLoadingErrorPage(res: Response) {
  res.type('html').send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Agent Flow - Development Mode</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 2rem; line-height: 1.5; max-width: 800px; margin: 0 auto; }
        pre { background: #f1f1f1; padding: 1rem; overflow: auto; border-radius: 4px; }
        code { font-family: monospace; }
        .error { color: #e53e3e; }
        .path { background: #f0f0f0; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; }
      </style>
    </head>
    <body>
      <h1>Development Server</h1>
      <p>Vite middleware failed to initialize. Please check the server logs for details.</p>
      <h2>Debug Information:</h2>
      <ul>
        <li>Client index.html exists: ${existsSync(resolve(__dirname, '..', 'client', 'index.html')) ? 'Yes' : 'No'}</li>
        <li>Environment: ${process.env.NODE_ENV || 'development'}</li>
        <li>Node version: ${process.version}</li>
      </ul>
      <p>Try restarting the development server.</p>
    </body>
    </html>
  `);
}

// Set up Vite (in development) or static file serving (in production)
if (isDevelopment) {
  // Vite setup with better error handling
  const viteSetupTimeout = setTimeout(() => {
    if (!viteSetupComplete) {
      logger.error("Vite setup timeout exceeded, using fallback");
      viteFailedToSetup = true;
      completeAppSetup();
    }
  }, 30000);

  setupVite(app, server).then(() => {
    clearTimeout(viteSetupTimeout);
    logger.info("Vite middleware setup complete");
    viteSetupComplete = true;
    completeAppSetup();
  }).catch(err => {
    clearTimeout(viteSetupTimeout);
    logger.error("Failed to set up Vite", err);
    viteFailedToSetup = true;
    completeAppSetup();
  });
} else {
  // Production static file serving
  serveStatic(app);
  viteSetupComplete = true;
  completeAppSetup();
}

// Function to complete the setup after frontend routing is established
function completeAppSetup() {
  // Setup middleware for API
  setupMiddleware(app);
  
  // API request logger
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      const start = Date.now();
      res.on("finish", () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const statusColor = status >= 500 ? 'red' : status >= 400 ? 'yellow' : status >= 300 ? 'cyan' : 'green';
        logger.info(`${req.method} ${req.path} ${status} in ${duration}ms`);
      });
    }
    next();
  });
  
  // API routes registration
  registerRoutes(app, server);
  
  // Global error handler - must be last middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    // Log error details
    logger.error(`API Error: ${req.method} ${req.path}`, err);
    
    // Send appropriate response based on error
    res.status(status).json({ 
      message, 
      requestId: req.headers['x-request-id'] || '',
      timestamp: new Date().toISOString()
    });
  });
  
  logger.info("Full application setup complete");
}

// Improved server startup process
function startServer(port = 5000, retries = 3) {
  server.listen(port, "0.0.0.0")
    .on('listening', () => {
      const address = server.address();
      const actualPort = typeof address === 'object' && address ? address.port : port;
      logger.info(`Server started on port ${actualPort}`);
      
      // Log critical environment details for troubleshooting
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`Node version: ${process.version}`);
      
      // Check client directory
      const clientDir = resolve(__dirname, '..', 'client');
      const indexPath = resolve(clientDir, 'index.html');
      logger.info(`Client directory exists: ${existsSync(clientDir)}`);
      logger.info(`Index.html exists: ${existsSync(indexPath)}`);
    })
    .on('error', (err: any) => {
      if (err.code === 'EADDRINUSE' && retries > 0) {
        logger.warn(`Port ${port} in use, trying another port...`);
        setTimeout(() => {
          server.close();
          startServer(port + 1, retries - 1);
        }, 1000);
      } else {
        logger.error(`Failed to start server: ${err.message}`, err);
        process.exit(1);
      }
    });
}

// Start server with a safer approach to port handling
import { exec } from 'child_process';

// Gracefully attempt to release port first
const attemptPortRelease = () => {
  return new Promise<void>((resolve) => {
    exec(`lsof -ti:5000 | xargs kill -9 2>/dev/null || true`, (error) => {
      if (error) {
        logger.warn(`Could not release port 5000: ${error.message}`);
      } else {
        logger.info("Port 5000 is now available");
      }
      // Always resolve, even on error, to ensure server starts
      resolve();
    });
  });
};

// Start server with delay to ensure port is available
(async () => {
  try {
    await attemptPortRelease();
    // Small delay to ensure port is fully released
    setTimeout(() => {
      startServer();
    }, 1000);
  } catch (err) {
    logger.error("Failed in server startup sequence", err);
    // Start anyway, will try alternate ports if needed
    startServer();
  }
})();

// Handle process signals for graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err);
  // Let the process terminate naturally
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', reason);
  // Let the process terminate naturally
});
