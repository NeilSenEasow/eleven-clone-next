import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Download, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AudioResponse {
  language: string;
  audioUrl: string;
  createdAt: string;
  updatedAt: string;
}

const TextToSpeechTab: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'arabic', label: 'Arabic' }
  ];

  const handleGenerateAudio = async () => {
    if (!selectedLanguage || !text.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a language and enter some text.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/audio?lang=${selectedLanguage}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Audio not found for the selected language');
        }
        throw new Error('Failed to fetch audio');
      }

      const data: AudioResponse = await response.json();
      setAudioUrl(data.audioUrl);
      
      toast({
        title: "Audio Generated",
        description: "Your text has been converted to speech successfully!",
      });
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate audio",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = () => {
    if (!audioUrl) return;
    
    const audio = new Audio(audioUrl);
    setIsPlaying(true);
    
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      setIsPlaying(false);
      toast({
        title: "Playback Error",
        description: "Failed to play the audio file",
        variant: "destructive",
      });
    };
    
    audio.play();
  };

  const handleDownloadAudio = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `speech_${selectedLanguage}_${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Your audio file is being downloaded.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Text to Speech</CardTitle>
          <CardDescription>
            Convert your text into natural-sounding speech using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Selection */}
          <div className="space-y-2">
            <label htmlFor="language" className="text-sm font-medium">
              Select Language
            </label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Text Input */}
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-medium">
              Enter Text
            </label>
            <Textarea
              id="text"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] resize-none"
              maxLength={5000}
            />
            <div className="text-xs text-muted-foreground text-right">
              {text.length}/5000 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGenerateAudio}
              disabled={isLoading || !selectedLanguage || !text.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Generate Speech
                </>
              )}
            </Button>

            {audioUrl && (
              <>
                <Button
                  onClick={handlePlayAudio}
                  disabled={isPlaying}
                  variant="outline"
                  className="flex-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isPlaying ? 'Playing...' : 'Play Audio'}
                </Button>

                <Button
                  onClick={handleDownloadAudio}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </>
            )}
          </div>

          {/* Audio Preview */}
          {audioUrl && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Generated Audio</h4>
              <audio controls className="w-full" src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TextToSpeechTab;