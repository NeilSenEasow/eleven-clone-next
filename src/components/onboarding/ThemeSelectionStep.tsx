import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Monitor, Moon, Sun } from 'lucide-react';

interface ThemeSelectionStepProps {
  onNext: () => void;
  onUpdate: (data: { theme: string }) => void;
  selectedTheme: string;
}

export default function ThemeSelectionStep({ onNext, onUpdate, selectedTheme }: ThemeSelectionStepProps) {
  const [selected, setSelected] = useState(selectedTheme);

  const handleThemeSelect = (theme: string) => {
    setSelected(theme);
    onUpdate({ theme });
  };

  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <div className="text-center space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Choose your style</h1>
      
      <div className="flex justify-center gap-6">
        <Card 
          className={`p-6 cursor-pointer transition-all hover:scale-105 w-64 ${
            selected === 'light' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => handleThemeSelect('light')}
        >
          <div className="space-y-4">
            <div className="bg-slate-100 rounded-lg p-4 h-32 flex items-center justify-center">
              <div className="bg-white rounded shadow-sm p-3 w-full h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <div className="w-12 h-2 bg-slate-800 rounded"></div>
                </div>
                <div className="space-y-1 flex-1">
                  <div className="w-full h-1 bg-slate-300 rounded"></div>
                  <div className="w-3/4 h-1 bg-slate-300 rounded"></div>
                  <div className="w-1/2 h-1 bg-slate-300 rounded"></div>
                </div>
                <div className="flex justify-center mt-2">
                  <Sun className="h-4 w-4 text-slate-600" />
                </div>
              </div>
            </div>
            <p className="font-medium text-foreground">Light</p>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all hover:scale-105 w-64 ${
            selected === 'dark' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => handleThemeSelect('dark')}
        >
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4 h-32 flex items-center justify-center">
              <div className="bg-slate-800 rounded shadow-sm p-3 w-full h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <div className="w-12 h-2 bg-white rounded"></div>
                </div>
                <div className="space-y-1 flex-1">
                  <div className="w-full h-1 bg-slate-600 rounded"></div>
                  <div className="w-3/4 h-1 bg-slate-600 rounded"></div>
                  <div className="w-1/2 h-1 bg-slate-600 rounded"></div>
                </div>
                <div className="flex justify-center mt-2">
                  <Moon className="h-4 w-4 text-slate-300" />
                </div>
              </div>
            </div>
            <p className="font-medium text-foreground">Dark</p>
          </div>
        </Card>
      </div>

      <Button 
        onClick={handleContinue}
        disabled={!selected}
        className="px-8 py-2"
      >
        Continue
      </Button>
    </div>
  );
}