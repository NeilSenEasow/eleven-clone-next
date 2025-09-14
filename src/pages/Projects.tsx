import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Folder, Calendar, MoreHorizontal } from "lucide-react";

const Projects = () => {
  const projects = [
    { name: "Podcast Episode 1", type: "Audio", created: "2 days ago", status: "Complete" },
    { name: "Product Demo", type: "Voice Clone", created: "1 week ago", status: "In Progress" },
    { name: "Audiobook Chapter 3", type: "Text to Speech", created: "2 weeks ago", status: "Complete" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-muted-foreground">Manage and organize your voice generation projects</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <div className="grid gap-4">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Folder className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{project.type}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.created}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          project.status === 'Complete' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Folder className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">Create your first project to get started</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Projects;
