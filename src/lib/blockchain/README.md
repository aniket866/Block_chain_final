
# DeepChain Blockchain Core

This directory contains the implementation of DeepChain's blockchain core functionality, including both Solidity smart contracts and Rust-based blockchain implementation.

## Smart Contracts

The `contracts` directory contains Solidity smart contracts:

- `DeepChainToken.sol`: An ERC-20 token implementation for the DeepChain platform
- `DeepChainStaking.sol`: A staking contract for DeepChain tokens with reward distribution

## Rust Blockchain Implementation

The Rust blockchain implementation under `src/lib/rust/` provides a WebAssembly-compatible blockchain core with the following features:

- Complete blockchain data structure with blocks and transactions
- Transaction creation and validation
- Proof-of-work mining algorithm
- Wallet balance tracking
- Chain validation

## JavaScript/TypeScript Bridge

The `blockchain.ts` file provides a TypeScript bridge between our web application and the Rust-based blockchain operations. This allows for:

- Wallet connection with MetaMask and other providers
- Transaction signing and submission
- Smart contract interaction
- Blockchain queries

## Usage

### Connecting a Wallet

```js
import { connectWallet } from '@/lib/rust/blockchain';

// Connect to MetaMask
const wallet = await connectWallet('metamask');
```

### Creating a Transaction

```js
import { createTransaction } from '@/lib/rust/blockchain';

// Create a transaction (recipient address, amount, fee)
const result = await createTransaction('0x123...', 10, 0.001);
```

### Mining Transactions

```js
import { minePendingTransactions } from '@/lib/rust/blockchain';

// Mine pending transactions
await minePendingTransactions();
```

### Getting Blockchain Information

```js
import { getBlockchainInfo } from '@/lib/rust/blockchain';

// Get blockchain stats
const info = await getBlockchainInfo();
console.log(info.blockHeight, info.tps);
```

## Technical Details

The Rust implementation is compiled to WebAssembly and loaded by the browser. This provides:

1. Near-native performance for cryptographic operations
2. Client-side validation and processing
3. Secure transaction handling
4. Reduced server load for blockchain operations

For production use, the system would connect to actual blockchain networks through RPC providers.
