import { WhatsappMessage, WhatsappSession, WhatsappTemplate, type InsertWhatsappMessage, type InsertWhatsappSession } from "@shared/schema";
import { storage } from "../storage";

class WhatsAppService {
  private apiToken: string | null = null;
  private phoneNumber: string | null = null;
  private initialized = false;

  constructor() {
    // Lazy initialization to prevent startup delays
    this.init();
  }

  private init() {
    if (!this.initialized) {
      this.apiToken = process.env.WHATSAPP_API_TOKEN || null;
      this.phoneNumber = process.env.WHATSAPP_PHONE_NUMBER || null;
      this.initialized = true;
    }
  }

  private checkInitialization() {
    this.init();
    if (!this.apiToken || !this.phoneNumber) {
      console.warn("WhatsApp service not fully configured. Missing API token or phone number.");
      return false;
    }
    return true;
  }

  private async sendRequest(endpoint: string, data: any) {
    if (!this.checkInitialization()) {
      throw new Error("WhatsApp service not properly configured");
    }

    try {
      const response = await fetch(`https://graph.facebook.com/v17.0/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`WhatsApp API Error: ${error.message}`);
      }

      return response.json();
    } catch (error) {
      console.error("WhatsApp API request failed:", error);
      throw error;
    }
  }

  async sendMessage(to: string, text: string) {
    if (!this.checkInitialization()) {
      return { success: false, error: "WhatsApp service not properly configured" };
    }

    try {
      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: {
          body: text
        }
      };

      const result = await this.sendRequest(`${this.phoneNumber}/messages`, data);
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to send WhatsApp message:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async sendTemplate(to: string, templateName: string, variables: Record<string, string>) {
    if (!this.checkInitialization()) {
      return { success: false, error: "WhatsApp service not properly configured" };
    }

    try {
      // Convert variables to components format expected by WhatsApp API
      const components = Object.entries(variables).map(([key, value]) => ({
        type: "body",
        parameters: [
          {
            type: "text",
            text: value
          }
        ]
      }));

      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: "he" // Default to Hebrew, can be parameterized
          },
          components
        }
      };

      const result = await this.sendRequest(`${this.phoneNumber}/messages`, data);
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to send WhatsApp template:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
  private async getOrCreateSession(phoneNumber: string): Promise<number> {
    try {
      // First, attempt to get the existing session
      const existingSession = await storage.getActiveWhatsappSession(phoneNumber);
      if (existingSession) {
        return existingSession.id;
      }

      // If not configured properly, return a mock session ID
      if (!this.checkInitialization()) {
        console.log("Creating mock session (WhatsApp service not configured)");
        return 999; // Mock session ID
      }

      // Create a new session
      const session: InsertWhatsappSession = {
        phoneNumber,
        status: "active",
        metadata: {}
      };

      try {
        const newSession = await storage.createWhatsappSession(session);
        return newSession.id;
      } catch (error) {
        console.error("Failed to create WhatsApp session", error);
        // Fallback to a dummy session ID in case of failure
        return 999; // Mock session ID
      }
    } catch (error) {
      console.error("Error in getOrCreateSession", error);
      return 999; // Return a fallback ID to prevent cascading failures
    }
  }
}

export const whatsapp = new WhatsAppService();