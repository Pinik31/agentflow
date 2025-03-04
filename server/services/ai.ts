/**
 * AI Service for Agent Flow
 * Provides advanced AI capabilities for chatbot and content generation
 */
import { logger } from './logger';
import { AppError, ErrorCode } from './errorHandler';
import { apiCache } from './cache';

// Types for AI responses
export interface AIAnalysisResult {
  intent: string;
  entities: Record<string, any>;
  sentiment: number;
  confidence: number;
  language: string;
}

export interface AIResponseOptions {
  language?: string;
  tone?: 'professional' | 'friendly' | 'technical';
  maxLength?: number;
  additionalContext?: Record<string, any>;
  enhanceWithAI?: boolean;
}

/**
 * Handles AI-related operations including intent detection,
 * response generation, and content enhancement
 */
class AIService {
  private isConfigured: boolean = false;
  private apiKey: string | null = null;
  private apiEndpoint: string | null = null;
  private defaultLanguage: string = 'he'; // Hebrew by default
  
  constructor() {
    this.initialize();
  }
  
  /**
   * Initialize the AI service with environment variables
   */
  private initialize(): void {
    this.apiKey = process.env.AI_API_KEY || null;
    this.apiEndpoint = process.env.AI_ENDPOINT || null;
    this.isConfigured = !!this.apiKey && !!this.apiEndpoint;
    
    if (!this.isConfigured) {
      logger.warn('AI service not fully configured - will use fallback responses');
    } else {
      logger.info('AI service initialized successfully');
    }
  }
  
  /**
   * Check if a valid API provider is configured
   */
  public isReady(): boolean {
    return this.isConfigured;
  }
  
  /**
   * Analyze user input to extract intent and entities
   * @param text The user's input text to analyze
   * @returns An analysis result containing intent, entities, and other metadata
   */
  public async analyzeInput(text: string): Promise<AIAnalysisResult> {
    const cacheKey = `ai:analysis:${text}`;
    
    try {
      // Use cached result if available
      return await apiCache.getOrSet(cacheKey, async () => {
        if (!this.isConfigured) {
          return this.getFallbackAnalysis(text);
        }
        
        // In a real implementation, this would call an AI API
        // For now, we'll simulate an AI response based on keywords
        if (text.includes('מחיר') || text.includes('עלות') || text.includes('תשלום')) {
          return {
            intent: 'pricing_inquiry',
            entities: {
              service: this.extractService(text)
            },
            sentiment: 0.6,
            confidence: 0.85,
            language: 'he'
          };
        } else if (text.includes('שירות') || text.includes('עזרה')) {
          return {
            intent: 'service_inquiry',
            entities: {
              service: this.extractService(text)
            },
            sentiment: 0.7,
            confidence: 0.9,
            language: 'he'
          };
        } else if (text.includes('תודה') || text.includes('מעולה')) {
          return {
            intent: 'appreciation',
            entities: {},
            sentiment: 0.9,
            confidence: 0.95,
            language: 'he'
          };
        } else {
          return {
            intent: 'general_inquiry',
            entities: {},
            sentiment: 0.5,
            confidence: 0.7,
            language: this.detectLanguage(text)
          };
        }
      }, 3600); // Cache for 1 hour
    } catch (error) {
      logger.error('Error analyzing input with AI', error as Error);
      return this.getFallbackAnalysis(text);
    }
  }
  
  /**
   * Generate an AI response based on user input and analysis
   * @param userInput The original user input
   * @param analysis The analysis result from analyzeInput
   * @param options Response generation options
   * @returns A generated response string
   */
  public async generateResponse(
    userInput: string, 
    analysis: AIAnalysisResult,
    options: AIResponseOptions = {}
  ): Promise<string> {
    const cacheKey = `ai:response:${userInput}:${analysis.intent}:${options.language || 'default'}`;
    
    try {
      return await apiCache.getOrSet(cacheKey, async () => {
        if (!this.isConfigured) {
          return this.getFallbackResponse(analysis.intent, options.language);
        }
        
        // In a real implementation, this would call an AI API
        // For now, we'll use predetermined responses based on intent
        switch (analysis.intent) {
          case 'pricing_inquiry':
            return options.language === 'en' 
              ? `Thank you for your interest in our pricing for ${analysis.entities.service || 'our services'}. Our team will contact you with detailed pricing information tailored to your needs.`
              : `תודה על התעניינותך במחירים עבור ${analysis.entities.service || 'השירותים שלנו'}. צוות המומחים שלנו יצור איתך קשר בהקדם עם מידע מפורט על מחירים המותאמים לצרכים שלך.`;
          
          case 'service_inquiry':
            return options.language === 'en'
              ? `We offer comprehensive AI automation solutions for businesses. Our ${analysis.entities.service || 'services'} are designed to optimize your workflow and increase efficiency.`
              : `אנחנו מציעים פתרונות אוטומציה מקיפים מבוססי בינה מלאכותית לעסקים. ה${analysis.entities.service || 'שירותים'} שלנו מתוכננים לייעל את תהליכי העבודה שלך ולהגביר את היעילות.`;
          
          case 'appreciation':
            return options.language === 'en'
              ? 'Thank you for your kind words! We are happy to assist you with any further questions.'
              : 'תודה רבה על המילים החמות! נשמח לסייע לך בכל שאלה נוספת.';
          
          case 'general_inquiry':
          default:
            return options.language === 'en'
              ? 'Thank you for reaching out to Agent Flow. How can we assist you today with our AI automation solutions?'
              : 'תודה שפנית ל-Agent Flow. כיצד נוכל לסייע לך היום עם פתרונות האוטומציה והבינה המלאכותית שלנו?';
        }
      }, 3600); // Cache for 1 hour
    } catch (error) {
      logger.error('Error generating AI response', error as Error);
      return this.getFallbackResponse(analysis.intent, options.language);
    }
  }
  
