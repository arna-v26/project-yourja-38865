#!/bin/bash

echo "🌿 Setting up Yourja - Blockchain Sustainability Platform"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js and npm first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "🔧 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your values."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo "================================"
echo "1. Update .env file with your configuration:"
echo "   - Get WalletConnect Project ID from: https://cloud.walletconnect.com/"
echo "   - Add your wallet address as MERCHANT_ADDRESS"
echo ""
echo "2. Deploy smart contracts:"
echo "   - Go to https://remix.ethereum.org/"
echo "   - Copy contracts from /contracts/ folder"
echo "   - Deploy on Sepolia testnet"
echo "   - Update contract addresses in src/lib/contracts.ts"
echo ""
echo "3. Get Sepolia ETH:"
echo "   - Visit https://sepoliafaucet.com/"
echo "   - Get test ETH for transactions"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "5. Visit http://localhost:8080 and connect your wallet!"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "🐛 If you encounter issues, check the troubleshooting section"
echo ""
echo "Happy building! 🚀"