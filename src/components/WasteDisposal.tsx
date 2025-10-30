import { Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WasteDisposal = () => {
  const { toast } = useToast();

  const handleLogDisposal = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Waste verification contracts will be deployed soon. Your recycling efforts will be rewarded with EcoCredits on the blockchain.",
    });
  };

  return (
    <div className="glass-card rounded-2xl p-6 hover-glow border-2 border-orange-500/30">
      <div className="flex items-center gap-2 mb-4">
        <Trash2 className="h-5 w-5 text-orange-500" />
        <h2 className="text-xl font-bold">Your Waste</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold mb-2">Waste Disposed</h3>
          <p className="text-muted-foreground text-sm">24.5 kg this month</p>
        </div>

        <div className="flex items-center justify-between bg-background/40 rounded-xl p-4 border border-border/50">
          <span className="text-sm text-muted-foreground">EcoCredits Earned</span>
          <span className="text-2xl font-bold text-primary">340</span>
        </div>

        <Button onClick={handleLogDisposal} className="w-full gap-2" disabled>
          <Download className="h-4 w-4" />
          Coming Soon
        </Button>
      </div>
    </div>
  );
};

export default WasteDisposal;
