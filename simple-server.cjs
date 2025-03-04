const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Simple server is running!'
  });
});

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Agent Flow - Simple Server</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #6c5ce7; }
        .box { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <h1>Agent Flow - Simple Server</h1>
      <div class="box">
        <h2>Server Status</h2>
        <p>The server is running correctly!</p>
        <p>Server time: ${new Date().toLocaleString()}</p>
      </div>
      <div class="box">
        <h2>Environment Information</h2>
        <ul>
          <li>Node.js version: ${process.version}</li>
          <li>Environment: ${process.env.NODE_ENV || 'development'}</li>
          <li>Port: ${PORT}</li>
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

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple server is running at http://localhost:${PORT}`);
});