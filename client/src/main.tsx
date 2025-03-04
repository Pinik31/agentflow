
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Switch, Route } from 'wouter';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingFallback from './components/LoadingFallback';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Features = lazy(() => import('./pages/Features'));

// Initialize React Query client with retry logic and stale time settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

// Error boundary component to prevent the entire app from crashing
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md p-6 bg-red-50 rounded-lg shadow-lg border border-red-200">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-4">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            {this.state.error && (
              <div className="p-3 bg-white rounded text-sm font-mono overflow-auto">
                {this.state.error.toString()}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LazyMotion features={domAnimation}>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Switch>
                    <Route path="/" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Home />
                      </Suspense>
                    } />
                    <Route path="/about" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <About />
                      </Suspense>
                    } />
                    <Route path="/contact" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Contact />
                      </Suspense>
                    } />
                    <Route path="/blog" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Blog />
                      </Suspense>
                    } />
                    <Route path="/features" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Features />
                      </Suspense>
                    } />
                    <Route path="/:path*">
                      <div className="container mx-auto px-4 py-12 text-center">
                        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                        <p className="mb-8">Sorry, we couldn't find the page you're looking for.</p>
                        <a 
                          href="/" 
                          className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                        >
                          Return Home
                        </a>
                      </div>
                    </Route>
                  </Switch>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </LazyMotion>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
