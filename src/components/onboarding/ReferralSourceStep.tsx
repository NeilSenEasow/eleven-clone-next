import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Users, Share2, Globe, MessageSquare, Star } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

interface ReferralSourceStepProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
}

const ReferralSourceStep: React.FC<ReferralSourceStepProps> = ({ data, onDataChange }) => {
  const referralSources = [
    {
      id: 'google',
      name: 'Google Search',
      description: 'Found us through a search',
      icon: Search
    },
    {
      id: 'social',
      name: 'Social Media',
      description: 'Facebook, Twitter, Instagram, etc.',
      icon: Share2
    },
    {
      id: 'friend',
      name: 'Friend/Family',
      description: 'Recommended by someone I know',
      icon: Users
    },
    {
      id: 'website',
      name: 'Website/Blog',
      description: 'Saw us mentioned online',
      icon: Globe
    },
    {
      id: 'forum',
      name: 'Online Forum',
      description: 'Reddit, Discord, etc.',
      icon: MessageSquare
    },
    {
      id: 'review',
      name: 'Review Site',
      description: 'App Store, Product Hunt, etc.',
      icon: Star
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {referralSources.map((source) => {
          const Icon = source.icon;
          return (
            <Card
              key={source.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                data.referralSource === source.id
                  ? 'ring-2 ring-purple-500 bg-purple-50'
                  : 'hover:bg-white/10'
              }`}
              onClick={() => onDataChange({ referralSource: source.id })}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-sm">{source.name}</h3>
                    <p className="text-xs text-gray-600">{source.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-white/70">
        This helps us understand our community better
      </div>
    </div>
  );
};

export default ReferralSourceStep;
