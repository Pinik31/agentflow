/**
 * Image utilities for optimizing and generating relevant images
 * This module provides functions for working with images throughout the application
 */

// Collection of high-quality, relevant images for different categories
const categoryImageMap: Record<string, string[]> = {
  'ai-tools': [
    'https://images.unsplash.com/photo-1677442135197-8d4d902cd392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1591463471419-65f57fd2b3b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
  ],
  'ai-news': [
    'https://images.unsplash.com/photo-1655720828083-8a3a840631f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
  ],
  'industry': [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1589254066213-a0c9dc853511?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
  ],
  'company': [
    'https://images.unsplash.com/photo-1661347334036-d484f970ebc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
  ],
  // Default images for any category not explicitly listed
  'default': [
    'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
  ]
};

// Service/industry specific image maps for targeted content
const serviceImageMap: Record<string, string[]> = {
  'automation': [
    'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1518219968557-b0c5c8e14934?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
  ],
  'ai-agents': [
    'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1677442135197-8d4d902cd392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
  ],
  'chatbots': [
    'https://images.unsplash.com/photo-1679939099897-e094caf70c59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    'https://images.unsplash.com/photo-1677442135197-8d4d902cd392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
  ],
};

// Author placeholder images
const authorPlaceholders = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/54.jpg',
  'https://randomuser.me/api/portraits/women/76.jpg',
];

/**
 * Get a relevant image URL for a specific category
 * @param category The content category
 * @param seed Optional seed for deterministic selection (e.g., post ID)
 * @returns URL to a relevant image
 */
export function getCategoryImage(category: string, seed?: number): string {
  const images = categoryImageMap[category] || categoryImageMap.default;
  const index = seed ? Math.abs(seed) % images.length : Math.floor(Math.random() * images.length);
  return images[index];
}

/**
 * Get a relevant image URL for a specific service
 * @param service The service type
 * @param seed Optional seed for deterministic selection
 * @returns URL to a relevant image
 */
export function getServiceImage(service: string, seed?: number): string {
  const images = serviceImageMap[service] || categoryImageMap.default;
  const index = seed ? Math.abs(seed) % images.length : Math.floor(Math.random() * images.length);
  return images[index];
}

/**
 * Get a placeholder author image
 * @param seed Optional seed for deterministic selection
 * @returns URL to an author placeholder image
 */
export function getAuthorPlaceholder(seed?: number): string {
  const index = seed ? Math.abs(seed) % authorPlaceholders.length : Math.floor(Math.random() * authorPlaceholders.length);
  return authorPlaceholders[index];
}

/**
 * Generate an optimized image URL with proper sizing parameters
 * @param url Base image URL
 * @param width Desired width
 * @param height Desired height
 * @param quality Image quality (1-100)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(url: string, width: number = 800, height: number = 600, quality: number = 80): string {
  // For Unsplash URLs, we can use their built-in optimization parameters
  if (url.includes('unsplash.com')) {
    // Add or replace optimization parameters
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&h=${height}&q=${quality}&fit=crop&auto=format`;
  }
  
  // For other URLs, just return as is
  return url;
}

/**
 * Generate a lazy loading image srcSet for responsive images
 * @param url Base image URL
 * @returns Array of srcSet entries for different viewport sizes
 */
export function generateSrcSet(url: string): string {
  if (!url.includes('unsplash.com')) return url;
  
  const baseUrl = url.split('?')[0];
  return [
    `${baseUrl}?w=480&h=320&q=80&fit=crop&auto=format 480w`,
    `${baseUrl}?w=800&h=600&q=80&fit=crop&auto=format 800w`,
    `${baseUrl}?w=1200&h=900&q=80&fit=crop&auto=format 1200w`,
    `${baseUrl}?w=1600&h=1200&q=80&fit=crop&auto=format 1600w`,
  ].join(', ');
}