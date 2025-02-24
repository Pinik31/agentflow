import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import { SiWhatsapp } from "react-icons/si";
import { Bot, MessageSquare, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="hero bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              אוטומציה חכמה לעסק שלך
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              פתרונות AI מתקדמים לייעול תהליכים, חיסכון בזמן והגדלת הרווחיות
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="gap-2">
                  <Bot className="w-5 h-5" />
                  גלה את השירותים שלנו
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageSquare className="w-5 h-5" />
                  צור קשר
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">הפתרונות שלנו</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            פתרונות אוטומציה מבוססי AI המותאמים במיוחד לעסקים קטנים ובינוניים, לחיסכון בזמן ומשאבים
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="סוכן AI לרשתות חברתיות"
              description="ניהול תוכן אוטומטי, SEO ופרסום ברשתות החברתיות באמצעות AI"
              imageUrl="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7"
              href="/services#social"
            />
            <ServiceCard
              title="צ'אטבוט WhatsApp חכם"
              description="צ'אטבוט AI לשירות לקוחות ומענה אוטומטי 24/7"
              imageUrl="https://images.unsplash.com/photo-1592748197482-4c814e8eb95f"
              href="/services#chatbot"
            />
            <ServiceCard
              title="ניהול לידים אוטומטי"
              description="מערכת AI לניהול וטיפול בלידים לשיפור אחוזי המרה"
              imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              href="/services#leads"
            />
          </div>
        </div>
      </section>

      <section className="section bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">למה לבחור בנו?</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 flex gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">פתרונות AI מתקדמים</h3>
                      <p className="text-muted-foreground">
                        שימוש בטכנולוגיות AI מתקדמות להשגת תוצאות מיטביות עבור העסק שלך
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">ליווי אישי מקצועי</h3>
                      <p className="text-muted-foreground">
                        צוות מומחים שילווה אותך בכל שלב בתהליך האוטומציה
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <SiWhatsapp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">תמיכה 24/7</h3>
                      <p className="text-muted-foreground">
                        תמיכה זמינה בוואטסאפ ובמייל לכל שאלה או בקשה
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="צוות מקצועי"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">מוכנים להתחיל?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            צרו איתנו קשר עוד היום וגלו כיצד פתרונות האוטומציה שלנו יכולים לעזור לעסק שלכם לצמוח
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              <MessageSquare className="w-5 h-5" />
              דברו איתנו
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}