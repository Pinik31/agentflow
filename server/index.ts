import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";
import compression from "compression";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { setupMiddleware } from "./services/middleware";
import { registerRoutes } from "./routes";

// Get current file location for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express application
const app = express();

// Basic Express configuration
app.set('trust proxy', 1);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Create HTTP server immediately
const server = createServer(app);

// SETUP ORDER IS IMPORTANT
// 1. CORS should be early to handle preflight requests
app.use(cors({
  origin: true,
  credentials: true
}));

// 2. Compression for efficiency
app.use(compression());

// 3. Frontend must be set up before API routes to ensure proper path handling
// This is the most critical part - handling frontend routes must come BEFORE API routes
const isDevelopment = app.get("env") === "development";
if (isDevelopment) {
  // In development, we'll set up Vite middleware ASYNCHRONOUSLY
  // Set up a temporary loading route
  let viteFailedToSetup = false;
  
  app.use('*', (req, res, next) => {
    // Always allow API requests to pass through
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    
    // If Vite failed to set up, use our fallback
    if (viteFailedToSetup) {
      try {
        log("Using fallback static file server");
        // Custom error page that provides better debugging info
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
              <li>URL: ${req.originalUrl}</li>
              <li>Client index.html exists: ${existsSync(resolve(__dirname, '..', 'client', 'index.html')) ? 'Yes' : 'No'}</li>
              <li>Environment: ${app.get('env')}</li>
              <li>Node version: ${process.version}</li>
            </ul>
            <p>Try restarting the development server.</p>
          </body>
          </html>
        `);
      } catch (error) {
        console.error('Error serving fallback page:', error);
        res.status(500).send('Internal Server Error: Failed to serve the application');
      }
    } else {
      // If Vite is still setting up, show a loading message
      res.send('Loading application, please wait...');
    }
  });
  
  // Then set up Vite asynchronously
  setupVite(app, server).then(() => {
    log("Vite middleware setup complete");
    // Now set up the rest of the application AFTER Vite is ready
    completeAppSetup();
  }).catch(err => {
    console.error("Failed to set up Vite:", err);
    viteFailedToSetup = true;
    log("Serving static files as fallback");
    // We'll complete app setup regardless of Vite's status
    completeAppSetup();
  });
} else {
  // In production, we serve static files synchronously
  serveStatic(app);
  
  // And complete setup
  completeAppSetup();
}

// Function to complete the setup after frontend routing is established
function completeAppSetup() {
  // 4. Setup middleware
  setupMiddleware(app);
  
  // 5. Logger for API routes
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      const start = Date.now();
      res.on("finish", () => {
        const duration = Date.now() - start;
        log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
      });
    }
    next();
  });
  
  // 6. API routes come AFTER frontend routes
  registerRoutes(app, server);
  
  // 7. Error handler must be last
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error("API Error:", err);
  });
  
  log("Full application initialization complete");
}

// Start the server on both required ports
const port = process.env.PORT || 3000;
server.listen({
  port,
  host: "0.0.0.0",
  reusePort: true,
}, () => {
  log(`Server started on port ${port}`);
  log(`Working directory: ${process.cwd()}`);
  log(`Environment: ${app.get('env')}`);
  log(`Node version: ${process.version}`);
  
  // Check if the client directory exists
  const clientDir = resolve(__dirname, '..', 'client');
  const indexPath = resolve(clientDir, 'index.html');
  
  const clientDirExists = existsSync(clientDir);
  const indexExists = existsSync(indexPath);
  
  log(`Client directory exists: ${clientDirExists}`);
  log(`Index.html exists: ${indexExists}`);
});

// Also listen on port 5000 for workflow checks
const port5000 = 5000;
server.listen(port5000, '0.0.0.0', () => {
  log(`Server also listening on port ${port5000} for workflow checks`);
});