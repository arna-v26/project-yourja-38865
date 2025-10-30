import { Zap, TrendingUp, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";

const EnergyDashboard = () => {
  const energyData = [
    {
      label: "Generated",
      value: "145.8 kWh",
      subtitle: "+12% this month",
      icon: Zap,
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-500"
    },
    {
      label: "Consumed",
      value: "98.2 kWh",
      subtitle: "Within normal range",
      icon: Battery,
      gradient: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-500"
    },
    {
      label: "Surplus Listed",
      value: "47.6 kWh/day",
      subtitle: "",
      icon: TrendingUp,
      gradient: "from-green-500/20 to-teal-500/20",
      iconColor: "text-green-500",
      hasButton: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-bold">Your Energy</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {energyData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${item.gradient} hover-glow border-2 border-primary/30`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <Icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{item.value}</div>
                {item.subtitle && (
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green" />
                    {item.subtitle}
                  </div>
                )}
                {item.hasButton && (
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                    Energy Marketplace
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnergyDashboard;
