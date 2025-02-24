import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Building2, Mail, MessageSquare, Phone } from "lucide-react";
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

export default function Contact() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(
      insertLeadSchema.extend({
        name: insertLeadSchema.shape.name,
        email: insertLeadSchema.shape.email,
        phone: insertLeadSchema.shape.phone.optional(),
        company: insertLeadSchema.shape.company.optional(),
        message: insertLeadSchema.shape.message,
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      message: string;
    }) => {
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
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">צור קשר</h1>
          <p className="text-xl text-muted-foreground">
            רוצה לשמוע עוד על פתרונות האוטומציה שלנו? השאר פרטים ונחזור אליך בהקדם
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-primary">
                <Phone className="h-5 w-5" />
                <h3 className="font-semibold">טלפון</h3>
              </div>
              <p className="mt-2 text-muted-foreground">03-1234567</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-primary">
                <Mail className="h-5 w-5" />
                <h3 className="font-semibold">אימייל</h3>
              </div>
              <p className="mt-2 text-muted-foreground">contact@ai-automation.co.il</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-primary">
                <Building2 className="h-5 w-5" />
                <h3 className="font-semibold">כתובת</h3>
              </div>
              <p className="mt-2 text-muted-foreground">רחוב הברזל 30, תל אביב</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
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

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={mutation.isPending}
                    className="min-w-[200px]"
                  >
                    {mutation.isPending ? "שולח..." : "שלח"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
