import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  targetElement: string; // CSS selector for the element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right';
  category?: string;
  isRequired?: boolean;
  order: number;
};

export type UserPreference = {
  id: string;
  value: string | boolean | number;
  label: string;
  category: string;
};

export type OnboardingProfile = {
  businessSize: 'small' | 'medium' | 'large';
  industry: string;
  preferredFeatures: string[];
  goals: string[];
  completed: boolean;
};

type OnboardingState = {
  isActive: boolean;
  currentStepIndex: number;
  steps: OnboardingStep[];
  completedSteps: string[];
  userPreferences: UserPreference[];
  profile: OnboardingProfile | null;
  hasSeenOnboarding: boolean;
  showWelcomeModal: boolean;
};

type OnboardingActions = {
  startOnboarding: () => void;
  endOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipStep: () => void;
  goToStep: (index: number) => void;
  completeStep: (stepId: string) => void;
  setUserPreference: (preference: UserPreference) => void;
  setOnboardingProfile: (profile: Partial<OnboardingProfile>) => void;
  completeOnboarding: () => void;
  dismissWelcomeModal: () => void;
  showWelcomeModalAgain: () => void;
};

// Define the default onboarding steps
const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'ברוכים הבאים ל-Agent Flow',
    description: 'אנחנו שמחים שהצטרפת אלינו! בואו נעשה סיור קצר כדי להכיר את המערכת.',
    targetElement: 'body',
    position: 'bottom',
    category: 'welcome',
    isRequired: true,
    order: 0,
  },
  {
    id: 'services',
    title: 'שירותים',
    description: 'כאן תוכל לראות את כל השירותים שאנחנו מציעים. לחץ על כל שירות כדי לקבל מידע נוסף.',
    targetElement: '.services-section',
    position: 'bottom',
    category: 'navigation',
    isRequired: true,
    order: 1,
  },
  {
    id: 'chatbot',
    title: 'צ\'אטבוט חכם',
    description: 'הצ\'אטבוט שלנו יכול לענות על שאלות ולעזור לך למצוא את המידע שאתה מחפש.',
    targetElement: '.chatbot-trigger',
    position: 'top',
    category: 'features',
    isRequired: true,
    order: 2,
  },
  {
    id: 'contact',
    title: 'צור קשר',
    description: 'צריך עזרה? צור איתנו קשר בכל עת ונשמח לעזור.',
    targetElement: '.contact-section',
    position: 'top',
    category: 'support',
    isRequired: false,
    order: 3,
  },
  {
    id: 'profile',
    title: 'התאמה אישית',
    description: 'ספר לנו קצת על העסק שלך כדי שנוכל להתאים את החוויה עבורך.',
    targetElement: '.profile-section',
    position: 'bottom',
    category: 'personalization',
    isRequired: true,
    order: 4,
  }
];

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persist(
    (set, get) => ({
      isActive: false,
      currentStepIndex: 0,
      steps: defaultSteps,
      completedSteps: [],
      userPreferences: [],
      profile: null,
      hasSeenOnboarding: false,
      showWelcomeModal: true,
      
      startOnboarding: () => set({ isActive: true, currentStepIndex: 0 }),
      
      endOnboarding: () => set({ isActive: false }),
      
      nextStep: () => {
        const { currentStepIndex, steps } = get();
        if (currentStepIndex < steps.length - 1) {
          set({ currentStepIndex: currentStepIndex + 1 });
        } else {
          // If we're at the last step, end the onboarding
          set({ isActive: false, hasSeenOnboarding: true });
        }
      },
      
      prevStep: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1 });
        }
      },
      
      skipStep: () => {
        const { currentStepIndex, steps } = get();
        // If there are more steps, go to the next one
        if (currentStepIndex < steps.length - 1) {
          set({ currentStepIndex: currentStepIndex + 1 });
        } else {
          // If we're at the last step, end the onboarding
          set({ isActive: false, hasSeenOnboarding: true });
        }
      },
      
      goToStep: (index: number) => {
        const { steps } = get();
        if (index >= 0 && index < steps.length) {
          set({ currentStepIndex: index });
        }
      },
      
      completeStep: (stepId: string) => {
        const { completedSteps, currentStepIndex, steps } = get();
        
        // Only add it if it's not already in the completed steps
        if (!completedSteps.includes(stepId)) {
          set({ completedSteps: [...completedSteps, stepId] });
        }
        
        // Automatically move to the next step if there is one
        if (currentStepIndex < steps.length - 1) {
          set({ currentStepIndex: currentStepIndex + 1 });
        } else {
          // If we're at the last step, end the onboarding
          set({ isActive: false, hasSeenOnboarding: true });
        }
      },
      
      setUserPreference: (preference: UserPreference) => {
        const { userPreferences } = get();
        const existingIndex = userPreferences.findIndex(p => p.id === preference.id);
        
        if (existingIndex !== -1) {
          // Update existing preference
          const updatedPreferences = [...userPreferences];
          updatedPreferences[existingIndex] = preference;
          set({ userPreferences: updatedPreferences });
        } else {
          // Add new preference
          set({ userPreferences: [...userPreferences, preference] });
        }
      },
      
      setOnboardingProfile: (profile: Partial<OnboardingProfile>) => {
        const currentProfile = get().profile || {
          businessSize: 'small',
          industry: '',
          preferredFeatures: [],
          goals: [],
          completed: false
        };
        
        set({ profile: { ...currentProfile, ...profile } });
      },
      
      completeOnboarding: () => {
        const profile = get().profile;
        if (profile) {
          set({ 
            profile: { ...profile, completed: true },
            hasSeenOnboarding: true,
            isActive: false 
          });
        }
      },
      
      dismissWelcomeModal: () => set({ showWelcomeModal: false }),
      
      showWelcomeModalAgain: () => set({ showWelcomeModal: true }),
    }),
    {
      name: 'agent-flow-onboarding',
      // Only persist certain parts of the state
      partialize: (state) => ({
        completedSteps: state.completedSteps,
        userPreferences: state.userPreferences,
        profile: state.profile,
        hasSeenOnboarding: state.hasSeenOnboarding,
        showWelcomeModal: state.showWelcomeModal,
      }),
    }
  )
);