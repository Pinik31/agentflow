import React from 'react';
import { Link } from 'wouter';
import { Button } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-bold">Agent Flow</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about">
            <span className="text-sm font-medium hover:text-primary">אודות</span>
          </Link>
          <Link href="/services">
            <span className="text-sm font-medium hover:text-primary">שירותים</span>
          </Link>
          <Link href="/blog">
            <span className="text-sm font-medium hover:text-primary">בלוג</span>
          </Link>
          <Link href="/contact">
            <span className="text-sm font-medium hover:text-primary">צור קשר</span>
          </Link>
        </nav>
        <div>
          <Button>התחל עכשיו</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;