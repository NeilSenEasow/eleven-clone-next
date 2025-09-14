import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot, Zap, Settings } from "lucide-react";

const ConversationalAI = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Conversational AI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build intelligent voice agents that can understand, respond, and engage in natural conversations 
            with your users across any platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI Agent Builder
              </CardTitle>
              <CardDescription>
                Create custom conversational agents with advanced NLP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Agent Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div>Name: Customer Support Bot</div>
                    <div>Language: English</div>
                    <div>Personality: Professional, Helpful</div>
                  </div>
                </div>
                <Button className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Agent
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Live Testing
              </CardTitle>
              <CardDescription>
                Test your AI agent in real-time conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-48 border rounded-lg p-4 bg-muted/20 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg max-w-xs">
                        Hello, I need help with my order
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-secondary px-3 py-2 rounded-lg max-w-xs">
                        I'd be happy to help you with your order. Could you please provide your order number?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input 
                    className="flex-1 px-3 py-2 border rounded-lg" 
                    placeholder="Type your message..."
                  />
                  <Button>Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Features & Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Natural Language Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced understanding of context, intent, and sentiment
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Multi-turn Conversations</h3>
                <p className="text-sm text-muted-foreground">
                  Maintain context across extended dialogues
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Responses</h3>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast response times for seamless interactions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ConversationalAI;
