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
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Root component with error boundary and providers
const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LazyMotion features={domAnimation}>
          <div className="app-container">
            <Header />
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingFallback />}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/features" component={Features} />
                  <Route>
                    <div className="not-found">
                      <h1>404 - Page Not Found</h1>
                      <p>Sorry, the page you are looking for does not exist.</p>
                    </div>
                  </Route>
                </Switch>
              </Suspense>
            </AnimatePresence>
            <Footer />
          </div>
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

// Mount the app to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);