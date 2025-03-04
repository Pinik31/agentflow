
import os from 'os';
import { getDbHealth } from '../db';

/**
 * Monitoring service to track system performance and health
 */
export class MonitoringService {
  private startTime: number;
  private metrics: {
    requests: number;
    errors: number;
    responseTimeTotal: number;
    responseTimeCounts: number;
    lastMinuteRequests: number[];
    cpuUsage: number[];
    memoryUsage: number[];
  };
  
  constructor() {
    this.startTime = Date.now();
    this.metrics = {
      requests: 0,
      errors: 0,
      responseTimeTotal: 0,
      responseTimeCounts: 0,
      lastMinuteRequests: Array(60).fill(0), // 60 seconds of data
      cpuUsage: Array(30).fill(0), // 30 data points
      memoryUsage: Array(30).fill(0), // 30 data points
    };
    
    // Start collecting system metrics
    this.startCollectingMetrics();
  }
  
  /**
   * Track a request
   */
  public trackRequest(responseTime: number, isError: boolean = false): void {
    this.metrics.requests++;
    this.metrics.responseTimeTotal += responseTime;
    this.metrics.responseTimeCounts++;
    
    if (isError) {
      this.metrics.errors++;
    }
    
    // Track for rate calculation (requests per minute)
    const currentSecond = new Date().getSeconds();
    this.metrics.lastMinuteRequests[currentSecond]++;
  }
  
  /**
   * Get current health metrics
   */
  public getHealth(): Record<string, any> {
    const uptime = Date.now() - this.startTime;
    const requestsPerMinute = this.metrics.lastMinuteRequests.reduce((sum, val) => sum + val, 0);
    const avgResponseTime = this.metrics.responseTimeCounts > 0 
      ? this.metrics.responseTimeTotal / this.metrics.responseTimeCounts 
      : 0;
    
    const memUsage = process.memoryUsage();
    const freeMemoryMB = Math.round((os.freemem() / 1024 / 1024) * 100) / 100;
    const totalMemoryMB = Math.round((os.totalmem() / 1024 / 1024) * 100) / 100;
    
    return {
      status: 'ok',
      uptime: uptime,
      uptimeFormatted: this.formatUptime(uptime),
      requests: this.metrics.requests,
      errors: this.metrics.errors,
      errorRate: this.metrics.requests > 0 
        ? (this.metrics.errors / this.metrics.requests) * 100 
        : 0,
      requestsPerMinute,
      avgResponseTime: avgResponseTime,
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        cpuCores: os.cpus().length,
        loadAverage: os.loadavg(),
        freeMemoryMB,
        totalMemoryMB,
        memoryUsageMB: Math.round((memUsage.rss / 1024 / 1024) * 100) / 100,
        heapUsedMB: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100,
        heapTotalMB: Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100,
      },
      database: getDbHealth(),
      charts: {
        cpuUsage: this.metrics.cpuUsage,
        memoryUsage: this.metrics.memoryUsage,
      }
    };
  }
  
  /**
   * Reset metrics
   */
  public resetMetrics(): void {
    this.metrics = {
      requests: 0,
      errors: 0,
      responseTimeTotal: 0,
      responseTimeCounts: 0,
      lastMinuteRequests: Array(60).fill(0),
      cpuUsage: Array(30).fill(0),
      memoryUsage: Array(30).fill(0),
    };
  }
  
  /**
   * Start collecting system metrics periodically
   */
  private startCollectingMetrics(): void {
    // Collect CPU and memory metrics every 10 seconds
    setInterval(() => {
      // CPU load
      const cpuLoad = os.loadavg()[0] / os.cpus().length * 100; // As percentage of available cores
      this.metrics.cpuUsage.push(Math.round(cpuLoad * 100) / 100);
      this.metrics.cpuUsage.shift();
      
      // Memory usage
      const memUsage = process.memoryUsage();
      const usedMemoryPercentage = (memUsage.rss / os.totalmem()) * 100;
      this.metrics.memoryUsage.push(Math.round(usedMemoryPercentage * 100) / 100);
      this.metrics.memoryUsage.shift();
      
    }, 10000); // Every 10 seconds
    
    // Reset per-second request counters every minute
    setInterval(() => {
      this.metrics.lastMinuteRequests = Array(60).fill(0);
    }, 60000); // Every minute
  }
  
  /**
   * Format uptime in a human-readable format
   */
  private formatUptime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
  }
}

// Export a singleton instance
export const monitoring = new MonitoringService();

// Export middleware to track request performance
export const monitoringMiddleware = (req: any, res: any, next: () => void) => {
  const start = Date.now();
  
  // Once the response is finished, record the metrics
  res.on('finish', () => {
    const duration = Date.now() - start;
    const isError = res.statusCode >= 400;
    monitoring.trackRequest(duration, isError);
  });
  
  next();
};
