import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold">אוטומציה AI</a>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/services">
            <a className="text-muted-foreground hover:text-foreground">שירותים</a>
          </Link>
          <Link href="/blog">
            <a className="text-muted-foreground hover:text-foreground">בלוג</a>
          </Link>
          <Link href="/contact">
            <Button>צור קשר</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
