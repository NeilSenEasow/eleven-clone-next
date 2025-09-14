import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Mic, AudioWaveform, Shield } from "lucide-react";

const VoiceCloning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Voice Cloning</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create a digital copy of any voice with just a few minutes of audio. 
            Our AI technology captures unique vocal characteristics with incredible accuracy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Audio
              </CardTitle>
              <CardDescription>
                Upload 1-30 minutes of clean audio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your audio file here
                </p>
                <Button variant="outline">Choose File</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Record Live
              </CardTitle>
              <CardDescription>
                Record directly in your browser
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <Button className="w-full">
                  Start Recording
                </Button>
                <p className="text-xs text-muted-foreground">
                  Minimum 1 minute required
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AudioWaveform className="w-5 h-5" />
                AI Training
              </CardTitle>
              <CardDescription>
                Advanced neural processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
                  <AudioWaveform className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-sm">
                  Our AI analyzes vocal patterns, tone, and characteristics
                </p>
                <div className="text-xs text-muted-foreground">
                  Training time: 5-10 minutes
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Ethical AI & Safety
            </CardTitle>
            <CardDescription>
              We take voice cloning ethics seriously
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Consent Required</h3>
                <p className="text-sm text-muted-foreground">
                  Only clone voices with explicit permission from the speaker. 
                  Unauthorized voice cloning violates our terms of service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Detection Technology</h3>
                <p className="text-sm text-muted-foreground">
                  All generated audio includes watermarks for identification 
                  and to prevent misuse.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VoiceCloning;
