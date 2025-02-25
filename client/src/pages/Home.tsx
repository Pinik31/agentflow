import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import { SiWhatsapp } from "react-icons/si";
import { Bot, MessageSquare, Users, Code, Rocket, BarChart3, Shield, Zap } from "lucide-react";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function Home() {
  return (
    <>
      <NewsletterPopup />
      {/* Hero Section with enhanced design */}
      <section className="relative min-h-[90vh] flex items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-background to-background overflow-hidden">
        {/* Enhanced grid background with animation */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] animate-[pulse_15s_ease-in-out_infinite]" />

        {/* Gradient orbs with animations */}
        <div className="absolute top-1/4 right-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-3xl opacity-70 animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 left-[10%] w-60 h-60 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-3xl opacity-60 animate-[float_25s_ease-in-out_infinite_reverse]" />

        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-soft-light" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1676389761175-b17c641b3120')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.2) contrast(1.1)"
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated badge */}
            <div className="inline-block animate-float">
              <div className="rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-transparent p-px backdrop-blur-sm">
                <div className="rounded-[calc(1rem-1px)] bg-background/80 px-4 py-1 text-sm backdrop-blur-sm">
                  חדשנות בעולם האוטומציה
                </div>
              </div>
            </div>

            {/* Animated gradient text with enhanced typography */}
            <h1 className="mt-6 text-5xl sm:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70 animate-gradient">
              Agent Flow
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              פתרונות AI מתקדמים לייעול תהליכים, חיסכון בזמן והגדלת הרווחיות
              <span className="block mt-2 text-primary/80 font-medium">העתיד של האוטומציה העסקית כבר כאן</span>
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="gap-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105 blur-sm" />
                  <Bot className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">גלה את השירותים שלנו</span>
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
                  <MessageSquare className="w-5 h-5" />
                  <span>צור קשר</span>
                </Button>
              </Link>
            </div>

            {/* Scroll down indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center">
                <div className="w-1 h-2 bg-primary/50 rounded-full mt-2 animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with improved visuals */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6">השירותים שלנו</div>
            <h2 className="text-4xl font-bold text-center mb-4">פתרונות חכמים לעסקים מודרניים</h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              פתרונות אוטומציה מבוססי AI המותאמים במיוחד לעסקים קטנים ובינוניים, לחיסכון בזמן ומשאבים
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <ServiceCard
              title="סוכן AI לרשתות חברתיות"
              description="ניהול תוכן אוטומטי, SEO ופרסום ברשתות החברתיות באמצעות AI"
              imageUrl="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7"
              href="/services#social"
              className="aspect-video object-cover"
              icon={<BarChart3 className="w-8 h-8 text-primary" />}
            />
            <ServiceCard
              title="צ'אטבוט WhatsApp חכם"
              description="צ'אטבוט AI לשירות לקוחות ומענה אוטומטי 24/7"
              imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995"
              href="/services#chatbot"
              className="aspect-video object-cover"
              icon={<SiWhatsapp className="w-8 h-8 text-primary" />}
            />
            <ServiceCard
              title="ניהול לידים אוטומטי"
              description="מערכת AI לניהול וטיפול בלידים לשיפור אחוזי המרה"
              imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              href="/services#leads"
              className="aspect-video object-cover"
              icon={<Users className="w-8 h-8 text-primary" />}
            />
          </div>
        </div>
      </section>

      {/* About Section with enhanced visuals */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-background">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-lg rotate-12 opacity-50" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-primary/10 rounded-lg -rotate-12 opacity-50" />

        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6">אודותינו</div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">מובילים בחדשנות<br />עם מומחיות ב-AI</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                אנחנו צוות של מומחי AI ואוטומציה עם ניסיון רב בפיתוח פתרונות חכמים לעסקים. 
                המשימה שלנו היא לעזור לעסקים להתייעל ולצמוח באמצעות טכנולוגיות מתקדמות.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <Card className="group hover:shadow-lg transition-all duration-500">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 group-hover:scale-110 transition-transform duration-500">150+</div>
                    <div className="text-muted-foreground">לקוחות מרוצים</div>
                  </CardContent>
                </Card>
                <Card className="group hover:shadow-lg transition-all duration-500">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 group-hover:scale-110 transition-transform duration-500">98%</div>
                    <div className="text-muted-foreground">שביעות רצון</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="הצוות שלנו"
                  className="rounded-lg shadow-xl w-full aspect-video object-cover relative transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg z-20 transition-transform duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium">צוות המומחים שלנו</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with enhanced visuals */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-60" />

        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6">היתרונות שלנו</div>
            <h2 className="text-4xl font-bold text-center mb-8">למה לבחור בנו?</h2>
            <p className="text-lg text-muted-foreground">
              אנו מספקים פתרונות ברמה הגבוהה ביותר בשוק, עם התאמה מדויקת לצרכים של העסק שלך
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/5 hover:border-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors duration-300">פתרונות AI מתקדמים</h3>
                <p className="text-muted-foreground">
                  שימוש בטכנולוגיות AI מתקדמות להשגת תוצאות מיטביות עבור העסק שלך
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/5 hover:border-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors duration-300">אבטחה מתקדמת</h3>
                <p className="text-muted-foreground">
                  הגנה מקיפה על המידע והנתונים שלך עם סטנדרטים מחמירים של אבטחת מידע
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/5 hover:border-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors duration-300">ביצועים מהירים</h3>
                <p className="text-muted-foreground">
                  מערכות מהירות ויעילות המאפשרות עבודה רציפה וחלקה ללא עיכובים
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced visuals */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="container relative z-10 py-24 text-center text-primary-foreground">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
            <p className="mb-10 text-primary-foreground/90 text-lg">
              צרו איתנו קשר עוד היום וגלו כיצד פתרונות האוטומציה שלנו יכולים לעזור לעסק שלכם לצמוח
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 px-8 py-6 text-lg">
                <MessageSquare className="w-5 h-5" />
                דברו איתנו
              </Button>
            </Link>

            {/* Testimonial bubble */}
            <div className="max-w-md mx-auto mt-16 bg-background/10 backdrop-blur-sm rounded-lg p-6 text-left relative">
              <svg className="absolute top-0 right-4 transform -translate-y-1/2 text-background/10 w-8 h-8" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.39762 10.3C7.39762 11.0733 7.14762 11.7067 6.64762 12.2C6.16429 12.6933 5.54762 12.94 4.79762 12.94C3.99762 12.94 3.33096 12.6733 2.79762 12.14C2.26429 11.5933 1.99762 10.9267 1.99762 10.14C1.99762 9.59999 2.07762 9.03333 2.23762 8.44C2.39762 7.84666 2.64429 7.31999 2.97762 6.85999L4.79762 4.15999L7.21762 5.31999L5.81762 8.15999C6.35096 8.43999 6.77762 8.83999 7.09762 9.35999C7.29762 9.67999 7.39762 9.99999 7.39762 10.3ZM14.3976 10.3C14.3976 11.0733 14.1476 11.7067 13.6476 12.2C13.1643 12.6933 12.5476 12.94 11.7976 12.94C10.9976 12.94 10.331 12.6733 9.79762 12.14C9.26429 11.5933 8.99762 10.9267 8.99762 10.14C8.99762 9.59999 9.07762 9.03333 9.23762 8.44C9.39762 7.84666 9.64429 7.31999 9.97762 6.85999L11.7976 4.15999L14.2176 5.31999L12.8176 8.15999C13.351 8.43999 13.7776 8.83999 14.0976 9.35999C14.2976 9.67999 14.3976 9.99999 14.3976 10.3Z" fill="currentColor"/>
              </svg>
              <p className="text-primary-foreground/90 italic mb-4">
                "פתרונות האוטומציה של Agent Flow שינו לגמרי את העסק שלנו. החברה עזרה לנו לייעל תהליכים ולהגדיל את המכירות ב-40% תוך 3 חודשים."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center overflow-hidden mr-3">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="לקוח" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold">דני כהן</p>
                  <p className="text-xs text-primary-foreground/70">מנכ"ל, טכנו-סטארט</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 5s ease infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .shine {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          background-size: 200% 100%;
          animation: shine 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}