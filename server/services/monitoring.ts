import os from 'os';
import { getDbHealth } from '../db';

// Basic system metrics collection
interface SystemMetrics {
  cpuUsage: {
    user: number;
    system: number;
    idle: number;
  };
  memoryUsage: {
    total: number;
    free: number;
    used: number;
    usedPercent: number;
  };
  uptime: number;
  timestamp: string;
}

export class MonitoringService {
  private metricsHistory: SystemMetrics[] = [];
  private maxHistoryItems = 100;
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Empty constructor
  }

  startMonitoring(intervalMs = 60000) {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }

    this.monitoringInterval = setInterval(() => {
      this.collectMetrics();
    }, intervalMs);

    // Collect first metrics immediately
    this.collectMetrics();

    return this;
  }

  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    return this;
  }

  private collectMetrics() {
    try {
      const cpus = os.cpus();
      const totalCpu = cpus.reduce(
        (acc, cpu) => {
          acc.user += cpu.times.user;
          acc.system += cpu.times.sys;
          acc.idle += cpu.times.idle;
          return acc;
        },
        { user: 0, system: 0, idle: 0 }
      );

      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;

      const metrics: SystemMetrics = {
        cpuUsage: {
          user: totalCpu.user,
          system: totalCpu.system,
          idle: totalCpu.idle,
        },
        memoryUsage: {
          total: totalMem,
          free: freeMem,
          used: usedMem,
          usedPercent: (usedMem / totalMem) * 100,
        },
        uptime: os.uptime(),
        timestamp: new Date().toISOString(),
      };

      this.metricsHistory.push(metrics);

      // Keep history within limits
      if (this.metricsHistory.length > this.maxHistoryItems) {
        this.metricsHistory.shift();
      }

      // Log critical resource usage
      if (metrics.memoryUsage.usedPercent > 85) {
        console.warn(`High memory usage: ${metrics.memoryUsage.usedPercent.toFixed(2)}%`);
      }

    } catch (error) {
      console.error('Error collecting system metrics:', error);
    }
  }

  async getHealthStatus() {
    try {
      // Get the latest metrics
      const metrics = this.metricsHistory.length > 0 
        ? this.metricsHistory[this.metricsHistory.length - 1] 
        : null;

      // Get database health
      let dbStatus = { healthy: false, message: 'Not checked' };
      try {
        dbStatus = await getDbHealth();
      } catch (err) {
        dbStatus = { 
          healthy: false, 
          message: err instanceof Error ? err.message : 'Unknown database error' 
        };
      }

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        system: {
          healthy: true, // Assume system is healthy by default
          uptime: os.uptime(),
          memoryUsage: metrics?.memoryUsage || null,
        },
        services: {
          database: dbStatus,
        }
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error in health check',
      };
    }
  }

  getMetricsHistory() {
    return this.metricsHistory;
  }
}

export const monitoring = new MonitoringService().startMonitoring();

export const monitoringMiddleware = (req: any, res: any, next: () => void) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const isError = res.statusCode >= 400;
    //monitoring.trackRequest(duration, isError); // Removed request tracking
  });
  next();
};