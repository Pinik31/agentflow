
import { z } from 'zod';

// We'll use this interface for all AI services
export interface AIService {
  generateResponse: (input: string, context?: Record<string, any>) => Promise<string>;
  classifyIntent: (input: string) => Promise<string>;
  extractEntities: (input: string) => Promise<Record<string, any>>;
  summarize: (input: string, maxLength?: number) => Promise<string>;
}

// Schema for message classification
const intentSchema = z.object({
  intent: z.string(),
  confidence: z.number().min(0).max(1)
});

// Schema for entity extraction
const entitySchema = z.record(z.any());

/**
 * Class that handles all AI-related operations
 * This is a placeholder implementation that can be replaced with a real AI service
 */
class AIServiceImpl implements AIService {
  private readonly INTENTS = [
    { name: 'greeting', patterns: ['שלום', 'היי', 'בוקר טוב', 'ערב טוב', 'מה נשמע', 'hello', 'hi'] },
    { name: 'pricing', patterns: ['מחיר', 'עלות', 'כמה עולה', 'תעריף', 'price', 'cost', 'pricing'] },
    { name: 'info', patterns: ['מידע', 'פרטים', 'מה השירותים', 'info', 'details', 'services'] },
    { name: 'help', patterns: ['עזרה', 'תמיכה', 'בעיה', 'help', 'support', 'issue'] },
    { name: 'goodbye', patterns: ['להתראות', 'ביי', 'תודה', 'שלום', 'goodbye', 'bye', 'thanks'] }
  ];

  private readonly RESPONSES = {
    greeting: 'שלום! איך אוכל לעזור לך היום?',
    pricing: 'המחירים שלנו מתחילים מ-4,000₪ לפרויקט. נשמח לתת לך הצעת מחיר מותאמת אישית.',
    info: 'אנחנו סוכנות אוטומציה המתמחה בפתרונות AI לעסקים. אנו מציעים שירותי אוטומציה, פיתוח צ\'אטבוטים, ואינטגרציות.',
    help: 'אשמח לעזור לך. אנא פרט את הבעיה ואחד המומחים שלנו יחזור אליך בהקדם.',
    goodbye: 'תודה שפנית אלינו! נשמח לעמוד לשירותך בכל עת.',
    default: 'תודה על פנייתך. נציג יחזור אליך בהקדם.',
  };

  /**
   * Generate a response for the given input
   */
  public async generateResponse(input: string, context: Record<string, any> = {}): Promise<string> {
    try {
      // Determine the intent
      const intent = await this.classifyIntent(input);
      
      // Get the response based on intent
      return this.RESPONSES[intent as keyof typeof this.RESPONSES] || this.RESPONSES.default;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return this.RESPONSES.default;
    }
  }

  /**
   * Classify the intent of the input message
   */
  public async classifyIntent(input: string): Promise<string> {
    try {
      // Normalize input for better matching
      const normalizedInput = input.toLowerCase().trim();
      
      // Simple pattern matching for intent detection
      for (const intent of this.INTENTS) {
        if (intent.patterns.some(pattern => normalizedInput.includes(pattern))) {
          return intent.name;
        }
      }
      
      return 'default';
    } catch (error) {
      console.error('Error classifying intent:', error);
      return 'default';
    }
  }

  /**
   * Extract entities from the input message
   * This is a simple implementation that could be enhanced with NLP
   */
  public async extractEntities(input: string): Promise<Record<string, any>> {
    try {
      const entities: Record<string, any> = {};
      
      // Extract email
      const emailMatch = input.match(/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}/i);
      if (emailMatch) {
        entities.email = emailMatch[0];
      }
      
      // Extract phone numbers
      const phoneMatch = input.match(/(?:\+\d{1,3}[-.\s]?)?(?:\(\d{1,4}\)[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g);
      if (phoneMatch) {
        entities.phone = phoneMatch[0];
      }
      
      // Extract potential product interest keywords
      const keywords = ['chatbot', 'automation', 'AI', 'אוטומציה', 'בוט', 'צ\'אטבוט', 'מערכת'];
      const foundKeywords = keywords.filter(keyword => 
        input.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (foundKeywords.length > 0) {
        entities.interests = foundKeywords;
      }
      
      return entities;
    } catch (error) {
      console.error('Error extracting entities:', error);
      return {};
    }
  }

  /**
   * Summarize the input text
   */
  public async summarize(input: string, maxLength = 100): Promise<string> {
    try {
      if (input.length <= maxLength) {
        return input;
      }
      
      // Simple extractive summarization - get first maxLength characters
      return input.substring(0, maxLength) + '...';
      
      // In a real implementation, this would use NLP to create a proper summary
    } catch (error) {
      console.error('Error summarizing text:', error);
      return input.substring(0, maxLength) + '...';
    }
  }
}

// Export a singleton instance
export const aiService = new AIServiceImpl();
