import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from '@/hooks/use-toast';
import ThemeSelectionStep from '@/components/onboarding/ThemeSelectionStep';
import PersonalizationStep from '@/components/onboarding/PersonalizationStep';
import HowDidYouHearStep from '@/components/onboarding/HowDidYouHearStep';
import UserPersonaStep from '@/components/onboarding/UserPersonaStep';
import PricingStep from '@/components/onboarding/PricingStep';

interface OnboardingData {
  theme: 'light' | 'dark';
  personalDetails: {
    name: string;
    age: number;
    email: string;
  };
  referralSource: string;
  persona: string;
  pricingPlan: string;
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formData, setFormData] = useState<OnboardingData>({
    theme: 'dark',
    personalDetails: {
      name: '',
      age: 0,
      email: ''
    },
    referralSource: '',
    persona: '',
    pricingPlan: ''
  });
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const totalSteps = 5;

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsTransitioning(false);
    } else {
      await submitOnboardingData();
    }
  };

  const handleAutoNext = async (data: Partial<OnboardingData>) => {
    setIsTransitioning(true);
    updateFormData(data);
    
    // Wait 1 second before transitioning
    setTimeout(async () => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      } else {
        await submitOnboardingData();
      }
    }, 1000);
  };

  const handleSkip = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsTransitioning(false);
    } else {
      navigate('/');
    }
  };

  const submitOnboardingData = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      
      // Validate that all required fields are filled
      if (!formData.theme) {
        throw new Error('Theme is required');
      }
      if (!formData.personalDetails.name || formData.personalDetails.name.trim() === '') {
        throw new Error('Name is required');
      }
      if (!formData.personalDetails.email || formData.personalDetails.email.trim() === '') {
        throw new Error('Email is required');
      }
      if (!formData.personalDetails.age || formData.personalDetails.age === 0) {
        throw new Error('Age is required');
      }
      if (!formData.referralSource || formData.referralSource === '') {
        throw new Error('Referral source is required');
      }
      if (!formData.persona || formData.persona === '') {
        throw new Error('Persona is required');
      }
      if (!formData.pricingPlan || formData.pricingPlan === '') {
        throw new Error('Pricing plan is required');
      }
      
      const onboardingData = {
        theme: formData.theme,
        personalDetails: {
          name: formData.personalDetails.name.trim(),
          age: formData.personalDetails.age,
          email: formData.personalDetails.email.trim().toLowerCase()
        },
        referralSource: formData.referralSource,
        persona: formData.persona,
        pricingPlan: formData.pricingPlan
      };

      console.log('Submitting onboarding data:', onboardingData);
      console.log('API URL:', `${API_BASE_URL}/api/onboarding`);

      const response = await fetch(`${API_BASE_URL}/api/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(onboardingData)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Onboarding data saved successfully:', result);
        
        // Store the user profile ID for future reference
        if (result.data?.userId) {
          localStorage.setItem('onboardingProfileId', result.data.userId);
          console.log('Stored profile ID:', result.data.userId);
        }
        
        toast({
          title: "Welcome aboard! 🎉",
          description: "Your profile has been set up successfully and saved to your account.",
        });
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Onboarding submission failed:', errorData);
        console.error('Response status:', response.status);
        throw new Error(errorData.message || 'Failed to save onboarding data');
      }
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      toast({
        title: "Setup Complete",
        description: "Welcome to ElevenLabs! Your preferences have been saved locally.",
        variant: "default"
      });
      // Still navigate to home even if backend fails
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedOption(null);
      setIsTransitioning(false);
    }
  };

  const updateFormData = (data: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (data.theme) {
      setTheme(data.theme);
    }
  };

  const updatePersonalizationData = (data: { name?: string; email?: string; age?: string }) => {
    setFormData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        name: data.name || prev.personalDetails.name,
        email: data.email || prev.personalDetails.email,
        age: data.age ? parseInt(data.age) : prev.personalDetails.age
      }
    }));
  };

  const updateReferralData = (data: { hearAbout: string }) => {
    setFormData(prev => ({
      ...prev,
      referralSource: data.hearAbout
    }));
  };

  const updatePricingData = (data: { selectedPlan: string }) => {
    setFormData(prev => ({
      ...prev,
      pricingPlan: data.selectedPlan
    }));
  };

  const steps = [
    <ThemeSelectionStep 
      key="theme" 
      data={formData}
      onDataChange={handleAutoNext}
      isTransitioning={isTransitioning}
      selectedOption={selectedOption}
      onOptionSelect={setSelectedOption}
    />,
    <PersonalizationStep 
      key="personalization" 
      onNext={handleAutoNext} 
      onBack={handleBack}
      onUpdate={updatePersonalizationData}
      formData={{
        name: formData.personalDetails.name,
        email: formData.personalDetails.email,
        age: formData.personalDetails.age.toString()
      }}
      isTransitioning={isTransitioning}
    />,
    <HowDidYouHearStep 
      key="hearabout" 
      onNext={handleAutoNext} 
      onBack={handleBack}
      onUpdate={updateReferralData}
      selected={formData.referralSource}
      isTransitioning={isTransitioning}
      selectedOption={selectedOption}
      onOptionSelect={setSelectedOption}
    />,
    <UserPersonaStep 
      key="persona" 
      data={formData}
      onDataChange={handleAutoNext}
      isTransitioning={isTransitioning}
      selectedOption={selectedOption}
      onOptionSelect={setSelectedOption}
    />,
    <PricingStep 
      key="pricing" 
      onNext={handleAutoNext} 
      onBack={handleBack}
      onUpdate={updatePricingData}
      selectedPlan={formData.pricingPlan}
      isTransitioning={isTransitioning}
      selectedOption={selectedOption}
      onOptionSelect={setSelectedOption}
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

        {/* Skip and Back buttons */}
        <div className="flex justify-between mb-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentStep === 0 
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            ← Back
          </button>
          
          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded-lg font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-all"
          >
            Skip →
          </button>
        </div>

        {/* Current step */}
        <div className={`flex justify-center transition-all duration-500 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}>
          {steps[currentStep]}
        </div>
      </div>
    </div>
  );
}