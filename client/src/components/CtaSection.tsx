import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CtaSection() {
  // Reveal animation for the CTA section
  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-20 left-10 w-40 h-40 border border-primary/10 rounded-lg rotate-12 opacity-50 md:block hidden"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 border border-primary/10 rounded-lg -rotate-12 opacity-50 md:block hidden"></div>
      
      <div className="container relative">
        {/* Content with card effect */}
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur opacity-30"></div>
          
          <div className="relative bg-background/60 backdrop-blur-sm rounded-2xl p-12 border border-primary/10 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-float">
                פנה אלינו היום
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight text-gradient">
                מוכנים להתחיל? <br />
                אנחנו כאן לעזור לך
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                 צור איתנו קשר עוד היום ונעזור לך למצוא את הפתרון המושלם לעסק שלך
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-base animate-shimmer">
                צור קשר עכשיו
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base border-primary/20 hover:bg-primary/5">
                <MessageSquare className="h-5 w-5" />
                שוחח איתנו
              </Button>
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-dots bg-repeat opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-dots bg-repeat opacity-20"></div>
          </div>
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">תמיכה 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-muted-foreground">התחייבות לשביעות רצון</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-muted-foreground">אבטחה מתקדמת</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-muted-foreground">מומחים זמינים</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}