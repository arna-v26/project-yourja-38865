import { useAccount, useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';
import { formatUnits } from 'viem';

export const useTokenBalance = () => {
  const { address, isConnected } = useAccount();

  const { data: grnBalanceRaw, isLoading: isLoadingGrn, refetch: refetchGrn } = useReadContract({
    address: CONTRACTS.GreenToken.address,
    abi: CONTRACTS.GreenToken.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
      refetchInterval: 5000, // Refresh every 5 seconds
    }
  });

  const { data: ecoBalanceRaw, isLoading: isLoadingEco, refetch: refetchEco } = useReadContract({
    address: CONTRACTS.EcoCredit.address,
    abi: CONTRACTS.EcoCredit.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
      refetchInterval: 5000,
    }
  });

  const grnBalance = grnBalanceRaw ? Number(formatUnits(grnBalanceRaw as bigint, 18)) : 0;
  const ecoBalance = ecoBalanceRaw ? Number(formatUnits(ecoBalanceRaw as bigint, 18)) : 0;

  const refetch = () => {
    refetchGrn();
    refetchEco();
  };

  return {
    grnBalance,
    ecoBalance,
    isLoading: isLoadingGrn || isLoadingEco,
    refetch,
    isConnected
  };
};
