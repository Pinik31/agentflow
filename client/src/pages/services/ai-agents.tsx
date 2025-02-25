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
import { Brain, Bot, MessageSquare, Check, Sparkles, Users, Shield } from 'lucide-react';
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

export default function AIAgentsPage() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string; isBot: boolean}[]>([
    {text: 'שלום! אני האסיסטנט האוטומטי של Agent Flow. אשמח לעזור לך להבין איך סוכני AI יכולים לסייע לעסק שלך. מה הצורך העסקי שלך?', isBot: true}
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
      category: 'ai-agents',
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
          assessmentId: null, // We're creating a direct need without assessment
          leadId: leadResponse.id,
          category: values.category,
          priority: values.priority,
          businessType: values.businessType,
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
        botResponse = 'המחיר תלוי בהיקף הפתרון ובדרישות הספציפיות. אנו מציעים תוכניות החל מ-1,000 ש"ח לחודש. נשמח לבנות עבורך הצעת מחיר מותאמת אישית.';
      } else if (userInput.toLowerCase().includes('זמן') || userInput.toLowerCase().includes('לוח זמנים') || userInput.toLowerCase().includes('מתי')) {
        botResponse = 'זמן הפיתוח וההטמעה תלוי במורכבות הפתרון. פתרונות בסיסיים יכולים להיות מוכנים תוך 1-2 שבועות, בעוד פתרונות מורכבים יותר עשויים לקחת 1-3 חודשים.';
      } else if (userInput.toLowerCase().includes('יכולות') || userInput.toLowerCase().includes('אפשרויות')) {
        botResponse = 'סוכני ה-AI שלנו יכולים לבצע מגוון רחב של משימות כגון: מענה אוטומטי לשאלות נפוצות, תמיכה בלקוחות 24/7, ניתוח מידע ודוחות, אוטומציה של תהליכים שגרתיים, ועוד.';
      } else {
        botResponse = 'תודה על השאלה! כדי לתת לך מענה מדויק ומותאם לצרכי העסק שלך, אנו ממליצים למלא את טופס הפנייה שבהמשך העמוד. נציג מקצועי מצוות Agent Flow יחזור אליך בהקדם עם פתרון מותאם אישית.';
      }
      
      setChatMessages([...newMessages, {text: botResponse, isBot: true}]);
    }, 1000);
    
    setUserInput('');
  };

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative pt-24 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-b from-background to-primary/5">
        <div className="absolute inset-0 bg-ai-pattern opacity-10" />
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
                <span className="text-gradient">סוכני AI</span> <br />
                <span>חכמים לעסק שלך</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                אוטומציה חכמה לעסק שלך באמצעות סוכני AI המעניקים שירות אישי, מהיר ויעיל - 24/7, ללא הפסקה.
              </p>
              <Button 
                size="lg" 
                className="mb-4 gap-2 text-base" 
                onClick={() => setShowChatbot(true)}
              >
                <MessageSquare className="h-5 w-5" />
                דבר עם בוט האפיון שלנו
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
                <div className="absolute inset-0 bg-neural opacity-5"></div>
                <CardHeader>
                  <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-primary/10 p-4 backdrop-blur-md border border-primary/20">
                      <Brain className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center mb-2">יתרונות סוכני AI</CardTitle>
                  <CardDescription className="text-center">חסכון בזמן, כסף ומשאבים לעסק שלך</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1.5 bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">זמינות 24/7</h4>
                        <p className="text-sm text-muted-foreground">סוכני AI פועלים מסביב לשעון ללא צורך במנוחה</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1.5 bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">חיסכון בעלויות</h4>
                        <p className="text-sm text-muted-foreground">הפחתת הוצאות כוח אדם והגדלת היעילות התפעולית</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1.5 bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">סקלביליות</h4>
                        <p className="text-sm text-muted-foreground">גדילה והתאמה מהירה לפי צרכי העסק המשתנים</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-1.5 bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">שיפור חווית לקוח</h4>
                        <p className="text-sm text-muted-foreground">מענה מהיר ומדויק הממוקד בצרכי הלקוח</p>
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
        <div className="absolute inset-0 bg-circuit opacity-5"></div>
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">סוגי סוכני AI שאנו מפתחים</h2>
            <p className="text-lg text-muted-foreground">
              אנו מפתחים מגוון פתרונות AI מותאמים אישית שעוזרים לייעל תהליכים עסקיים,
              לשפר את חווית הלקוח ולהגדיל את הרווחיות.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>צ'אטבוטים</CardTitle>
                <CardDescription>
                  ממשק שיחה חכם המבוסס על AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  צ'אטבוטים מתקדמים המסוגלים לנהל שיחות טבעיות עם הלקוחות, לענות על שאלות נפוצות, 
                  לסייע במידע על מוצרים ושירותים, ולטפל בתמיכה בלקוחות באופן אוטומטי.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>סוכני תמיכה</CardTitle>
                <CardDescription>
                  מענה אוטומטי לפניות לקוחות
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  מערכות AI שמטפלות באופן אוטומטי בפניות לקוחות, מספקות מענה מהיר לבעיות נפוצות,
                  ומעבירות פניות מורכבות לנציגי שירות אנושיים עם מידע רקע מלא.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>סוכני אבטחה</CardTitle>
                <CardDescription>
                  ניטור והגנה על מערכות המידע
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  סוכני אבטחה מבוססי AI שמנטרים באופן רציף את מערכות המידע של הארגון, 
                  מזהים איומים פוטנציאליים, ומגיבים באופן אוטומטי לאירועי אבטחה חשודים.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>סוכני שיווק</CardTitle>
                <CardDescription>
                  אוטומציה של תהליכי שיווק
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  סוכני AI שמנהלים קמפיינים שיווקיים, מנתחים התנהגות של לקוחות פוטנציאליים,
                  ומותאמים אישית תוכן ומסרים שיווקיים על פי העדפות המשתמש.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>סוכני מכירות</CardTitle>
                <CardDescription>
                  הגדלת מכירות וסגירת עסקאות
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  סוכני מכירות וירטואליים שמזהים לקוחות פוטנציאליים, מנהלים שיחות מכירה בסיסיות,
                  ומעבירים לידים חמים לצוות המכירות האנושי לסגירת עסקאות.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/20 h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-background/60">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>סוכני תפעול</CardTitle>
                <CardDescription>
                  ייעול תהליכים ארגוניים
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  סוכני AI שמסייעים בניהול ותפעול של תהליכים פנים-ארגוניים, אוטומציה של משימות חוזרות,
                  תזמון פגישות, ניהול משימות, ואופטימיזציה של תהליכי עבודה.
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
                <h3 className="font-medium">אפיון צרכים עסקיים</h3>
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
                  placeholder="שאל את הבוט על סוכני AI..."
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
        <div className="absolute inset-0 bg-ai-pattern opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_80%)]" />
        
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">יצירת קשר</h2>
            <p className="text-lg text-muted-foreground">
              השאירו פרטים ונחזור אליכם עם פתרון מותאם לצרכים העסקיים שלכם
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
                          <FormLabel>תיאור הצורך העסקי</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="ספר לנו על הצורך העסקי ואיך סוכן AI יכול לעזור לעסק שלך"
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