import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/ServiceCard';
import { Bot, Zap, Code, Server, PenTool, Share2 } from 'lucide-react';

export default function ServicesSection() {
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
        damping: 15
      }
    }
  };

  const services = [
    {
      title: 'סוכני AI',
      description: 'פתרונות AI חכמים לאוטומציה של תהליכים ומתן מענה ללקוחות 24/7.',
      imageUrl: 'https://images.unsplash.com/photo-1639803990627-741dec1955f9',
      href: '/services/ai-agents',
      icon: <Bot className="w-10 h-10" />
    },
    {
      title: 'צ\'אטבוטים',
      description: 'שירות לקוחות מתקדם עם צ\'אטבוטים חכמים המסוגלים להבין שפה טבעית ולפתור בעיות.',
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
      href: '/services/chatbots',
      icon: <Code className="w-10 h-10" />
    },
    {
      title: 'אוטומציה',
      description: 'אוטומציה של תהליכים עסקיים חוזרים לחיסכון בזמן והגדלת היעילות.',
      imageUrl: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387',
      href: '/services/automation',
      icon: <Zap className="w-10 h-10" />
    },
    {
      title: 'פיתוח אפליקציות',
      description: 'פיתוח אפליקציות חכמות ומותאמות אישית לצרכים העסקיים שלך.',
      imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
      href: '/services/app-development',
      icon: <PenTool className="w-10 h-10" />
    },
    {
      title: 'אינטגרציות',
      description: 'חיבור בין מערכות קיימות ליצירת סביבת עבודה אחודה ויעילה.',
      imageUrl: 'https://images.unsplash.com/photo-1603322327561-68cb649b1a56',
      href: '/services/integrations',
      icon: <Share2 className="w-10 h-10" />
    },
    {
      title: 'תשתיות ענן',
      description: 'תשתיות מתקדמות בענן להגדלת הביצועים, האבטחה והיציבות של המערכות.',
      imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3',
      href: '/services/cloud',
      icon: <Server className="w-10 h-10" />
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-background to-primary/5">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-20 right-10 w-40 h-40 border border-primary/10 rounded-lg rotate-12 opacity-50 md:block hidden" />
      <div className="absolute bottom-20 left-10 w-60 h-60 border border-primary/10 rounded-lg -rotate-12 opacity-50 md:block hidden" />
      
      <div className="container relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-float">
            השירותים שלנו
          </div>
          <h2 className="text-4xl font-bold mb-6 text-gradient">פתרונות מתקדמים לעסקים</h2>
          <p className="text-lg text-muted-foreground">
            אנו מציעים מגוון רחב של שירותים טכנולוגיים מתקדמים המותאמים לצרכים של העסק שלך
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div variants={itemVariants} key={index}>
              <ServiceCard 
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                href={service.href}
                icon={service.icon}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}