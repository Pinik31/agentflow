
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Bot, PencilRuler, LineChart } from 'lucide-react';
import { Link } from 'wouter';
import Particles from './Particles';
import { TypeAnimation } from 'react-type-animation';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [aiServices] = useState([
    "תהליכי מכירות", 
    "ניהול לקוחות", 
    "תמיכה וירטואלית",
    "שירות לקוחות", 
    "ניתוח נתונים", 
    "אוטומציה עסקית"
  ]);
  
  const featureItems = [
    {
      icon: <Bot className="w-6 h-6 text-primary-500" />,
      title: "סוכנים AI חכמים",
      description: "פיתוח והטמעת סוכני AI לביצוע משימות שחוזרות על עצמן תוך חיסכון של עד 70% בזמן."
    },
    {
      icon: <PencilRuler className="w-6 h-6 text-secondary-500" />,
      title: "פתרונות מותאמים אישית",
      description: "פתרונות AI מותאמים במיוחד לצרכי העסק שלך, מחוברים למערכות הקיימות."
    },
    {
      icon: <LineChart className="w-6 h-6 text-accent-500" />,
      title: "ניתוח נתונים מתקדם",
      description: "הפקת תובנות עסקיות קריטיות מהנתונים שלך באמצעות AI וכלי אנליטיקה מתקדמים."
    }
  ];
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  // Neural network animation
  const [nodes, setNodes] = useState<JSX.Element[]>([]);
  const [connectionLines, setConnectionLines] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const createNetworkEffect = () => {
      const nodeCount = 12;
      const newNodes: JSX.Element[] = [];
      const newLines: JSX.Element[] = [];
      
      // Create nodes
      const nodePositions: { x: number, y: number, size: number }[] = [];
      
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 6 + 3;
        
        nodePositions.push({ x, y, size });
        
        newNodes.push(
          <div 
            key={`node-${i}`}
            className="absolute rounded-full bg-primary-400/30 backdrop-blur-md z-10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              animation: `float ${7 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        );
      }
      
      // Create connections between nearby nodes
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const dist = Math.sqrt(
            Math.pow(nodePositions[i].x - nodePositions[j].x, 2) +
            Math.pow(nodePositions[i].y - nodePositions[j].y, 2)
          );
          
          // Only connect nodes that are close enough
          if (dist < 30) {
            const opacity = 0.1 * (1 - dist / 30);
            
            newLines.push(
              <svg
                key={`line-${i}-${j}`}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 5 }}
              >
                <line
                  x1={`${nodePositions[i].x}%`}
                  y1={`${nodePositions[i].y}%`}
                  x2={`${nodePositions[j].x}%`}
                  y2={`${nodePositions[j].y}%`}
                  stroke={`rgba(130, 88, 252, ${opacity})`}
                  strokeWidth="1"
                />
              </svg>
            );
          }
        }
      }
      
      setNodes(newNodes);
      setConnectionLines(newLines);
    };
    
    createNetworkEffect();
    
    // Recreate network effect on window resize
    const handleResize = () => {
      createNetworkEffect();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <section 
      ref={containerRef} 
      className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-accent/10"
    >
      {/* Particles animation */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles 
          className="absolute inset-0" 
          quantity={80} 
          color="#8258fc" 
          speed={0.3}
        />
      </div>
      
      {/* AI-themed background with neural network effect */}
      <div className="absolute inset-0 bg-ai-pattern opacity-10" />
      {nodes}
      {connectionLines}
      
      {/* AI circuit board pattern */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      
      {/* Glowing orbs for futuristic effect */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" />
      
      <div className="container relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Hero Text Content */}
          <motion.div 
            variants={itemVariants}
            className="text-center lg:text-right"
            style={{ y, opacity }}
          >
            {/* AI badge with pulse effect */}
            <div className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary mb-6 animate-pulse-slow border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 inline-block mr-1.5 animate-pulse" />
              פתרונות AI מתקדמים לעסקים
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="block text-gradient-primary">אוטומציה חכמה</span> 
              <TypeAnimation
                sequence={[
                  'לעסקים מתקדמים',
                  2000,
                  'לצמיחה מהירה',
                  2000,
                  'לחיסכון בזמן',
                  2000,
                  'ליתרון תחרותי',
                  2000
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="block"
              />
            </h1>
            
            <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto lg:mr-0 lg:ml-0">
              סוכנות המתמחה בבניית פתרונות אוטומציה מבוססי AI שיחסכו לעסק שלך זמן, כסף ומשאבים.
              אנו מפתחים מערכות חכמות המותאמות לצרכים הייחודיים של העסק שלך.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center lg:justify-end mb-8">
              {aiServices.map((service, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 text-sm bg-primary-100/70 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full backdrop-blur-sm border border-primary-200 dark:border-primary-800"
                >
                  {service}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-end">
              <Link href="/contact">
                <motion.button 
                  className="btn-primary btn-lg group"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 5px 20px rgba(130, 88, 252, 0.4)"
                  }}
                >
                  <span>התחל עכשיו</span>
                  <ArrowRight className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link href="/services">
                <motion.button 
                  className="btn-outline btn-lg"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  גלה את השירותים שלנו
                </motion.button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 flex items-center justify-center lg:justify-end text-muted text-sm">
              <Zap className="w-4 h-4 mr-1 text-accent-500" />
              <span>מעל 95% שביעות רצון מלקוחות</span>
              <span className="mx-2">•</span>
              <span>חיסכון של עד 70% בזמן</span>
            </div>
          </motion.div>
          
          {/* Hero Illustration/Animation */}
          <motion.div 
            variants={itemVariants}
            className="relative perspective"
          >
            <motion.div
              className="w-full h-full preserve-3d"
              animate={{ 
                rotateY: [0, 5, 0, -5, 0],
                rotateX: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10,
                ease: "easeInOut" 
              }}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* 3D floating AI/Robot illustration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-secondary-500/90 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden glass">
                  {/* Circuit board pattern inside */}
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  
                  {/* Content inside card */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Animated elements */}
                      <div className="space-y-2">
                        <div className="w-16 h-2 bg-white/20 rounded-full animate-pulse" />
                        <div className="w-12 h-2 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-auto">
                      <div className="w-full h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="w-5/6 h-3 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      <div className="w-4/6 h-3 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div className="w-16 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent-400 rounded-full mr-1 animate-pulse" />
                        <div className="w-2 h-2 bg-accent-400 rounded-full mr-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                      </div>
                      
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements around the card */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent-400/80 rounded-full blur-sm animate-float-slow" />
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary-400/80 rounded-full blur-sm animate-float" 
                  style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-8 h-8 bg-secondary-400/80 rounded-full blur-sm animate-float-fast" 
                  style={{ animationDelay: '0.5s' }} />
                  
                {/* Visual elements around the card */}
                <div className="absolute top-1/4 -left-12 w-24 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shadow-lg animate-float-slow">
                  <span className="text-xs font-medium text-primary-800 dark:text-primary-300">אוטומציה חכמה</span>
                </div>
                
                <div className="absolute bottom-1/4 -right-14 w-28 h-8 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center shadow-lg animate-float"
                  style={{ animationDelay: '1.5s' }}>
                  <span className="text-xs font-medium text-secondary-800 dark:text-secondary-300">חיסכון בזמן וכסף</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Feature cards section */}
        <div className="mt-20 lg:mt-32">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.6
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {featureItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-surface/80 backdrop-blur-lg border border-subtle rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 100
                    }
                  }
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100/50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
