import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Zap, Recycle, Coins, Shield, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: Coins,
      title: "Dual Token System",
      description: "Earn GreenTokens from energy and EcoCredits from recycling"
    },
    {
      icon: Zap,
      title: "Energy Trading",
      description: "Trade surplus renewable energy on our blockchain marketplace"
    },
    {
      icon: Recycle,
      title: "Verified Recycling",
      description: "Get blockchain-verified rewards for responsible waste disposal"
    },
    {
      icon: Shield,
      title: "Transparent Tracking",
      description: "Complete transaction history with blockchain verification"
    },
    {
      icon: TrendingUp,
      title: "Real-time Monitoring",
      description: "Track your sustainability metrics and token values live"
    },
    {
      icon: Leaf,
      title: "Carbon Impact",
      description: "Monitor your environmental contribution and CO₂ savings"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, hsl(174 100% 42% / 0.15), transparent 60%)' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Blockchain-Powered Sustainability</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Turn Your{" "}
              <span className="bg-gradient-to-r from-primary via-green to-cyan bg-clip-text text-transparent glow-text">
                Eco-Actions
              </span>
              {" "}Into Rewards
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Save energy, recycle responsibly, and track your environmental impact with complete blockchain transparency. Earn tokens for every sustainable action.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 hover-glow">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                  Explore Marketplace
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
              <div>
                <div className="text-4xl font-bold text-primary">3.2M+</div>
                <div className="text-sm text-muted-foreground">Tonnes E-Waste/Year</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">40 GW</div>
                <div className="text-sm text-muted-foreground">Solar Target</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">2070</div>
                <div className="text-sm text-muted-foreground">Net Zero Goal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to make sustainability rewarding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-105">
                  <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center bg-gradient-to-r from-primary/20 via-green/20 to-cyan/20 hover-glow border-2 border-primary/40">
            <h2 className="text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands making sustainability rewarding and verifiable through blockchain technology
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
