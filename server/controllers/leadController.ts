/**
 * Lead Controller
 * Handles all lead and business assessment related operations
 */
import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';
import { apiCache } from '../services/cache';
import { logger } from '../services/logger';
import { AppError, ErrorCode } from '../services/errorHandler';
import { aiService } from '../services/ai';
import { validate } from '../services/validator';
import { insertLeadSchema, insertBusinessAssessmentSchema, insertBusinessNeedsSchema } from '@shared/schema';
import { z } from 'zod';

/**
 * Create a new lead with validation
 */
export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const endTimer = logger.startTimer('Create lead');
    
    // Create the lead
    const newLead = await storage.createLead(req.body);
    logger.info('New lead created', { leadId: newLead.id, email: newLead.email });
    
    endTimer();
    res.status(201).json(newLead);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all leads with basic filtering
 */
export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const endTimer = logger.startTimer('Get all leads');
    
    // Get cached or fresh data
    const leads = await apiCache.getOrSet('all_leads', async () => {
      return await storage.getLeads();
    }, 300); // Cache for 5 minutes only since leads are frequently updated
    
    // Filtering options
    const { company, businessSize, industry } = req.query;
    
    let filteredLeads = leads;
    
    if (company && typeof company === 'string') {
      filteredLeads = filteredLeads.filter(lead => 
        lead.company?.toLowerCase().includes(company.toLowerCase())
      );
    }
    
    if (businessSize && typeof businessSize === 'string') {
      filteredLeads = filteredLeads.filter(lead => 
        lead.businessSize === businessSize
      );
    }
    
    if (industry && typeof industry === 'string') {
      filteredLeads = filteredLeads.filter(lead => 
        lead.industry?.toLowerCase().includes(industry.toLowerCase())
      );
    }
    
    endTimer();
    res.json(filteredLeads);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a business assessment for a lead
 */
export const createBusinessAssessment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { leadId } = req.params;
    const leadIdNum = parseInt(leadId, 10);
    
    if (isNaN(leadIdNum)) {
      return next(AppError.badRequest('Invalid lead ID format'));
    }
    
    const endTimer = logger.startTimer('Create business assessment');
    
    // Check if lead exists
    const leads = await storage.getLeads();
    const leadExists = leads.some(lead => lead.id === leadIdNum);
    
    if (!leadExists) {
      return next(AppError.notFound(`Lead with ID ${leadId} not found`));
    }
    
    // Check if assessment already exists
    const existingAssessment = await storage.getBusinessAssessmentByLeadId(leadIdNum);
    
    if (existingAssessment) {
      return next(AppError.badRequest(`Assessment already exists for lead ${leadId}`));
    }
    
    // Create the assessment with the provided lead ID
    const assessmentData = {
      ...req.body,
      leadId: leadIdNum
    };
    
    const newAssessment = await storage.createBusinessAssessment(assessmentData);
    
    endTimer();
    res.status(201).json(newAssessment);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a business assessment
 */
export const updateBusinessAssessment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const assessmentId = parseInt(id, 10);
    
    if (isNaN(assessmentId)) {
      return next(AppError.badRequest('Invalid assessment ID format'));
    }
    
    const endTimer = logger.startTimer(`Update business assessment ${id}`);
    
    // Get the assessment by lead ID first
    const leadId = req.body.leadId;
    const existingAssessment = await storage.getBusinessAssessmentByLeadId(leadId);
    
    if (!existingAssessment) {
      return next(AppError.notFound(`Assessment with ID ${id} not found`));
    }
    
    if (existingAssessment.id !== assessmentId) {
      return next(AppError.badRequest(`Assessment ID mismatch`));
    }
    
    // Update the assessment
    const updatedAssessment = await storage.updateBusinessAssessment(assessmentId, req.body);
    
    endTimer();
    res.json(updatedAssessment);
  } catch (error) {
    next(error);
  }
};

/**
 * Create business needs for an assessment
 */
export const createBusinessNeed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { assessmentId } = req.params;
    const assessmentIdNum = parseInt(assessmentId, 10);
    
    if (isNaN(assessmentIdNum)) {
      return next(AppError.badRequest('Invalid assessment ID format'));
    }
    
    const endTimer = logger.startTimer('Create business need');
    
    // Create the business need with enhanced AI recommendation
    let needData = {
      ...req.body,
      assessmentId: assessmentIdNum
    };
    
    // Optional AI enhancement for recommended solution
    if (req.body.enhanceWithAI && !req.body.recommendedSolution && aiService.isReady()) {
      const description = req.body.description || '';
      const category = req.body.category || '';
      
      // Generate AI recommendation
      const aiRecommendation = await aiService.generateResponse(
        description,
        {
          intent: 'business_recommendation',
          entities: { category },
          sentiment: 0.5,
          confidence: 0.8,
          language: 'he'
        },
        { language: 'he', tone: 'professional' }
      );
      
      needData.recommendedSolution = aiRecommendation;
    }
    
    const newNeed = await storage.createBusinessNeed(needData);
    
    endTimer();
    res.status(201).json(newNeed);
  } catch (error) {
    next(error);
  }
};

/**
 * Get business needs for an assessment
 */
export const getBusinessNeeds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { assessmentId } = req.params;
    const assessmentIdNum = parseInt(assessmentId, 10);
    
    if (isNaN(assessmentIdNum)) {
      return next(AppError.badRequest('Invalid assessment ID format'));
    }
    
    const endTimer = logger.startTimer(`Get business needs for assessment ${assessmentId}`);
    
    // Get the business needs
    const needs = await storage.getBusinessNeedsByAssessmentId(assessmentIdNum);
    
    endTimer();
    res.json(needs);
  } catch (error) {
    next(error);
  }
};