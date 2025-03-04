import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Building2, Mail, MessageSquare, Phone, Check, ArrowRight } from "lucide-react";
import { SiWhatsapp, SiInstagram, SiYoutube, SiLinkedin } from "react-icons/si";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const socialLinks = [
  {
    name: "WhatsApp",
    icon: SiWhatsapp,
    href: "https://wa.me/972000000000?text=היי,%20אשמח%20לקבל%20מידע%20נוסף%20על%20השירותים%20שלכם",
    color: "hover:text-[#25D366]",
    description: "זמינים 24/7 בוואטסאפ"
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    href: "https://instagram.com/agentflow",
    color: "hover:text-[#E4405F]",
    description: "עקבו אחרינו באינסטגרם"
  },
  {
    name: "YouTube",
    icon: SiYoutube,
    href: "https://youtube.com/@agentflow",
    color: "hover:text-[#FF0000]",
    description: "צפו בסרטוני הדרכה"
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    href: "https://linkedin.com/company/agentflow",
    color: "hover:text-[#0A66C2]",
    description: "התחברו אלינו בלינקדאין"
  }
];

const contactDetails = [
  {
    icon: Phone,
    title: "טלפון",
    details: ["03-1234567", "050-1234567"]
  },
  {
    icon: Mail,
    title: "אימייל",
    details: ["contact@agentflow.co.il", "support@agentflow.co.il"]
  },
  {
    icon: Building2,
    title: "משרד ראשי",
    details: ["רחוב הברזל 30", "תל אביב, ישראל"]
  }
];

export default function Contact() {
  const { toast } = useToast();
  const [formStage, setFormStage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "תודה על פנייתך!",
        description: "נחזור אליך בהקדם האפשרי.",
      });
      setIsSubmitting(false);
      form.reset();
      setFormStage(0);
    },
    onError: () => {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשליחת הטופס. נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const nextStage = () => {
    if (formStage === 0) {
      const nameValid = form.trigger("name");
      const emailValid = form.trigger("email");

      if (nameValid && emailValid) {
        setFormStage(1);
      }
    } else if (formStage === 1) {
      const phoneValid = form.trigger("phone");
      const companyValid = form.trigger("company");

      if (phoneValid && companyValid) {
        setFormStage(2);
      }
    }
  };

  return (
    <>
      <div className="relative bg-primary/5 py-16 lg:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Animated blobs */}
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/10 mix-blend-multiply blur-3xl animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full bg-primary/5 mix-blend-multiply blur-3xl animate-[float_25s_ease-in-out_infinite_reverse]" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-float">
              <span>תמיד זמינים עבורכם</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70 animate-gradient">צור קשר</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              רוצה לשמוע עוד על פתרונות האוטומציה שלנו? בחר את הדרך הנוחה לך ליצירת קשר
            </p>
          </div>
        </div>
      </div>

      <div className="container -mt-16 relative z-10">
        {/* Social media cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className={`h-full hover:scale-105 transition-all duration-300 border border-primary/5 hover:border-primary/20 ${social.color}`}>
                <CardContent className="p-6 text-center">
                  <social.icon className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{social.name}</h3>
                  <p className="text-sm text-muted-foreground">{social.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <Card className="bg-card/50 backdrop-blur border border-primary/5 overflow-hidden relative">
            {/* Card background elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 mix-blend-multiply blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 mix-blend-multiply blur-3xl" />

            <CardContent className="p-8 lg:p-12 relative">
              {/* Contact details section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {contactDetails.map((detail) => (
                  <div key={detail.title} className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="rounded-full w-14 h-14 mx-auto mb-4 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <detail.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{detail.title}</h3>
                    {detail.details.map((text, i) => (
                      <p key={i} className="text-muted-foreground">{text}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Contact form with multi-step animation */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                  className="space-y-6"
                >
                  {/* Progress steps indicator */}
                  <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
                    {[0, 1, 2].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                            ${formStage >= step 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'}`}
                        >
                          {formStage > step ? <Check className="w-5 h-5" /> : step + 1}
                        </div>
                        {step < 2 && (
                          <div className={`h-1 w-28 mt-4 transition-all duration-500 ${formStage > step ? 'bg-primary' : 'bg-muted'}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Form stage 1: Name and Email */}
                  <div className={`transition-all duration-500 transform space-y-6 ${formStage === 0 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary">שם מלא</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="ישראל ישראלי" 
                                className="border-primary/20 focus:border-primary/50"
                                {...field} 
                              />
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
                            <FormLabel className="text-primary">אימייל</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="israel@example.com"
                                className="border-primary/20 focus:border-primary/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        onClick={nextStage}
                        className="gap-2 group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          המשך
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                      </Button>
                    </div>
                  </div>

                  {/* Form stage 2: Phone and Company */}
                  <div className={`transition-all duration-500 transform space-y-6 ${formStage === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary">טלפון</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="050-1234567" 
                                className="border-primary/20 focus:border-primary/50"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary">חברה</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="שם החברה" 
                                className="border-primary/20 focus:border-primary/50"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setFormStage(0)}
                        className="border-primary/20 hover:bg-primary/5"
                      >
                        חזרה
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStage}
                        className="gap-2 group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          המשך
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                      </Button>
                    </div>
                  </div>

                  {/* Form stage 3: Message and Submit */}
                  <div className={`transition-all duration-500 transform space-y-6 ${formStage === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary">הודעה</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="איך נוכל לעזור לך?"
                              className="min-h-[150px] border-primary/20 focus:border-primary/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setFormStage(1)}
                        className="border-primary/20 hover:bg-primary/5"
                      >
                        חזרה
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="relative overflow-hidden group"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary transform transition-transform"></span>
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
                        <span className="relative z-10 px-6">
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              שולח...
                            </span>
                          ) : "שליחה"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Global animations for the page */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </>
  );
}