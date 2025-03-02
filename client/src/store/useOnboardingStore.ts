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
    description: 'אנחנו שמחים שהצטרפת אלינו! בואו נעשה סיור קצר כדי להכיר את המערכת שלנו.',
    targetElement: 'body',
    position: 'bottom',
    category: 'welcome',
    isRequired: true,
    order: 0,
  },
  {
    id: 'navigation',
    title: 'ניווט באתר',
    description: 'השתמש בתפריט הניווט כדי לגשת לכל החלקים של האתר שלנו בקלות.',
    targetElement: 'nav',
    position: 'bottom',
    category: 'navigation',
    isRequired: true,
    order: 1,
  },
  {
    id: 'services-menu',
    title: 'השירותים שלנו',
    description: 'גלה את כל הפתרונות האוטומטיים החכמים שאנחנו מציעים לעסק שלך.',
    targetElement: 'a[href="/services"]',
    position: 'bottom',
    category: 'navigation',
    isRequired: true,
    order: 2,
  },
  {
    id: 'services-section',
    title: 'פתרונות אוטומציה',
    description: 'כאן תמצא את שירותי האוטומציה המתקדמים שלנו המותאמים במיוחד לעסקים כמו שלך.',
    targetElement: '.services-grid',
    position: 'top',
    category: 'features',
    isRequired: true,
    order: 3,
  },
  {
    id: 'chatbot',
    title: 'צ\'אטבוט חכם',
    description: 'הצ\'אטבוט שלנו נעזר בבינה מלאכותית כדי לענות על שאלות ולעזור לך למצוא את המידע שאתה מחפש.',
    targetElement: '.chatbot-wrapper',
    position: 'left',
    category: 'features',
    isRequired: true,
    order: 4,
  },
  {
    id: 'contact-button',
    title: 'צור קשר',
    description: 'צריך עזרה או מידע נוסף? אל תהסס ליצור איתנו קשר באמצעות כפתור זה.',
    targetElement: 'a[href="/contact"] button',
    position: 'bottom',
    category: 'support',
    isRequired: false,
    order: 5,
  },
  {
    id: 'newsletter',
    title: 'הרשמה לניוזלטר',
    description: 'הישאר מעודכן בחידושים האחרונים וקבל מידע מקצועי ישירות לתיבת המייל שלך.',
    targetElement: '.newsletter-form',
    position: 'top',
    category: 'engagement',
    isRequired: false,
    order: 6,
  },
  {
    id: 'profile-customization',
    title: 'התאמה אישית',
    description: 'ספר לנו קצת על העסק שלך כדי שנוכל להתאים את החוויה שלך באופן מושלם לצרכים שלך.',
    targetElement: '.profile-customization',
    position: 'bottom',
    category: 'personalization',
    isRequired: true,
    order: 7,
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