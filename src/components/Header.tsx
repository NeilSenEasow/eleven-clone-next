import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const navItems = [
    { label: "Creative Platform", hasDropdown: true },
    { label: "Agents Platform", hasDropdown: true },
    { label: "Developers", hasDropdown: true },
    { label: "Resources", hasDropdown: true },
    { label: "Enterprise", hasDropdown: false },
    { label: "Pricing", hasDropdown: false },
  ];

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">11</span>
            </div>
            <span className="text-xl font-semibold text-foreground">ElevenLabs</span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="ghost" size="default">
              Log in
            </Button>
            <Button variant="default" size="default">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;