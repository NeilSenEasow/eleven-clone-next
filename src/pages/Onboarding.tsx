import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';
import ThemeSelectionStep from '@/components/onboarding/ThemeSelectionStep';
import PersonalizationStep from '@/components/onboarding/PersonalizationStep';
import HowDidYouHearStep from '@/components/onboarding/HowDidYouHearStep';
import UserPersonaStep from '@/components/onboarding/UserPersonaStep';
import PricingStep from '@/components/onboarding/PricingStep';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    theme: '',
    name: '',
    email: '',
    age: '',
    hearAbout: '',
    persona: '',
    selectedPlan: ''
  });
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (data.theme) {
      setTheme(data.theme as 'light' | 'dark');
    }
  };

  const steps = [
    <ThemeSelectionStep 
      key="theme" 
      onNext={handleNext} 
      onUpdate={updateFormData}
      selectedTheme={formData.theme}
    />,
    <PersonalizationStep 
      key="personalization" 
      onNext={handleNext} 
      onBack={handleBack}
      onUpdate={updateFormData}
      formData={formData}
    />,
    <HowDidYouHearStep 
      key="hearabout" 
      onNext={handleNext} 
      onBack={handleBack}
      onUpdate={updateFormData}
      selected={formData.hearAbout}
    />,
    <UserPersonaStep 
      key="persona" 
      onNext={handleNext} 
      onBack={handleBack}
      onUpdate={updateFormData}
      selected={formData.persona}
    />,
    <PricingStep 
      key="pricing" 
      onNext={handleNext} 
      onBack={handleBack}
      onUpdate={updateFormData}
      selectedPlan={formData.selectedPlan}
    />
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Progress indicators */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-primary' 
                    : index < currentStep 
                    ? 'bg-primary/60' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current step */}
        <div className="flex justify-center">
          {steps[currentStep]}
        </div>
      </div>
    </div>
  );
}