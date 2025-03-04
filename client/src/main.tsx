
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
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="text-center p-8 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">משהו השתבש</h2>
            <p className="mb-4">אנחנו מתנצלים על התקלה. נסה לרענן את הדף.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-all">
              רענן דף
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main app component
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
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
              <div className="container mx-auto py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all">
                  Return Home
                </a>
              </div>
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <LazyMotion features={domAnimation}>
            <App />
          </LazyMotion>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
