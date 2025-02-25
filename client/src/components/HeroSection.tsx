import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Zap, Code, BarChart } from 'lucide-react';
import { Link as WouterLink } from 'wouter';

export default function HeroSection() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Floating bubble elements for background animation
  const bubbles = Array.from({ length: 6 }, (_, i) => (
    <div 
      key={i}
      className={`absolute hidden md:block rounded-full bg-primary/5 border border-primary/10 
                 animate-float-${i % 3 === 0 ? 'slow' : i % 3 === 1 ? '' : 'fast'}`}
      style={{
        width: `${Math.floor(Math.random() * 8) + 4}rem`,
        height: `${Math.floor(Math.random() * 8) + 4}rem`,
        top: `${Math.floor(Math.random() * 80) + 10}%`,
        left: `${Math.floor(Math.random() * 80) + 10}%`,
        animationDelay: `${i * 0.5}s`,
        opacity: 0.2 + (Math.random() * 0.3)
      }}
    />
  ));

  return (
    <section className="relative pt-24 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-b from-background to-primary/5">
      {/* Background decorative elements */}
      {bubbles}
      <div className="absolute inset-0 bg-grid opacity-25" />
      
      <div className="container relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Hero Text Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-right">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-pulse-slow">
              פתרונות AI חכמים לעסקים
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gradient">
              השירותים הטובים <br />ביותר ב<span className="text-primary">-AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              אנו מציעים פתרונות מותאמים אישית מבוססי AI לעסקים בכל הגדלים.
              מאתרים חכמים ועד אוטומציה של תהליכים עסקיים.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <WouterLink href="/services">
                <Button size="lg" className="gap-2 text-base animate-shimmer">
                  התחל עכשיו 
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </WouterLink>
              <WouterLink href="/contact">
                <Button size="lg" variant="outline" className="gap-2 text-base border-primary/20 hover:bg-primary/5">
                  צור קשר
                </Button>
              </WouterLink>
            </div>
          </motion.div>
          
          {/* Hero Features */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-background/40 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center text-center p-6 rounded-lg bg-gradient-to-br from-background to-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">סוכני AI</h3>
                  <p className="text-sm text-muted-foreground">פתרונות AI חכמים שעובדים 24/7</p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center text-center p-6 rounded-lg bg-gradient-to-br from-background to-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">אוטומציה</h3>
                  <p className="text-sm text-muted-foreground">ייעול תהליכים וחיסכון בזמן</p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center text-center p-6 rounded-lg bg-gradient-to-br from-background to-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">אינטגרציה</h3>
                  <p className="text-sm text-muted-foreground">התממשקות למערכות קיימות</p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center text-center p-6 rounded-lg bg-gradient-to-br from-background to-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">אנליטיקה</h3>
                  <p className="text-sm text-muted-foreground">ניתוח נתונים ותובנות עסקיות</p>
                </motion.div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-primary/20 rounded-lg opacity-30 rotate-12" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border border-primary/20 rounded-lg opacity-30 -rotate-6" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}