import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, X } from "lucide-react";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const { toast } = useToast();

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
        description: "קוד ההנחה של 5% נשלח לאימייל שלך.",
      });
      setOpen(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("hasSeenNewsletterPopup");
      if (!hasSeenPopup) {
        setOpen(true);
        setTimeout(() => setAnimateIn(true), 100);
      }
    }, 30000); // Show after 30 seconds

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasSeenPopup = localStorage.getItem("hasSeenNewsletterPopup");
      if (!hasSeenPopup) {
        setOpen(true);
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setAnimateIn(false);
      // Add a small delay before actually closing the dialog to allow for the animation
      setTimeout(() => setOpen(false), 300);
    } else {
      setOpen(true);
      setTimeout(() => setAnimateIn(true), 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={`sm:max-w-md relative transition-all duration-300 transform ${animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary/30 blur-xl animate-pulse" />
        <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleOpenChange(false)}
            className="h-8 w-8 rounded-full hover:bg-primary/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl">הירשמו לניוזלטר וקבלו 5% הנחה!</DialogTitle>
          <DialogDescription className="text-base max-w-sm mx-auto">
            הצטרפו לקהילת ה-AI שלנו וקבלו עדכונים שבועיים על חידושים, טיפים והנחות מיוחדות.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              mutation.mutate(data);
              localStorage.setItem("hasSeenNewsletterPopup", "true");
            })}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                        <Mail className="h-5 w-5" />
                      </div>
                      <Input
                        type="email"
                        placeholder="האימייל שלך"
                        className="pr-10 transition-all duration-300 border-primary/20 focus:border-primary/50"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full relative overflow-hidden group"
              disabled={mutation.isPending}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary w-full h-full transform transition-transform"></span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {mutation.isPending ? "שולח..." : "קבל 5% הנחה"}
              </span>
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              בלחיצה על הרשמה, אתם מסכימים לקבל עדכונים מאיתנו.
              אנו מכבדים את פרטיותכם ולא נשתף את המידע שלכם.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}