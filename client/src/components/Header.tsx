
import React from 'react';
import { Link } from 'wouter';
import { Button } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-2xl font-bold">Agent Flow</a>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about">
            <a className="text-sm font-medium hover:text-primary">אודות</a>
          </Link>
          <Link href="/services">
            <a className="text-sm font-medium hover:text-primary">שירותים</a>
          </Link>
          <Link href="/blog">
            <a className="text-sm font-medium hover:text-primary">בלוג</a>
          </Link>
          <Link href="/contact">
            <a className="text-sm font-medium hover:text-primary">צור קשר</a>
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
