import Header from "@/components/Header";
import TabbedInterface from "@/components/TabbedInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Voice Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your text into lifelike speech with our advanced AI voice technology.
          </p>
        </div>
        <TabbedInterface />
      </main>
    </div>
  );
};

export default Index;
