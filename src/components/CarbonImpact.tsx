import { Leaf } from "lucide-react";

const CarbonImpact = () => {
  return (
    <div className="glass-card rounded-2xl p-8 bg-gradient-to-r from-green-500/20 via-teal-500/20 to-cyan-500/20 hover-glow border-2 border-green/40">
      <div className="flex items-center gap-3">
        <div className="bg-green/20 rounded-full p-3">
          <Leaf className="h-6 w-6 text-green" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">Carbon Impact</h2>
          <p className="text-muted-foreground">Your environmental contribution this month</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-green">-847</div>
          <div className="text-sm text-muted-foreground">kg CO₂ saved</div>
        </div>
      </div>
    </div>
  );
};

export default CarbonImpact;
