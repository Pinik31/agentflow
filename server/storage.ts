import { BlogPost, InsertBlogPost, Lead, InsertLead, Newsletter, InsertNewsletter } from "@shared/schema";

export interface IStorage {
  // Blog posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  
  // Newsletter
  addNewsletterSubscriber(subscriber: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private blogPosts: Map<number, BlogPost>;
  private leads: Map<number, Lead>;
  private newsletter: Map<number, Newsletter>;
  private currentBlogId: number = 1;
  private currentLeadId: number = 1;
  private currentNewsletterId: number = 1;

  constructor() {
    this.blogPosts = new Map();
    this.leads = new Map();
    this.newsletter = new Map();
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const blogPost: BlogPost = { ...post, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const newLead: Lead = { ...lead, id };
    this.leads.set(id, newLead);
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async addNewsletterSubscriber(subscriber: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newSubscriber: Newsletter = { ...subscriber, id };
    this.newsletter.set(id, newSubscriber);
    return newSubscriber;
  }
}

export const storage = new MemStorage();
