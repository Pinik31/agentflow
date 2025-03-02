import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useOnboardingStore, OnboardingProfile } from '@/store/useOnboardingStore';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

const industries = [
  { value: 'tech', label: 'טכנולוגיה' },
  { value: 'retail', label: 'קמעונאות' },
  { value: 'healthcare', label: 'בריאות' },
  { value: 'education', label: 'חינוך' },
  { value: 'finance', label: 'פיננסים' },
  { value: 'manufacturing', label: 'תעשייה' },
  { value: 'services', label: 'שירותים' },
  { value: 'other', label: 'אחר' }
];

const features = [
  { id: 'chatbots', label: 'צ\'אטבוטים' },
  { id: 'automation', label: 'אוטומציה' },
  { id: 'analytics', label: 'אנליטיקה' },
  { id: 'integration', label: 'אינטגרציות' },
  { id: 'customization', label: 'התאמה אישית' }
];

const goals = [
  { id: 'increase_efficiency', label: 'העלאת יעילות' },
  { id: 'reduce_costs', label: 'הפחתת עלויות' },
  { id: 'improve_customer_experience', label: 'שיפור חווית לקוח' },
  { id: 'expand_business', label: 'הרחבת עסק' },
  { id: 'innovate', label: 'חדשנות וטכנולוגיה' }
];

export default function ProfileSetup() {
  const { setOnboardingProfile, completeOnboarding, profile } = useOnboardingStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<OnboardingProfile>>({
    businessSize: profile?.businessSize || 'small',
    industry: profile?.industry || '',
    preferredFeatures: profile?.preferredFeatures || [],
    goals: profile?.goals || [],
    completed: profile?.completed || false
  });
  
  const handleBusinessSizeChange = (value: string) => {
    setFormData({ ...formData, businessSize: value as 'small' | 'medium' | 'large' });
  };
  
  const handleIndustryChange = (value: string) => {
    setFormData({ ...formData, industry: value });
  };
  
  const handleFeatureToggle = (id: string) => {
    const features = [...(formData.preferredFeatures || [])];
    if (features.includes(id)) {
      setFormData({ 
        ...formData, 
        preferredFeatures: features.filter(f => f !== id) 
      });
    } else {
      setFormData({ 
        ...formData, 
        preferredFeatures: [...features, id] 
      });
    }
  };
  
  const handleGoalToggle = (id: string) => {
    const selectedGoals = [...(formData.goals || [])];
    if (selectedGoals.includes(id)) {
      setFormData({ 
        ...formData, 
        goals: selectedGoals.filter(g => g !== id) 
      });
    } else {
      setFormData({ 
        ...formData, 
        goals: [...selectedGoals, id] 
      });
    }
  };
  
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      saveProfile();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const saveProfile = () => {
    setOnboardingProfile(formData);
    completeOnboarding();
  };
  
  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center">פרופיל עסקי</h2>
      
      {/* Progress indicator */}
      <div className="flex justify-between mb-8">
        {[0, 1, 2, 3].map((step) => (
          <div 
            key={step} 
            className={`flex items-center justify-center rounded-full w-8 h-8 ${
              step === currentStep
                ? 'bg-primary text-white'
                : step < currentStep
                ? 'bg-primary/20 text-primary'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step < currentStep ? <Check className="w-4 h-4" /> : step + 1}
          </div>
        ))}
      </div>
      
      <motion.div
        key={currentStep}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="min-h-[300px]"
      >
        {currentStep === 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">גודל העסק שלך</h3>
            <RadioGroup 
              value={formData.businessSize} 
              onValueChange={handleBusinessSizeChange}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">עסק קטן (1-10 עובדים)</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">עסק בינוני (11-50 עובדים)</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">עסק גדול (50+ עובדים)</Label>
              </div>
            </RadioGroup>
          </div>
        )}
        
        {currentStep === 1 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">תחום העסק</h3>
            <RadioGroup 
              value={formData.industry} 
              onValueChange={handleIndustryChange}
              className="space-y-3"
            >
              {industries.map((industry) => (
                <div key={industry.value} className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value={industry.value} id={industry.value} />
                  <Label htmlFor={industry.value}>{industry.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        
        {currentStep === 2 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">תכונות מועדפות</h3>
            <p className="text-gray-500 mb-4">בחר את התכונות שמעניינות אותך (ניתן לבחור כמה)</p>
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id={feature.id} 
                    checked={(formData.preferredFeatures || []).includes(feature.id)}
                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                  />
                  <Label htmlFor={feature.id}>{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">מטרות עסקיות</h3>
            <p className="text-gray-500 mb-4">מה הן המטרות העיקריות שלך? (ניתן לבחור כמה)</p>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id={goal.id} 
                    checked={(formData.goals || []).includes(goal.id)}
                    onCheckedChange={() => handleGoalToggle(goal.id)}
                  />
                  <Label htmlFor={goal.id}>{goal.label}</Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={currentStep === 0}
          className="rtl:flex-row-reverse"
        >
          <ChevronRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0" />
          הקודם
        </Button>
        
        <Button 
          onClick={nextStep}
          className="rtl:flex-row-reverse"
        >
          {currentStep === 3 ? 'סיים' : 'הבא'}
          {currentStep < 3 && (
            <ChevronLeft className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
          )}
        </Button>
      </div>
    </div>
  );
}