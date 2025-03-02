import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { motion } from 'framer-motion';

export default function WelcomeModal() {
  const { showWelcomeModal, dismissWelcomeModal, startOnboarding, hasSeenOnboarding } = useOnboardingStore();

  return (
    <Dialog open={showWelcomeModal} onOpenChange={(open) => !open && dismissWelcomeModal()}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">ברוכים הבאים ל-Agent Flow!</DialogTitle>
          <DialogDescription className="text-center pt-2">
            אנו שמחים לראות אותך כאן
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <p className="text-center">
              Agent Flow הוא פלטפורמה מתקדמת לאוטומציה עסקית המבוססת על בינה מלאכותית.
              אנו מציעים פתרונות מותאמים אישית לעסקים בכל הגדלים.
            </p>
            
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <h3 className="font-semibold mb-2">מה אנחנו מציעים:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary ml-2"></span>
                  צ'אטבוטים חכמים לשירות לקוחות
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary ml-2"></span>
                  אוטומציה של תהליכים עסקיים
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary ml-2"></span>
                  אנליטיקה ותובנות מתקדמות
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary ml-2"></span>
                  פתרונות מותאמים אישית
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        <DialogFooter className="sm:justify-center flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={dismissWelcomeModal}
            className="sm:ml-2"
          >
            אולי מאוחר יותר
          </Button>
          
          <Button 
            onClick={() => {
              dismissWelcomeModal();
              startOnboarding();
            }}
            className="sm:mr-2"
          >
            {hasSeenOnboarding ? 'התחל סיור מחדש' : 'התחל סיור מודרך'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}