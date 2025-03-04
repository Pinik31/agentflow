/**
 * Admin Controller
 * Handles administrative operations for the application
 */
import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger';
import { AppError, ErrorCode } from '../services/errorHandler';
import { apiCache, blogCache, staticCache, templateCache } from '../services/cache';
import { getPerformanceReport } from '../services/performance';

/**
 * Get system health status and performance metrics
 */
export const getSystemHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get database status
    const dbStatus = {
      status: 'connected', // This would be dynamic in a real system
      lastPing: new Date().toISOString(),
      latency: 5 // Simulated 5ms latency
    };
    
    // Get cache statistics
    const cacheStats = {
      api: apiCache.stats(),
      blog: blogCache.stats(),
      templates: templateCache.stats(),
      static: staticCache.stats()
    };
    
    // Get performance metrics
    const performanceMetrics = getPerformanceReport();
    
    // Get system info
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    res.json({
      status: 'online',
      timestamp: new Date().toISOString(),
      dbStatus,
      cacheStats,
      performanceMetrics,
      systemInfo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Clear all caches (or specific cache if specified)
 */
export const clearCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.query;
    
    if (type) {
      // Clear specific cache
      switch (type) {
        case 'api':
          apiCache.flush();
          logger.info('API cache cleared');
          break;
        case 'blog':
          blogCache.flush();
          logger.info('Blog cache cleared');
          break;
        case 'templates':
          templateCache.flush();
          logger.info('Template cache cleared');
          break;
        case 'static':
          staticCache.flush();
          logger.info('Static cache cleared');
          break;
        default:
          return next(AppError.badRequest(`Unknown cache type: ${type}`));
      }
      
      res.json({ message: `Cache '${type}' successfully cleared` });
    } else {
      // Clear all caches
      apiCache.flush();
      blogCache.flush();
      templateCache.flush();
      staticCache.flush();
      
      logger.info('All caches cleared');
      res.json({ message: 'All caches successfully cleared' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Restart services or reset application state
 * Note: This is a simulated function for demo purposes
 */
export const restartService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { service } = req.body;
    
    if (!service) {
      return next(AppError.badRequest('Service name is required'));
    }
    
    // Simulate restarting services
    await new Promise(resolve => setTimeout(resolve, 500));
    
    logger.info(`Service ${service} restarted`, { service });
    res.json({ message: `Service ${service} restarted successfully` });
  } catch (error) {
    next(error);
  }
};

/**
 * Get application logs
 * Note: This would typically stream logs from a log aggregator or file system
 */
export const getLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { level, limit } = req.query;
    const limitNumber = limit ? parseInt(limit as string, 10) : 100;
    
    // This is a placeholder for actual log retrieval
    // In a real application, we would fetch logs from a storage system
    const logs = Array(limitNumber).fill(null).map((_, i) => ({
      timestamp: new Date(Date.now() - (i * 60000)).toISOString(),
      level: level || (i % 5 === 0 ? 'error' : i % 3 === 0 ? 'warn' : 'info'),
      message: `Log message ${i + 1}`,
      context: 'server',
      requestId: `req-${Math.random().toString(36).substring(2, 9)}`
    })).reverse();
    
    res.json({
      count: logs.length,
      logs
    });
  } catch (error) {
    next(error);
  }
};