import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Services() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-12">השירותים שלנו</h1>
      
      <div className="space-y-12">
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
                    src="https://images.unsplash.com/photo-1612066473428-fb6833a0d855"
                    alt="ניהול רשתות חברתיות"
                    className="rounded-lg"
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
                    src="https://images.unsplash.com/photo-1506729623306-b5a934d88b53"
                    alt="צ'אטבוט לשירות לקוחות"
                    className="rounded-lg"
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
                    className="rounded-lg"
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
