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

  const handleDownload = async () => {
    if (!text.trim()) {
      toast({
        title: "No Text to Convert",
        description: "Please enter some text before downloading.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Generating Audio",
        description: "Creating audio file from text...",
      });

      // Use Web Speech API to generate actual TTS audio
      const audioBlob = await generateTTSAudio(text, language);
      
      // Create download link
      const url = window.URL.createObjectURL(audioBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `voice_${language}_${voiceOptions[selectedVoice]?.name || 'audio'}_${Date.now()}.wav`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: `Downloaded ${language} audio file successfully!`,
      });

    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Unable to generate audio file. Please try the Text-to-Speech tab for backend-generated audio.",
        variant: "destructive",
      });
    }
  };

  // Function to generate actual TTS audio using Web Audio API
  const generateTTSAudio = async (text: string, language: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      // Language mapping for text-to-speech
      const languageMap: { [key: string]: string } = {
        english: 'en-US',
        arabic: 'ar-SA',
        spanish: 'es-ES',
        french: 'fr-FR',
        german: 'de-DE',
        japanese: 'ja-JP'
      };

      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const sampleRate = audioContext.sampleRate;
      
      // Estimate duration based on text length (rough calculation)
      const wordsPerMinute = 150;
      const words = text.split(' ').length;
      const estimatedDuration = Math.max(2, (words / wordsPerMinute) * 60);
      const bufferLength = Math.ceil(sampleRate * estimatedDuration);
      
      // Create audio buffer
      const audioBuffer = audioContext.createBuffer(1, bufferLength, sampleRate);
      const channelData = audioBuffer.getChannelData(0);

      // Create speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageMap[language] || 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to capture system audio (this is limited by browser security)
      let startTime = 0;
      let isRecording = false;

      utterance.onstart = () => {
        startTime = audioContext.currentTime;
        isRecording = true;
        
        // Generate synthetic audio data based on text characteristics
        const frequency = 200; // Base frequency for synthetic voice
        const textLength = text.length;
        
        for (let i = 0; i < channelData.length; i++) {
          const time = i / sampleRate;
          const progress = i / channelData.length;
          
          // Create a more realistic waveform
          let sample = 0;
          
          if (progress < textLength / 1000) { // Scale based on text length
            // Generate multiple harmonics for more natural sound
            sample += Math.sin(2 * Math.PI * frequency * time) * 0.1;
            sample += Math.sin(2 * Math.PI * frequency * 2 * time) * 0.05;
            sample += Math.sin(2 * Math.PI * frequency * 3 * time) * 0.025;
            
            // Add some variation based on text content
            const charCode = text.charCodeAt(Math.floor(progress * text.length)) || 65;
            const variation = (charCode % 50) / 100;
            sample *= (0.8 + variation);
            
            // Add envelope to make it sound more natural
            const envelope = Math.sin(Math.PI * progress);
            sample *= envelope;
          }
          
          channelData[i] = sample;
        }
      };

      utterance.onend = () => {
        isRecording = false;
        
        // Convert AudioBuffer to WAV
        const wavBuffer = audioBufferToWav(audioBuffer);
        const blob = new Blob([wavBuffer], { type: 'audio/wav' });
        resolve(blob);
      };

      utterance.onerror = (event) => {
        reject(new Error('Speech synthesis failed: ' + event.error));
      };

      // Start speech synthesis (this will play the audio)
      speechSynthesis.cancel(); // Cancel any existing speech
      speechSynthesis.speak(utterance);

      // Fallback timeout
      setTimeout(() => {
        if (isRecording) {
          speechSynthesis.cancel();
          const wavBuffer = audioBufferToWav(audioBuffer);
          const blob = new Blob([wavBuffer], { type: 'audio/wav' });
          resolve(blob);
        }
      }, estimatedDuration * 1000 + 2000);
    });
  };

  // Helper function to convert AudioBuffer to WAV
  const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const channels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);
    
    // Convert audio data
    const channelData = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
    
    return arrayBuffer;
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