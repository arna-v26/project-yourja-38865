import { Wallet, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTokenBalance } from "@/hooks/useTokenBalance";

const TokenWallet = () => {
  const { grnBalance, ecoBalance, isLoading, isConnected } = useTokenBalance();

  return (
    <div className="glass-card rounded-2xl p-6 hover-glow border-2 border-cyan-500/30">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="h-5 w-5 text-cyan-500" />
        <h2 className="text-xl font-bold">Token Wallet</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Your Balance</h3>
          <p className="text-xs text-muted-foreground mb-4">
            {isConnected ? 'Live blockchain balances' : 'Connect wallet to view balances'}
          </p>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-background/40 rounded-xl p-4 border border-border/50">
                <span className="text-sm text-muted-foreground">GreenTokens</span>
                <span className="text-xl font-bold text-primary">{grnBalance.toFixed(0)}</span>
              </div>

              <div className="flex items-center justify-between bg-background/40 rounded-xl p-4 border border-border/50">
                <span className="text-sm text-muted-foreground">EcoCredits</span>
                <span className="text-xl font-bold text-primary">{ecoBalance.toFixed(0)}</span>
              </div>
            </div>
          )}
        </div>

        <Button className="w-full gap-2 bg-primary hover:bg-primary/90" disabled={!isConnected}>
          <Link2 className="h-4 w-4" />
          {isConnected ? 'Manage Tokens' : 'Connect Wallet'}
        </Button>
      </div>
    </div>
  );
};

export default TokenWallet;
