import Navbar from "@/components/Navbar";
import TokenMonitor from "@/components/TokenMonitor";
import EnergyDashboard from "@/components/EnergyDashboard";
import RecyclingTracker from "@/components/RecyclingTracker";
import WasteDisposal from "@/components/WasteDisposal";
import TokenWallet from "@/components/TokenWallet";
import CarbonImpact from "@/components/CarbonImpact";
import { NetworkValidator } from "@/components/NetworkValidator";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <NetworkValidator />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your sustainability impact</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TokenMonitor />
            <EnergyDashboard />
            <RecyclingTracker />
            <CarbonImpact />
          </div>

          <div className="space-y-6">
            <WasteDisposal />
            <TokenWallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
