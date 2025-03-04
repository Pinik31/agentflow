
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

// Main App component
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" exact>
              <Suspense fallback={<LoadingFallback />}>
                <Home />
              </Suspense>
            </Route>
            <Route path="/about">
              <Suspense fallback={<LoadingFallback />}>
                <About />
              </Suspense>
            </Route>
            <Route path="/contact">
              <Suspense fallback={<LoadingFallback />}>
                <Contact />
              </Suspense>
            </Route>
            <Route path="/blog">
              <Suspense fallback={<LoadingFallback />}>
                <Blog />
              </Suspense>
            </Route>
            <Route path="/features">
              <Suspense fallback={<LoadingFallback />}>
                <Features />
              </Suspense>
            </Route>
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md p-6 bg-gray-50 rounded-lg shadow-lg text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                  <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
                  <a href="/" className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition-colors">
                    Go Home
                  </a>
                </div>
              </div>
            </Route>
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

// Root render
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LazyMotion features={domAnimation}>
            <App />
          </LazyMotion>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
