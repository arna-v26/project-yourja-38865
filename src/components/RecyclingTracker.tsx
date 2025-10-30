import { Recycle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecyclingTracker = () => {
  const wasteItems = [
    { name: "Plastic", price: "₹41.56/kg", change: "+5%", icon: "♻️", color: "from-blue-500/20 to-cyan-500/20" },
    { name: "Metal Scrap", price: "₹191.18/kg", change: "+12%", icon: "⚙️", color: "from-gray-500/20 to-slate-500/20" },
    { name: "Copper", price: "₹706.52/kg", change: "+8%", icon: "🔶", color: "from-orange-500/20 to-red-500/20" },
    { name: "Glass", price: "₹12.47/kg", change: "-2%", icon: "💎", color: "from-cyan-500/20 to-blue-500/20" },
    { name: "Paper", price: "₹8.31/kg", change: "+5%", icon: "📄", color: "from-gray-400/20 to-gray-500/20" },
    { name: "Cardboard", price: "₹16.62/kg", change: "+7%", icon: "📦", color: "from-amber-500/20 to-yellow-500/20" },
    { name: "Wood", price: "₹33.25/kg", change: "+4%", icon: "🪵", color: "from-brown-500/20 to-amber-600/20" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 hover-glow border-2 border-green/30">
        <div className="flex items-center gap-2 mb-4">
          <Recycle className="h-5 w-5 text-green" />
          <h2 className="text-xl font-bold">Your Recycling</h2>
        </div>

        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Total Recycled</span>
          <div className="text-4xl font-bold">38.7 kg</div>
          <div className="text-sm text-green flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            +18% this month
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 hover-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <h2 className="text-xl font-bold">Waste Market Prices</h2>
          </div>
          <span className="text-sm text-muted-foreground">Current selling rates</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {wasteItems.map((item) => {
            const isPositive = item.change.startsWith("+");
            return (
              <div key={item.name} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 border border-border/50`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-medium mb-1">{item.name}</div>
                <div className="text-xs text-primary font-bold mb-1">{item.price}</div>
                <div className={`text-xs ${isPositive ? 'text-green' : 'text-destructive'}`}>
                  {item.change}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecyclingTracker;
