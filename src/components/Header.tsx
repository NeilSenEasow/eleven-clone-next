import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">11</span>
            </div>
            <span className="text-xl font-semibold text-foreground">ElevenLabs</span>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="default">
              Login
            </Button>
            <Button variant="hero" size="default">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;