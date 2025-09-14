import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Mic, 
  Edit, 
  Users, 
  Briefcase, 
  Newspaper, 
  Linkedin, 
  Instagram, 
  Music,
  Facebook,
  Twitter,
  Youtube,
  Globe,
  HelpCircle,
  MoreHorizontal
} from 'lucide-react';

interface HowDidYouHearStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  onUpdate: (data: { hearAbout: string }) => void;
  selected: string;
  isTransitioning?: boolean;
  selectedOption?: string | null;
  onOptionSelect?: (option: string) => void;
}

const options = [
  { id: 'podcast', label: 'Podcast', icon: Mic },
  { id: 'newsletter', label: 'Newsletter or Blog', icon: Edit },
  { id: 'friends', label: 'Friends or School', icon: Users },
  { id: 'work', label: 'From work', icon: Briefcase },
  { id: 'news', label: 'In the news', icon: Newspaper },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'tiktok', label: 'TikTok', icon: Music },
  { id: 'facebook', label: 'Facebook', icon: Facebook },
  { id: 'twitter', label: 'X', icon: Twitter },
  { id: 'google', label: 'Google', icon: Globe },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'dont-remember', label: "Don't remember", icon: HelpCircle },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

export default function HowDidYouHearStep({ 
  onNext, 
  onBack, 
  onUpdate, 
  selected, 
  isTransitioning = false, 
  selectedOption: propSelectedOption, 
  onOptionSelect 
}: HowDidYouHearStepProps) {
  const [selectedOption, setSelectedOption] = useState(selected);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onUpdate({ hearAbout: option });
    onOptionSelect?.(option);
    onNext({ referralSource: option });
  };

  const handleNext = () => {
    if (selectedOption) {
      onNext({ referralSource: selectedOption });
    }
  };

  const handleSkip = () => {
    onUpdate({ hearAbout: 'skipped' });
    onNext({ referralSource: 'skipped' });
  };

  return (
    <div className="text-center space-y-8 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground">How did you hear about ElevenLabs?</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((option) => {
          const IconComponent = option.icon;
          const isSelected = propSelectedOption === option.id || selectedOption === option.id;
          const shouldFadeOut = isTransitioning && propSelectedOption && propSelectedOption !== option.id;
          
          return (
            <Card
              key={option.id}
              className={`p-4 cursor-pointer transition-all duration-500 ${
                shouldFadeOut 
                  ? 'opacity-20 scale-95 pointer-events-none' 
                  : isSelected
                  ? 'ring-2 ring-primary bg-primary/10 scale-105'
                  : 'hover:bg-accent hover:scale-105'
              }`}
              onClick={() => handleSelect(option.id)}
            >
              <div className="flex flex-col items-center space-y-2">
                <IconComponent className="h-6 w-6 text-foreground" />
                <span className="text-sm font-medium text-foreground text-center">
                  {option.label}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <div className="space-x-4">
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!selectedOption}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}