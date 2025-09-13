import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextToSpeechTab from "./TextToSpeechTab";

const TabbedInterface = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="text-to-speech" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-card border border-border">
          <TabsTrigger 
            value="text-to-speech"
            className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
          >
            Text to Speech
          </TabsTrigger>
          <TabsTrigger 
            value="speech-to-speech"
            className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
          >
            Speech to Speech
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text-to-speech" className="space-y-6">
          <TextToSpeechTab />
        </TabsContent>
        
        <TabsContent value="speech-to-speech" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Speech to Speech feature coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedInterface;