import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Play, Download } from "lucide-react";

const TextToSpeechTab = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("english");
  const maxChars = 2500;

  const handlePlay = () => {
    // Ready for API integration
    console.log("Play audio for:", text);
  };

  const handleDownload = () => {
    // Ready for API integration
    console.log("Download audio for:", text);
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Language
        </label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[200px] bg-card border-border">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="arabic">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Text Input Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Text
        </label>
        <div className="relative">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[200px] bg-card border-border resize-none text-foreground placeholder:text-muted-foreground"
            maxLength={maxChars}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {text.length}/{maxChars}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 pt-4">
        <Button
          variant="play"
          size="lg"
          onClick={handlePlay}
          disabled={!text.trim()}
          className="min-w-[120px]"
        >
          <Play className="w-4 h-4" />
          Play
        </Button>
        <Button
          variant="download"
          size="lg"
          onClick={handleDownload}
          disabled={!text.trim()}
          className="min-w-[120px]"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default TextToSpeechTab;