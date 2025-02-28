import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertNewsletterSchema, insertBusinessNeedsSchema, insertBusinessAssessmentSchema } from "@shared/schema";
import { z } from "zod";
import { whatsapp } from "./services/whatsapp";

export function registerRoutes(app: Express, server: Server): void {
  // Blog routes
  app.get("/api/blog", async (_req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  });

  // Lead capture routes
  app.post("/api/leads", async (req, res) => {
    try {
      const lead = insertLeadSchema.parse(req.body);
      const newLead = await storage.createLead(lead);
      
      // Create business assessment
      if (typeof lead.metadata === 'object' && lead.metadata !== null && Array.isArray(lead.metadata.automationNeeds)) {
        await storage.createBusinessAssessment({
          leadId: newLead.id,
          currentMarketingEfforts: lead.metadata.automationNeeds.includes('שיווק') ? 'needs_automation' : 'not_specified',
          mainChallenges: lead.metadata.automationNeeds.join(', '),
          status: 'new',
          preferences: lead.metadata
        });
      }
      
      res.json(newLead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid lead data", errors: error.errors });
        return;
      }
      throw error;
    }
  });

  // Newsletter routes
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscriber = insertNewsletterSchema.parse(req.body);
      const newSubscriber = await storage.addNewsletterSubscriber(subscriber);
      res.json(newSubscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid email", errors: error.errors });
        return;
      }
      throw error;
    }
  });

  // Business needs routes
  app.post("/api/business-needs", async (req, res) => {
    try {
      const need = insertBusinessNeedsSchema.parse(req.body);
      const newNeed = await storage.createBusinessNeed(need);
      res.json(newNeed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid business need data", errors: error.errors });
        return;
      }
      throw error;
    }
  });

  app.get("/api/business-needs/:assessmentId", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.assessmentId, 10);
      if (isNaN(assessmentId)) {
        res.status(400).json({ message: "Invalid assessment ID" });
        return;
      }
      const needs = await storage.getBusinessNeedsByAssessmentId(assessmentId);
      res.json(needs);
    } catch (error) {
      throw error;
    }
  });

  // Business assessment routes
  app.post("/api/business-assessments", async (req, res) => {
    try {
      const assessment = insertBusinessAssessmentSchema.parse(req.body);
      const newAssessment = await storage.createBusinessAssessment(assessment);
      res.json(newAssessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid business assessment data", errors: error.errors });
        return;
      }
      throw error;
    }
  });

  app.get("/api/business-assessments/:leadId", async (req, res) => {
    try {
      const leadId = parseInt(req.params.leadId, 10);
      if (isNaN(leadId)) {
        res.status(400).json({ message: "Invalid lead ID" });
        return;
      }
      const assessment = await storage.getBusinessAssessmentByLeadId(leadId);
      if (!assessment) {
        res.status(404).json({ message: "Assessment not found" });
        return;
      }
      res.json(assessment);
    } catch (error) {
      throw error;
    }
  });

  app.patch("/api/business-assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid assessment ID" });
        return;
      }
      const assessment = await storage.updateBusinessAssessment(id, req.body);
      res.json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid business assessment data", errors: error.errors });
        return;
      }
      throw error;
    }
  });

  // WhatsApp webhook routes - respond immediately and process asynchronously
  app.post("/api/whatsapp/webhook", (req, res) => {
    // Respond to the webhook immediately
    res.status(200).json({ message: "Webhook received" });
    
    // Process the webhook asynchronously
    setImmediate(async () => {
      try {
        const { entry } = req.body;
        
        if (!entry || !Array.isArray(entry)) {
          console.log("Invalid webhook data received");
          return;
        }
        
        // Process messages
        const messages = [];
        
        // Extract all messages that need processing
        for (const e of entry) {
          if (e.changes) {
            for (const change of e.changes) {
              if (change.value && change.value.messages) {
                for (const message of change.value.messages) {
                  if (message.type === "text" && message.text) {
                    messages.push({
                      from: message.from,
                      text: message.text.body
                    });
                  }
                }
              }
            }
          }
        }
        
        // Process each message sequentially
        for (const msg of messages) {
          try {
            await whatsapp.sendMessage(
              msg.from, 
              "תודה על פנייתך! נציג יחזור אליך בהקדם."
            );
          } catch (err) {
            console.error("Failed to send response to WhatsApp message:", err);
          }
        }
      } catch (error) {
        console.error("WhatsApp webhook processing error:", error);
      }
    });
  });

  // WhatsApp verification route - optimized to respond quickly
  app.get("/api/whatsapp/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode === "subscribe" && token === verifyToken) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  });

  // Message sending route - with improved validation and error handling
  app.post("/api/whatsapp/send", async (req, res) => {
    const { to, text, templateName, variables } = req.body;
    
    // Basic validation
    if (!to || (!text && !templateName)) {
      return res.status(400).json({ 
        message: "Missing required fields. 'to' and either 'text' or 'templateName' are required" 
      });
    }
    
    try {
      let message;
      
      if (templateName) {
        message = await whatsapp.sendTemplate(to, templateName, variables || {});
      } else {
        message = await whatsapp.sendMessage(to, text);
      }
      
      res.json(message);
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      
      // More descriptive error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ 
        message: "Failed to send message", 
        error: errorMessage 
      });
    }
  });

  // No need to create or return a server as it's passed in
}