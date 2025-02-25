import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupMiddleware } from "./services/middleware";

// Create Express application
const app = express();

// Basic Express configuration
app.set('trust proxy', 1);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Set up middleware with minimal dependencies
setupMiddleware(app);

// Simple request logger for API routes only
app.use((req, res, next) => {
  // Only track API requests for logging
  if (req.path.startsWith("/api")) {
    const start = Date.now();
    
    // Simplified response capture
    res.on("finish", () => {
      const duration = Date.now() - start;
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    });
  }
  next();
});

// IIFE for async server initialization
(async () => {
  try {
    // Register API routes and get HTTP server
    const server = await registerRoutes(app);
    
    // Set up error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      
      // Log error but don't throw (which would crash the server)
      console.error("API Error:", err);
    });
    
    // Set up Vite or static file serving
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
    
    // Start the server
    const port = process.env.PORT || 3000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port}`);
    });
    
  } catch (err) {
    console.error("Failed to initialize server:", err);
    process.exit(1);
  }
})();