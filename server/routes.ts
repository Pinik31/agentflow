import { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { storage } from './storage';
import { z } from 'zod';
import { validate } from './services/validator';
import { detectAttackPatterns, validateApiKey } from './services/security';
import { insertLeadSchema, insertNewsletterSchema, insertBusinessAssessmentSchema, insertBusinessNeedsSchema, insertWhatsappSessionSchema, insertWhatsappMessageSchema, insertWhatsappTemplateSchema, insertBlogPostSchema } from '@shared/schema';
import { logger, measureApiPerformance } from './services/logger';
import { whatsapp } from './services/whatsapp';
import { AppError } from './services/errorHandler';

// Import controllers
import * as blogController from './controllers/blogController';
import * as leadController from './controllers/leadController';
import * as whatsappController from './controllers/whatsappController';

export function registerRoutes(app: Express, server: Server): void {
  // Apply common middleware to all API routes
  app.use('/api', measureApiPerformance);
  app.use('/api', detectAttackPatterns);
  
  // Public API routes
  
  // Sanity check route
  app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello, world!' });
  });

  // Blog routes - using optimized controllers
  app.get('/api/blog', blogController.getAllBlogPosts);
  app.get('/api/blog/:slug', blogController.getBlogPostBySlug);
  app.get('/api/blog/category/:category', blogController.getBlogPostsByCategory);
  app.get('/api/blog/search', blogController.searchBlogPosts);

  // Lead capture routes
  app.post('/api/leads', 
    validate(insertLeadSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const lead = req.body;
        const newLead = await storage.createLead(lead);
        
        // Create business assessment with better type checking
        if (typeof lead.metadata === 'object' && lead.metadata !== null) {
          // Check if automationNeeds exists and is an array
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
      } catch (error) {
        next(error);
      }
    }
  );

  // Newsletter subscription
  app.post('/api/newsletter', 
    validate(insertNewsletterSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const newSubscriber = await storage.addNewsletterSubscriber(req.body);
        res.status(201).json(newSubscriber);
      } catch (error) {
        next(error);
      }
    }
  );
  
  // Business needs routes
  app.post('/api/business-needs', 
    validate(insertBusinessNeedsSchema),
    leadController.createBusinessNeed
  );
  
  app.get('/api/business-needs/:assessmentId',
    leadController.getBusinessNeeds
  );
  
  // Business assessment routes
  app.post('/api/business-assessments', 
    validate(insertBusinessAssessmentSchema),
    leadController.createBusinessAssessment
  );
  
  app.get('/api/business-assessments/:leadId', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leadId = parseInt(req.params.leadId, 10);
      
      if (isNaN(leadId)) {
        throw AppError.badRequest('Invalid lead ID format');
      }
      
      const assessment = await storage.getBusinessAssessmentByLeadId(leadId);
      
      if (!assessment) {
        throw AppError.notFound(`Assessment for lead ID ${leadId} not found`);
      }
      
      res.json(assessment);
    } catch (error) {
      next(error);
    }
  });
  
  app.patch('/api/business-assessments/:id', 
    validate(insertBusinessAssessmentSchema.partial()),
    leadController.updateBusinessAssessment
  );
  
  // WhatsApp webhook routes - using optimized controller
  app.post('/api/whatsapp/webhook', whatsappController.handleIncomingMessage);
  
  // WhatsApp verification route - optimized to respond quickly
  app.get('/api/whatsapp/webhook', (req: Request, res: Response) => {
    const mode = req.query['hub.mode'] as string;
    const token = req.query['hub.verify_token'] as string;
    const challenge = req.query['hub.challenge'] as string;
    
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    
    if (mode === 'subscribe' && token === verifyToken) {
      logger.info('WhatsApp webhook verified');
      res.status(200).send(challenge);
    } else {
      logger.warn('Failed WhatsApp webhook verification attempt', {
        mode,
        ip: req.ip
      });
      res.sendStatus(403);
    }
  });
  
  // Sending message routes
  app.post('/api/whatsapp/send', whatsappController.sendWhatsAppMessage);
  app.post('/api/whatsapp/template', whatsappController.sendWhatsAppTemplate);
  
  // Protected API routes (requires API key in production)
  app.use('/api/admin', validateApiKey);
  
  app.post('/api/admin/blog', 
    validate(insertBlogPostSchema),
    blogController.createBlogPost
  );
  
  app.get('/api/admin/leads', leadController.getLeads);
}