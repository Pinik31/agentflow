import { WhatsappMessage, WhatsappSession, WhatsappTemplate, type InsertWhatsappMessage, type InsertWhatsappSession } from "@shared/schema";
import { storage } from "../storage";

class WhatsAppService {
  private apiToken: string;
  private phoneNumber: string;

  constructor() {
    this.apiToken = process.env.WHATSAPP_API_TOKEN!;
    this.phoneNumber = process.env.WHATSAPP_PHONE_NUMBER!;
  }

  private async sendRequest(endpoint: string, data: any) {
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
  }

  async sendMessage(to: string, text: string): Promise<WhatsappMessage> {
    const data = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text }
    };

    const result = await this.sendRequest(`${this.phoneNumber}/messages`, data);

    const message: InsertWhatsappMessage = {
      sessionId: await this.getOrCreateSession(to),
      direction: "outbound",
      messageType: "text",
      content: text,
      metadata: result,
      status: "sent"
    };

    return await storage.createWhatsappMessage(message);
  }

  async sendTemplate(to: string, templateName: string, variables: Record<string, string> = {}): Promise<WhatsappMessage> {
    const template = await storage.getWhatsappTemplate(templateName);
    if (!template) {
      throw new Error(`Template ${templateName} not found`);
    }

    let content = template.content;
    for (const [key, value] of Object.entries(variables)) {
      content = content.replace(`{{${key}}}`, value);
    }

    const data = {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: template.language
        },
        components: [
          {
            type: "body",
            parameters: Object.entries(variables).map(([_, value]) => ({
              type: "text",
              text: value
            }))
          }
        ]
      }
    };

    const result = await this.sendRequest(`${this.phoneNumber}/messages`, data);

    const message: InsertWhatsappMessage = {
      sessionId: await this.getOrCreateSession(to),
      direction: "outbound",
      messageType: "template",
      content,
      metadata: result,
      status: "sent"
    };

    return await storage.createWhatsappMessage(message);
  }

  private async getOrCreateSession(phoneNumber: string): Promise<number> {
    const existingSession = await storage.getActiveWhatsappSession(phoneNumber);
    if (existingSession) {
      return existingSession.id;
    }

    const session: InsertWhatsappSession = {
      phoneNumber,
      status: "active",
      metadata: {}
    };

    const newSession = await storage.createWhatsappSession(session);
    return newSession.id;
  }
}

export const whatsapp = new WhatsAppService();
