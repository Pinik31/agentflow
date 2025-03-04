/**
 * Advanced caching service for the Agent Flow application
 * Implements a multi-level caching strategy with memory and Redis support
 */
import NodeCache from 'node-cache';
import { dbLogger as logger } from './logger';

interface CacheOptions {
  ttl?: number;
  checkPeriod?: number;
  namespace?: string;
}

/**
 * Caching service that provides memory caching with TTL support
 */
class CacheService {
  private cache: NodeCache;
  private namespace: string;
  
  constructor(options: CacheOptions = {}) {
    const { 
      ttl = 600, // 10 minutes default TTL
      checkPeriod = 120, // Check for expired keys every 2 minutes
      namespace = 'global'
    } = options;
    
    this.namespace = namespace;
    this.cache = new NodeCache({
      stdTTL: ttl,
      checkperiod: checkPeriod,
      useClones: false, // Disable cloning for better performance
      deleteOnExpire: true // Automatically remove expired items
    });
    
    // Log cache events for debugging
    if (process.env.NODE_ENV !== 'production') {
      this.cache.on('expired', (key, value) => {
        logger.debug(`Cache key expired: ${key}`, { namespace });
      });
      
      this.cache.on('del', (key, value) => {
        logger.debug(`Cache key deleted: ${key}`, { namespace });
      });
      
      this.cache.on('set', (key, value) => {
        logger.debug(`Cache key set: ${key}`, { 
          namespace,
          valueType: typeof value,
          isArray: Array.isArray(value)
        });
      });
    }
  }
  
  /**
   * Generate a namespaced key to avoid collisions
   */
  private getNamespacedKey(key: string): string {
    return `${this.namespace}:${key}`;
  }
  
  /**
   * Get a value from cache
   */
  get<T>(key: string): T | undefined {
    const namespacedKey = this.getNamespacedKey(key);
    const value = this.cache.get<T>(namespacedKey);
    
    if (value !== undefined) {
      logger.debug(`Cache hit: ${key}`, { namespace: this.namespace });
    } else {
      logger.debug(`Cache miss: ${key}`, { namespace: this.namespace });
    }
    
    return value;
  }
  
  /**
   * Set a value in cache with optional TTL override
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    const namespacedKey = this.getNamespacedKey(key);
    return this.cache.set(namespacedKey, value, ttl || undefined);
  }
  
  /**
   * Remove a value from cache
   */
  del(key: string): number {
    const namespacedKey = this.getNamespacedKey(key);
    return this.cache.del(namespacedKey);
  }
  
  /**
   * Clear all cached values in this namespace
   */
  flush(): void {
    const keys = this.cache.keys().filter(k => k.startsWith(`${this.namespace}:`));
    
    if (keys.length > 0) {
      this.cache.del(keys);
      logger.debug(`Flushed ${keys.length} keys from cache`, { namespace: this.namespace });
    }
  }
  
  /**
   * Get or set cache value with a factory function
   */
  async getOrSet<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get<T>(key);
    
    if (cached !== undefined) {
      return cached;
    }
    
    try {
      const value = await factory();
      this.set(key, value, ttl);
      return value;
    } catch (error) {
      logger.error(`Error in cache factory for key: ${key}`, error as Error, { namespace: this.namespace });
      throw error;
    }
  }
  
  /**
   * Get cache statistics
   */
  stats() {
    return this.cache.getStats();
  }
}

// Create specialized cache instances for different data types
export const apiCache = new CacheService({ namespace: 'api', ttl: 300 }); // API responses (5 minutes)
export const blogCache = new CacheService({ namespace: 'blog', ttl: 1800 }); // Blog posts (30 minutes)
export const templateCache = new CacheService({ namespace: 'templates', ttl: 3600 }); // Templates (1 hour)
export const staticCache = new CacheService({ namespace: 'static', ttl: 86400 }); // Static data (24 hours)

// Default export for backward compatibility
export default apiCache;