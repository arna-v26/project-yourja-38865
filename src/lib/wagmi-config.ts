import { http, createConfig } from 'wagmi'
import { sepolia, mainnet, polygon } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'

// TODO: Replace with your own WalletConnect Project ID
// Get one at: https://cloud.walletconnect.com/
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '818370e3002a3170bbcc14a9dd9bdf3f'

export const config = createConfig({
  chains: [sepolia, mainnet, polygon], // Multiple chains support
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
})