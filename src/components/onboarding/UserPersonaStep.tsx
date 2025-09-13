import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Mic,
  Users,
  MessageSquare,
  Phone,
  Settings,
  Database,
  Headphones,
  Music,
  Radio,
  FileText,
  Zap
} from 'lucide-react';

interface UserPersonaStepProps {
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: { persona: string }) => void;
  selected: string;
}

const personas = [
  {
    id: 'creative',
    title: 'Creative Platform',
    subtitle: 'Create AI audio',
    icon: Mic,
    color: 'border-red-500',
    iconBg: 'bg-red-500',
    features: [
      { icon: MessageSquare, label: 'Text to Speech' },
      { icon: Headphones, label: 'Voice Changer' },
      { icon: Zap, label: 'Sound Effects' },
      { icon: Settings, label: 'Voice Isolator' },
      { icon: Radio, label: 'Studio' },
      { icon: Music, label: 'Dubbing' },
      { icon: FileText, label: 'Speech to Text' },
      { icon: Music, label: 'Music', badge: 'New' },
    ]
  },
  {
    id: 'agents',
    title: 'Agents Platform',
    subtitle: 'Build and manage your AI agents',
    icon: Users,
    color: 'border-blue-500',
    iconBg: 'bg-blue-500',
    features: [
      { icon: Users, label: 'Agents' },
      { icon: Database, label: 'Knowledge Base' },
      { icon: Settings, label: 'Tools' },
      { icon: MessageSquare, label: 'Conversations' },
      { icon: Database, label: 'Integrations' },
      { icon: Phone, label: 'Phone numbers' },
      { icon: Radio, label: 'Outbound' },
    ]
  }
];

export default function UserPersonaStep({ onNext, onBack, onUpdate, selected }: UserPersonaStepProps) {
  const [selectedPersona, setSelectedPersona] = useState(selected);

  const handleSelect = (persona: string) => {
    setSelectedPersona(persona);
    onUpdate({ persona });
  };

  const handleNext = () => {
    if (selectedPersona) {
      onNext();
    }
  };

  return (
    <div className="text-center space-y-8 w-full max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Choose your platform</h1>
        <p className="text-muted-foreground">Switch between platforms at any time</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {personas.map((persona) => {
          const IconComponent = persona.icon;
          const isSelected = selectedPersona === persona.id;
          
          return (
            <Card
              key={persona.id}
              className={`p-6 cursor-pointer transition-all hover:scale-105 text-left ${
                isSelected ? `ring-2 ring-primary ${persona.color}` : 'hover:bg-accent'
              }`}
              onClick={() => handleSelect(persona.id)}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${persona.iconBg} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{persona.title}</h3>
                    <p className="text-muted-foreground">{persona.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Features</p>
                  <div className="grid grid-cols-2 gap-2">
                    {persona.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={index} className="flex items-center space-x-2">
                          <FeatureIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{feature.label}</span>
                          {feature.badge && (
                            <span className="text-xs px-1.5 py-0.5 bg-green-500 text-white rounded">
                              {feature.badge}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
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
          onClick={handleNext}
          disabled={!selectedPersona}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}