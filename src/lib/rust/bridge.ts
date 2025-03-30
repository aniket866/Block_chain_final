
/**
 * Bridge module for connecting Rust WebAssembly blockchain functionality to the UI
 */
import { getBlockchainInfo, initBlockchainWasm, createTransaction, minePendingTransactions } from './blockchain';

// Initialize blockchain on module load
let initialized = false;

export async function initializeBlockchain() {
  if (initialized) return;
  
  try {
    console.log("Initializing Rust blockchain bridge...");
    await initBlockchainWasm();
    initialized = true;
    console.log("Rust blockchain bridge initialized successfully");
    return true;
  } catch (error) {
    console.error("Failed to initialize Rust blockchain bridge:", error);
    return false;
  }
}

// Execute a blockchain transaction
export async function executeTransaction(from: string, to: string, amount: number, fee: number = 0.001) {
  if (!initialized) {
    await initializeBlockchain();
  }
  
  try {
    console.log(`Executing transaction: ${from} -> ${to}, Amount: ${amount}, Fee: ${fee}`);
    const result = await createTransaction(to, amount, fee);
    return result;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

// Mine a block of pending transactions
export async function mineBlock() {
  if (!initialized) {
    await initializeBlockchain();
  }
  
  try {
    console.log("Mining a new block...");
    const result = await minePendingTransactions();
    return result;
  } catch (error) {
    console.error("Mining failed:", error);
    throw error;
  }
}

// Get current blockchain information
export async function getBlockchain() {
  if (!initialized) {
    await initializeBlockchain();
  }
  
  try {
    return getBlockchainInfo();
  } catch (error) {
    console.error("Failed to get blockchain info:", error);
    throw error;
  }
}

// Initialize the blockchain automatically when the module is imported
initializeBlockchain().catch(console.error);
