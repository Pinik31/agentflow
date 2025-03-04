import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Assuming React Router v6
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Services from "@/pages/Services";


createRoot(document.getElementById("root")!).render(
  <Router>
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} /> {/* Added route for individual blog posts */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </App>
  </Router>
);