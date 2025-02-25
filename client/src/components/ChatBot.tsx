
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

interface BusinessData {
  companyName?: string;
  industry?: string;
  employees?: string;
  automationNeeds?: string[];
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
        // Save to Supabase
        await saveToDatabase(updatedBusinessData);
        break;
      case "complete":
        botResponse = getServiceInfo(input);
        break;
    }

    setBusinessData(updatedBusinessData);
    setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    setInput("");
  };

  const saveToDatabase = async (data: BusinessData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.companyName,
          industry: data.industry,
          businessSize: data.employees,
          metadata: {
            automationNeeds: data.automationNeeds
          }
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to save lead data');
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
        <Card className="w-80 p-4">
          <div className="h-96 overflow-y-auto mb-4">
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
        <Button onClick={() => setIsOpen(true)} className="rounded-full">
          💬 צ'אט
        </Button>
      )}
    </div>
  );
}
