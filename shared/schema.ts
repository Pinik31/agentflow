import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url").notNull(),
  publishedAt: timestamp("published_at").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message"),
  metadata: jsonb("metadata"),
  businessSize: text("business_size"),
  industry: text("industry"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const businessAssessments = pgTable("business_assessments", {
  id: serial("id").primaryKey(),
  leadId: serial("lead_id").references(() => leads.id),
  currentMarketingEfforts: text("current_marketing_efforts"),
  monthlyBudget: text("monthly_budget"),
  targetAudience: text("target_audience"),
  mainChallenges: text("main_challenges"),
  goals: text("goals"),
  timeline: text("timeline"),
  preferences: jsonb("preferences"),
  botNotes: text("bot_notes"),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const businessNeeds = pgTable("business_needs", {
  id: serial("id").primaryKey(),
  assessmentId: serial("assessment_id").references(() => businessAssessments.id),
  category: text("category").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull(),
  recommendedSolution: text("recommended_solution"),
  estimatedCost: text("estimated_cost"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Export schemas for validation
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true });
export const insertNewsletterSchema = createInsertSchema(newsletter).omit({ id: true, createdAt: true });
export const insertBusinessAssessmentSchema = createInsertSchema(businessAssessments).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBusinessNeedsSchema = createInsertSchema(businessNeeds).omit({ id: true, createdAt: true });

// Export types
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Newsletter = typeof newsletter.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type BusinessAssessment = typeof businessAssessments.$inferSelect;
export type InsertBusinessAssessment = z.infer<typeof insertBusinessAssessmentSchema>;
export type BusinessNeed = typeof businessNeeds.$inferSelect;
export type InsertBusinessNeed = z.infer<typeof insertBusinessNeedsSchema>;