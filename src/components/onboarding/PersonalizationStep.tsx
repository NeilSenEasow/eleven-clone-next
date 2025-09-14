import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalizationStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  onUpdate: (data: { name?: string; email?: string; age?: string }) => void;
  formData: { name: string; email: string; age: string };
  isTransitioning?: boolean;
}

export default function PersonalizationStep({ onNext, onBack, onUpdate, formData, isTransitioning }: PersonalizationStepProps) {
  const [name, setName] = useState(formData.name);
  const [email, setEmail] = useState(formData.email);
  const [age, setAge] = useState(formData.age);

  const handleNext = () => {
    onUpdate({ name, email, age });
    onNext({ personalDetails: { name, email, age: parseInt(age) || 25 } });
  };

  // Auto-submit when all fields are valid and user stops typing
  const handleFieldChange = (field: string, value: string) => {
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'age') setAge(value);

    // Update the parent form data immediately
    onUpdate({ [field]: value });

    // Check if all fields are valid after a short delay
    setTimeout(() => {
      const currentName = field === 'name' ? value : name;
      const currentEmail = field === 'email' ? value : email;
      const currentAge = field === 'age' ? value : age;
      
      if (currentName.trim() && currentEmail.trim() && currentAge && 
          currentEmail.includes('@')) {
        // Convert age range to numeric value for backend
        const ageNumeric = getAgeFromRange(currentAge);
        onUpdate({ name: currentName, email: currentEmail, age: currentAge });
        onNext({ personalDetails: { name: currentName, email: currentEmail, age: ageNumeric } });
      }
    }, 1500); // Wait 1.5 seconds after user stops typing
  };

  const getAgeFromRange = (ageRange: string): number => {
    switch (ageRange) {
      case '18-25': return 22;
      case '26-35': return 30;
      case '36-45': return 40;
      case '46-55': return 50;
      case '55+': return 60;
      default: return 25;
    }
  };

  const isValid = name.trim() && email.trim() && age;

  return (
    <div className="text-center space-y-8 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-foreground">Help us personalize your experience</h1>
      
      <div className="space-y-6">
        <div className="space-y-2 text-left">
          <Label htmlFor="name" className="text-foreground">What's your name?</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2 text-left">
          <Label htmlFor="email" className="text-foreground">What's your email?</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2 text-left">
          <Label htmlFor="age" className="text-foreground">What's your age range?</Label>
          <Select value={age} onValueChange={(value) => handleFieldChange('age', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="18-25">18-25</SelectItem>
              <SelectItem value="26-35">26-35</SelectItem>
              <SelectItem value="36-45">36-45</SelectItem>
              <SelectItem value="46-55">46-55</SelectItem>
              <SelectItem value="55+">55+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!isValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
}