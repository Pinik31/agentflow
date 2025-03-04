
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send, X, MessageSquare } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

interface BusinessData {
  companyName?: string;
  industry?: string;
  employees?: string;
  automationNeeds?: string[];
  messages?: any[]; // Add messages field for storing conversation history
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "שלום! אני כאן לעזור לך להבין את פתרונות האוטומציה שלנו. מה שם החברה שלך?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [businessData, setBusinessData] = useState<BusinessData>({});
  const [stage, setStage] = useState("company");
  
  // Load saved chat session from localStorage on component mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('chatbot_session');
      if (savedSession) {
        const parsedSession = JSON.parse(savedSession);
        const sessionAge = new Date().getTime() - new Date(parsedSession.timestamp).getTime();
        
        // Only restore session if it's less than 24 hours old
        if (sessionAge < 24 * 60 * 60 * 1000) {
          setBusinessData(parsedSession.businessData);
          setMessages(parsedSession.messages);
          setStage(parsedSession.businessData.automationNeeds ? "complete" : "company");
        } else {
          // Clear expired session
          localStorage.removeItem('chatbot_session');
        }
      }
    } catch (error) {
      console.error('Error loading chat session:', error);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    let botResponse = "";
    const updatedBusinessData = { ...businessData };

    switch (stage) {
      case "company":
        updatedBusinessData.companyName = input;
        botResponse = "באיזה תחום החברה שלך פועלת?";
        setStage("industry");
        break;
      case "industry":
        updatedBusinessData.industry = input;
        botResponse = "כמה עובדים יש בחברה?";
        setStage("employees");
        break;
      case "employees":
        updatedBusinessData.employees = input;
        botResponse = "איזה תהליכים בעסק שלך היית רוצה לייעל באמצעות אוטומציה? (שיווק, מכירות, שירות לקוחות, תפעול)";
        setStage("automation");
        break;
      case "automation":
        updatedBusinessData.automationNeeds = input.split(",").map(need => need.trim());
        botResponse = "תודה על המידע! אחד המומחים שלנו יצור איתך קשר בקרוב עם הצעה מותאמת אישית. בינתיים, אשמח לענות על שאלות נוספות שיש לך על שירותי האוטומציה שלנו.";
        setStage("complete");
        
        // Save the updated messages including this last exchange
        const updatedMessages = [...messages, userMessage, { text: botResponse, isBot: true }];
        
        // Save to database with the complete conversation history
        await saveToDatabase({
          ...updatedBusinessData,
          // Include the complete message history for context
          messages: updatedMessages
        });
        break;
      case "complete":
        botResponse = getServiceInfo(input);
        
        // Update localStorage with the latest message even after completion
        const updatedChatSession = JSON.parse(localStorage.getItem('chatbot_session') || '{}');
        if (updatedChatSession.messages) {
          updatedChatSession.messages = [...updatedChatSession.messages, userMessage, { text: botResponse, isBot: true }];
          localStorage.setItem('chatbot_session', JSON.stringify(updatedChatSession));
        }
        break;
    }

    setBusinessData(updatedBusinessData);
    setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    setInput("");
  };

  const saveToDatabase = async (data: BusinessData) => {
    try {
      // Create a structured data object that can be easily used by AI agents
      const structuredData = {
        name: data.companyName,
        industry: data.industry,
        businessSize: data.employees,
        metadata: {
          automationNeeds: data.automationNeeds,
          chatHistory: messages, // Include chat history for context
          leadSource: 'chatbot',
          timestamp: new Date().toISOString(),
          stage: stage,
          intentAnalysis: {
            primaryIntent: 'automation_inquiry',
            topNeeds: data.automationNeeds || [],
            businessContext: {
              size: data.employees,
              industry: data.industry
            }
          }
        }
      };
      
      // Save to database
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(structuredData),
      });
      
      if (!response.ok) {
        console.error('Failed to save lead data');
      } else {
        // Also store in localStorage for easy retrieval in case of page refresh
        localStorage.setItem('chatbot_session', JSON.stringify({
          businessData: data,
          messages: messages,
          timestamp: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const getServiceInfo = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    if (lowercaseQuery.includes('שיווק')) {
      return 'אנחנו מציעים אוטומציה של קמפיינים שיווקיים, ניהול רשתות חברתיות, וניתוח התנהגות לקוחות באמצעות AI.';
    } else if (lowercaseQuery.includes('מכירות')) {
      return 'הפתרונות שלנו כוללים זיהוי לידים, ניהול שיחות מכירה אוטומטיות, ומעקב אחר הזדמנויות מכירה.';
    } else if (lowercaseQuery.includes('שירות')) {
      return 'אנחנו מספקים מענה אוטומטי 24/7, ניתוב שיחות חכם, ומערכת טיפול בפניות מבוססת AI.';
    }
    return 'אשמח לספק מידע נוסף על השירותים שלנו. על איזה תחום תרצה לשמוע עוד?';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen ? (
        <Card className="w-80 p-4 relative shadow-lg">
          {/* Close button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)} 
            className="absolute top-2 right-2 h-8 w-8 p-1"
            aria-label="סגור צ'אט"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="h-96 overflow-y-auto mb-4 pt-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  message.isBot
                    ? 'bg-primary/10 text-right'
                    : 'bg-muted text-left'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="הקלד/י הודעה..."
              className="text-right"
              dir="rtl"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="rounded-full h-12 w-12 p-0 shadow-lg flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
