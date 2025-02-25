import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Bot, MessageSquare, Check, Zap, Cog, Timer, Sparkles, Workflow } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ApiService } from '@/services/api';
import { insertBusinessNeedsSchema } from '@shared/schema';

// Define our validation schema
const formSchema = insertBusinessNeedsSchema.extend({
  name: z.string().min(2, { message: 'שם חייב להכיל לפחות 2 תווים' }),
  email: z.string().email({ message: 'אימייל לא תקין' }),
  phone: z.string().min(9, { message: 'מספר טלפון לא תקין' }),
  companyName: z.string().min(2, { message: 'שם חברה חייב להכיל לפחות 2 תווים' }),
  businessType: z.string().min(2, { message: 'סוג העסק חייב להכיל לפחות 2 תווים' }),
  businessNeed: z.string().min(10, { message: 'תיאור הצורך העסקי חייב להכיל לפחות 10 תווים' })
});

export default function AutomationPage() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string; isBot: boolean}[]>([
    {text: 'שלום! אני האסיסטנט האוטומטי של Agent Flow. אשמח לעזור לך להבין איך אוטומציה יכולה לסייע לעסק שלך. איזה תהליך עסקי היית רוצה לייעל?', isBot: true}
  ]);
  const [userInput, setUserInput] = useState('');

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      companyName: '',
      businessType: '',
      businessNeed: '',
      category: 'automation',
      priority: 'high',
      description: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsFormSubmitting(true);
    
    try {
      // First create a lead
      const leadResponse = await ApiService.createLead({
        name: values.name,
        email: values.email, 
        phone: values.phone,
        company: values.companyName
      });
      
      if (leadResponse && leadResponse.id) {
        // Then create business need with lead ID
        await ApiService.createBusinessNeed({
          assessmentId: 0, // We're creating a direct need without assessment
          category: values.category,
          priority: values.priority,
          description: values.businessNeed,
        });
        
        toast({
          title: "הטופס נשלח בהצלחה!",
          description: "נציג מטעמנו יחזור אליך בהקדם",
          variant: "default",
        });
        
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "שגיאה בשליחת הטופס",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Handle chat message sending
  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message
    const newMessages = [...chatMessages, {text: userInput, isBot: false}];
    setChatMessages(newMessages);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let botResponse = '';
      
      if (userInput.toLowerCase().includes('מחיר') || userInput.toLowerCase().includes('עלות') || userInput.toLowerCase().includes('תשלום')) {
        botResponse = 'העלות של פתרון אוטומציה תלויה בהיקף ומורכבות הפרויקט. הצעות המחיר שלנו מתחילות מ-5,000 ש"ח עבור פתרונות בסיסיים ועד 50,000 ש"ח ומעלה עבור מערכות מורכבות. נשמח לבנות הצעת מחיר מותאמת אישית לאחר הבנת הצרכים שלך.';
      } else if (userInput.toLowerCase().includes('זמן') || userInput.toLowerCase().includes('לוח זמנים') || userInput.toLowerCase().includes('מתי')) {
        botResponse = 'תהליך הטמעת פתרון אוטומציה לרוב לוקח בין שבועיים לשלושה חודשים, תלוי במורכבות הפתרון. בתחילת הפרויקט אנו מבצעים אפיון מדויק שבסופו נוכל לתת הערכת זמנים מדויקת יותר.';
      } else if (userInput.toLowerCase().includes('תהליך') || userInput.toLowerCase().includes('עבודה') || userInput.toLowerCase().includes('שלבים')) {
        botResponse = 'תהליך יישום האוטומציה כולל: 1. אפיון צרכים וניתוח תהליכים קיימים, 2. תכנון הפתרון והגדרת יעדים מדידים, 3. פיתוח והטמעת האוטומציה, 4. בדיקות וכיול, 5. הדרכה והטמעה, 6. ליווי ותמיכה שוטפת. אנו מלווים אותך בכל השלבים עד להטמעה מלאה.';
      } else {
        botResponse = 'תודה על השאלה! כדי לתת לך מענה מדויק יותר על תהליכי האוטומציה המתאימים לעסק שלך, נשמח אם תמלא את טופס הפנייה שבהמשך העמוד. מומחה אוטומציה יחזור אליך בהקדם עם פתרון מותאם אישית.';
      }
      
      setChatMessages([...newMessages, {text: botResponse, isBot: true}]);
    }, 1000);
    
    setUserInput('');
  };

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative pt-24 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-b from-background to-primary/5">
        <div className="absolute inset-0 bg-circuit opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary),0.15),transparent_70%)]" />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-right"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gradient">אוטומציה</span> <br />
                <span>ייעול תהליכים לעסקים</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                שיפור היעילות התפעולית באמצעות אוטומציה חכמה של תהליכים עסקיים חוזרים, חיסכון בזמן ובמשאבים יקרים
              </p>
              <Button 
                size="lg" 
                className="mb-4 gap-2 text-base" 
                onClick={() => setShowChatbot(true)}
              >
                <MessageSquare className="h-5 w-5" />
                דבר עם מומחה האוטומציה שלנו
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-40"></div>
              <Card className="relative border border-primary/20 shadow-xl overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-circuit opacity-5"></div>
                <CardHeader>
                  <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-primary/10 p-4 backdrop-blur-md border border-primary/20">
                      <Zap className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center mb-2">יתרונות אוטומציה</CardTitle>
                  <CardDescription className="text-center">ייעול תהליכים וחיסכון משמעותי במשאבים</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1.5 bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">הפחתת טעויות אנוש</h4>
                        <p className="text-sm text-muted-foreground">מערכות אוטומטיות מצמצמות טעויות ומגבירות דיוק</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1.5 bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">העלאת פרודוקטיביות</h4>
                        <p className="text-sm text-muted-foreground">פינוי זמן יקר של עובדים למשימות יצירתיות וחשיבה</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1.5 bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">חיסכון בעלויות</h4>
                        <p className="text-sm text-muted-foreground">הפחתה משמעותית בעלויות תפעוליות שוטפות</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1.5 bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">שקיפות ובקרה</h4>
                        <p className="text-sm text-muted-foreground">מעקב ושליטה מלאים על התהליכים העסקיים</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-neural opacity-5"></div>
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">תחומי אוטומציה</h2>
            <p className="text-lg text-muted-foreground">
              אנו מתמחים באוטומציה של מגוון תהליכים עסקיים בעזרת טכנולוגיות מתקדמות ומותאמות אישית לצרכי העסק שלך
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>תהליכי שירות לקוחות</CardTitle>
                <CardDescription>
                  אוטומציה של פניות לקוחות ומענה אוטומטי
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  אוטומציה של מענה לפניות וטיפול בבקשות חוזרות, ניתוב פניות לגורם המטפל הרלוונטי, 
                  ומעקב אחר סטטוס הטיפול בפניה. מערכות אלו משפרות את שביעות רצון הלקוחות ומקצרות זמני תגובה.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>ניהול מלאי ורכש</CardTitle>
                <CardDescription>
                  אוטומציה של תהליכי הזמנות והתראות מלאי
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  מערכות אוטומטיות לניהול מלאי, הזמנות אוטומטיות של מוצרים מספקים כאשר המלאי נמוך,
                  ניהול ומעקב אחר הזמנות, ותזכורות אוטומטיות לספקים. תהליכים אלו מונעים מחסור במלאי ומייעלים את שרשרת האספקה.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>תהליכי שיווק ומכירות</CardTitle>
                <CardDescription>
                  אוטומציה של קמפיינים שיווקיים ומעקב אחר לידים
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  אוטומציה של קמפיינים שיווקיים, תזמון הודעות ופרסומים, מעקב אחר לקוחות פוטנציאליים,
                  ניהול מערך ההפצה, והפקת דוחות ביצועים אוטומטיים. מערכות אלו מגדילות את אפקטיביות פעילויות השיווק.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Cog className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>תהליכים פיננסיים</CardTitle>
                <CardDescription>
                  אוטומציה של הנהלת חשבונות וניהול תשלומים
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  אוטומציה של הנפקת חשבוניות, מעקב אחר תשלומים, התאמות בנקים אוטומטיות,
                  דיווחים תקופתיים לרשויות המס, והתראות על תשלומים צפויים. מערכות אלו חוסכות זמן רב ומונעות טעויות בתהליכים פיננסיים.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Timer className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>תזמון וניהול משימות</CardTitle>
                <CardDescription>
                  אוטומציה של ניהול זמן ומשימות
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  מערכות אוטומטיות לתזמון פגישות, ניהול ותזכורת משימות, הקצאת משאבים,
                  ודיווחי שעות אוטומטיים. תהליכים אלו משפרים את ניהול הזמן והיעילות בארגון.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>תהליכי אישורים והסמכות</CardTitle>
                <CardDescription>
                  אוטומציה של זרימת עבודה ואישורים
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  אוטומציה של תהליכי אישור הזמנות, חופשות, הוצאות, הסמכות,
                  ומעבר אוטומטי בין גורמים מאשרים שונים בתהליך. מערכות אלו מקצרות משמעותית את זמני האישור ומגבירות את השקיפות בתהליך.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Chat modal */}
      {showChatbot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-background rounded-xl shadow-2xl border border-primary/20 w-full max-w-md mx-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-neural opacity-5 z-0"></div>
            
            {/* Header */}
            <div className="relative z-10 p-4 bg-gradient-to-r from-primary/20 to-background border-b border-primary/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">אפיון צרכי אוטומציה</h3>
              </div>
              <button 
                onClick={() => setShowChatbot(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="relative z-10 h-80 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`rounded-2xl p-3 max-w-[80%] ${
                    message.isBot 
                      ? 'bg-primary/10 text-foreground rounded-tl-none' 
                      : 'bg-primary text-primary-foreground rounded-tr-none'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input area */}
            <form onSubmit={sendChatMessage} className="relative z-10 p-4 border-t border-primary/10 bg-background/50">
              <div className="flex gap-2">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="ספר לנו על התהליכים שברצונך לייעל..."
                  className="border-primary/20"
                />
                <Button type="submit" size="sm" disabled={!userInput.trim()}>
                  שלח
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      {/* Contact form section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-circuit opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_80%)]" />
        
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">יצירת קשר</h2>
            <p className="text-lg text-muted-foreground">
              השאירו פרטים ונחזור אליכם עם פתרון אוטומציה מותאם לצרכים העסקיים שלכם
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border border-primary/20 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>שם מלא</FormLabel>
                            <FormControl>
                              <Input placeholder="ישראל ישראלי" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>אימייל</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>טלפון</FormLabel>
                            <FormControl>
                              <Input placeholder="05X-XXXXXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>שם החברה</FormLabel>
                            <FormControl>
                              <Input placeholder="שם העסק שלך" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>תחום העסק</FormLabel>
                          <FormControl>
                            <Input placeholder="למשל: קמעונאות, שירותים פיננסיים, תוכנה, וכו'" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="businessNeed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>איזה תהליך תרצו לייעל?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="תארו את התהליך העסקי שברצונכם לייעל באמצעות אוטומציה"
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="text-center">
                      <Button type="submit" size="lg" disabled={isFormSubmitting} className="gap-2">
                        {isFormSubmitting ? 'שולח...' : 'שליחה'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}