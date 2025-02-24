import { Card, CardContent } from "@/components/ui/card";
import { Bot, Users, Rocket, Brain, Code, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">מי אנחנו</h1>
          <p className="text-xl text-muted-foreground">
            Agent Flow מובילה את המהפכה של אוטומציה חכמה לעסקים בישראל
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">החזון שלנו</h2>
              <p className="text-lg text-muted-foreground mb-4">
                אנחנו מאמינים שכל עסק יכול להפוך לחכם יותר ויעיל יותר באמצעות אוטומציה מבוססת AI.
                המשימה שלנו היא להנגיש את הטכנולוגיה המתקדמת ביותר לעסקים בישראל.
              </p>
              <p className="text-lg text-muted-foreground">
                עם צוות המומחים שלנו והניסיון הרב בתחום, אנחנו מספקים פתרונות AI מותאמים אישית
                שמייעלים תהליכים, חוסכים זמן ומגדילים רווחים.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1682687982501-1e58ab814714"
                alt="החזון שלנו"
                className="rounded-lg shadow-xl object-cover w-full aspect-video"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">חדשנות</h3>
                <p className="text-muted-foreground">
                  שימוש בטכנולוגיות AI המתקדמות ביותר ליצירת פתרונות חכמים ומותאמים אישית
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">מומחיות</h3>
                <p className="text-muted-foreground">
                  צוות מומחים עם ניסיון רב בפיתוח פתרונות אוטומציה וטכנולוגיות AI מתקדמות
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">אמינות</h3>
                <p className="text-muted-foreground">
                  מחוייבים להצלחת הלקוחות שלנו ולאבטחת המידע ברמה הגבוהה ביותר
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">הצוות שלנו</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              הצוות שלנו מורכב ממומחי AI, מפתחים, ויועצים עסקיים עם ניסיון רב בתחום האוטומציה.
              אנחנו מחויבים לספק את הפתרונות הטובים ביותר ולהוביל את המהפכה הטכנולוגית בישראל.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">הטכנולוגיות שלנו</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <Bot className="w-12 h-12 text-primary mb-2" />
                <h3 className="font-semibold">AI Agents</h3>
              </div>
              <div className="flex flex-col items-center">
                <Code className="w-12 h-12 text-primary mb-2" />
                <h3 className="font-semibold">Custom Development</h3>
              </div>
              <div className="flex flex-col items-center">
                <Brain className="w-12 h-12 text-primary mb-2" />
                <h3 className="font-semibold">Machine Learning</h3>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-primary mb-2" />
                <h3 className="font-semibold">Data Security</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}