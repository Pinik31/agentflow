import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import OnboardingTooltip from './OnboardingTooltip';
import WelcomeModal from './WelcomeModal';
import { createPortal } from 'react-dom';
import ProfileSetup from './ProfileSetup';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function OnboardingProvider() {
  const { 
    isActive, 
    steps, 
    currentStepIndex, 
    showWelcomeModal, 
    hasSeenOnboarding
  } = useOnboardingStore();
  
  const [mounted, setMounted] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  
  // Current step being shown
  const currentStep = steps[currentStepIndex];
  
  // Handle mounting
  useEffect(() => {
    setMounted(true);
    
    // Auto-show welcome modal for first-time visitors
    if (!hasSeenOnboarding && !showWelcomeModal) {
      setTimeout(() => {
        useOnboardingStore.getState().showWelcomeModalAgain();
      }, 2000);
    }
    
    // Add global CSS for highlighted elements
    const style = document.createElement('style');
    style.innerHTML = `
      .onboarding-highlight {
        position: relative;
        z-index: 40;
        box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.3);
        border-radius: 4px;
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [hasSeenOnboarding, showWelcomeModal]);
  
  // Monitor when profile customization step is reached
  useEffect(() => {
    if (isActive && currentStep && currentStep.id === 'profile-customization') {
      setShowProfileSetup(true);
    }
  }, [isActive, currentStep]);
  
  // Highlight the target element of the current step
  useEffect(() => {
    if (isActive && currentStep && currentStep.targetElement && currentStep.targetElement !== 'body') {
      try {
        const targetElement = document.querySelector(currentStep.targetElement);
        if (targetElement) {
          // Add highlight class
          targetElement.classList.add('onboarding-highlight');
          
          // Scroll element into view if needed
          const rect = targetElement.getBoundingClientRect();
          const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
          
          if (!isInViewport) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } catch (error) {
        console.error('Error highlighting element:', error);
      }
      
      // Cleanup function to remove highlight
      return () => {
        try {
          const targetElement = document.querySelector(currentStep.targetElement);
          if (targetElement) {
            targetElement.classList.remove('onboarding-highlight');
          }
        } catch (error) {
          console.error('Error removing highlight:', error);
        }
      };
    }
  }, [isActive, currentStep]);
  
  // Render nothing on server
  if (!mounted) return null;
  
  return (
    <>
      {/* Welcome Modal */}
      <WelcomeModal />
      
      {/* Profile Setup Dialog */}
      <Dialog open={showProfileSetup} onOpenChange={setShowProfileSetup}>
        <DialogContent className="max-w-lg p-0">
          <ProfileSetup />
        </DialogContent>
      </Dialog>
      
      {/* Active Onboarding Step */}
      {isActive && currentStep && createPortal(
        <OnboardingTooltip step={currentStep} />,
        document.body
      )}
    </>
  );
}