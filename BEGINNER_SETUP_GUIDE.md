# 🚀 Complete Beginner's Setup Guide for Yourja

## What You're Going to Do

You're going to make a blockchain app that:
- Lets people connect their crypto wallets (like MetaMask)
- Shows their token balances (fake money for now)
- Lets them "buy" vouchers with tokens
- All transactions happen on the blockchain (like a public ledger)

## 📋 What You Need Before Starting

### 1. Install Required Software
**You need these programs on your computer:**

1. **Node.js** (JavaScript runtime)
   - Go to: https://nodejs.org/
   - Download the "LTS" version (green button)
   - Install it (click Next, Next, Next...)
   - Open terminal/command prompt and type: `node --version`
   - You should see something like `v18.17.0`

2. **MetaMask Browser Extension**
   - Go to: https://metamask.io/
   - Click "Download" → "Install MetaMask for Chrome/Firefox"
   - Create a new wallet (SAVE YOUR SEED PHRASE SAFELY!)
   - Remember your wallet password

3. **Code Editor (Optional but helpful)**
   - Download VS Code: https://code.visualstudio.com/
   - This makes editing code easier

---

## 🎯 STEP 1: Get Your Project Ready

### 1.1 Download Your Code
```bash
# Open terminal/command prompt
# Navigate to where you want the project (like Desktop)
cd Desktop

# Download your project
git clone https://github.com/arna-v26/project-yourja-38865
cd project-yourja-38865
```

### 1.2 Install Project Dependencies
```bash
# This downloads all the code libraries your project needs
npm install
```
*This will take 2-3 minutes. You'll see lots of text scrolling.*

### 1.3 Create Your Environment File
```bash
# Copy the example file to create your real config file
cp .env.example .env
```

**What just happened?** You created a file called `.env` that will store your secret keys and settings.

---

## 🔑 STEP 2: Get Your WalletConnect Project ID

### 2.1 Create WalletConnect Account
1. Go to: https://cloud.walletconnect.com/
2. Click "Get started for free"
3. Sign up with your email
4. Verify your email (check your inbox)

### 2.2 Create a New Project
1. After logging in, click "Create" or "New Project"
2. **Project Name**: Type "Yourja Hackathon"
3. **Project Description**: Type "Blockchain sustainability platform"
4. Click "Create Project"

### 2.3 Copy Your Project ID
1. You'll see a screen with your project details
2. Look for "Project ID" (it looks like: `a1b2c3d4e5f6...`)
3. Click the copy button next to it
4. **SAVE THIS ID** - you'll need it in the next step

### 2.4 Update Your .env File
1. Open your project folder in VS Code (or any text editor)
2. Find the file called `.env`
3. Look for this line:
   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   ```
4. Replace `your_walletconnect_project_id` with your actual ID:
   ```
   VITE_WALLETCONNECT_PROJECT_ID=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```
5. Save the file (Ctrl+S)

---

## 💰 STEP 3: Get Test Money (Sepolia ETH)

### 3.1 Add Sepolia Network to MetaMask
1. Open MetaMask extension
2. Click the network dropdown (probably says "Ethereum Mainnet")
3. Click "Add network" 
4. Click "Add a network manually"
5. Fill in these exact details:
   - **Network Name**: Sepolia Test Network
   - **New RPC URL**: https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
   - **Chain ID**: 11155111
   - **Currency Symbol**: ETH
   - **Block Explorer URL**: https://sepolia.etherscan.io
6. Click "Save"
7. Switch to "Sepolia Test Network"

### 3.2 Get Free Test ETH
1. Copy your wallet address from MetaMask (click on your account name)
2. Go to: https://sepoliafaucet.com/
3. Paste your address
4. Click "Send Me ETH"
5. Wait 30 seconds - you should see 0.5 ETH in your MetaMask

**Why do you need this?** Every blockchain transaction costs a tiny bit of ETH as a "gas fee"

---

## 🏗️ STEP 4: Deploy Your Smart Contracts

### 4.1 Open Remix IDE
1. Go to: https://remix.ethereum.org/
2. Wait for it to load (it's a code editor in your browser)

### 4.2 Create Your First Contract (GreenToken)
1. In the left panel, right-click on "contracts" folder
2. Click "New File"
3. Name it: `GreenToken.sol`
4. Copy this code EXACTLY: