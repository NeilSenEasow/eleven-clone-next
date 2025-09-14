import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download, Settings } from "lucide-react";

const TextToSpeech = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Text to Speech</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Convert your text into lifelike speech with our advanced AI voice technology. 
            Choose from hundreds of voices in multiple languages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Instant Generation
              </CardTitle>
              <CardDescription>
                Generate speech from text in seconds with our real-time processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea 
                  className="w-full h-32 p-3 border rounded-lg resize-none bg-background"
                  placeholder="Enter your text here..."
                />
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Generate Speech
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Voice Settings
              </CardTitle>
              <CardDescription>
                Customize voice parameters for perfect results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Voice</label>
                  <select className="w-full p-2 border rounded-lg bg-background">
                    <option>Sarah - Professional</option>
                    <option>James - Conversational</option>
                    <option>Emma - Friendly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Speed</label>
                  <input type="range" className="w-full" min="0.5" max="2" step="0.1" defaultValue="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pitch</label>
                  <input type="range" className="w-full" min="-20" max="20" step="1" defaultValue="0" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Recent Generations
            </CardTitle>
            <CardDescription>
              Your recently generated audio files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No audio files generated yet. Create your first speech above!
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TextToSpeech;
