import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import { SiWhatsapp } from "react-icons/si";
import { Bot, MessageSquare, Users, Code, Rocket } from "lucide-react";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function Home() {
  return (
    <>
      <NewsletterPopup />
      <section className="hero bg-primary/5 relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a')", // AI and business automation themed
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />
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

      <section className="py-24">
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
              className="aspect-video object-cover"
            />
            <ServiceCard
              title="צ'אטבוט WhatsApp חכם"
              description="צ'אטבוט AI לשירות לקוחות ומענה אוטומטי 24/7"
              imageUrl="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff"
              href="/services#chatbot"
              className="aspect-video object-cover"
            />
            <ServiceCard
              title="ניהול לידים אוטומטי"
              description="מערכת AI לניהול וטיפול בלידים לשיפור אחוזי המרה"
              imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              href="/services#leads"
              className="aspect-video object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-primary/5 py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">אודותינו</h2>
              <p className="text-lg text-muted-foreground mb-8">
                אנחנו צוות של מומחי AI ואוטומציה עם ניסיון רב בפיתוח פתרונות חכמים לעסקים. 
                המשימה שלנו היא לעזור לעסקים להתייעל ולצמוח באמצעות טכנולוגיות מתקדמות.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <div className="text-muted-foreground">לקוחות מרוצים</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">שביעות רצון</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="הצוות שלנו"
                className="rounded-lg shadow-xl w-full aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">למה לבחור בנו?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">פתרונות AI מתקדמים</h3>
                <p className="text-muted-foreground">
                  שימוש בטכנולוגיות AI מתקדמות להשגת תוצאות מיטביות עבור העסק שלך
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">פיתוח מותאם אישית</h3>
                <p className="text-muted-foreground">
                  התאמה מדויקת של הפתרונות לצרכים הייחודיים של העסק שלך
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">תוצאות מוכחות</h3>
                <p className="text-muted-foreground">
                  שיפור משמעותי ביעילות ובתוצאות העסקיות
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-24">
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