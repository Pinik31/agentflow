import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import CtaSection from '@/components/CtaSection';
import NewsletterPopup from '@/components/NewsletterPopup';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Bot, Users, Gift, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiPatreon, SiDiscord, SiSlack } from 'react-icons/si';

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

export default function Home() {
  return (
    <>
      <NewsletterPopup />
      
      {/* Hero Section with our enhanced component */}
      <HeroSection />
      
      {/* Services Section with our enhanced component */}
      <ServicesSection />
      
      {/* About Section with enhanced animations */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-background">
        {/* Decorative elements with our new animation classes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-lg rotate-12 opacity-50 animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-primary/10 rounded-lg -rotate-12 opacity-50 animate-float" />
        
        <div className="container relative">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6">אודותינו</div>
              <h2 className="text-4xl font-bold mb-6 leading-tight text-gradient">מובילים בחדשנות<br />עם מומחיות ב-AI</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                אנחנו צוות של מומחי AI ואוטומציה עם ניסיון רב בפיתוח פתרונות חכמים לעסקים. 
                המשימה שלנו היא לעזור לעסקים להתייעל ולצמוח באמצעות טכנולוגיות מתקדמות.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <Card className="group glow-hover transition-all duration-500">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-gradient group-hover:scale-110 transition-transform duration-500">150+</div>
                    <div className="text-muted-foreground">לקוחות מרוצים</div>
                  </CardContent>
                </Card>
                <Card className="group glow-hover transition-all duration-500">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-gradient group-hover:scale-110 transition-transform duration-500">98%</div>
                    <div className="text-muted-foreground">שביעות רצון</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80"
                  alt="הצוות שלנו"
                  className="rounded-lg shadow-xl w-full aspect-video object-cover relative transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-4 right-4 glass rounded-lg px-4 py-2 shadow-lg z-20 transition-transform duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium">צוות המומחים שלנו</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Why Choose Us Section with enhanced animations */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        
        <div className="container relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-float">היתרונות שלנו</div>
            <h2 className="text-4xl font-bold text-center mb-8 text-gradient">למה לבחור בנו?</h2>
            <p className="text-lg text-muted-foreground">
              אנו מספקים פתרונות ברמה הגבוהה ביותר בשוק, עם התאמה מדויקת לצרכים של העסק שלך
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants}>
              <Card className="group card-hover glow-hover border-primary/5 hover:border-primary/20 overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-float">
                    <Bot className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors duration-300">פתרונות AI מתקדמים</h3>
                  <p className="text-muted-foreground">
                    שימוש בטכנולוגיות AI מתקדמות להשגת תוצאות מיטביות עבור העסק שלך
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="group card-hover glow-hover border-primary/5 hover:border-primary/20 overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-float-slow">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors duration-300">אבטחה מתקדמת</h3>
                  <p className="text-muted-foreground">
                    הגנה מקיפה על המידע והנתונים שלך עם סטנדרטים מחמירים של אבטחת מידע
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="group card-hover glow-hover border-primary/5 hover:border-primary/20 overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-3 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-float-fast">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors duration-300">ביצועים מהירים</h3>
                  <p className="text-muted-foreground">
                    מערכות מהירות ויעילות המאפשרות עבודה רציפה וחלקה ללא עיכובים
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Carousel Section */}
      <TestimonialsCarousel />
      
      {/* Community Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" />
        
        <div className="container relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-float">הקהילה שלנו</div>
            <h2 className="text-4xl font-bold text-center mb-6 text-gradient">הצטרפו לקהילת Agent Flow</h2>
            <p className="text-lg text-muted-foreground">
              הצטרפו לקהילה שלנו המונה אלפי חברים ותיהנו משיתוף ידע, עדכונים שוטפים ותמיכה מקצועית
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Community Option 1: Discord */}
            <motion.div variants={itemVariants}>
              <Card className="group border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md h-full overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <SiDiscord className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">קהילת Discord</h3>
                  <p className="text-muted-foreground mb-6">
                    הצטרפו לקהילת ה-Discord שלנו עם יותר מ-5,000 חברים פעילים. שאלו שאלות, קבלו תמיכה ותתעדכנו בחידושים האחרונים.
                  </p>
                  <Button className="w-full gap-2 group-hover:bg-primary/90 transition-colors duration-300">
                    <Users className="w-4 h-4" />
                    הצטרפו לקהילה
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Community Option 2: Patreon */}
            <motion.div variants={itemVariants}>
              <Card className="group border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md h-full overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <SiPatreon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">תמכו בנו ב-Patreon</h3>
                  <p className="text-muted-foreground mb-6">
                    תמכו בפיתוח כלים חדשים ובקהילת Agent Flow. תומכים מקבלים גישה מוקדמת לכלים חדשים ותוכן בלעדי.
                  </p>
                  <Button className="w-full gap-2 group-hover:bg-primary/90 transition-colors duration-300">
                    <Gift className="w-4 h-4" />
                    תמכו בפרויקט
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Community Option 3: Slack */}
            <motion.div variants={itemVariants}>
              <Card className="group border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md h-full overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <SiSlack className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">קהילת Slack למפתחים</h3>
                  <p className="text-muted-foreground mb-6">
                    הצטרפו לקהילת Slack המיועדת למפתחים. שתפו קוד, התייעצו עם מומחים ולמדו מניסיונם של אחרים.
                  </p>
                  <Button className="w-full gap-2 group-hover:bg-primary/90 transition-colors duration-300">
                    <Heart className="w-4 h-4" />
                    הצטרפו למפתחים
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <Card className="text-center p-6 border-primary/10">
              <h3 className="text-3xl font-bold text-primary mb-2">5,000+</h3>
              <p className="text-muted-foreground">חברי קהילה</p>
            </Card>
            
            <Card className="text-center p-6 border-primary/10">
              <h3 className="text-3xl font-bold text-primary mb-2">200+</h3>
              <p className="text-muted-foreground">תורמים פעילים</p>
            </Card>
            
            <Card className="text-center p-6 border-primary/10">
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground">וובינרים ואירועים</p>
            </Card>
            
            <Card className="text-center p-6 border-primary/10">
              <h3 className="text-3xl font-bold text-primary mb-2">3,000+</h3>
              <p className="text-muted-foreground">מאמרים ומדריכים</p>
            </Card>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section with our enhanced component */}
      <CtaSection />
    </>
  );
}