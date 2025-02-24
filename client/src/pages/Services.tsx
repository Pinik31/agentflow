import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";
import { Bot, Brain, Rocket } from "lucide-react";

const courses = [
  {
    title: "מבוא לכלי AI",
    description: "למדו את היסודות של טכנולוגיות AI והשימושים העסקיים שלהן",
    icon: Bot,
    features: [
      "הכרות עם כלי AI מובילים",
      "שימושים עסקיים מעשיים",
      "דוגמאות ותרגול מעשי",
      "תמיכה אישית לאורך הקורס"
    ],
    price: "₪499",
    level: "מתחילים"
  }
];

export default function Services() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-12">השירותים שלנו</h1>

      <div className="space-y-12">
        <section id="landing">
          <Card>
            <CardHeader>
              <CardTitle>דפי נחיתה חכמים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-muted-foreground mb-4">
                    נפגש עם הבוט החכם שלנו להערכה עסקית מקיפה וחינמית:
                  </p>
                  <ul className="space-y-2">
                    <li>✓ בוט WhatsApp המותאם לאפיון צרכי העסק</li>
                    <li>✓ הערכה מקצועית של צרכי הדיגיטל שלך</li>
                    <li>✓ המלצות מותאמות אישית לעסק שלך</li>
                    <li>✓ תכנון דף נחיתה אופטימלי</li>
                  </ul>
                  <div className="mt-6">
                    <a 
                      href="https://wa.me/972000000000?text=היי%2C%20אשמח%20לקבל%20הערכה%20עסקית%20חינמית"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="gap-2">
                        <SiWhatsapp className="w-5 h-5" />
                        התחל שיחה חינמית עם הבוט שלנו
                      </Button>
                    </a>
                  </div>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                    alt="בוט חכם לעסקים"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="social">
          <Card>
            <CardHeader>
              <CardTitle>סוכן AI לרשתות חברתיות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-muted-foreground mb-4">
                    הסוכן החכם שלנו מנהל את הנוכחות הדיגיטלית שלך באופן אוטומטי:
                  </p>
                  <ul className="space-y-2">
                    <li>✓ יצירת תוכן אוטומטית</li>
                    <li>✓ אופטימיזציה ל-SEO</li>
                    <li>✓ תזמון פוסטים אוטומטי</li>
                    <li>✓ ניתוח ביצועים וסטטיסטיקות</li>
                  </ul>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7"
                    alt="ניהול רשתות חברתיות"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>צ'אטבוט AI לשירות לקוחות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-muted-foreground mb-4">
                    צ'אטבוט WhatsApp חכם שמספק מענה מיידי ללקוחות:
                  </p>
                  <ul className="space-y-2">
                    <li>✓ מענה אוטומטי 24/7</li>
                    <li>✓ ניתוב שיחות חכם</li>
                    <li>✓ איסוף מידע אוטומטי</li>
                    <li>✓ אינטגרציה עם מערכות CRM</li>
                  </ul>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1592748197482-4c814e8eb95f"
                    alt="צ'אטבוט לשירות לקוחות"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section id="leads">
          <Card>
            <CardHeader>
              <CardTitle>ניהול לידים אוטומטי</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-muted-foreground mb-4">
                    מערכת חכמה לניהול וטיפול בלידים:
                  </p>
                  <ul className="space-y-2">
                    <li>✓ סינון וניתוב לידים אוטומטי</li>
                    <li>✓ דירוג לידים לפי פוטנציאל</li>
                    <li>✓ מעקב ותזכורות אוטומטיות</li>
                    <li>✓ דוחות וניתוחים מתקדמים</li>
                  </ul>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1644352744450-a391b8ce158d"
                    alt="ניהול לידים"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}