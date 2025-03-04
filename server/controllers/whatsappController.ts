/**
 * WhatsApp Controller
 * Handles WhatsApp messaging integration with advanced features
 */
import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';
import { whatsapp } from '../services/whatsapp';
import { aiService } from '../services/ai';
import { logger } from '../services/logger';
import { AppError, ErrorCode } from '../services/errorHandler';
import { apiCache } from '../services/cache';

/**
 * Handle incoming WhatsApp messages and provide AI-powered responses
 */
export const handleIncomingMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Early response to WhatsApp servers to prevent timeout
    res.status(200).send('OK');
    
    const { from, text, timestamp, messageId } = req.body;
    
    if (!from || !text) {
      logger.warn('Invalid WhatsApp message format', { body: req.body });
      return;
    }
    
    logger.info('WhatsApp message received', { from, messageId, textLength: text.length });
    
    // Process message asynchronously after responding to the webhook
    processWhatsAppMessage(from, text, messageId, timestamp).catch(error => {
      logger.error('Error processing WhatsApp message', error as Error, { from, messageId });
    });
    
  } catch (error) {
    // Log error but don't send to next() as we've already responded
    logger.error('Error in WhatsApp webhook', error as Error);
  }
};

/**
 * Send a message to a WhatsApp user
 */
export const sendWhatsAppMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { to, text } = req.body;
    
    if (!to || !text) {
      return next(AppError.badRequest('Both "to" and "text" are required'));
    }
    
    const result = await whatsapp.sendMessage(to, text);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Send a template message to a WhatsApp user
 */
export const sendWhatsAppTemplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { to, templateName, variables } = req.body;
    
    if (!to || !templateName) {
      return next(AppError.badRequest('Both "to" and "templateName" are required'));
    }
    
    // Validate that template exists
    const template = await storage.getWhatsappTemplate(templateName);
    
    if (!template) {
      return next(AppError.notFound(`Template "${templateName}" not found`));
    }
    
    const result = await whatsapp.sendTemplate(to, templateName, variables || {});
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Process a WhatsApp message asynchronously
 */
async function processWhatsAppMessage(from: string, text: string, messageId: string, timestamp?: number): Promise<void> {
  try {
    // Store the incoming message
    await storage.createWhatsappMessage({
      content: text,
      direction: 'incoming',
      status: 'delivered',
      messageType: 'text',
      metadata: {
        from,
        messageId,
        timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString()
      }
    });
    
    // Get or create a session
    const session = await storage.getActiveWhatsappSession(from);
    const sessionId = session?.id;
    
    if (!sessionId) {
      logger.warn('No active session found for WhatsApp user', { from });
      return;
    }
    
    // Use AI to analyze the message
    const analysis = await aiService.analyzeInput(text);
    
    // Generate an appropriate response
    const response = await aiService.generateResponse(text, analysis, {
      language: analysis.language,
      tone: 'friendly'
    });
    
    // Send the response
    await whatsapp.sendMessage(from, response);
    
    logger.info('Sent WhatsApp AI response', { 
      to: from, 
      sessionId, 
      intent: analysis.intent,
      language: analysis.language
    });
  } catch (error) {
    logger.error('Failed to process WhatsApp message', error as Error, { from, messageId });
  }
}