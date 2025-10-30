import { useChainId, useSwitchChain } from 'wagmi';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { CHAIN_CONFIG } from '@/lib/contracts';

export const NetworkValidator = () => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  if (chainId === CHAIN_CONFIG.id) return null;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Wrong Network</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>Please switch to {CHAIN_CONFIG.name} to use this app.</span>
        <Button 
          onClick={() => switchChain({ chainId: CHAIN_CONFIG.id })}
          variant="outline"
          size="sm"
        >
          Switch to {CHAIN_CONFIG.name}
        </Button>
      </AlertDescription>
    </Alert>
  );
};
