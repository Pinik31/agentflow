import os from 'os';
import { EventEmitter } from 'events';

class MonitoringService extends EventEmitter {
  private interval: NodeJS.Timeout | null = null;
  private checkIntervalMs = 30000; // 30 seconds
  private metrics: Record<string, any> = {};

  constructor() {
    super();
    this.metrics = {
      startTime: Date.now(),
      lastCheck: Date.now(),
      health: 'ok',
    };
  }

  start() {
    if (this.interval) {
      return;
    }

    this.interval = setInterval(() => {
      this.collectMetrics();
    }, this.checkIntervalMs);

    // Collect initial metrics
    this.collectMetrics();

    return this;
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    return this;
  }

  getMetrics() {
    return { ...this.metrics, currentTime: Date.now() };
  }

  private collectMetrics() {
    try {
      const systemMetrics = this.collectSystemMetrics();
      const processMetrics = this.collectProcessMetrics();

      this.metrics = {
        ...this.metrics,
        lastCheck: Date.now(),
        system: systemMetrics,
        process: processMetrics,
      };

      this.emit('metrics', this.metrics);
    } catch (error) {
      console.error('Error collecting metrics:', error);
    }
  }

  private collectSystemMetrics() {
    return {
      cpus: os.cpus().length,
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      loadavg: os.loadavg(),
      uptime: os.uptime(),
    };
  }

  private collectProcessMetrics() {
    const memoryUsage = process.memoryUsage();

    return {
      uptime: process.uptime(),
      pid: process.pid,
      memoryUsage: {
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external,
      },
      cpuUsage: process.cpuUsage(),
    };
  }

  async getDbHealth() {
    try {
      // This would typically call a database health check function
      // For now, we'll just return a placeholder
      return { status: 'ok', latency: 0 };
    } catch (error) {
      return { status: 'error', error: String(error) };
    }
  }
}

// Export singleton instance
export const monitoring = new MonitoringService();