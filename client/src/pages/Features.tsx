import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, LineChart, BarChartBig, Users, Shield, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NewsletterForm from '@/components/NewsletterForm';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "סוכני AI חכמים",
    description: "אוטומציה חכמה של משימות חוזרות באמצעות סוכני AI המלמדים את עצמם ומשתפרים עם הזמן."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "אוטומציה של תהליכים",
    description: "ייעול תהליכים עסקיים ע״י אוטומציה חכמה המזהה ומייעלת נקודות חיכוך וצווארי בקבוק."
  },
  {
    icon: <LineChart className="h-8 w-8 text-primary" />,
    title: "ניתוח נתונים",
    description: "הפקת תובנות עסקיות קריטיות מהנתונים שלך באמצעות כלי AI וניתוח מתקדם."
  },
  {
    icon: <BarChartBig className="h-8 w-8 text-primary" />,
    title: "חיזוי מגמות עסקיות",
    description: "חיזוי מגמות מכירה, התנהגות לקוחות ומדדים עסקיים אחרים בדיוק גבוה."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "ניהול חכם של לקוחות",
    description: "מערכת CRM מבוססת AI המתאימה עצמה לצרכים של הלקוחות שלך בזמן אמת."
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "אבטחה ופרטיות",
    description: "שמירה על סטנדרטים גבוהים של אבטחת מידע ופרטיות בכל הפתרונות שלנו."
  }
];

const benefits = [
  {
    icon: <Clock />,
    title: "חיסכון בזמן",
    description: "צמצום זמן העבודה עד 70% במשימות חוזרות"
  },
  {
    icon: <CheckCircle />,
    title: "יעילות מוגברת",
    description: "אוטומציה של תהליכים מורכבים לשיפור היעילות התפעולית"
  },
  {
    icon: <Users />,
    title: "ניהול לקוחות אפקטיבי",
    description: "טיפול חכם ואוטומטי בפניות לקוחות ותהליכי מכירה"
  }
];

export default function Features() {
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
        duration: 0.5
      }
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-16 px-4 sm:px-6 md:px-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            <span className="text-primary">תכונות ויתרונות</span> מתקדמים
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            גלה כיצד Agent Flow מעצים את העסק שלך עם פתרונות אוטומציה ו-AI מתקדמים
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">התייעצות חינם</Button>
            <Button size="lg" variant="outline">קרא עוד</Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">תכונות מובילות</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            הפתרונות שלנו מציעים מגוון רחב של יכולות מתקדמות המותאמות לצרכי העסק שלך
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary/10 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30 rounded-2xl my-16 p-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">יתרונות מוכחים</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            יתרונות מדידים ומוכחים שלקוחותינו חווים עם הפתרונות שלנו
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">מוכנים להעצים את העסק שלכם?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            צרו קשר עוד היום לקבלת ייעוץ חינם ולגלות כיצד הפתרונות שלנו יכולים לעזור לעסק שלכם לצמוח
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">צור קשר עכשיו</Button>
            <Button size="lg" variant="outline" className="px-8">צפה בדוגמאות</Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="bg-card border rounded-xl p-8 shadow-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">הישארו מעודכנים</h3>
            <p className="text-muted-foreground mb-6">
              הירשמו לניוזלטר שלנו לקבלת עדכונים, טיפים ומידע על החידושים האחרונים בתחום האוטומציה והבינה המלאכותית
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}