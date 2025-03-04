import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Simple index page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Agent Flow Test Page</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
        h1 { color: #8258fc; }
        .card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .status { display: inline-block; padding: 6px 10px; border-radius: 4px; background: #e6f2ff; color: #0066cc; }
      </style>
    </head>
    <body>
      <h1>Agent Flow - Test Page</h1>
      <div class="card">
        <h2>Server Status</h2>
        <p class="status">Online</p>
        <p>Server Time: ${new Date().toLocaleString()}</p>
      </div>
      <div class="card">
        <h2>Server Information</h2>
        <ul>
          <li>Node.js: ${process.version}</li>
          <li>Environment: ${process.env.NODE_ENV || 'development'}</li>
          <li>Port: ${port}</li>
        </ul>
      </div>
      <div class="card">
        <h2>API Testing</h2>
        <p>Test the API health check:</p>
        <a href="/health" target="_blank">/health</a>
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://localhost:${port}`);
});