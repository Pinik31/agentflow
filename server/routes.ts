
import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { 
  insertLeadSchema, 
  insertNewsletterSchema, 
  insertBusinessNeedsSchema, 
  insertBusinessAssessmentSchema 
} from "@shared/schema";
import { z } from "zod";
import { whatsapp } from "./services/whatsapp";
import NodeCache from "node-cache";
import { rateLimit } from "express-rate-limit";
import { validate } from "./services/validator";

// Initialize cache with standard TTL of 5 minutes
const cache = new NodeCache({ 
  stdTTL: 300,
  checkperiod: 60,
  maxKeys: 1000
});

// Create middleware for caching
const cacheMiddleware = (duration = 300) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') return next();
    
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = cache.get(key);
    
    if (cachedBody) {
      res.send(cachedBody);
      return;
    }
    
    // Store the original send
    const originalSend = res.send;
    
    // Override send
    res.send = function(body): any {
      // Only cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, body, duration);
      }
      return originalSend.call(this, body);
    };
    
    next();
  };
};

// Higher-order function for controller error handling
const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export function registerRoutes(app: Express, server: Server): void {
  // Blog routes with caching
  app.get("/api/blog", cacheMiddleware(600), asyncHandler(async (_req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  }));

  app.get("/api/blog/:slug", cacheMiddleware(600), asyncHandler(async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  }));

  // Lead capture routes with strict rate limiting to prevent spam
  const leadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 submissions per hour
    message: { message: "Too many lead submissions, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.post("/api/leads", leadLimiter, asyncHandler(async (req, res) => {
    const validationResult = validate(insertLeadSchema, req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid lead data", 
        errors: validationResult.errors 
      });
    }
    
    const lead = validationResult.data;
    const newLead = await storage.createLead(lead);
    
    // Create business assessment with proper type checking
    if (typeof lead.metadata === 'object' && lead.metadata !== null) {
      const metadata = lead.metadata as Record<string, any>;
      const automationNeeds = Array.isArray(metadata.automationNeeds) ? metadata.automationNeeds : [];
      
      await storage.createBusinessAssessment({
        leadId: newLead.id,
        currentMarketingEfforts: automationNeeds.includes('שיווק') ? 'needs_automation' : 'not_specified',
        mainChallenges: automationNeeds.length > 0 ? automationNeeds.join(', ') : 'Not specified',
        status: 'new',
        preferences: metadata
      });
    }
    
    res.status(201).json(newLead);
  }));

  // Newsletter routes with rate limiting
  const newsletterLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 3, // 3 submissions per day
    message: { message: "Too many subscription attempts, please try again tomorrow" },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.post("/api/newsletter", newsletterLimiter, asyncHandler(async (req, res) => {
    const validationResult = validate(insertNewsletterSchema, req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid email", 
        errors: validationResult.errors 
      });
    }
    
    const subscriber = validationResult.data;
    const newSubscriber = await storage.addNewsletterSubscriber(subscriber);
    res.status(201).json(newSubscriber);
  }));

  // Business needs routes
  app.post("/api/business-needs", asyncHandler(async (req, res) => {
    const validationResult = validate(insertBusinessNeedsSchema, req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid business need data", 
        errors: validationResult.errors 
      });
    }
    
    const need = validationResult.data;
    const newNeed = await storage.createBusinessNeed(need);
    res.status(201).json(newNeed);
  }));

  app.get("/api/business-needs/:assessmentId", asyncHandler(async (req, res) => {
    const assessmentId = parseInt(req.params.assessmentId, 10);
    if (isNaN(assessmentId)) {
      return res.status(400).json({ message: "Invalid assessment ID" });
    }
    
    const needs = await storage.getBusinessNeedsByAssessmentId(assessmentId);
    res.json(needs);
  }));

  // Business assessment routes
  app.post("/api/business-assessments", asyncHandler(async (req, res) => {
    const validationResult = validate(insertBusinessAssessmentSchema, req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Invalid business assessment data", 
        errors: validationResult.errors 
      });
    }
    
    const assessment = validationResult.data;
    const newAssessment = await storage.createBusinessAssessment(assessment);
    res.status(201).json(newAssessment);
  }));

  app.get("/api/business-assessments/:leadId", cacheMiddleware(300), asyncHandler(async (req, res) => {
    const leadId = parseInt(req.params.leadId, 10);
    if (isNaN(leadId)) {
      return res.status(400).json({ message: "Invalid lead ID" });
    }
    
    const assessment = await storage.getBusinessAssessmentByLeadId(leadId);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    
    res.json(assessment);
  }));

  app.patch("/api/business-assessments/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid assessment ID" });
    }
    
    // Partial validation allows update of subset of fields
    try {
      const assessment = await storage.updateBusinessAssessment(id, req.body);
      // Invalidate cache for this assessment
      cache.del(`__express__/api/business-assessments/${assessment.leadId}`);
      res.json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid business assessment data", 
          errors: error.errors 
        });
      }
      throw error;
    }
  }));

  // WhatsApp webhook optimization - respond immediately to improve UX
  const whatsappWebhookHandler = asyncHandler(async (req: Request, res: Response) => {
    // Send an immediate 200 response first to acknowledge receipt
    res.status(200).json({ message: "Webhook received" });
    
    // Process asynchronously
    setImmediate(async () => {
      try {
        const { entry } = req.body;
        
        if (!entry || !Array.isArray(entry)) {
          console.error("Invalid webhook data received");
          return;
        }
        
        // Process messages
        const messages: Array<{from: string, text: string}> = [];
        
        // Extract all messages
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
        
        // AI-enhanced message processing with parallelization for better performance
        await Promise.all(messages.map(async (msg) => {
          try {
            // Basic AI response - this could be enhanced with a more sophisticated AI service
            const responseText = determineResponse(msg.text);
            await whatsapp.sendMessage(msg.from, responseText);
          } catch (err) {
            console.error("Failed to process WhatsApp message:", err);
          }
        }));
      } catch (error) {
        console.error("WhatsApp webhook processing error:", error);
      }
    });
  });
  
  // Simple AI response determination - can be enhanced with more sophisticated AI
  function determineResponse(text: string): string {
    const lowercaseText = text.toLowerCase();
    
    // Very basic intent detection
    if (lowercaseText.includes('שלום') || lowercaseText.includes('היי')) {
      return "שלום! תודה שפנית לAgent Flow. איך נוכל לעזור לך?";
    } else if (lowercaseText.includes('מחיר') || lowercaseText.includes('עלות')) {
      return "תודה על התעניינותך! נציג יחזור אליך בהקדם עם פרטים על המחירים והחבילות שלנו.";
    } else if (lowercaseText.includes('שירות') || lowercaseText.includes('פתרון')) {
      return "אנו מציעים מגוון פתרונות אוטומציה מבוססי AI המותאמים לצרכי העסק שלך. נציג יחזור אליך בהקדם לפירוט נוסף.";
    }
    
    // Default response
    return "תודה על פנייתך! נציג יחזור אליך בהקדם.";
  }
  
  app.post("/api/whatsapp/webhook", whatsappWebhookHandler);

  // WhatsApp verification route - optimized for quick response
  app.get("/api/whatsapp/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    // Simple verification logic - no need for async/await here
    if (mode === "subscribe" && token === verifyToken) {
      return res.status(200).send(challenge);
    }
    
    res.sendStatus(403);
  });

  // Message sending route with improved validation
  app.post("/api/whatsapp/send", asyncHandler(async (req, res) => {
    const { to, text, templateName, variables } = req.body;
    
    // Enhanced validation
    if (!to || (!text && !templateName)) {
      return res.status(400).json({ 
        message: "Missing required fields. 'to' and either 'text' or 'templateName' are required" 
      });
    }
    
    // Phone number format validation
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(to.replace(/\D/g, ''))) {
      return res.status(400).json({
        message: "Invalid phone number format"
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
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error";
      console.error("Error sending WhatsApp message:", error);
      
      res.status(500).json({ 
        message: "Failed to send message", 
        error: errorMessage 
      });
    }
  }));

  // API documentation route
  app.get("/api/docs", cacheMiddleware(3600), (req, res) => {
    // Generate basic API documentation
    const apiDocs = {
      title: "Agent Flow API Documentation",
      version: "1.0.0",
      endpoints: [
        { path: "/api/blog", method: "GET", description: "Get all blog posts" },
        { path: "/api/blog/:slug", method: "GET", description: "Get a specific blog post by slug" },
        { path: "/api/leads", method: "POST", description: "Create a new lead" },
        { path: "/api/newsletter", method: "POST", description: "Subscribe to newsletter" },
        { path: "/api/business-needs", method: "POST", description: "Create a new business need" },
        { path: "/api/business-needs/:assessmentId", method: "GET", description: "Get business needs by assessment ID" },
        { path: "/api/business-assessments", method: "POST", description: "Create a new business assessment" },
        { path: "/api/business-assessments/:leadId", method: "GET", description: "Get business assessment by lead ID" },
        { path: "/api/business-assessments/:id", method: "PATCH", description: "Update a business assessment" },
        { path: "/api/whatsapp/send", method: "POST", description: "Send WhatsApp message" },
      ]
    };
    
    res.json(apiDocs);
  });
  
  // Catch-all for 404 errors on API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({ 
      message: "API endpoint not found",
      path: req.originalUrl
    });
  });
}
