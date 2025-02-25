import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { AnimatePresence } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";

const seoDefaults = {
  title: "Agent Flow - פתרונות AI מתקדמים",
  description: "סוכנות אוטומציה AI חדשנית המספקת פתרונות דיגיטליים מקיפים לעסקים באמצעות טכנולוגיה מתקדמת ושירות חכם.",
  keywords: "AI, אוטומציה, בינה מלאכותית, פתרונות עסקיים, טכנולוגיה מתקדמת"
};

function Router() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <AnimatePresence mode="wait">
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/blog" component={Blog} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/contact" component={Contact} />
            <Route path="/courses" component={Courses} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </AnimatePresence>
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <title>{seoDefaults.title}</title>
        <meta name="description" content={seoDefaults.description} />
        <meta name="keywords" content={seoDefaults.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={seoDefaults.title} />
        <meta property="og:description" content={seoDefaults.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://agentflow.ai" />
      </Helmet>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;