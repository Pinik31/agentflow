import { BlogPost, InsertBlogPost, Lead, InsertLead, Newsletter, InsertNewsletter } from "@shared/schema";
import { blogPosts, leads, newsletter } from "@shared/schema";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  async addNewsletterSubscriber(subscriber: InsertNewsletter): Promise<Newsletter> {
    const [newSubscriber] = await db.insert(newsletter).values(subscriber).returning();
    return newSubscriber;
  }
}

export const storage = new DatabaseStorage();