import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Zap, Gift, Store, Ticket, Wallet, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getTokenPrices, CONTRACTS, CHAIN_CONFIG } from "@/lib/contracts";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { NetworkValidator } from "@/components/NetworkValidator";
import { parseUnits } from "viem";

const Marketplace = () => {
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { grnBalance, ecoBalance, isLoading: balancesLoading, refetch } = useTokenBalance();
  const [tokenPrices, setTokenPrices] = useState(getTokenPrices());
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    const interval = setInterval(() => {
      setTokenPrices(getTokenPrices());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const energyListings = [
    { id: 1, seller: "0x1234...5678", amount: 50, unit: "kWh", pricePerUnit: 12.5, location: "Mumbai, MH" },
    { id: 2, seller: "0x8765...4321", amount: 75, unit: "kWh", pricePerUnit: 12.5, location: "Pune, MH" },
    { id: 3, seller: "0xabcd...efgh", amount: 100, unit: "kWh", pricePerUnit: 12.5, location: "Delhi, DL" },
  ];

  // TODO: Replace with your wallet address to receive payments
  const MERCHANT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  
  const vouchers = [
    { id: 1, title: "Amazon Gift Card", cost: 500, token: "GRN", value: 1000, icon: Gift, merchantAddress: MERCHANT_ADDRESS },
    { id: 2, title: "Flipkart Voucher", cost: 750, token: "GRN", value: 1500, icon: Store, merchantAddress: MERCHANT_ADDRESS },
    { id: 3, title: "EV Charging Credits", cost: 300, token: "ECO", value: 600, icon: Zap, merchantAddress: MERCHANT_ADDRESS },
    { id: 4, title: "Green Groceries", cost: 200, token: "ECO", value: 500, icon: ShoppingBag, merchantAddress: MERCHANT_ADDRESS },
  ];

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast({
        title: "Transaction Confirmed!",
        description: (
          <a 
            href={`${CHAIN_CONFIG.blockExplorer}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on {CHAIN_CONFIG.name} Explorer
          </a>
        ),
      });
    }
  }, [isSuccess, hash, refetch, toast]);

  const handlePurchaseEnergy = (listing: any) => {
    toast({
      title: "Feature Coming Soon",
      description: "Energy marketplace contracts will be deployed soon. Current listings are for demonstration only.",
    });
  };

  const handleRedeemVoucher = async (voucher: any) => {
    // Validate wallet connection
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to redeem vouchers.",
        variant: "destructive"
      });
      return;
    }

    // Check token balance
    const balance = voucher.token === "GRN" ? grnBalance : ecoBalance;
    const price = voucher.token === "GRN" ? tokenPrices.GRN : tokenPrices.ECO;
    
    if (balance < voucher.cost) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${voucher.cost} ${voucher.token} but only have ${balance.toFixed(0)} ${voucher.token}`,
        variant: "destructive"
      });
      return;
    }

    // Validate merchant address
    if (!voucher.merchantAddress || voucher.merchantAddress === "0x742d35Cc6634C0532925a3b844Bc454e4438f44e") {
      toast({
        title: "Configuration Error",
        description: "Merchant address needs to be configured. Please contact support.",
        variant: "destructive"
      });
      return;
    }

    try {
      const isGRN = voucher.token === "GRN";
      
      writeContract({
        address: isGRN ? CONTRACTS.GreenToken.address as `0x${string}` : CONTRACTS.EcoCredit.address as `0x${string}`,
        abi: isGRN ? CONTRACTS.GreenToken.abi : CONTRACTS.EcoCredit.abi,
        functionName: 'transfer',
        args: [voucher.merchantAddress as `0x${string}`, parseUnits(voucher.cost.toString(), 18)]
      } as any);

      toast({
        title: "Transaction Submitted",
        description: `Redeeming ${voucher.title}... Please confirm in your wallet.`,
      });
    } catch (error: any) {
      console.error('Redemption error:', error);
      
      // Handle specific error types
      if (error.message?.includes('User rejected')) {
        toast({
          title: "Transaction Cancelled",
          description: "You rejected the transaction in your wallet.",
          variant: "destructive"
        });
      } else if (error.message?.includes('insufficient funds')) {
        toast({
          title: "Insufficient Funds",
          description: "You don't have enough ETH for gas fees.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Transaction Failed",
          description: error.message || "Failed to redeem voucher. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <NetworkValidator />
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Marketplace
          </h1>
          <p className="text-muted-foreground">Trade energy and redeem your tokens</p>
          
          {/* User Balances Display */}
          {!isConnected ? (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Connect your wallet to see your token balances</p>
            </div>
          ) : balancesLoading ? (
            <div className="flex gap-3 mt-4">
              <Badge variant="outline" className="text-sm sm:text-base py-2 px-4">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </Badge>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge variant="outline" className="text-sm sm:text-base py-2 px-4">
                <Wallet className="w-4 h-4 mr-2 text-primary" />
                {grnBalance.toFixed(0)} GRN ≈ ₹{(grnBalance * tokenPrices.GRN).toFixed(2)}
              </Badge>
              <Badge variant="outline" className="text-sm sm:text-base py-2 px-4">
                <Wallet className="w-4 h-4 mr-2 text-accent" />
                {ecoBalance.toFixed(0)} ECO ≈ ₹{(ecoBalance * tokenPrices.ECO).toFixed(2)}
              </Badge>
            </div>
          )}
        </div>

        {/* Energy Trading Section */}
        <section className="mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-6 text-yellow-500" />
            <h2 className="text-xl sm:text-2xl font-bold">Energy Trading</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {energyListings.map((listing) => (
              <Card key={listing.id} className="glass-card hover-glow border-yellow-500/30 transition-all hover-scale">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Available</Badge>
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{listing.amount} {listing.unit}</CardTitle>
                  <CardDescription>From {listing.seller}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="text-lg sm:text-xl font-bold text-primary">
                        {(listing.amount * listing.pricePerUnit).toFixed(0)} GRN
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">≈ INR Value</span>
                      <span className="text-sm">₹{(listing.amount * listing.pricePerUnit * tokenPrices.GRN).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="text-sm">{listing.location}</span>
                    </div>
                    <Button onClick={() => handlePurchaseEnergy(listing)} className="w-full" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Token Redemption Section */}
        <section className="animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="h-5 w-6 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold">Redeem Tokens</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {vouchers.map((voucher) => {
              const Icon = voucher.icon;
              const price = voucher.token === "GRN" ? tokenPrices.GRN : tokenPrices.ECO;
              
              return (
                <Card key={voucher.id} className="glass-card hover-glow border-primary/30 transition-all hover-scale">
                  <CardHeader>
                    <div className="bg-primary/10 rounded-xl p-3 sm:p-4 w-fit mb-3">
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">{voucher.title}</CardTitle>
                    <CardDescription>Worth ₹{voucher.value}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-primary">{voucher.cost} {voucher.token}</div>
                        <div className="text-sm text-muted-foreground">≈ ₹{(voucher.cost * price).toFixed(2)}</div>
                      </div>
                      <Button 
                        onClick={() => handleRedeemVoucher(voucher)} 
                        className="w-full" 
                        variant="outline"
                        disabled={!isConnected || isPending || isConfirming}
                      >
                        {isPending || isConfirming ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isPending ? "Confirming..." : "Processing..."}
                          </>
                        ) : (
                          "Redeem Now"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Marketplace;
