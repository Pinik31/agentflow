import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Building2, Mail, MessageSquare, Phone } from "lucide-react";
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

export default function Contact() {
  const { toast } = useToast();
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
      await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "תודה על פנייתך!",
        description: "נחזור אליך בהקדם האפשרי.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשליחת הטופס. נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <div className="relative bg-primary/5 py-16">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">צור קשר</h1>
            <p className="text-xl text-muted-foreground">
              רוצה לשמוע עוד על פתרונות האוטומציה שלנו? השאר פרטים ונחזור אליך בהקדם
            </p>
          </div>
        </div>
      </div>

      <div className="container -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className={`h-full hover:scale-105 transition-transform ${social.color}`}>
                <CardContent className="p-6 text-center">
                  <social.icon className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{social.name}</h3>
                  <p className="text-sm text-muted-foreground">{social.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                  className="space-y-6"
                >
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
                            <Input
                              type="email"
                              placeholder="israel@example.com"
                              {...field}
                            />
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
                            <Input placeholder="050-1234567" {...field} />
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
                          <FormLabel>חברה</FormLabel>
                          <FormControl>
                            <Input placeholder="שם החברה" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>הודעה</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="איך נוכל לעזור לך?"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={mutation.isPending}
                    className="w-full"
                  >
                    {mutation.isPending ? "שולח..." : "שליחה"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Phone className="h-5 w-5" />
                  <h3 className="font-semibold">טלפון</h3>
                </div>
                <p className="text-muted-foreground">03-1234567</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Mail className="h-5 w-5" />
                  <h3 className="font-semibold">אימייל</h3>
                </div>
                <p className="text-muted-foreground">contact@agentflow.co.il</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Building2 className="h-5 w-5" />
                  <h3 className="font-semibold">כתובת</h3>
                </div>
                <p className="text-muted-foreground">רחוב הברזל 30, תל אביב</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}