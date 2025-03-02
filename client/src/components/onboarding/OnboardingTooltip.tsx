import { useRef, useEffect } from 'react';
import { useFloating, arrow, offset, shift, flip, useInteractions, useClick, useRole, useDismiss, FloatingArrow } from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OnboardingStep, useOnboardingStore } from '@/store/useOnboardingStore';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface OnboardingTooltipProps {
  step: OnboardingStep;
}

export default function OnboardingTooltip({ step }: OnboardingTooltipProps) {
  const arrowRef = useRef(null);
  const { currentStepIndex, steps, nextStep, prevStep, skipStep, completeStep, endOnboarding } = useOnboardingStore();
  
  // Get the target element
  const target = document.querySelector(step.targetElement);
  
  // Set up floating-ui
  const { refs, floatingStyles, context } = useFloating({
    open: true,
    elements: {
      reference: target ?? null,
    },
    middleware: [
      offset(12),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
      arrow({ element: arrowRef }),
    ],
    placement: step.position ?? 'bottom',
  });
  
  // Set up interactions
  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss
  ]);

  // Add a highlight effect to the target element
  useEffect(() => {
    if (!target) return;
    
    // Add a class to highlight the element
    target.classList.add('onboarding-highlight');
    
    // Clean up when unmounting
    return () => {
      target.classList.remove('onboarding-highlight');
    };
  }, [target]);

  // Handle keyboard navigation - Since we're in RTL mode, navigation is reversed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        endOnboarding();
      } else if (e.key === 'ArrowRight') {
        // In RTL, Right arrow navigates to previous
        prevStep();
      } else if (e.key === 'ArrowLeft') {
        // In RTL, Left arrow navigates to next
        nextStep();
      } else if (e.key === 'Enter' || e.key === ' ') {
        // Complete current step on Enter or Space
        completeStep(step.id);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [endOnboarding, nextStep, prevStep, completeStep, step.id]);

  // Calculate progress
  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  
  return (
    <AnimatePresence>
      <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} dir="rtl">
        <motion.div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs z-50 border border-primary/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <FloatingArrow ref={arrowRef} context={context} fill="white" stroke="#e2e8f0" strokeWidth={1} />
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{step.title}</h3>
            <Button variant="ghost" size="icon" onClick={() => endOnboarding()} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between">
            <div className="space-x-2 rtl:space-x-reverse">
              {currentStepIndex > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  className="rtl:flex-row-reverse"
                >
                  <ChevronRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0" />
                  הקודם
                </Button>
              )}
              
              {!step.isRequired && (
                <Button variant="ghost" size="sm" onClick={skipStep}>
                  דלג
                </Button>
              )}
            </div>
            
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => completeStep(step.id)}
              className="rtl:flex-row-reverse"
            >
              {currentStepIndex < steps.length - 1 ? 'הבא' : 'סיים'}
              {currentStepIndex < steps.length - 1 && (
                <ChevronLeft className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}