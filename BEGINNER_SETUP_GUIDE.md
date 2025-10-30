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

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GreenToken {
    string public name = "GreenToken";
    string public symbol = "GRN";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10**18;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Insufficient allowance");
        
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        
        emit Transfer(from, to, value);
        return true;
    }
    
    function mint(address to, uint256 amount) public {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }
}
```

5. Paste it and save (Ctrl+S)

### 4.3 Create Your Second Contract (EcoCredit)
1. Right-click on "contracts" folder again
2. Click "New File"
3. Name it: `EcoCredit.sol`
4. Copy this code EXACTLY:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EcoCredit {
    string public name = "EcoCredit";
    string public symbol = "ECO";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10**18;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Insufficient allowance");
        
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        
        emit Transfer(from, to, value);
        return true;
    }
    
    function mint(address to, uint256 amount) public {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }
}
```

5. Paste it and save (Ctrl+S)

### 4.4 Compile Your Contracts
1. Click on the "Solidity Compiler" tab (looks like a Solidity logo)
2. Make sure "Compiler" is set to "0.8.19" or newer
3. Click "Compile GreenToken.sol"
4. Wait for green checkmark
5. Click "Compile EcoCredit.sol"
6. Wait for green checkmark

### 4.5 Deploy GreenToken Contract
1. Click on "Deploy & Run Transactions" tab (looks like an Ethereum logo)
2. **IMPORTANT**: Change "Environment" to "Injected Provider - MetaMask"
3. MetaMask will pop up - click "Connect"
4. Make sure you're on "Sepolia Test Network" in MetaMask
5. Under "Contract", select "GreenToken"
6. Click the orange "Deploy" button
7. MetaMask will pop up asking for gas fee - click "Confirm"
8. Wait 30 seconds for confirmation
9. **COPY THE CONTRACT ADDRESS** - it will appear under "Deployed Contracts"
   - It looks like: `0x1234567890abcdef...`
   - **SAVE THIS ADDRESS** - call it "GreenToken Address"

### 4.6 Deploy EcoCredit Contract  
1. Under "Contract", select "EcoCredit"
2. Click the orange "Deploy" button
3. MetaMask will pop up - click "Confirm"
4. Wait 30 seconds for confirmation
5. **COPY THE CONTRACT ADDRESS** - it will appear under "Deployed Contracts"
   - **SAVE THIS ADDRESS** - call it "EcoCredit Address"

### 4.7 Give Yourself Test Tokens
**For GreenToken:**
1. Under "Deployed Contracts", expand your GreenToken contract
2. Find the "mint" function (orange button)
3. Next to "mint", you'll see two input boxes:
   - **to**: Paste your MetaMask wallet address
   - **amount**: Type `1000000000000000000000` (this is 1000 tokens)
4. Click the "mint" button
5. Confirm in MetaMask
6. Wait 30 seconds

**For EcoCredit:**
1. Under "Deployed Contracts", expand your EcoCredit contract
2. Find the "mint" function
3. In the input boxes:
   - **to**: Paste your MetaMask wallet address  
   - **amount**: Type `1000000000000000000000` (this is 1000 tokens)
4. Click the "mint" button
5. Confirm in MetaMask
6. Wait 30 seconds

**What just happened?** You gave yourself 1000 GRN tokens and 1000 ECO tokens to test with!

---

## 🔧 STEP 5: Update Your App Configuration

### 5.1 Update Contract Addresses
1. Go back to your project folder in VS Code
2. Open the file: `src/lib/contracts.ts`
3. Find these lines (around line 4 and 67):

**FIND THIS:**
```typescript
GreenToken: {
  address: '0x5B0d90591f0f06dDF452d10dAe3bdd3308BB8149',
```

**REPLACE WITH:** (use YOUR GreenToken address)
```typescript
GreenToken: {
  address: '0xYOUR_GREENTOKEN_ADDRESS_HERE',
```

**FIND THIS:**
```typescript
EcoCredit: {
  address: '0xa0Ec3528A4d95A8CF3EbB59cA90b329962Ba3744',
```

**REPLACE WITH:** (use YOUR EcoCredit address)
```typescript
EcoCredit: {
  address: '0xYOUR_ECOCREDIT_ADDRESS_HERE',
```

4. Save the file (Ctrl+S)

### 5.2 Set Your Merchant Address
1. Copy your MetaMask wallet address (click on account name to copy)
2. Open the file: `src/pages/Marketplace.tsx`
3. Find line 36 that looks like:

**FIND THIS:**
```typescript
const MERCHANT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
```

**REPLACE WITH:** (use YOUR wallet address)
```typescript
const MERCHANT_ADDRESS = "0xYOUR_WALLET_ADDRESS_HERE";
```

4. Save the file (Ctrl+S)

**What just happened?** Now when people buy vouchers, the tokens will come to YOUR wallet!

---

## 🎉 STEP 6: Test Your App

### 6.1 Start Your App
```bash
# In your project terminal, run:
npm run dev
```

### 6.2 Open Your App
1. Open your browser
2. Go to: http://localhost:8080
3. You should see your Yourja homepage!

### 6.3 Connect Your Wallet
1. Click "Connect" button in the top right
2. Choose "MetaMask" 
3. MetaMask will pop up - click "Connect"
4. You should see "Connected" in the top right

### 6.4 Check Your Token Balances
1. Click "Dashboard" in the navigation
2. You should see:
   - **1000 GRN tokens** ≈ ₹207,580
   - **1000 ECO tokens** ≈ ₹72,110
3. If you see this, **CONGRATULATIONS!** Your blockchain integration is working!

### 6.5 Test Buying a Voucher
1. Click "Marketplace" in navigation
2. Find "Amazon Gift Card" (costs 500 GRN)
3. Click "Redeem Now"
4. MetaMask will pop up asking to confirm transaction
5. Click "Confirm"
6. Wait 30 seconds
7. You should see a success message!
8. Check your GRN balance - it should now be 500 (you "spent" 500 tokens)

---

## 🎆 STEP 7: Celebrate!

**If everything above worked, you have successfully:**

✅ Created a blockchain application  
✅ Deployed smart contracts on Ethereum testnet  
✅ Connected MetaMask wallet  
✅ Shown real token balances from blockchain  
✅ Processed blockchain transactions  
✅ Built a complete DeFi marketplace  

**You are now a blockchain developer!** 🎉

---

## 🔄 Common Problems and Solutions

### Problem: "Cannot connect to MetaMask"
**Solution:**
- Make sure MetaMask is installed
- Make sure you're on Sepolia Test Network
- Try refreshing the page
- Check if WalletConnect Project ID is correct in `.env`

### Problem: "Balance shows 0 tokens"
**Solution:**
- Make sure you used the correct contract addresses in `contracts.ts`
- Make sure you minted tokens to your wallet address
- Try refreshing the page
- Check your wallet address is correct

### Problem: "Transaction fails"
**Solution:**
- Make sure you have enough Sepolia ETH for gas
- Make sure you have enough tokens for the purchase
- Make sure you're on Sepolia network
- Check contract addresses are correct

### Problem: "npm install fails"
**Solution:**
- Make sure Node.js is installed correctly
- Try deleting `node_modules` folder and running `npm install` again
- Check your internet connection

---

## 🚀 Next Steps for Hackathon

1. **Customize the design** - Change colors, add your logo
2. **Add more features** - Energy trading, recycling tracker
3. **Deploy to production** - Use services like Vercel or Netlify
4. **Add real data** - Connect to IoT devices, real recycling data
5. **Write your hackathon presentation** - Explain the problem you're solving

**You've built something amazing! Good luck with your hackathon!** 🎆