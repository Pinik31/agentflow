import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              אוטומציה חכמה לעסק שלך
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              פתרונות AI מתקדמים לייעול תהליכים, חיסכון בזמן והגדלת הרווחיות
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/services">
                <Button size="lg">גלה את השירותים שלנו</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">צור קשר</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">השירותים שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="סוכן AI לרשתות חברתיות"
              description="ניהול תוכן אוטומטי, SEO ופרסום ברשתות החברתיות"
              imageUrl="https://images.unsplash.com/photo-1612066473428-fb6833a0d855"
              href="/services#social"
            />
            <ServiceCard
              title="צ'אטבוט AI לשירות לקוחות"
              description="צ'אטבוט WhatsApp חכם לתמיכה בלקוחות ומענה אוטומטי"
              imageUrl="https://images.unsplash.com/photo-1506729623306-b5a934d88b53"
              href="/services#chatbot"
            />
            <ServiceCard
              title="ניהול לידים אוטומטי"
              description="מערכת AI לניהול וטיפול בלידים באופן אוטומטי"
              imageUrl="https://images.unsplash.com/photo-1644352744450-a391b8ce158d"
              href="/services#leads"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">למה לבחור בנו?</h2>
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>פתרונות AI מותאמים אישית לעסק שלך</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>חיסכון משמעותי בזמן ועלויות תפעול</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>שירות ותמיכה מקצועית 24/7</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1455849318743-b2233052fcff"
                alt="צוות מקצועי"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
