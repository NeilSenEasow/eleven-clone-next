import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Headphones, Video, Music, BookOpen, Briefcase } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

interface UserPersonaStepProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
  isTransitioning?: boolean;
  selectedOption?: string | null;
  onOptionSelect?: (option: string) => void;
}

const UserPersonaStep: React.FC<UserPersonaStepProps> = ({ 
  data, 
  onDataChange, 
  isTransitioning = false, 
  selectedOption, 
  onOptionSelect 
}) => {
  const personas = [
    {
      id: 'content-creator',
      name: 'Content Creator',
      description: 'YouTuber, podcaster, or social media creator',
      icon: Video,
      features: ['High-quality voice synthesis', 'Multiple language support', 'Custom voice training']
    },
    {
      id: 'voice-actor',
      name: 'Voice Actor',
      description: 'Professional voice work and narration',
      icon: Mic,
      features: ['Professional-grade voices', 'Emotion control', 'Voice cloning']
    },
    {
      id: 'audiobook',
      name: 'Audiobook Producer',
      description: 'Creating audiobooks and spoken content',
      icon: BookOpen,
      features: ['Long-form narration', 'Character voices', 'Natural pacing']
    },
    {
      id: 'music-producer',
      name: 'Music Producer',
      description: 'Music production and audio editing',
      icon: Music,
      features: ['Musical voice synthesis', 'Audio integration', 'Creative effects']
    },
    {
      id: 'business',
      name: 'Business Professional',
      description: 'Corporate presentations and training',
      icon: Briefcase,
      features: ['Professional voices', 'Presentation tools', 'Team collaboration']
    },
    {
      id: 'hobbyist',
      name: 'Hobbyist',
      description: 'Personal projects and experimentation',
      icon: Headphones,
      features: ['Easy-to-use interface', 'Affordable pricing', 'Creative freedom']
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personas.map((persona) => {
          const Icon = persona.icon;
          const isSelected = selectedOption === persona.id || data.persona === persona.id;
          const shouldFadeOut = isTransitioning && selectedOption && selectedOption !== persona.id;
          
          const handleClick = () => {
            onOptionSelect?.(persona.id);
            onDataChange({ persona: persona.id });
          };
          
          return (
            <Card
              key={persona.id}
              className={`cursor-pointer transition-all duration-500 ${
                shouldFadeOut 
                  ? 'opacity-20 scale-95 pointer-events-none' 
                  : isSelected
                  ? 'ring-2 ring-purple-500 bg-purple-50 scale-105'
                  : 'hover:bg-white/10 hover:scale-105'
              }`}
              onClick={handleClick}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Icon className="w-6 h-6 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{persona.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{persona.description}</p>
                    
                    <div className="space-y-1">
                      {persona.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-500 flex items-center">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-white/70">
        This helps us recommend the best features for your needs
      </div>
    </div>
  );
};

export default UserPersonaStep;