
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import fs from 'fs';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Resolve the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enhanced logging with timestamps and log levels
const logger = {
  info: (message) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
  warn: (message) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`),
  error: (message, error) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '')
};

const app = express();
const port = process.env.PORT || 8091;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
}));

// Apply rate limiting to API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api/', apiLimiter);

// Basic middleware
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Agent Flow server is running!'
  });
});

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Agent Flow</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 20px; 
          line-height: 1.6;
          background-color: #f7f7f7;
          color: #333;
        }
        h1 { 
          color: #8258fc; 
          text-align: center;
          margin-bottom: 30px;
        }
        .box { 
          border: 1px solid #ddd; 
          border-radius: 8px; 
          padding: 20px; 
          margin: 20px 0; 
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .status {
          display: inline-block;
          background-color: #e6ffec;
          color: #117a3c;
          padding: 5px 10px;
          border-radius: 4px;
          font-weight: bold;
        }
        .api-link {
          color: #8258fc;
          text-decoration: none;
          font-weight: bold;
        }
        .api-link:hover {
          text-decoration: underline;
        }
        .logo {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          letter-spacing: -1px;
          margin-bottom: 10px;
        }
        .tagline {
          text-align: center;
          color: #666;
          margin-bottom: 40px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="logo">Agent Flow</div>
      <p class="tagline">AI Automation Platform</p>
      
      <h1>Server Status</h1>
      
      <div class="box">
        <h2>Current Status</h2>
        <p><span class="status">Online</span></p>
        <p>Server time: ${new Date().toLocaleString()}</p>
      </div>
      
      <div class="box">
        <h2>Environment Information</h2>
        <ul>
          <li>Node.js version: ${process.version}</li>
          <li>Environment: ${process.env.NODE_ENV || 'development'}</li>
          <li>Port: ${port}</li>
        </ul>
      </div>
      
      <div class="box">
        <h2>API Endpoints</h2>
        <p>Test the health check endpoint: <a class="api-link" href="/health">/health</a></p>
      </div>
      
      <div class="box">
        <h2>Database Status</h2>
        <p>Database URL: ${process.env.DATABASE_URL ? 'Configured' : 'Not configured'}</p>
        <p><a class="api-link" href="/db-status">Check detailed database status</a></p>
      </div>
    </body>
    </html>
  `);
});

// Database status route
app.get('/db-status', async (req, res) => {
  try {
    const databaseUrl = process.env.DATABASE_URL || 'Not configured';
    
    res.json({
      status: 'Database connection info available',
      databaseConfigured: !!process.env.DATABASE_URL,
      databaseUrlFirstChars: databaseUrl.substring(0, 15) + '...' // Only show first 15 chars for security
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to check database status',
      error: error.message
    });
  }
});

// Serve static files from the client/dist directory if it exists
const distPath = join(__dirname, 'client', 'dist');
try {
  if (fs.existsSync(distPath)) {
    logger.info(`Serving static files from ${distPath}`);
    app.use(express.static(distPath));
    
    // For SPA - redirect all non-API requests to index.html
    app.get('*', (req, res, next) => {
      // Skip API routes and direct file requests
      if (req.path.startsWith('/api') || req.path.includes('.')) {
        return next();
      }
      res.sendFile(join(distPath, 'index.html'));
    });
  } else {
    logger.info(`Static file directory ${distPath} not found`);
  }
} catch (err) {
  logger.error('Error setting up static file serving:', err);
}

// Catch-all route for 404s
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Server error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  logger.info(`Agent Flow server is running at http://localhost:${port}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
