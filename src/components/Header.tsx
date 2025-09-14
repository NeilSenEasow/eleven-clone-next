import { Button } from "@/components/ui/button";
import { ChevronDown, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { label: "Creative Platform", hasDropdown: true },
    { label: "Agents Platform", hasDropdown: true },
    { label: "Developers", hasDropdown: true },
    { label: "Resources", hasDropdown: true },
    { label: "Enterprise", hasDropdown: false },
    { label: "Pricing", hasDropdown: false },
  ];

  const getDropdownItems = (label: string): { name: string; path: string }[] => {
    switch (label) {
      case "Creative Platform":
        return [
          { name: "Text to Speech", path: "/text-to-speech" },
          { name: "Voice Cloning", path: "/voice-cloning" },
          { name: "Voice Library", path: "/voice-library" },
          { name: "Projects", path: "/projects" }
        ];
      case "Agents Platform":
        return [
          { name: "Conversational AI", path: "/conversational-ai" },
          { name: "Voice Agents", path: "#" },
          { name: "Phone Calling", path: "#" },
          { name: "Integration", path: "#" }
        ];
      case "Developers":
        return [
          { name: "API Documentation", path: "#" },
          { name: "SDKs", path: "#" },
          { name: "Tutorials", path: "#" },
          { name: "Community", path: "#" }
        ];
      case "Resources":
        return [
          { name: "Blog", path: "#" },
          { name: "Case Studies", path: "#" },
          { name: "Help Center", path: "#" },
          { name: "Voice Lab", path: "#" }
        ];
      default:
        return [];
    }
  };

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
              item.hasDropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-foreground/80 hover:bg-transparent transition-colors h-auto p-0"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {getDropdownItems(item.label).map((dropdownItem, index) => (
                      <DropdownMenuItem key={index} className="cursor-pointer">
                        <Link to={dropdownItem.path} className="w-full">
                          {dropdownItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.label === 'Enterprise' ? '/enterprise' : '/pricing'}
                >
                  <Button
                    variant="ghost"
                    className="text-sm font-medium text-foreground hover:text-foreground/80 hover:bg-transparent transition-colors h-auto p-0"
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Welcome, {user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-sm">
                    <User className="w-4 h-4 mr-2" />
                    {user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <Button variant="ghost" size="default">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <Button variant="default" size="default">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;