Yourja is a blockchain-powered sustainability platform that rewards eco-friendly actions through tokenized incentives. Save energy, recycle responsibly, and track your environmental impact with complete blockchain transparency.

🌿 Features
Dual Token System
GreenTokens (GRN): Earned through renewable energy generation and trading
EcoCredits (ECO): Rewards for verified recycling and e-waste disposal
Core Functionality
Wallet Integration: Connect with MetaMask or WalletConnect
Real-time Monitoring: Track token values and balances
Energy Dashboard: Monitor energy generation, consumption, and surplus
Recycling Tracker: Log waste disposal and earn eco-credits
Marketplace: Redeem tokens for discounts, vouchers, and services
Energy Trading: Buy and sell surplus renewable energy
Transaction History: Complete blockchain-verified transaction records
Platform Pages
Landing Page: Hero section with platform overview
Authentication: Wallet connection and Google sign-in
Dashboard: Comprehensive sustainability metrics and token monitoring
Marketplace: Token redemption and energy trading
Wallet: Balance overview and transaction history
🛠 Tech Stack
Frontend
React with TypeScript
Vite for build tooling
Tailwind CSS for styling
shadcn/ui component library
Blockchain Integration
wagmi - React Hooks for Ethereum
viem - TypeScript Ethereum library
WalletConnect - Multi-wallet support
Ethereum (Mainnet, Sepolia, Polygon)
Smart Contracts
ERC-20 tokens (GreenTokens)
ERC-1155 tokens (EcoCredits)
Integration ready for contracts from: https://github.com/AbhayCodes01/yourja-frontend
🎨 Design System
The platform features a modern dark theme with:

Primary Color: Teal/Cyan (#00D4AA) for CTAs and highlights
Secondary Color: Green tones for sustainability theme
Glassmorphic cards with gradient borders
Smooth animations and transitions
Responsive layout for all devices
🚀 Getting Started
Prerequisites
Node.js & npm installed
MetaMask or compatible Web3 wallet
Installation
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd yourja

# Install dependencies
npm install

# Start development server
npm run dev
The app will be available at http://localhost:8080

Environment Setup
For WalletConnect integration, update the projectId in src/lib/wagmi-config.ts:

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'
Get your project ID from WalletConnect Cloud

📱 Usage
Connect Wallet: Click "Connect" and choose MetaMask or WalletConnect
View Dashboard: See your token balances, energy stats, and recycling metrics
Earn Tokens:
Generate solar energy to earn GreenTokens
Recycle e-waste to earn EcoCredits
Redeem Rewards: Visit the marketplace to exchange tokens for vouchers
Trade Energy: Buy or sell surplus renewable energy
🌍 Environmental Impact
Yourja addresses critical sustainability challenges:

E-Waste: India generates 3.2M+ tonnes/year with <20% recycled
Solar Energy: Supporting India's 40 GW rooftop solar target
Net Zero 2070: Contributing to India's carbon neutrality mission
📊 Key Metrics Tracked
Energy generation and consumption
Recycling amounts and eco-credits earned
Carbon footprint reduction
Token values and market prices
Waste market rates for various materials
🔐 Security
Blockchain-verified transactions
Secure wallet connections
Custodially managed tokens
Transparent audit trails
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📄 License
This project is built for the IIIT Nagpur TantraFiesta Web3 Hackathon.

🔗 Links
Lovable Project
Smart Contracts Repository
💡 Vision
Yourja makes sustainability rewarding for citizens and verifiable for businesses by:

Tokenizing waste & clean energy as verifiable assets
Creating citizen-driven sustainability markets
Providing transparent ESG/CSR compliance tracking
Gamifying eco-friendly behavior
