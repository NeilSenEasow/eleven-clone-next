import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
          The most realistic voice AI platform
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          AI voice models and products powering millions of developers, creators, and enterprises. From 
          low-latency conversational agents to the leading AI voice generator for voiceovers and audiobooks.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Button variant="default" size="lg" className="px-8">
            SIGN UP
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            CONTACT SALES
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;