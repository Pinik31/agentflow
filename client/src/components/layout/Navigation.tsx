import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              AI Solutions
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6 mr-auto text-sm">
          <Link href="/services">
            <span className="transition-colors hover:text-primary">השירותים שלנו</span>
          </Link>
          <Link href="/about">
            <span className="transition-colors hover:text-primary">מי אנחנו</span>
          </Link>
          <Link href="/blog">
            <span className="transition-colors hover:text-primary">בלוג</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/contact">
            <Button variant="outline" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              צור קשר
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
