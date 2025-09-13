import { 
  MessageSquare, 
  Users, 
  Music, 
  FileText, 
  Languages, 
  UserCheck, 
  BookOpen 
} from "lucide-react";

const ProductCategories = () => {
  const categories = [
    { icon: MessageSquare, label: "TEXT TO SPEECH", active: true },
    { icon: Users, label: "AGENTS" },
    { icon: Music, label: "MUSIC" },
    { icon: FileText, label: "SPEECH TO TEXT" },
    { icon: Languages, label: "DUBBING" },
    { icon: UserCheck, label: "VOICE CLONING" },
    { icon: BookOpen, label: "ELEVENREADER" },
  ];

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.label}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                  category.active
                    ? "bg-primary text-primary-foreground shadow-button"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;