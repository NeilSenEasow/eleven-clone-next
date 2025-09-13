import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import step components
import ThemeSelectionStep from './ThemeSelectionStep';
import PersonalDetailsStep from './PersonalDetailsStep';
import ReferralSourceStep from './ReferralSourceStep';
import UserPersonaStep from './UserPersonaStep';
import PricingPlanStep from './PricingPlanStep';

export interface OnboardingData {
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

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
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

  const steps = [
    { id: 'theme', title: 'Theme Selection', component: ThemeSelectionStep },
    { id: 'personal', title: 'Personal Details', component: PersonalDetailsStep },
    { id: 'referral', title: 'How did you hear about us?', component: ReferralSourceStep },
    { id: 'persona', title: 'User Persona', component: UserPersonaStep },
    { id: 'pricing', title: 'Pricing Plan', component: PricingPlanStep }
  ];

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit onboarding data');
      }

      toast({
        title: "Welcome!",
        description: "Your onboarding has been completed successfully.",
      });

      // Reset form or redirect
      setCurrentStep(0);
      setOnboardingData({
        theme: 'dark',
        personalDetails: { name: '', age: 0, email: '' },
        referralSource: '',
        persona: '',
        pricingPlan: ''
      });

    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      toast({
        title: "Error",
        description: "Failed to submit your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-white/70">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-white/50'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription className="text-white/70">
              {currentStep === 0 && "Choose your preferred theme"}
              {currentStep === 1 && "Tell us a bit about yourself"}
              {currentStep === 2 && "Help us understand how you found us"}
              {currentStep === 3 && "Select your user type"}
              {currentStep === 4 && "Choose the plan that works for you"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              data={onboardingData}
              onDataChange={handleStepData}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Setup'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
