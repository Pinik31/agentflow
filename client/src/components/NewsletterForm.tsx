import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

export default function NewsletterForm() {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const form = useForm({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      await apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "תודה על ההרשמה!",
        description: "נשלח לך עדכונים על תוכן חדש.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהרשמה לניוזלטר. נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="flex gap-2 relative"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormControl>
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    type="email"
                    placeholder="כתובת אימייל"
                    className="pr-10 transition-all duration-300 border-primary/20 focus:border-primary/50 backdrop-blur-sm"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="relative overflow-hidden group transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary opacity-80 group-hover:opacity-100 transition-opacity"></span>
          <span className={`relative z-10 flex items-center gap-2 transition-all duration-500 ${isHovered ? 'gap-3' : 'gap-2'}`}>
            <span>הרשמה</span>
            <Send className={`w-4 h-4 transition-transform duration-500 ${isHovered ? 'translate-x-1' : ''}`} />
          </span>
        </Button>
      </form>
    </Form>
  );
}