import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Play, Download } from "lucide-react";

const VoiceLabInterface = () => {
  const [text, setText] = useState(`In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the 'burn it all down' kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`);
  const [language, setLanguage] = useState("english");

  const voiceOptions = [
    { name: "Samora", type: "Narrate a story", color: "bg-blue-500" },
    { name: "2 speakers", type: "Create a dialogue", color: "bg-pink-500" },
    { name: "Announcer", type: "Voiceover a game", color: "bg-green-500" },
    { name: "Sergeant", type: "Play a drill sergeant", color: "bg-purple-500" },
    { name: "Spads", type: "Recount an old story", color: "bg-blue-600" },
    { name: "Jessica", type: "Provide customer support", color: "bg-pink-600" },
  ];

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
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors text-left"
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
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              size="lg"
              className="min-w-[100px] rounded-full"
            >
              <Play className="w-4 h-4 mr-2" />
              PLAY
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">Powered by Eleven v3 (alpha)</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceLabInterface;