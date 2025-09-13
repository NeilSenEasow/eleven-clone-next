import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

interface PricingPlanStepProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
}

const PricingPlanStep: React.FC<PricingPlanStepProps> = ({ data, onDataChange }) => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Star,
      features: [
        '10,000 characters per month',
        '3 voice options',
        'Standard quality',
        'Community support'
      ],
      limitations: ['Limited characters', 'Basic voices only'],
      popular: false
    },
    {
      id: 'creator',
      name: 'Creator',
      price: '$5',
      period: 'per month',
      description: 'For content creators',
      icon: Zap,
      features: [
        '30,000 characters per month',
        '10+ voice options',
        'High quality audio',
        'Priority support',
        'Commercial use rights'
      ],
      limitations: [],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$22',
      period: 'per month',
      description: 'For professionals',
      icon: Crown,
      features: [
        '100,000 characters per month',
        'All voice options',
        'Premium quality',
        '24/7 support',
        'Voice cloning',
        'API access',
        'Team collaboration'
      ],
      limitations: [],
      popular: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${
                data.pricingPlan === plan.id
                  ? 'ring-2 ring-purple-500 bg-purple-50'
                  : 'hover:bg-white/10'
              } ${plan.popular ? 'border-purple-500' : ''}`}
              onClick={() => onDataChange({ pricingPlan: plan.id })}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <div className="text-xs text-gray-500 mb-4">
                    <p className="font-medium mb-1">Limitations:</p>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button
                  className={`w-full ${
                    data.pricingPlan === plan.id
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                  variant={data.pricingPlan === plan.id ? 'default' : 'outline'}
                >
                  {data.pricingPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-white/70">
        <p>You can upgrade or downgrade your plan at any time</p>
        <p className="mt-1">All plans include a 14-day free trial</p>
      </div>
    </div>
  );
};

export default PricingPlanStep;
