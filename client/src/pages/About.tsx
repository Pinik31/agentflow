import { Card, CardContent } from "@/components/ui/card";
import { Bot, Users, Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">מי אנחנו</h1>
          <p className="text-xl text-muted-foreground">
            Agent Flow מובילה את המהפכה של אוטומציה חכמה לעסקים
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">החזון שלנו</h2>
              <p className="text-lg text-muted-foreground">
                אנחנו מאמינים שכל עסק יכול להפוך לחכם יותר ויעיל יותר באמצעות אוטומציה מבוססת AI.
                המשימה שלנו היא להנגיש את הטכנולוגיה המתקדמת ביותר לעסקים קטנים ובינוניים.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                alt="החזון שלנו"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">חדשנות</h3>
                <p className="text-muted-foreground">
                  שימוש בטכנולוגיות AI המתקדמות ביותר ליצירת פתרונות חכמים
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">מקצועיות</h3>
                <p className="text-muted-foreground">
                  צוות מומחים עם ניסיון רב בפיתוח פתרונות אוטומציה
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">תוצאות</h3>
                <p className="text-muted-foreground">
                  מחוייבים להצלחת הלקוחות שלנו ולשיפור התוצאות העסקיות
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">הצוות שלנו</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              הצוות שלנו מורכב ממומחי AI, מפתחים, ויועצים עסקיים עם ניסיון רב בתחום האוטומציה.
              אנחנו כאן כדי לעזור לעסק שלך לצמוח ולהתייעל.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
