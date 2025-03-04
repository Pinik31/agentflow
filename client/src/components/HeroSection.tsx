import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Zap, Code, BarChart, Brain, Cpu, Sparkles } from 'lucide-react';
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

  // Network nodes for the AI-themed background
  const nodes = Array.from({ length: 12 }, (_, i) => (
    <div 
      key={i}
      className={`absolute hidden md:block rounded-full bg-primary/20 border border-primary/30 
                 animate-pulse-${i % 2 === 0 ? 'slow' : 'subtle'}`}
      style={{
        width: `${Math.floor(Math.random() * 6) + 3}rem`,
        height: `${Math.floor(Math.random() * 6) + 3}rem`,
        top: `${Math.floor(Math.random() * 80) + 10}%`,
        left: `${Math.floor(Math.random() * 80) + 10}%`,
        animationDelay: `${i * 0.4}s`,
        opacity: 0.15 + (Math.random() * 0.2)
      }}
    />
  ));

  // Connection lines for neural network effect
  const connectionLines = (
    <svg className="absolute inset-0 w-full h-full z-0 opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(266, 90%, 55%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(190, 90%, 50%)" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {Array.from({ length: 10 }, (_, i) => {
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = Math.random() * 100;
        const y2 = Math.random() * 100;
        return (
          <line 
            key={i} 
            x1={`${x1}%`} 
            y1={`${y1}%`} 
            x2={`${x2}%`} 
            y2={`${y2}%`} 
            stroke="url(#line-gradient)" 
            strokeWidth="1" 
          />
        );
      })}
    </svg>
  );

  return (
    <section className="relative pt-24 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-accent/10">
      {/* AI-themed background with neural network effect */}
      <div className="absolute inset-0 bg-ai-pattern opacity-10" />
      {nodes}
      {connectionLines}
      
      {/* AI circuit board pattern */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      
      {/* Glowing orbs for futuristic effect */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="container relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Hero Text Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-right">
            {/* AI badge with pulse effect */}
            <div className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary mb-6 animate-pulse-slow border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 inline-block mr-1.5 animate-pulse" />
              פתרונות AI מתקדמים לעסקים
            </div>
            
            {/* Main headline with enhanced gradient effect */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">השירותים הטובים</span> <br />
              <span className="relative">
                ביותר 
                <span className="text-primary relative">
                  ב-AI
                  <span className="absolute -inset-1 bg-primary/10 blur-lg rounded-full -z-10"></span>
                </span>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              אנו מציעים פתרונות מותאמים אישית מבוססי AI לעסקים בכל הגדלים.
              מאתרים חכמים ועד אוטומציה של תהליכים עסקיים.
            </p>
            
            {/* CTA buttons with enhanced effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <WouterLink href="/services">
                <Button size="lg" className="gap-2 text-base group relative overflow-hidden border-primary">
                  <span className="relative z-10">התחל עכשיו</span>
                  <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-100 group-hover:opacity-80 transition-opacity"></span>
                </Button>
              </WouterLink>
              <WouterLink href="/contact">
                <Button size="lg" variant="outline" className="gap-2 text-base border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all">
                  צור קשר
                </Button>
              </WouterLink>
            </div>
          </motion.div>
          
          {/* AI Features with enhanced 3D and glass effects */}
          <motion.div variants={itemVariants} className="relative">
            {/* Background blur effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-50"></div>
            
            {/* Glass card with neural network background */}
            <div className="relative rounded-2xl p-8 border border-primary/20 shadow-xl backdrop-blur-lg bg-white/10 overflow-hidden">
              {/* Neural network decorative background */}
              <div className="absolute inset-0 bg-ai-grid opacity-5"></div>
              
              {/* AI features grid */}
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <WouterLink href="/services/ai-agents">
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group backdrop-blur-sm relative overflow-hidden cursor-pointer"
                  >
                    {/* AI background image with overlay */}
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/80 backdrop-blur-sm z-10"></div>
                      <div 
                        className="absolute inset-0 bg-center bg-cover z-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000' fill-opacity='0.05'/%3E%3Cpath d='M50 30 C 40 30, 30 40, 30 50 C 30 60, 40 70, 50 70 C 60 70, 70 60, 70 50 C 70 40, 60 30, 50 30 Z' stroke='%238258fc' fill='none' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Ccircle cx='50' cy='50' r='25' stroke='%238258fc' fill='none' stroke-width='0.5' stroke-opacity='0.2'/%3E%3Ccircle cx='50' cy='50' r='15' stroke='%238258fc' fill='none' stroke-width='0.5' stroke-opacity='0.4'/%3E%3Ccircle cx='30' cy='40' r='4' fill='%238258fc' fill-opacity='0.2'/%3E%3Ccircle cx='70' cy='40' r='4' fill='%238258fc' fill-opacity='0.2'/%3E%3Ccircle cx='40' cy='70' r='4' fill='%238258fc' fill-opacity='0.2'/%3E%3Ccircle cx='60' cy='70' r='4' fill='%238258fc' fill-opacity='0.2'/%3E%3Cpath d='M30 40 L 70 40 M 40 70 L 60 70 M 30 40 L 40 70 M 70 40 L 60 70' stroke='%238258fc' stroke-opacity='0.3' stroke-width='0.5'/%3E%3C/svg%3E")`
                        }}
                      ></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-20">
                      <div className="rounded-full bg-primary/20 p-3 mb-4 group-hover:bg-primary/30 transition-colors duration-300 glow-hover backdrop-blur-md">
                        <Brain className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">סוכני AI</h3>
                      <p className="text-sm text-muted-foreground">פתרונות AI חכמים שעובדים 24/7</p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-2xl opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-primary/5 rounded-tr-2xl opacity-70"></div>
                  </motion.div>
                </WouterLink>
                
                <WouterLink href="/services/automation">
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group backdrop-blur-sm relative overflow-hidden cursor-pointer"
                  >
                    {/* Automation background image with overlay */}
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/80 backdrop-blur-sm z-10"></div>
                      <div 
                        className="absolute inset-0 bg-center bg-cover z-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%236644ff' stroke-width='0.5' stroke-opacity='0.2'%3E%3Crect x='25' y='25' width='50' height='50' rx='5' /%3E%3Cline x1='30' y1='40' x2='70' y2='40' /%3E%3Cline x1='30' y1='50' x2='70' y2='50' /%3E%3Cline x1='30' y1='60' x2='70' y2='60' /%3E%3Ccircle cx='20' cy='40' r='3' fill='%236644ff' fill-opacity='0.2' /%3E%3Ccircle cx='80' cy='60' r='3' fill='%236644ff' fill-opacity='0.2' /%3E%3Cpath d='M20 40 L 25 40 M 80 60 L 75 60' stroke-width='0.7' /%3E%3C/g%3E%3C/svg%3E")`
                        }}
                      ></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-20">
                      <div className="rounded-full bg-primary/20 p-3 mb-4 group-hover:bg-primary/30 transition-colors duration-300 glow-hover backdrop-blur-md">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">אוטומציה</h3>
                      <p className="text-sm text-muted-foreground">ייעול תהליכים וחיסכון בזמן</p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-2xl opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-primary/5 rounded-tr-2xl opacity-70"></div>
                  </motion.div>
                </WouterLink>
                
                <WouterLink href="/services/integration">
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group backdrop-blur-sm relative overflow-hidden cursor-pointer"
                  >
                    {/* Integration background image with overlay */}
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/80 backdrop-blur-sm z-10"></div>
                      <div 
                        className="absolute inset-0 bg-center bg-cover z-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%235555ff' stroke-width='0.5' stroke-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='10' /%3E%3Ccircle cx='70' cy='70' r='10' /%3E%3Ccircle cx='70' cy='30' r='10' /%3E%3Ccircle cx='30' cy='70' r='10' /%3E%3Ccircle cx='50' cy='50' r='15' /%3E%3Cline x1='30' y1='30' x2='50' y2='50' /%3E%3Cline x1='70' y1='30' x2='50' y2='50' /%3E%3Cline x1='30' y1='70' x2='50' y2='50' /%3E%3Cline x1='70' y1='70' x2='50' y2='50' /%3E%3C/g%3E%3C/svg%3E")`
                        }}
                      ></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-20">
                      <div className="rounded-full bg-primary/20 p-3 mb-4 group-hover:bg-primary/30 transition-colors duration-300 glow-hover backdrop-blur-md">
                        <Cpu className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">אינטגרציה</h3>
                      <p className="text-sm text-muted-foreground">התממשקות למערכות קיימות</p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-2xl opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-primary/5 rounded-tr-2xl opacity-70"></div>
                  </motion.div>
                </WouterLink>
                
                <WouterLink href="/services/analytics">
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group backdrop-blur-sm relative overflow-hidden cursor-pointer"
                  >
                    {/* Analytics background image with overlay */}
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/80 backdrop-blur-sm z-10"></div>
                      <div 
                        className="absolute inset-0 bg-center bg-cover z-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%237733ff' stroke-width='0.5' stroke-opacity='0.2'%3E%3Crect x='20' y='20' width='60' height='60' rx='2' /%3E%3Cline x1='30' y1='35' x2='70' y2='35' /%3E%3Cline x1='30' y1='45' x2='50' y2='45' /%3E%3Cline x1='30' y1='55' x2='60' y2='55' /%3E%3Cline x1='30' y1='65' x2='40' y2='65' /%3E%3Ccircle cx='75' cy='45' r='10' fill='%237733ff' fill-opacity='0.1' /%3E%3Cpath d='M70 45 L 65 45' stroke-width='0.7' /%3E%3C/g%3E%3C/svg%3E")`
                        }}
                      ></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-20">
                      <div className="rounded-full bg-primary/20 p-3 mb-4 group-hover:bg-primary/30 transition-colors duration-300 glow-hover backdrop-blur-md">
                        <BarChart className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">אנליטיקה</h3>
                      <p className="text-sm text-muted-foreground">ניתוח נתונים ותובנות עסקיות</p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-2xl opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-primary/5 rounded-tr-2xl opacity-70"></div>
                  </motion.div>
                </WouterLink>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-28 h-28 border border-primary/20 rounded-2xl opacity-40 rotate-12" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-secondary/20 rounded-2xl opacity-40 -rotate-6" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}