import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Log server startup for debugging
console.log("Starting Test Server...");
console.log(`Current working directory: ${process.cwd()}`);
console.log(`Node.js version: ${process.version}`);
console.log(`Environment variables: PORT=${process.env.PORT}, NODE_ENV=${process.env.NODE_ENV}`);

// Resolve the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Test server is running!'
  });
});

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Agent Flow Test Server</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 20px; 
          line-height: 1.6;
          background-color: #f0f8ff;
          color: #333;
        }
        h1 { 
          color: #4169e1; 
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
          color: #4169e1;
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
      <div class="logo">Test Server</div>
      <p class="tagline">Agent Flow Development Environment</p>
      
      <h1>Test Server Status</h1>
      
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

// API test route
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
});

// Catch-all route for 404s
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Test server is running at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API endpoint: http://localhost:${port}/api/test`);
});