import { Link } from "wouter";
import NewsletterForm from "../NewsletterForm";
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 backdrop-blur-sm mt-auto border-t border-border/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold mb-6 text-primary">Agent Flow</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              פתרונות אוטומציה חכמים לעסקים קטנים ובינוניים. משפרים את היעילות ומגדילים את הרווחיות באמצעות טכנולוגיות AI מתקדמות.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-[#25D366] hover:bg-[#25D366]/10 transition-colors duration-300">
                <SiWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-6 text-primary">קישורים מהירים</h3>
            <div className="flex flex-col gap-3">
              <Link href="/">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">בית</a>
              </Link>
              <Link href="/services">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">שירותים</a>
              </Link>
              <Link href="/blog">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">בלוג</a>
              </Link>
              <Link href="/about">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">אודות</a>
              </Link>
              <Link href="/contact">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">צור קשר</a>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-6 text-primary">השירותים שלנו</h3>
            <div className="flex flex-col gap-3">
              <Link href="/services#chatbot">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">צ'אטבוט חכם</a>
              </Link>
              <Link href="/services#social">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">אוטומציה לרשתות חברתיות</a>
              </Link>
              <Link href="/services#leads">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">ניהול לידים</a>
              </Link>
              <Link href="/services#analytics">
                <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">ניתוח נתונים</a>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h3 className="font-semibold mb-6 text-primary">צור קשר</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">רחוב הברזל 30, תל אביב, ישראל</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">03-1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">info@agentflow.co.il</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4 text-primary">הרשמה לעדכונים</h3>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {currentYear} Agent Flow. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">מדיניות פרטיות</a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">תנאי שימוש</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}