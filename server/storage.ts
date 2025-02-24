import { BlogPost, InsertBlogPost, Lead, InsertLead, Newsletter, InsertNewsletter, BusinessAssessment, InsertBusinessAssessment, BusinessNeed, InsertBusinessNeed, WhatsappSession, InsertWhatsappSession, WhatsappMessage, InsertWhatsappMessage, WhatsappTemplate } from "@shared/schema";
import { blogPosts, leads, newsletter, businessAssessments, businessNeeds, whatsappSessions, whatsappMessages, whatsappTemplates } from "@shared/schema";
import { db } from "./db";
import { desc, eq, and } from "drizzle-orm";

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

  // Business Assessments
  createBusinessAssessment(assessment: InsertBusinessAssessment): Promise<BusinessAssessment>;
  getBusinessAssessmentByLeadId(leadId: number): Promise<BusinessAssessment | undefined>;
  updateBusinessAssessment(id: number, assessment: Partial<InsertBusinessAssessment>): Promise<BusinessAssessment>;

  // Business Needs
  createBusinessNeed(need: InsertBusinessNeed): Promise<BusinessNeed>;
  getBusinessNeedsByAssessmentId(assessmentId: number): Promise<BusinessNeed[]>;

  // WhatsApp Integration
  createWhatsappSession(session: InsertWhatsappSession): Promise<WhatsappSession>;
  getActiveWhatsappSession(phoneNumber: string): Promise<WhatsappSession | undefined>;
  createWhatsappMessage(message: InsertWhatsappMessage): Promise<WhatsappMessage>;
  getWhatsappTemplate(name: string): Promise<WhatsappTemplate | undefined>;
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

  async createBusinessAssessment(assessment: InsertBusinessAssessment): Promise<BusinessAssessment> {
    const [newAssessment] = await db.insert(businessAssessments).values(assessment).returning();
    return newAssessment;
  }

  async getBusinessAssessmentByLeadId(leadId: number): Promise<BusinessAssessment | undefined> {
    const [assessment] = await db.select().from(businessAssessments).where(eq(businessAssessments.leadId, leadId));
    return assessment;
  }

  async updateBusinessAssessment(id: number, assessment: Partial<InsertBusinessAssessment>): Promise<BusinessAssessment> {
    const [updatedAssessment] = await db
      .update(businessAssessments)
      .set({ ...assessment, updatedAt: new Date() })
      .where(eq(businessAssessments.id, id))
      .returning();
    return updatedAssessment;
  }

  async createBusinessNeed(need: InsertBusinessNeed): Promise<BusinessNeed> {
    const [newNeed] = await db.insert(businessNeeds).values(need).returning();
    return newNeed;
  }

  async getBusinessNeedsByAssessmentId(assessmentId: number): Promise<BusinessNeed[]> {
    return await db.select().from(businessNeeds).where(eq(businessNeeds.assessmentId, assessmentId));
  }

  // WhatsApp Integration Methods
  async createWhatsappSession(session: InsertWhatsappSession): Promise<WhatsappSession> {
    const [newSession] = await db.insert(whatsappSessions).values(session).returning();
    return newSession;
  }

  async getActiveWhatsappSession(phoneNumber: string): Promise<WhatsappSession | undefined> {
    const [session] = await db
      .select()
      .from(whatsappSessions)
      .where(
        and(
          eq(whatsappSessions.phoneNumber, phoneNumber),
          eq(whatsappSessions.status, "active")
        )
      );
    return session;
  }

  async createWhatsappMessage(message: InsertWhatsappMessage): Promise<WhatsappMessage> {
    const [newMessage] = await db.insert(whatsappMessages).values(message).returning();
    return newMessage;
  }

  async getWhatsappTemplate(name: string): Promise<WhatsappTemplate | undefined> {
    const [template] = await db
      .select()
      .from(whatsappTemplates)
      .where(
        and(
          eq(whatsappTemplates.name, name),
          eq(whatsappTemplates.isActive, true)
        )
      );
    return template;
  }
}

export const storage = new DatabaseStorage();