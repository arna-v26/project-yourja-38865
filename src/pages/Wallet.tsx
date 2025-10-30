import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, ArrowDownUp, TrendingUp, Clock, ExternalLink, Loader2 } from "lucide-react";
import { useAccount, usePublicClient } from "wagmi";
import { getTokenPrices, CONTRACTS, CHAIN_CONFIG } from "@/lib/contracts";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { NetworkValidator } from "@/components/NetworkValidator";
import { parseAbiItem, formatUnits } from "viem";

const Wallet = () => {
  const { address, isConnected } = useAccount();
  const { grnBalance, ecoBalance, isLoading: balancesLoading } = useTokenBalance();
  const [tokenPrices, setTokenPrices] = useState(getTokenPrices());
  const publicClient = usePublicClient();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoadingTx, setIsLoadingTx] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTokenPrices(getTokenPrices());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address || !publicClient) return;
      
      setIsLoadingTx(true);
      try {
        // Fetch GRN transfers
        const grnTransfers = await publicClient.getLogs({
          address: CONTRACTS.GreenToken.address,
          event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
          fromBlock: 'earliest' as any,
          toBlock: 'latest' as any,
        });

        // Fetch ECO transfers
        const ecoTransfers = await publicClient.getLogs({
          address: CONTRACTS.EcoCredit.address,
          event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
          fromBlock: 'earliest' as any,
          toBlock: 'latest' as any,
        });

        // Filter and format transactions
        const allTxs = [
          ...grnTransfers.map(log => ({
            hash: log.transactionHash,
            from: log.args.from,
            to: log.args.to,
            value: log.args.value,
            token: 'GRN',
            blockNumber: log.blockNumber
          })),
          ...ecoTransfers.map(log => ({
            hash: log.transactionHash,
            from: log.args.from,
            to: log.args.to,
            value: log.args.value,
            token: 'ECO',
            blockNumber: log.blockNumber
          }))
        ].filter(tx => 
          tx.from?.toLowerCase() === address.toLowerCase() || 
          tx.to?.toLowerCase() === address.toLowerCase()
        );

        // Sort by block number (newest first) and take last 10
        const sortedTxs = allTxs
          .sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
          .slice(0, 10);

        setTransactions(sortedTxs);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoadingTx(false);
      }
    };

    fetchTransactions();
  }, [address, publicClient]);

  const totalValue = (grnBalance * tokenPrices.GRN) + (ecoBalance * tokenPrices.ECO);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <NetworkValidator />
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Wallet
          </h1>
          <p className="text-muted-foreground">Manage your tokens and view transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Wallet Balance */}
          <div className="lg:col-span-1 animate-fade-in">
            <Card className="glass-card hover-glow border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <WalletIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg sm:text-xl">Your Balance</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  {isConnected ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : "Not connected"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {balancesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    <div className="bg-background/40 rounded-xl p-3 sm:p-4 border border-border/50 transition-all hover-scale">
                      <div className="text-sm text-muted-foreground mb-1">GreenTokens (GRN)</div>
                      <div className="text-2xl sm:text-3xl font-bold text-primary">{grnBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">≈ ₹{(grnBalance * tokenPrices.GRN).toFixed(2)}</div>
                    </div>

                    <div className="bg-background/40 rounded-xl p-3 sm:p-4 border border-border/50 transition-all hover-scale">
                      <div className="text-sm text-muted-foreground mb-1">EcoCredits (ECO)</div>
                      <div className="text-2xl sm:text-3xl font-bold text-primary">{ecoBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">≈ ₹{(ecoBalance * tokenPrices.ECO).toFixed(2)}</div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/20 to-green/20 rounded-xl p-3 sm:p-4 border border-primary/30">
                      <div className="text-sm text-muted-foreground mb-1">Total Value</div>
                      <div className="text-2xl sm:text-3xl font-bold">₹{totalValue.toFixed(2)}</div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2 animate-fade-in">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <ArrowDownUp className="h-5 w-5 text-primary" />
                      Transaction History
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Blockchain-verified transactions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {isLoadingTx ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : transactions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions found
                    </div>
                  ) : (
                    transactions.map((tx) => {
                      const price = tx.token === "GRN" ? tokenPrices.GRN : tokenPrices.ECO;
                      const amount = Number(formatUnits(tx.value as bigint, 18));
                      const isReceived = tx.to?.toLowerCase() === address?.toLowerCase();
                      const inrValue = amount * price;
                      
                      return (
                        <div key={tx.hash} className="flex items-center justify-between bg-background/40 rounded-xl p-3 sm:p-4 border border-border/50 hover-glow transition-all hover-scale">
                          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className={`rounded-full p-2 flex-shrink-0 ${isReceived ? 'bg-green/20' : 'bg-orange-500/20'}`}>
                              <ArrowDownUp className={`h-3 w-3 sm:h-4 sm:w-4 ${isReceived ? 'text-green' : 'text-orange-500'}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-sm sm:text-base truncate">{isReceived ? 'Received' : 'Sent'}</div>
                              <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 truncate">
                                {isReceived ? 'From' : 'To'}: {(isReceived ? tx.from : tx.to)?.slice(0, 10)}...
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-2 flex-shrink-0">
                            <div className="font-bold text-sm sm:text-lg">
                              {isReceived ? '+' : '-'}{amount.toFixed(2)} {tx.token}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">₹{inrValue.toFixed(2)}</div>
                          </div>
                          <a
                            href={`${CHAIN_CONFIG.blockExplorer}/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 sm:ml-4 flex-shrink-0"
                          >
                            <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80">
                              <ExternalLink className="h-3 w-3" />
                            </Badge>
                          </a>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
