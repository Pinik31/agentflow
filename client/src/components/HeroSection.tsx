import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Zap, Code, BarChart, Brain, Cpu, Sparkles, Database, ChevronRight, Workflow } from 'lucide-react';
import { Link as WouterLink } from 'wouter';

export default function HeroSection() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  // Particles for the futuristic AI background
  const particles = Array.from({ length: 40 }, (_, i) => (
    <div 
      key={i}
      className="absolute hidden md:block rounded-full bg-gradient-to-br from-primary/30 to-primary/5"
      style={{
        width: `${Math.floor(Math.random() * 4) + 2}px`,
        height: `${Math.floor(Math.random() * 4) + 2}px`,
        top: `${Math.floor(Math.random() * 100)}%`,
        left: `${Math.floor(Math.random() * 100)}%`,
        opacity: 0.3 + (Math.random() * 0.5),
        animation: `float ${5 + Math.random() * 5}s linear infinite`,
        animationDelay: `${i * 0.1}s`
      }}
    />
  ));

  // Animated circuit paths for AI network visualization
  const circuitPaths = (
    <svg className="absolute inset-0 w-full h-full z-0 opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circuit-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(266, 95%, 55%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(190, 90%, 55%)" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="circuit-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(330, 95%, 60%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(266, 95%, 55%)" stopOpacity="0.6" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Main circuit paths */}
      <path
        d="M0,50 Q30,30 60,70 T100,50"
        stroke="url(#circuit-gradient-1)"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="2,3"
        className="animate-pulse-slow"
      />
      <path
        d="M0,30 C30,10 70,90 100,70"
        stroke="url(#circuit-gradient-2)"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="2,3"
        className="animate-pulse-slow"
      />
      
      {/* Connection nodes */}
      {Array.from({ length: 6 }, (_, i) => {
        const x = 15 + (i * 15);
        const y = 25 + (i % 3) * 25;
        return (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r="3"
            fill={i % 2 === 0 ? "url(#circuit-gradient-1)" : "url(#circuit-gradient-2)"}
            filter="url(#glow)"
            className="animate-pulse-subtle"
          />
        );
      })}
    </svg>
  );

  // Advanced particle system for 3D depth effect
  const backgroundParticles = (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-primary/5 to-transparent"
          style={{
            width: `${(i % 5) * 10 + 40}px`,
            height: `${(i % 5) * 10 + 40}px`,
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            opacity: 0.05 + (i % 10) * 0.01,
            filter: `blur(${(i % 3) * 2}px)`,
            transform: `translateZ(${i * 10}px)`,
            animation: `float ${8 + i % 4}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="relative pt-28 pb-28 md:pt-36 md:pb-48 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5 perspective-1000">
      {/* Advanced AI-themed background */}
      <div className="absolute inset-0 bg-ai-pattern opacity-5" />
      {backgroundParticles}
      {particles}
      {circuitPaths}
      
      {/* Geometric mesh grid */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Glowing orbs for futuristic effect */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-secondary/20 blur-3xl animate-float" />
      <div className="absolute top-1/3 left-1/3 w-56 h-56 rounded-full bg-accent/10 blur-3xl animate-float-fast" />
      
      {/* Neural activity simulation */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-px h-20 bg-primary"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
              animation: `pulse 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}
      </div>
      
      <div className="container relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          {/* Hero Text Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-right">
            {/* AI badge with futuristic effect */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="inline-block rounded-full px-5 py-2 mb-8 text-sm font-medium text-primary relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-primary/10 backdrop-blur-sm rounded-full"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></span>
              <span className="absolute inset-0 border border-primary/20 rounded-full"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                פתרונות AI מתקדמים לעסקים
              </span>
            </motion.div>
            
            {/* Main headline with enhanced 3D gradient effect */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-7 leading-tight"
            >
              <div className="mb-1 text-gradient bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text">התמרה עסקית</div>
              <div className="relative flex items-center justify-end">
                <span>באמצעות</span>
                <span className="relative mx-3 text-primary">
                  AI
                  <span className="absolute -inset-3 bg-primary/10 blur-xl rounded-full -z-10"></span>
                  <span className="absolute -inset-1 rounded-lg border border-primary/30 -z-10"></span>
                </span>
                <span>מתקדם</span>
              </div>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-10 leading-relaxed">
              מערכת Agent Flow מציעה פתרונות AI חדשניים המותאמים אישית לעסק שלך.
              <br />המומחיות שלנו הופכת את התהליכים העסקיים שלך לאוטומטיים, חכמים ויעילים.
            </motion.p>
            
            {/* Enhanced CTA buttons with premium effects */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-end">
              <WouterLink href="/contact">
                <Button size="lg" className="gap-2 text-lg group relative overflow-hidden border-0 shadow-xl">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-secondary opacity-100 group-hover:opacity-90 transition-all duration-500"></span>
                  <span className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-white/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></span>
                  <span className="relative z-10">התחל עכשיו</span>
                  <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Button>
              </WouterLink>
              <WouterLink href="/services">
                <Button size="lg" variant="outline" className="gap-2 text-lg border-primary/30 hover:bg-primary/10 hover:border-primary/60 text-primary transition-all duration-300 shadow-sm backdrop-blur-sm">
                  גלה עוד
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </WouterLink>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-wrap justify-center lg:justify-end gap-8 items-center text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                <span>+500 לקוחות מרוצים</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                <span>פתרונות מותאמים אישית</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                <span>חיסכון של 70% בזמן</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* AI Services Showcase with premium glass morphism */}
          <motion.div variants={itemVariants} className="relative">
            {/* Ambient glow effects */}
            <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-3xl blur-2xl opacity-40"></div>
            
            {/* Main glass panel with floating effect */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative rounded-2xl border border-primary/20 shadow-2xl backdrop-blur-md bg-white/10 overflow-hidden animate-float-slow"
            >
              {/* Inner glowing border */}
              <div className="absolute inset-px rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-70"></div>
              </div>
              
              {/* Neural network decorative background */}
              <div className="absolute inset-0 bg-neural opacity-10"></div>
              
              {/* Circuit board pattern overlay */}
              <div className="absolute inset-0 bg-circuit opacity-5"></div>
              
              {/* Content container */}
              <div className="relative p-8 pt-10 z-10">
                {/* Headline */}
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text">
                    השירותים המתקדמים שלנו
                  </h3>
                  <div className="flex space-x-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary/30'}`}></div>
                    ))}
                  </div>
                </div>
                
                {/* AI services grid with enhanced 3D depth */}
                <div className="grid grid-cols-2 gap-6 relative">
                  {/* AI Agents */}
                  <WouterLink href="/services/ai-agents">
                    <motion.div 
                      whileHover={{ translateY: -8, scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="group relative rounded-xl border border-primary/20 hover:border-primary/40 shadow-lg overflow-hidden"
                    >
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                      
                      {/* Glass effect */}
                      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
                      
                      {/* Content */}
                      <div className="relative p-6 z-10">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 p-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Brain className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="font-semibold mb-2 text-primary/90 group-hover:text-primary transition-colors">סוכני AI</h4>
                          <p className="text-sm text-muted-foreground">מערכות AI אוטונומיות לניהול משימות</p>
                        </div>
                      </div>
                      
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8"></div>
                      </div>
                    </motion.div>
                  </WouterLink>
                  
                  {/* Process Automation */}
                  <WouterLink href="/services/automation">
                    <motion.div 
                      whileHover={{ translateY: -8, scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="group relative rounded-xl border border-primary/20 hover:border-primary/40 shadow-lg overflow-hidden"
                    >
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                      
                      {/* Glass effect */}
                      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
                      
                      {/* Content */}
                      <div className="relative p-6 z-10">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 p-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Workflow className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="font-semibold mb-2 text-primary/90 group-hover:text-primary transition-colors">אוטומציה</h4>
                          <p className="text-sm text-muted-foreground">אוטומציה של תהליכים עסקיים</p>
                        </div>
                      </div>
                      
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8"></div>
                      </div>
                    </motion.div>
                  </WouterLink>
                  
                  {/* Data Integration */}
                  <WouterLink href="/services/integration">
                    <motion.div 
                      whileHover={{ translateY: -8, scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="group relative rounded-xl border border-primary/20 hover:border-primary/40 shadow-lg overflow-hidden"
                    >
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                      
                      {/* Glass effect */}
                      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
                      
                      {/* Content */}
                      <div className="relative p-6 z-10">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 p-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Database className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="font-semibold mb-2 text-primary/90 group-hover:text-primary transition-colors">אינטגרציה</h4>
                          <p className="text-sm text-muted-foreground">חיבור והתממשקות למערכות קיימות</p>
                        </div>
                      </div>
                      
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8"></div>
                      </div>
                    </motion.div>
                  </WouterLink>
                  
                  {/* Advanced Analytics */}
                  <WouterLink href="/services/analytics">
                    <motion.div 
                      whileHover={{ translateY: -8, scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="group relative rounded-xl border border-primary/20 hover:border-primary/40 shadow-lg overflow-hidden"
                    >
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                      
                      {/* Glass effect */}
                      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
                      
                      {/* Content */}
                      <div className="relative p-6 z-10">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 p-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <BarChart className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="font-semibold mb-2 text-primary/90 group-hover:text-primary transition-colors">אנליטיקה</h4>
                          <p className="text-sm text-muted-foreground">ניתוח נתונים בינה עסקית</p>
                        </div>
                      </div>
                      
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8"></div>
                      </div>
                    </motion.div>
                  </WouterLink>
                </div>
                
                {/* Decorative particles */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full bg-primary/20"
                    style={{
                      width: `${4 + i * 2}px`,
                      height: `${4 + i * 2}px`,
                      top: `${20 + i * 15}%`,
                      right: `${10 + i * 20}%`,
                      animation: `float ${3 + i}s ease-in-out infinite alternate`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full border border-primary/30 opacity-60 animate-float-slow"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full border border-secondary/30 opacity-60 animate-float"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}