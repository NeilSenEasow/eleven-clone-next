import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, Heart, Filter } from "lucide-react";

const VoiceLibrary = () => {
  const voices = [
    { name: "Sarah", accent: "American", gender: "Female", category: "Professional" },
    { name: "James", accent: "British", gender: "Male", category: "Conversational" },
    { name: "Emma", accent: "Australian", gender: "Female", category: "Friendly" },
    { name: "Marcus", accent: "American", gender: "Male", category: "Narrator" },
    { name: "Sofia", accent: "Spanish", gender: "Female", category: "Warm" },
    { name: "Oliver", accent: "British", gender: "Male", category: "Authoritative" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Voice Library</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our extensive collection of AI voices. From professional narrators 
            to conversational assistants, find the perfect voice for your project.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search voices by name, accent, or style..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {voices.map((voice, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{voice.name}</CardTitle>
                    <CardDescription>{voice.accent} • {voice.gender}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Category:</span>
                    <span className="text-sm bg-secondary px-2 py-1 rounded">
                      {voice.category}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Use Voice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Voices
          </Button>
        </div>
      </main>
    </div>
  );
};

export default VoiceLibrary;
