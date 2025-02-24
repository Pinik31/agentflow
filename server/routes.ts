import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { whatsapp } from "./services/whatsapp";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // WhatsApp webhook routes
  app.post("/api/whatsapp/webhook", async (req, res) => {
    try {
      const { entry } = req.body;

      if (!entry || !Array.isArray(entry)) {
        res.status(400).json({ message: "Invalid webhook data" });
        return;
      }

      for (const e of entry) {
        if (e.changes) {
          for (const change of e.changes) {
            if (change.value && change.value.messages) {
              for (const message of change.value.messages) {
                const { from, type, text } = message;
                if (type === "text" && text) {
                  await whatsapp.sendMessage(from, "תודה על פנייתך! נציג יחזור אליך בהקדם.");
                }
              }
            }
          }
        }
      }

      res.status(200).json({ message: "Webhook processed successfully" });
    } catch (error) {
      console.error("WhatsApp webhook error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // WhatsApp verification route
  app.get("/api/whatsapp/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  });

  // Message sending route
  app.post("/api/whatsapp/send", async (req, res) => {
    try {
      const { to, text, templateName, variables } = req.body;

      if (templateName) {
        const message = await whatsapp.sendTemplate(to, templateName, variables);
        res.json(message);
      } else if (text) {
        const message = await whatsapp.sendMessage(to, text);
        res.json(message);
      } else {
        res.status(400).json({ message: "Either text or templateName is required" });
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}