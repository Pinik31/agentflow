/**
 * Blog Controller
 * Handles all blog-related operations with optimized performance
 */
import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';
import { blogCache } from '../services/cache';
import { logger } from '../services/logger';
import { AppError, ErrorCode } from '../services/errorHandler';
import { aiService } from '../services/ai';

/**
 * Get all blog posts with caching
 */
export const getAllBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const endTimer = logger.startTimer('Get all blog posts');
    
    // Get from cache or database with automatic cache management
    const posts = await blogCache.getOrSet('all_posts', async () => {
      logger.debug('Blog cache miss, fetching from database');
      return await storage.getBlogPosts();
    });
    
    endTimer();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single blog post by slug with caching
 */
export const getBlogPostBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const cacheKey = `post:${slug}`;
    const endTimer = logger.startTimer(`Get blog post: ${slug}`);
    
    // Get from cache or database with automatic cache management
    const post = await blogCache.getOrSet(cacheKey, async () => {
      logger.debug(`Blog cache miss for slug: ${slug}, fetching from database`);
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        throw AppError.notFound(`Blog post with slug '${slug}' not found`);
      }
      
      return post;
    });
    
    endTimer();
    res.json(post);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new blog post with AI enhancement option
 */
export const createBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, enhanceWithAI, ...postData } = req.body;
    const endTimer = logger.startTimer('Create blog post');
    
    // Optionally enhance content with AI
    let finalContent = content;
    if (enhanceWithAI && aiService.isReady()) {
      logger.debug('Enhancing blog content with AI');
      
      const enhancedContent = await aiService.enhanceResponse(content, 
        { title: postData.title, category: postData.category },
        { 
          language: postData.language || 'he',
          tone: 'professional',
          enhanceWithAI: true
        }
      );
      
      finalContent = enhancedContent;
    }
    
    // Create the blog post
    const newPost = await storage.createBlogPost({
      ...postData,
      content: finalContent
    });
    
    // Invalidate cache
    blogCache.flush();
    
    endTimer();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

/**
 * Get blog posts by category with caching
 */
export const getBlogPostsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.params;
    const cacheKey = `posts:category:${category}`;
    const endTimer = logger.startTimer(`Get posts by category: ${category}`);
    
    // Get from cache or compute with database results
    const posts = await blogCache.getOrSet(cacheKey, async () => {
      logger.debug(`Blog category cache miss: ${category}, filtering from database`);
      const allPosts = await storage.getBlogPosts();
      return allPosts.filter(post => post.category === category);
    });
    
    endTimer();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * Search blog posts with optimized in-memory text search
 */
export const searchBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return next(AppError.badRequest('Search query is required'));
    }
    
    const endTimer = logger.startTimer(`Search blog posts: ${query}`);
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
    
    if (searchTerms.length === 0) {
      return next(AppError.badRequest('Search query must contain at least one term with 3+ characters'));
    }
    
    // Get all posts first (cached)
    const allPosts = await blogCache.getOrSet('all_posts', async () => {
      return await storage.getBlogPosts();
    });
    
    // Perform in-memory search with relevance scoring
    const results = allPosts
      .map(post => {
        // Calculate relevance score based on matches in title, content and excerpt
        const titleLower = post.title.toLowerCase();
        const contentLower = post.content.toLowerCase();
        const excerptLower = post.excerpt.toLowerCase();
        
        let score = 0;
        for (const term of searchTerms) {
          // Title matches have highest priority
          if (titleLower.includes(term)) {
            score += 10;
          }
          
          // Excerpt matches have medium priority
          if (excerptLower.includes(term)) {
            score += 5;
          }
          
          // Content matches have lowest priority
          if (contentLower.includes(term)) {
            score += 2;
          }
        }
        
        return { post, score };
      })
      .filter(item => item.score > 0) // Only include posts with matches
      .sort((a, b) => b.score - a.score) // Sort by relevance score (descending)
      .map(item => item.post); // Return just the posts
    
    endTimer();
    res.json(results);
  } catch (error) {
    next(error);
  }
};