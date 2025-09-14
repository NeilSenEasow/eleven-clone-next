import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface PricingStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  onUpdate: (data: { selectedPlan: string }) => void;
  selectedPlan: string;
  isTransitioning?: boolean;
  selectedOption?: string | null;
  onOptionSelect?: (option: string) => void;
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 415, // ₹5 converted to rupees
    yearlyPrice: 3320, // ₹5 * 12 * 0.8 (20% discount)
    description: 'For hobbyists creating projects with AI audio',
    features: [
      '30k credits/month',
      'License for commercial use',
      'Instant Voice Cloning'
    ],
    popular: false
  },
  {
    id: 'creator',
    name: 'Creator',
    monthlyPrice: 915, // ₹11 converted to rupees  
    yearlyPrice: 7320, // ₹11 * 12 * 0.8 (20% discount)
    originalPrice: 1830, // ₹22 converted to rupees
    description: 'For creators making premium content for global audiences',
    features: [
      '100k credits/month',
      'License for commercial use', 
      'Instant Voice Cloning',
      'Professional Voice Cloning'
    ],
    popular: true,
    discount: 'First month 50% off'
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 8235, // ₹99 converted to rupees
    yearlyPrice: 65880, // ₹99 * 12 * 0.8 (20% discount)
    description: 'For creators ramping up their content production',
    features: [
      '500k credits/month',
      'License for commercial use',
      'Everything in Creator',
      '441 kHz PCM audio via API'
    ],
    popular: false
  }
];

export default function PricingStep({ 
  onNext, 
  onBack, 
  onUpdate, 
  selectedPlan, 
  isTransitioning = false, 
  selectedOption, 
  onOptionSelect 
}: PricingStepProps) {
  const [selected, setSelected] = useState(selectedPlan);
  const [isYearly, setIsYearly] = useState(false);

  const handleSelect = (planId: string) => {
    setSelected(planId);
    onUpdate({ selectedPlan: planId });
    onOptionSelect?.(planId);
    onNext({ pricingPlan: planId });
  };

  const handleComplete = () => {
    onNext({ pricingPlan: selected });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="text-center space-y-8 w-full max-w-6xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Do more with ElevenLabs</h1>
        <p className="text-muted-foreground">Select a plan based on your needs</p>
        
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly billing
          </span>
          <Switch 
            checked={isYearly} 
            onCheckedChange={setIsYearly}
          />
          <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual billing
          </span>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            2 months free
          </Badge>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isSelected = selectedOption === plan.id || selected === plan.id;
          const shouldFadeOut = isTransitioning && selectedOption && selectedOption !== plan.id;
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          const period = isYearly ? '/year' : '/month';
          
          return (
            <Card
              key={plan.id}
              className={`p-6 cursor-pointer transition-all duration-500 relative ${
                shouldFadeOut 
                  ? 'opacity-20 scale-95 pointer-events-none' 
                  : isSelected 
                  ? 'ring-2 ring-primary scale-105' 
                  : 'hover:scale-105'
              } ${plan.popular ? 'border-primary' : ''}`}
              onClick={() => handleSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {plan.discount && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {plan.discount}
                  </Badge>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  <div className="flex items-baseline justify-center space-x-2">
                    {plan.originalPrice && !isYearly && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(plan.originalPrice)}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-foreground">
                      {formatPrice(price)}
                    </span>
                    <span className="text-muted-foreground">{period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleSelect(plan.id)}
                >
                  {isSelected ? 'Selected Plan' : 'Select plan'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={handleComplete}
          disabled={!selected}
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
}