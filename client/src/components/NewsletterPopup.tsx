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

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>הירשמו לניוזלטר וקבלו 5% הנחה!</DialogTitle>
          <DialogDescription>
            הצטרפו לקהילת ה-AI שלנו וקבלו עדכונים שבועיים על חידושים, טיפים והנחות מיוחדות.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              mutation.mutate(data);
              localStorage.setItem("hasSeenNewsletterPopup", "true");
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="האימייל שלך"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "שולח..." : "קבל 5% הנחה"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
