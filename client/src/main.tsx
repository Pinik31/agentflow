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
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Switch, Route } from 'wouter';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingFallback from './components/LoadingFallback';

// Lazy-loaded pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

// CSS
import './index.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>
          <Header />
          <main className="min-h-screen pt-20 pb-16">
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingFallback />}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/services" component={Services} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/case-studies" component={CaseStudies} />
                  <Route path="/privacy-policy" component={PrivacyPolicy} />
                  <Route path="/terms-of-service" component={TermsOfService} />
                </Switch>
              </Suspense>
            </AnimatePresence>
          </main>
          <Footer />
        </LazyMotion>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
