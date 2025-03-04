import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Resolve the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Replit server is running!'
  });
});

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Agent Flow - Replit Server</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #6c5ce7; }
        .box { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <h1>Agent Flow - Replit Server</h1>
      <div class="box">
        <h2>Server Status</h2>
        <p>The Replit server is running correctly!</p>
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
        <p>Test the health check endpoint: <a href="/health">/health</a></p>
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
    console.log(`Serving static files from ${distPath}`);
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
    console.log(`Static file directory ${distPath} not found`);
  }
} catch (err) {
  console.error('Error setting up static file serving:', err);
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
  console.error('Server error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Replit server is running at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});