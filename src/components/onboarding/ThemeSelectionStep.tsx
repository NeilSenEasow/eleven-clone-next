import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

interface ThemeSelectionStepProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
}

const ThemeSelectionStep: React.FC<ThemeSelectionStepProps> = ({ data, onDataChange }) => {
  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: Sun,
      preview: 'bg-white text-black'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes',
      icon: Moon,
      preview: 'bg-gray-900 text-white'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <Card
              key={theme.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                data.theme === theme.id
                  ? 'ring-2 ring-purple-500 bg-purple-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onDataChange({ theme: theme.id as 'light' | 'dark' })}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-lg">{theme.name}</h3>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </div>
                </div>
                
                {/* Theme Preview */}
                <div className={`p-4 rounded-lg ${theme.preview} border`}>
                  <div className="space-y-2">
                    <div className="h-2 bg-current opacity-30 rounded w-3/4"></div>
                    <div className="h-2 bg-current opacity-20 rounded w-1/2"></div>
                    <div className="h-2 bg-current opacity-25 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-gray-600">
        You can change this later in your settings
      </div>
    </div>
  );
};

export default ThemeSelectionStep;