import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Play, Download, Pause } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const VoiceLabInterface = () => {
  const [text, setText] = useState(`In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the 'burn it all down' kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`);
  const [language, setLanguage] = useState("english");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const voiceOptions = [
    { name: "Samora", type: "Narrate a story", color: "bg-blue-500" },
    { name: "2 speakers", type: "Create a dialogue", color: "bg-pink-500" },
    { name: "Announcer", type: "Voiceover a game", color: "bg-green-500" },
    { name: "Sergeant", type: "Play a drill sergeant", color: "bg-purple-500" },
    { name: "Spads", type: "Recount an old story", color: "bg-blue-600" },
    { name: "Jessica", type: "Provide customer support", color: "bg-pink-600" },
  ];

  const handlePlayAudio = async () => {
    try {
      // Stop any current audio/speech
      if (isPlaying) {
        speechSynthesis.cancel();
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        return;
      }

      // Language mapping for text-to-speech
      const languageMap: { [key: string]: string } = {
        english: 'en-US',
        arabic: 'ar-SA',
        spanish: 'es-ES',
        french: 'fr-FR',
        german: 'de-DE',
        japanese: 'ja-JP'
      };

      toast({
        title: "Playing Audio",
        description: `Using ${language.toUpperCase()} text-to-speech`,
      });

      // Create speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageMap[language] || 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = (event) => {
        setIsPlaying(false);
        toast({
          title: "Audio Error",
          description: "Failed to play text-to-speech",
          variant: "destructive"
        });
      };

      // Cancel any existing speech and start new one
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);

    } catch (error) {
      setIsPlaying(false);
      toast({
        title: "Audio Error",
        description: "Failed to initialize audio playback",
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${language} audio file...`,
    });
    // In a real app, this would trigger actual download
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
        {/* Text Input Area */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="min-h-[200px] bg-background border-border resize-none text-foreground placeholder:text-muted-foreground text-base leading-relaxed"
              maxLength={2500}
            />
          </div>
        </div>

        {/* Voice Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {voiceOptions.map((voice, index) => (
            <button
              key={index}
              onClick={() => setSelectedVoice(index)}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors text-left ${
                selectedVoice === index 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${voice.color}`} />
              <div>
                <div className="font-medium text-foreground text-sm">{voice.name}</div>
                <div className="text-xs text-muted-foreground">{voice.type}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px] bg-background border-border">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="english">🇺🇸 ENGLISH</SelectItem>
                <SelectItem value="arabic">🇸🇦 ARABIC</SelectItem>
                <SelectItem value="spanish">🇪🇸 SPANISH</SelectItem>
                <SelectItem value="french">🇫🇷 FRENCH</SelectItem>
                <SelectItem value="german">🇩🇪 GERMAN</SelectItem>
                <SelectItem value="japanese">🇯🇵 JAPANESE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              size="lg"
              className="min-w-[100px] rounded-full"
              onClick={handlePlayAudio}
              disabled={!text.trim()}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  PAUSE
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  PLAY
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">Powered by Eleven v3 (alpha)</p>
          {selectedVoice !== null && (
            <p className="text-xs text-muted-foreground mt-2">
              Selected Voice: {voiceOptions[selectedVoice]?.name} • Language: {language.toUpperCase()}
            </p>
          )}
        </div>
        
        {/* Hidden audio element for playing audio files */}
        <audio ref={audioRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default VoiceLabInterface;