import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingData } from './OnboardingFlow';

interface PersonalDetailsStepProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({ data, onDataChange }) => {
  const handleInputChange = (field: keyof typeof data.personalDetails, value: string | number) => {
    onDataChange({
      personalDetails: {
        ...data.personalDetails,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={data.personalDetails.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={data.personalDetails.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          value={data.personalDetails.age || ''}
          onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
          min="13"
          max="120"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div className="text-sm text-white/70">
        <p>We'll use this information to personalize your experience and send you important updates.</p>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
