# 🚀 Yourja Deployment Guide

## Quick Setup (5 minutes to working app)

### Step 1: WalletConnect Project ID
1. Go to [https://cloud.walletconnect.com/](https://cloud.walletconnect.com/)
2. Sign up/Login
3. Create new project
4. Copy your Project ID
5. Update in two files:
   - `src/lib/wagmi-config.ts` (line 7)
   - `src/App.tsx` (line 21)

### Step 2: Deploy Smart Contracts

#### Option A: Using Remix IDE (Recommended)
1. Go to [https://remix.ethereum.org/](https://remix.ethereum.org/)
2. Create new files and copy contracts from `/contracts/` folder
3. Compile both contracts
4. Switch to Sepolia testnet in MetaMask
5. Get Sepolia ETH from [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
6. Deploy `GreenToken.sol`
7. Deploy `EcoCredit.sol`
8. Copy the deployed addresses
9. Update `src/lib/contracts.ts` with new addresses

#### Option B: Use Existing Contracts (If Working)
The current addresses might work:
- GreenToken: `0x5B0d90591f0f06dDF452d10dAe3bdd3308BB8149`
- EcoCredit: `0xa0Ec3528A4d95A8CF3EbB59cA90b329962Ba3744`

Test them first by connecting wallet and checking if balances load.

### Step 3: Set Your Merchant Address
1. Copy your wallet address from MetaMask
2. Update `MERCHANT_ADDRESS` in `src/pages/Marketplace.tsx` (line 36)

### Step 4: Test Everything
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Connect wallet
4. Check if token balances appear
5. Try redeeming a voucher (need tokens first)

## Environment Variables

Create `.env` file:
```env
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
VITE_SUPABASE_URL=your_supabase_url
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

## Get Test Tokens

After deploying contracts, mint yourself test tokens:
1. In Remix, call `mint(YOUR_ADDRESS, 1000000000000000000000)` on both contracts
2. This gives you 1000 GRN and 1000 ECO tokens
3. Refresh the app to see your balance

## Troubleshooting

### Wallet Won't Connect
- Check WalletConnect Project ID is correct
- Try different wallet (MetaMask, etc.)
- Clear browser cache

### Balances Don't Load
- Verify contract addresses are correct
- Check you're on Sepolia network
- Make sure you have test tokens

### Transactions Fail
- Ensure sufficient ETH for gas
- Verify contract addresses
- Check network is Sepolia

## Production Deployment

1. Deploy to mainnet instead of Sepolia
2. Remove `mint()` functions from contracts
3. Implement proper token economics
4. Add access controls
5. Get security audit

## Success Indicators

✅ Wallet connects successfully  
✅ Token balances display correctly  
✅ Network validator works  
✅ Voucher redemption processes  
✅ Transaction history loads  
✅ All pages navigate properly  

Once these work, your app is fully functional! 🎉