import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out ElevenLabs",
      features: [
        "10,000 characters/month",
        "3 custom voices",
        "Basic voice library access",
        "Standard audio quality"
      ],
      popular: false
    },
    {
      name: "Starter",
      price: "$5",
      period: "per month",
      description: "Great for personal projects",
      features: [
        "30,000 characters/month",
        "10 custom voices",
        "Full voice library access",
        "High-quality audio",
        "Commercial license"
      ],
      popular: false
    },
    {
      name: "Creator",
      price: "$22",
      period: "per month",
      description: "Perfect for content creators",
      features: [
        "100,000 characters/month",
        "30 custom voices",
        "Voice cloning",
        "Projects & history",
        "Priority support",
        "Commercial license"
      ],
      popular: true
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      description: "For professional use",
      features: [
        "500,000 characters/month",
        "160 custom voices",
        "Instant voice cloning",
        "Advanced features",
        "API access",
        "Priority support"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core features 
            with no hidden fees or surprise charges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need something custom?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our sales team for enterprise pricing and custom solutions
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
