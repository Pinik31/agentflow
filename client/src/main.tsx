import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Switch, Route } from 'wouter';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import './index.css';

// Import components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Lazy load pages
const Home = React.lazy(() => import('@/pages/Home'));
const About = React.lazy(() => import('@/pages/About'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const Blog = React.lazy(() => import('@/pages/Blog'));
const Services = React.lazy(() => import('@/pages/Services'));
// The Features page import was causing the error - commenting it out
// const Features = React.lazy(() => import('@/pages/Features'));

// Create a client for React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<div className="container py-12">Loading...</div>}>
              <AnimatePresence mode="wait">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/services" component={Services} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/blog" component={Blog} />
                  <Route component={() => import('@/pages/not-found').then(m => m.default)} />
                </Switch>
              </AnimatePresence>
            </Suspense>
          </main>
          <Footer />
        </div>
      </LazyMotion>
    </QueryClientProvider>
  </React.StrictMode>
);