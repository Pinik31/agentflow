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

// Define App component with fixed nesting
const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog" component={Blog} />
            <Route path="/features" component={Features} />
            <Route>Not Found</Route>
          </Switch>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  );
};

// Root component with all providers
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
        <div className="error-container p-4 mx-auto my-8 max-w-md text-center bg-red-50 rounded-lg shadow">
          <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-gray-700 mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
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

// Mount the application
ReactDOM.createRoot(document.getElementById('root')!).render(
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
const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LazyMotion features={domAnimation}>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Switch>
                    <Route path="/" component={() => (
                      <Suspense fallback={<LoadingFallback />}>
                        <Home />
                      </Suspense>
                    )} />
                    <Route path="/about" component={() => (
                      <Suspense fallback={<LoadingFallback />}>
                        <About />
                      </Suspense>
                    )} />
                    <Route path="/contact" component={() => (
                      <Suspense fallback={<LoadingFallback />}>
                        <Contact />
                      </Suspense>
                    )} />
                    <Route path="/blog" component={() => (
                      <Suspense fallback={<LoadingFallback />}>
                        <Blog />
                      </Suspense>
                    )} />
                    <Route path="/features" component={() => (
                      <Suspense fallback={<LoadingFallback />}>
                        <Features />
                      </Suspense>
                    )} />
                    <Route>
                      <div className="error-page">
                        <h1>404 - Page Not Found</h1>
                        <p>The page you are looking for does not exist.</p>
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
  );
};

// Render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
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