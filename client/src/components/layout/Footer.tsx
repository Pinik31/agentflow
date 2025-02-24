import { Link } from "wouter";
import NewsletterForm from "../NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">אוטומציה AI</h3>
            <p className="text-muted-foreground">
              פתרונות אוטומציה חכמים לעסקים קטנים ובינוניים
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">קישורים</h3>
            <div className="flex flex-col gap-2">
              <Link href="/services">
                <a className="text-muted-foreground hover:text-foreground">שירותים</a>
              </Link>
              <Link href="/blog">
                <a className="text-muted-foreground hover:text-foreground">בלוג</a>
              </Link>
              <Link href="/contact">
                <a className="text-muted-foreground hover:text-foreground">צור קשר</a>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">הרשמה לעדכונים</h3>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
