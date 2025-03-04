
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <LazyMotion features={domAnimation}>
            <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
              <Header />
              <main className="flex-grow pt-20 pb-16">
                <AnimatePresence mode="wait">
                  <Suspense fallback={<LoadingFallback />}>
                    <Switch>
                      <Route path="/" component={Home} />
                      <Route path="/about" component={About} />
                      <Route path="/contact" component={Contact} />
                      <Route path="/blog" component={Blog} />
                      <Route path="/features" component={Features} />
                      <Route>
                        <div className="container mx-auto px-4 py-12 text-center">
                          <h1 className="text-3xl font-bold mb-4">העמוד לא נמצא</h1>
                          <p className="mb-8">העמוד שאתה מחפש אינו קיים.</p>
                          <a href="/" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                            חזרה לדף הבית
                          </a>
                        </div>
                      </Route>
                    </Switch>
                  </Suspense>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </LazyMotion>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
