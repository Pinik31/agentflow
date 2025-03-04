/**
 * Performance monitoring service for Agent Flow
 * Tracks API response times and system resource usage
 */
import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';
import os from 'os';

// Define performance metric types
interface PerformanceMetrics {
  apiLatencies: Record<string, number[]>;
  systemMetrics: SystemMetric[];
  lastCollected: number;
}

interface SystemMetric {
  timestamp: number;
  cpuUsage: number;
  memoryUsage: {
    total: number;
    free: number;
    used: number;
    percentUsed: number;
  };
  loadAverage: number[];
}

// Initialize metrics storage
const metrics: PerformanceMetrics = {
  apiLatencies: {},
  systemMetrics: [],
  lastCollected: Date.now()
};

// Maximum number of latencies to store per endpoint
const MAX_LATENCIES = 100;

// System metrics collection interval (10 seconds)
const SYSTEM_METRICS_INTERVAL = 10000;

// Maximum number of system metrics to retain
const MAX_SYSTEM_METRICS = 360; // 1 hour at 10-second intervals

/**
 * Middleware to track API response times
 */
export const trackApiPerformance = (req: Request, res: Response, next: NextFunction) => {
  // Only track API routes
  if (!req.path.startsWith('/api')) {
    return next();
  }
  
  const start = performance.now();
  
  // Function to calculate and record the latency when response is sent
  const recordLatency = () => {
    const duration = performance.now() - start;
    
    // Get a simplified path without query params and specific IDs
    // Example: /api/blog/123 becomes /api/blog/:id
    let path = req.path.replace(/\/api\//, ''); // Remove /api/ prefix
    
    // Replace numeric IDs with :id
    path = path.replace(/\/\d+/g, '/:id');
    
    // Create endpoint identifier with method
    const endpoint = `${req.method} ${path}`;
    
    // Initialize array for this endpoint if it doesn't exist
    if (!metrics.apiLatencies[endpoint]) {
      metrics.apiLatencies[endpoint] = [];
    }
    
    // Add latency to the array
    metrics.apiLatencies[endpoint].push(duration);
    
    // Trim array if it exceeds max size
    if (metrics.apiLatencies[endpoint].length > MAX_LATENCIES) {
      metrics.apiLatencies[endpoint].shift();
    }
    
    logger.debug(`API performance: ${endpoint} completed in ${duration.toFixed(2)}ms`, {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration
    });
  };
  
  // Listen for the response to finish
  res.on('finish', recordLatency);
  
  next();
};

/**
 * Collect system performance metrics
 */
export const collectSystemMetrics = () => {
  try {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const percentUsed = (usedMemory / totalMemory) * 100;
    
    // Calculate CPU usage (simple approximation)
    const loadAvg = os.loadavg();
    const cpuCount = os.cpus().length;
    const cpuUsage = (loadAvg[0] / cpuCount) * 100; // Convert load to percentage
    
    const metric: SystemMetric = {
      timestamp: Date.now(),
      cpuUsage,
      memoryUsage: {
        total: totalMemory,
        free: freeMemory,
        used: usedMemory,
        percentUsed
      },
      loadAverage: loadAvg
    };
    
    metrics.systemMetrics.push(metric);
    
    // Trim metrics array if it exceeds max size
    if (metrics.systemMetrics.length > MAX_SYSTEM_METRICS) {
      metrics.systemMetrics.shift();
    }
    
    metrics.lastCollected = Date.now();
    
    // Only log at intervals to avoid overloading the logs
    if (metrics.systemMetrics.length % 6 === 0) {
      logger.debug('System metrics collected', {
        cpuUsage: `${cpuUsage.toFixed(2)}%`,
        memoryUsage: `${percentUsed.toFixed(2)}%`,
        collectionsCount: metrics.systemMetrics.length
      });
    }
  } catch (error) {
    logger.error('Error collecting system metrics', error as Error);
  }
};

/**
 * Start collecting system metrics at regular intervals
 */
export const startPerformanceMonitoring = () => {
  logger.info('Starting performance monitoring');
  
  // Collect initial metrics
  collectSystemMetrics();
  
  // Setup interval for collecting system metrics
  setInterval(collectSystemMetrics, SYSTEM_METRICS_INTERVAL);
};

/**
 * Get API performance metrics summary
 */
export const getApiPerformanceMetrics = () => {
  const summary: Record<string, { 
    count: number; 
    min: number; 
    max: number; 
    avg: number; 
    p95: number; 
    p99: number;
  }> = {};
  
  // Calculate statistics for each endpoint
  Object.entries(metrics.apiLatencies).forEach(([endpoint, latencies]) => {
    if (latencies.length === 0) return;
    
    // Sort latencies for percentile calculation
    const sorted = [...latencies].sort((a, b) => a - b);
    
    // Calculate statistics
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const avg = sorted.reduce((sum, val) => sum + val, 0) / sorted.length;
    
    // Calculate 95th and 99th percentiles
    const p95Index = Math.floor(sorted.length * 0.95);
    const p99Index = Math.floor(sorted.length * 0.99);
    const p95 = sorted[p95Index];
    const p99 = sorted[p99Index] || max; // Use max if not enough samples
    
    summary[endpoint] = {
      count: latencies.length,
      min,
      max,
      avg,
      p95,
      p99
    };
  });
  
  return summary;
};

/**
 * Get system performance metrics
 */
export const getSystemMetrics = (limit: number = 60) => {
  // Return the most recent metrics up to the limit
  return metrics.systemMetrics.slice(-limit);
};

/**
 * Get a summary report of all performance metrics
 */
export const getPerformanceReport = () => {
  const apiMetrics = getApiPerformanceMetrics();
  const systemMetrics = getSystemMetrics(6); // Last minute of metrics
  
  // Calculate average system metrics
  let avgCpuUsage = 0;
  let avgMemoryUsage = 0;
  
  if (systemMetrics.length > 0) {
    avgCpuUsage = systemMetrics.reduce((sum, metric) => sum + metric.cpuUsage, 0) / systemMetrics.length;
    avgMemoryUsage = systemMetrics.reduce((sum, metric) => sum + metric.memoryUsage.percentUsed, 0) / systemMetrics.length;
  }
  
  return {
    apiMetrics,
    systemSummary: {
      avgCpuUsage,
      avgMemoryUsage,
      uptime: process.uptime(),
      lastCollected: metrics.lastCollected,
      metricsCollected: metrics.systemMetrics.length
    }
  };
};