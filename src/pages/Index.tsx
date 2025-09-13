import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import VoiceLabInterface from "@/components/VoiceLabInterface";
import BackgroundWaves from "@/components/BackgroundWaves";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <ProductCategories />
        <div className="container mx-auto px-6 py-12">
          <VoiceLabInterface />
        </div>
      </main>
      <BackgroundWaves />
    </div>
  );
};

export default Index;