  /**
   * Generate an enhanced response with AI features
   * @param baseResponse The original response to enhance
   * @param context Additional context for enhancement
   * @param options Enhancement options
   * @returns An enhanced response string
   */
  public async enhanceResponse(
    baseResponse: string,
    context: Record<string, any> = {},
    options: AIResponseOptions = {}
  ): Promise<string> {
    // If AI is not configured or enhancement not requested, return original
    if (!this.isConfigured || options.enhanceWithAI === false) {
      return baseResponse;
    }
    
    try {
      const language = options.language || this.defaultLanguage;
      const tone = options.tone || 'professional';
      
      // This would call an AI API to enhance the response in a real implementation
      // For demo purposes, we'll add a simple enhancement
      
      // Create enhanced response based on tone
      let enhancedResponse = baseResponse;
      
      if (tone === 'friendly') {
        if (language === 'en') {
          enhancedResponse += " We're excited to work with you and bring your vision to life!";
        } else {
          enhancedResponse += " אנחנו נרגשים לעבוד איתך ולהפוך את החזון שלך למציאות!";
        }
      } else if (tone === 'technical') {
        if (language === 'en') {
          enhancedResponse += " Our AI algorithms are optimized for maximum efficiency and scalability.";
        } else {
          enhancedResponse += " האלגוריתמים שלנו מותאמים ליעילות מרבית וסקיילביליות.";
        }
      }
      
      return enhancedResponse;
    } catch (error) {
      logger.error('Error enhancing response with AI', error as Error);
      return baseResponse; // Fallback to original response on error
    }
  }
  
  /**
   * Extract service type from text (simplified implementation)
   * @param text The text to analyze for service mentions
   * @returns The extracted service name or empty string
   */
  private extractService(text: string): string {
    // Simplified entity extraction based on keywords
    if (text.includes('צ׳אטבוט') || text.includes('צ\'טבוט') || text.includes('chatbot')) {
      return 'צ׳אטבוט';
    } else if (text.includes('אוטומציה') || text.includes('automation')) {
      return 'אוטומציה';
    } else if (text.includes('אינטגרציה') || text.includes('integration')) {
      return 'אינטגרציה';
    } else if (text.includes('אנליטיקה') || text.includes('analytics')) {
      return 'אנליטיקה';
    }
    
    return '';
  }
  
  /**
   * Simple language detection based on character sets
   * @param text The text to detect language for
   * @returns The detected language code (he or en)
   */
  private detectLanguage(text: string): string {
    // Check if text contains Hebrew characters
    const hebrewPattern = /[\u0590-\u05FF]/;
    if (hebrewPattern.test(text)) {
      return 'he';
    }
    
    // Default to English for other scripts
    return 'en';
  }
  
  /**
   * Get a fallback analysis when AI service is unavailable
   * @param text The text to analyze
   * @returns A basic analysis result
   */
  private getFallbackAnalysis(text: string): AIAnalysisResult {
    return {
      intent: 'general_inquiry',
      entities: {},
      sentiment: 0.5,
      confidence: 0.5,
      language: this.detectLanguage(text)
    };
  }
  
  /**
   * Get a fallback response when AI service is unavailable
   * @param intent The detected intent
   * @param language The detected language
   * @returns A fallback response string
   */
  private getFallbackResponse(intent: string, language?: string): string {
    // Default responses when AI is not available
    if (language === 'en') {
      return "Thank you for your message. Our team will get back to you shortly.";
    } else {
      return "תודה על פנייתך. צוות המומחים שלנו יחזור אליך בהקדם.";
    }
  }
}

// Export singleton instance
export const aiService = new AIService();