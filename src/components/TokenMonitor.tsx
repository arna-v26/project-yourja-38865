import { useState, useEffect } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTokenPrices } from "@/lib/contracts";

interface TokenData {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

const TokenMonitor = () => {
  const [tokens, setTokens] = useState<TokenData[]>([
    { name: "GreenToken", symbol: "GRN", price: 207.58, change: -1.59 },
    { name: "EcoCredit", symbol: "ECO", price: 72.11, change: 2.68 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const prices = getTokenPrices();
      setTokens(prev => [
        { ...prev[0], price: prices.GRN, change: ((prices.GRN - prev[0].price) / prev[0].price) * 100 },
        { ...prev[1], price: prices.ECO, change: ((prices.ECO - prev[1].price) / prev[1].price) * 100 }
      ]);
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 hover-glow animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            Token Monitor
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </h2>
          <p className="text-sm text-muted-foreground">Real-time blockchain values</p>
        </div>
        <Select defaultValue="INR">
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INR">INR</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {tokens.map((token) => (
          <div key={token.symbol} className="bg-background/40 rounded-xl p-4 border border-border/50 transition-all hover-scale">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{token.name} ({token.symbol})</span>
              <div className={`flex items-center gap-1 text-sm ${token.change > 0 ? 'text-green' : 'text-destructive'}`}>
                {token.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(token.change).toFixed(2)}%
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              ₹{token.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenMonitor;
