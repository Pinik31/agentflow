import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define the testimonial type for type safety
interface Testimonial {
  id: number;
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar: string;
    logoUrl?: string;
  };
  rating: number;
}

interface CompanyLogo {
  id: number;
  name: string;
  logoUrl: string;
  size: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "הבוט לשירות לקוחות שפיתחה עבורנו Agent Flow הביא לשיפור משמעותי בשביעות רצון הלקוחות. המערכת מספקת מענה מהיר ומדויק 24/7 וחסכה לנו עשרות אלפי שקלים בחודש.",
    author: {
      name: "דניאל כהן",
      role: "מנכ\"ל",
      company: "מטריקס טכנולוגיות",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      logoUrl: "https://cdn.logojoy.com/wp-content/uploads/2018/05/30162630/1357-768x591.png"
    },
    rating: 5
  },
  {
    id: 2,
    content: "פתרונות האוטומציה של Agent Flow שינו לחלוטין את אופן העבודה של הצוות שלנו. המערכת אוטומטית מטפלת ב-80% מהפניות וחסכה לנו הרבה זמן עבודה. ביצועים מדהימים!",
    author: {
      name: "עדי גולדשטיין",
      role: "סמנכ\"לית שיווק",
      company: "חברת התוכנה קודטק",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      logoUrl: "https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Technology-Logo-Graphics-9785068-1-580x386.jpg"
    },
    rating: 5
  },
  {
    id: 3,
    content: "עברנו תהליך אוטומציה מלא של מחלקת השיווק שלנו באמצעות Agent Flow. התוצאות היו מעבר לציפיות - הגדלנו את מספר הלידים ב-35% תוך חודשיים. חברה מקצועית ומעולה!",
    author: {
      name: "אלון ברוך",
      role: "בעלים",
      company: "רשת חנויות דיגיטליות",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      logoUrl: "https://s3.amazonaws.com/cdn.designcrowd.com/blog/39-Fashion-Clothing-Brands-Logos/23_fashion_brand_logos.png"
    },
    rating: 5
  },
  {
    id: 4,
    content: "צוות הפיתוח שלנו משלב את הטכנולוגיות של Agent Flow במוצרי התוכנה שלנו. האינטגרציה הייתה פשוטה והיכולות החדשות שהוספנו כבר הוכיחו את עצמן. שיתוף פעולה מעולה!",
    author: {
      name: "מיכל לוי",
      role: "מנהלת פיתוח",
      company: "סופטטק",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      logoUrl: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/07/attachment_48486076-e1531899559548.jpg?auto=format&q=60&fit=max&w=930"
    },
    rating: 5
  },
  {
    id: 5,
    content: "הצ'אטבוט שנבנה עבור החנות המקוונת שלנו הגדיל את ההמרות באופן משמעותי. לקוחות מקבלים מענה מיידי לשאלותיהם וזה מעלה את אחוזי הסגירה. ההשקעה החזירה את עצמה תוך 3 חודשים.",
    author: {
      name: "יעל אברהם",
      role: "מנהלת מכירות",
      company: "אלקטרוניקה פלוס",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      logoUrl: "https://static.vecteezy.com/system/resources/previews/009/469/493/original/electronics-business-company-logo-design-template-free-vector.jpg"
    },
    rating: 5
  }
];

const companyLogos: CompanyLogo[] = [
  {
    id: 1,
    name: "Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    size: "h-10"
  },
  {
    id: 2,
    name: "Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    size: "h-8"
  },
  {
    id: 3,
    name: "Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    size: "h-10"
  },
  {
    id: 4,
    name: "Amazon",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    size: "h-8"
  },
  {
    id: 5,
    name: "Netflix",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    size: "h-6"
  },
  {
    id: 6,
    name: "Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    size: "h-7"
  }
];

export default function TestimonialsCarousel() {
  const [activeLogoId, setActiveLogoId] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(true);

  // Handle mouse enter/leave for company logos
  const handleLogoHover = (id: number) => {
    setActiveLogoId(id);
    setAutoplay(false); // Pause autoplay when user interacts
  };

  const handleLogoLeave = () => {
    setActiveLogoId(null);
    setAutoplay(true); // Resume autoplay when user stops interacting
  };

  return (
    <div className="py-24 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-40" />
      
      <div className="container relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-float">לקוחות ממליצים</div>
          <h2 className="text-4xl font-bold text-center mb-6 text-gradient">מה הלקוחות שלנו אומרים</h2>
          <p className="text-lg text-muted-foreground">
            הצלחנו לעזור למאות עסקים לצמוח ולהתייעל באמצעות הפתרונות המתקדמים שלנו
          </p>
        </motion.div>
        
        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="py-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="relative h-full overflow-visible">
                      <div className="absolute -top-6 right-8">
                        <div className="rounded-full bg-background shadow-lg p-2 border border-primary/10">
                          <Quote className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <CardContent className="pt-8 pb-8">
                        <div className="flex flex-col h-full">
                          <div className="mb-6">
                            <div className="flex mb-1">
                              {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                            <p className="italic text-muted-foreground mb-6">
                              "{testimonial.content}"
                            </p>
                          </div>
                          <div className="mt-auto">
                            <div className="flex items-center mb-3">
                              <Avatar className="w-12 h-12 border-2 border-primary/20">
                                <AvatarImage src={testimonial.author.avatar} />
                                <AvatarFallback>{testimonial.author.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="mr-4">
                                <p className="font-medium">{testimonial.author.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {testimonial.author.role}, {testimonial.author.company}
                                </p>
                              </div>
                            </div>
                            {testimonial.author.logoUrl && (
                              <div className="border-t border-primary/10 pt-3 mt-2">
                                <img 
                                  src={testimonial.author.logoUrl} 
                                  alt={testimonial.author.company} 
                                  className="h-7 object-contain mx-auto" 
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="relative static translate-y-0 -translate-x-0 focus:scale-105 hover:scale-105" />
              <CarouselNext className="relative static translate-y-0 -translate-x-0 focus:scale-105 hover:scale-105" />
            </div>
          </Carousel>
        </motion.div>
        
        {/* Interactive Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <h3 className="text-xl font-semibold text-center mb-8">אנחנו גאים לעבוד עם החברות המובילות בשוק</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companyLogos.map((logo) => (
              <motion.div
                key={logo.id}
                className={`transition-all duration-300 flex items-center`}
                onMouseEnter={() => handleLogoHover(logo.id)}
                onMouseLeave={handleLogoLeave}
                whileHover={{ 
                  scale: 1.15, 
                  opacity: 1,
                  transition: { duration: 0.3 }
                }}
                animate={{ 
                  opacity: activeLogoId === null || activeLogoId === logo.id ? 1 : 0.4,
                  scale: activeLogoId === logo.id ? 1.15 : 1
                }}
              >
                <img 
                  src={logo.logoUrl} 
                  alt={logo.name} 
                  className={`${logo.size} object-contain`} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}