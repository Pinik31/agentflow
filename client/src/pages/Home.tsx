import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import { SiWhatsapp } from "react-icons/si";
import { Bot, Brain, Cpu, Code, Rocket, Database, Server, BarChart3 } from "lucide-react";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function Home() {
  return (
    <>
      <NewsletterPopup />
      <section className="relative min-h-[80vh] flex items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div 
          className="absolute inset-0 opacity-30 mix-blend-soft-light" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1676632254893-c5572e0e55ae')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.2) contrast(1.1)"
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-float">
              <div className="rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-transparent p-px backdrop-blur-sm">
                <div className="rounded-[calc(1rem-1px)] bg-background/80 px-4 py-1 text-sm backdrop-blur-sm">
                  חדשנות בעולם האוטומציה
                </div>
              </div>
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
              Agent Flow
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              פתרונות AI מתקדמים לייעול תהליכים, חיסכון בזמן והגדלת הרווחיות
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="gap-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-100 group-hover:opacity-90 transition-opacity" />
                  <Bot className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">גלה את השירותים שלנו</span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 backdrop-blur-sm">
                  <Brain className="w-5 h-5" />
                  צור קשר
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-center mb-4">הפתרונות שלנו</h2>
            <p className="text-muted-foreground text-center mb-12">
              פתרונות אוטומציה מבוססי AI המותאמים במיוחד לעסקים קטנים ובינוניים, לחיסכון בזמן ומשאבים
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <ServiceCard
              title="סוכן AI לרשתות חברתיות"
              description="ניהול תוכן אוטומטי, SEO ופרסום ברשתות החברתיות באמצעות AI"
              imageUrl="https://images.unsplash.com/photo-1686572603111-d3cbe7b25068"
              href="/services#social"
              className="aspect-video object-cover"
            />
            <ServiceCard
              title="צ'אטבוט WhatsApp חכם"
              description="צ'אטבוט AI לשירות לקוחות ומענה אוטומטי 24/7"
              imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995"
              href="/services#chatbot"
              className="aspect-video object-cover"
            />
            <ServiceCard
              title="ניהול לידים אוטומטי"
              description="מערכת AI לניהול וטיפול בלידים לשיפור אחוזי המרה"
              imageUrl="https://images.unsplash.com/photo-1655721530791-59f5bbd64a48"
              href="/services#leads"
              className="aspect-video object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-background">
        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">אודותינו</h2>
              <p className="text-lg text-muted-foreground mb-8">
                אנחנו צוות של מומחי AI ואוטומציה עם ניסיון רב בפיתוח פתרונות חכמים לעסקים. 
                המשימה שלנו היא לעזור לעסקים להתייעל ולצמוח באמצעות טכנולוגיות מתקדמות.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 group-hover:scale-110 transition-transform">150+</div>
                    <div className="text-muted-foreground">לקוחות מרוצים</div>
                  </CardContent>
                </Card>
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 group-hover:scale-110 transition-transform">98%</div>
                    <div className="text-muted-foreground">שביעות רצון</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="https://images.unsplash.com/photo-1683739803245-fd4da8b29ea6"
                alt="AI Technology Team"
                className="rounded-lg shadow-xl w-full aspect-video object-cover relative"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="container relative">
          <h2 className="text-3xl font-bold text-center mb-12">למה לבחור בנו?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">פתרונות AI מתקדמים</h3>
                <p className="text-muted-foreground">
                  שימוש בטכנולוגיות AI מתקדמות להשגת תוצאות מיטביות עבור העסק שלך
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">פיתוח מותאם אישית</h3>
                <p className="text-muted-foreground">
                  התאמה מדויקת של הפתרונות לצרכים הייחודיים של העסק שלך
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">תוצאות מוכחות</h3>
                <p className="text-muted-foreground">
                  שיפור משמעותי ביעילות ובתוצאות העסקיות
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-foreground to-background opacity-90" />
        <div className="container relative z-10 py-24 text-center text-primary-foreground">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">מוכנים להתחיל?</h2>
            <p className="mb-8 text-primary-foreground/90">
              צרו איתנו קשר עוד היום וגלו כיצד פתרונות האוטומציה שלנו יכולים לעזור לעסק שלכם לצמוח
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                <Server className="w-5 h-5" />
                דברו איתנו
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        .wave {
          animation: wave 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer {
          animation: shimmer 2s linear infinite;
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
          background-size: 1000px 100%;
        }
      `}</style>
    </>
  );
}