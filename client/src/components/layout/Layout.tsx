
import React from 'react';
import { Toaster } from '../ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
