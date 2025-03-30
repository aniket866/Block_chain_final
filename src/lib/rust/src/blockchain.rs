
//! Blockchain core implementation module

use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

// Block structure
#[derive(Clone, Serialize, Deserialize)]
pub struct Block {
    pub index: u64,
    pub timestamp: u64,
    pub transactions: Vec<Transaction>,
    pub previous_hash: String,
    pub hash: String,
    pub nonce: u64,
    pub difficulty: u64,
}

// Transaction structure
#[derive(Clone, Serialize, Deserialize)]
pub struct Transaction {
    pub id: String,
    pub from: String,
    pub to: String,
    pub amount: f64,
    pub fee: f64,
    pub timestamp: u64,
    pub signature: String,
}

// Blockchain structure
#[derive(Serialize, Deserialize)]
pub struct Blockchain {
    pub chain: Vec<Block>,
    pub pending_transactions: Vec<Transaction>,
    pub difficulty: u64,
    pub mining_reward: f64,
    pub node_url: String,
    pub peers: Vec<String>,
}

// Account balance cache
type BalanceCache = HashMap<String, f64>;

// Blockchain Implementation
impl Blockchain {
    // Create a new blockchain with genesis block
    pub fn new(node_url: &str, difficulty: u64, mining_reward: f64) -> Self {
        let mut blockchain = Blockchain {
            chain: Vec::new(),
            pending_transactions: Vec::new(),
            difficulty,
            mining_reward,
            node_url: node_url.to_string(),
            peers: Vec::new(),
        };

        // Create genesis block
        blockchain.create_genesis_block();
        blockchain
    }

    // Create the first block in the chain
    fn create_genesis_block(&mut self) {
        let genesis_block = Block {
            index: 0,
            timestamp: current_timestamp(),
            transactions: Vec::new(),
            previous_hash: "0".repeat(64),
            hash: "0".repeat(64),
            nonce: 0,
            difficulty: self.difficulty,
        };

        self.chain.push(genesis_block);
    }

    // Get the latest block in the chain
    pub fn get_latest_block(&self) -> &Block {
        self.chain.last().unwrap()
    }

    // Add a new transaction to pending transactions
    pub fn create_transaction(&mut self, transaction: Transaction) -> Result<(), String> {
        // Verify transaction
        if !self.verify_transaction(&transaction) {
            return Err("Transaction validation failed".to_string());
        }

        self.pending_transactions.push(transaction);
        Ok(())
    }

    // Verify a transaction is valid
    fn verify_transaction(&self, transaction: &Transaction) -> bool {
        // Check signature
        // Simplified for example - in production would verify cryptographic signature
        if transaction.signature.is_empty() {
            return false;
        }

        // Check sender has enough funds
        let balance = self.get_address_balance(&transaction.from);
        if transaction.from != "0" && balance < transaction.amount + transaction.fee {
            return false;
        }

        true
    }

    // Mine pending transactions
    pub fn mine_pending_transactions(&mut self, mining_reward_address: &str) -> Result<Block, String> {
        if self.pending_transactions.is_empty() {
            return Err("No transactions to mine".to_string());
        }

        // Create mining reward transaction
        let reward_tx = Transaction {
            id: format!("reward-{}", current_timestamp()),
            from: "0".to_string(), // 0 address represents system
            to: mining_reward_address.to_string(),
            amount: self.mining_reward,
            fee: 0.0,
            timestamp: current_timestamp(),
            signature: "SYSTEM".to_string(),
        };

        let mut transactions_to_mine = self.pending_transactions.clone();
        transactions_to_mine.push(reward_tx);

        // Create new block
        let previous_block = self.get_latest_block();
        let new_block = Block {
            index: previous_block.index + 1,
            timestamp: current_timestamp(),
            transactions: transactions_to_mine,
            previous_hash: previous_block.hash.clone(),
            hash: "".to_string(),
            nonce: 0,
            difficulty: self.difficulty,
        };

        // Mine the block (find valid hash)
        let mined_block = self.proof_of_work(new_block)?;

        // Add mined block to chain
        self.chain.push(mined_block.clone());

        // Clear pending transactions - they're now in the blockchain
        self.pending_transactions = Vec::new();

        Ok(mined_block)
    }

    // Proof of work algorithm
    fn proof_of_work(&self, mut block: Block) -> Result<Block, String> {
        let target = "0".repeat(block.difficulty as usize);
        
        let block_content = format!(
            "{}{}{}{}",
            block.index,
            block.previous_hash,
            serde_json::to_string(&block.transactions).unwrap(),
            block.timestamp
        );

        block.nonce = 0;
        loop {
            let data_with_nonce = format!("{}{}", block_content, block.nonce);
            let hash = calculate_hash(&data_with_nonce);
            
            if hash.starts_with(&target) {
                block.hash = hash;
                return Ok(block);
            }
            
            block.nonce += 1;
            
            // In real implementation, we'd periodically check if we should stop
            // mining (e.g., due to new block found elsewhere)
            if block.nonce % 100000 == 0 {
                // This would be a yield point in actual implementation
            }
        }
    }

    // Get the balance of an address
    pub fn get_address_balance(&self, address: &str) -> f64 {
        let mut balance = 0.0;
        
        // Iterate through all blocks and their transactions
        for block in &self.chain {
            for tx in &block.transactions {
                if tx.to == address {
                    balance += tx.amount;
                }
                
                if tx.from == address {
                    balance -= (tx.amount + tx.fee);
                }
            }
        }
        
        // Consider pending transactions too
        for tx in &self.pending_transactions {
            if tx.to == address {
                balance += tx.amount;
            }
            
            if tx.from == address {
                balance -= (tx.amount + tx.fee);
            }
        }
        
        balance
    }

    // Validate the entire blockchain
    pub fn is_chain_valid(&self) -> bool {
        // Iterate through chain (skipping genesis block)
        for i in 1..self.chain.len() {
            let current_block = &self.chain[i];
            let previous_block = &self.chain[i - 1];
            
            // Validate block hash
            let block_content = format!(
                "{}{}{}{}{}",
                current_block.index,
                current_block.previous_hash,
                serde_json::to_string(&current_block.transactions).unwrap(),
                current_block.timestamp,
                current_block.nonce
            );
            
            if calculate_hash(&block_content) != current_block.hash {
                return false;
            }
            
            // Validate reference to previous block
            if current_block.previous_hash != previous_block.hash {
                return false;
            }
        }
        
        true
    }

    // Add a new peer node
    pub fn add_peer(&mut self, peer_url: &str) {
        if !self.peers.contains(&peer_url.to_string()) {
            self.peers.push(peer_url.to_string());
        }
    }
}

// Calculate SHA-256 hash of input data
fn calculate_hash(data: &str) -> String {
    use sha2::{Sha256, Digest};
    let mut hasher = Sha256::new();
    hasher.update(data.as_bytes());
    let result = hasher.finalize();
    format!("{:x}", result)
}

// Get current Unix timestamp
fn current_timestamp() -> u64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs()
}

#[wasm_bindgen]
pub fn create_blockchain(node_url: &str, difficulty: u64, mining_reward: f64) -> JsValue {
    let blockchain = Blockchain::new(node_url, difficulty, mining_reward);
    JsValue::from_serde(&blockchain).unwrap()
}

#[wasm_bindgen]
pub fn create_transaction(
    blockchain_js: &JsValue,
    from: &str,
    to: &str,
    amount: f64,
    fee: f64,
    private_key: &str
) -> JsValue {
    let mut blockchain: Blockchain = blockchain_js.into_serde().unwrap();
    
    // Create transaction ID (normally would be a hash)
    let id = format!("tx-{}-{}", from, current_timestamp());
    
    // Sign transaction (simplified)
    let signature = format!("SIG_{}_{}", private_key, id);
    
    let transaction = Transaction {
        id,
        from: from.to_string(),
        to: to.to_string(),
        amount,
        fee,
        timestamp: current_timestamp(),
        signature,
    };
    
    match blockchain.create_transaction(transaction) {
        Ok(()) => JsValue::from_serde(&blockchain).unwrap(),
        Err(e) => {
            let error_obj = js_sys::Object::new();
            js_sys::Reflect::set(
                &error_obj,
                &JsValue::from_str("error"),
                &JsValue::from_str(&e),
            ).unwrap();
            JsValue::from(error_obj)
        }
    }
}

#[wasm_bindgen]
pub fn mine_pending_transactions(
    blockchain_js: &JsValue,
    mining_reward_address: &str
) -> JsValue {
    let mut blockchain: Blockchain = blockchain_js.into_serde().unwrap();
    
    match blockchain.mine_pending_transactions(mining_reward_address) {
        Ok(_) => JsValue::from_serde(&blockchain).unwrap(),
        Err(e) => {
            let error_obj = js_sys::Object::new();
            js_sys::Reflect::set(
                &error_obj,
                &JsValue::from_str("error"),
                &JsValue::from_str(&e),
            ).unwrap();
            JsValue::from(error_obj)
        }
    }
}

#[wasm_bindgen]
pub fn get_wallet_balance(blockchain_js: &JsValue, address: &str) -> f64 {
    let blockchain: Blockchain = blockchain_js.into_serde().unwrap();
    blockchain.get_address_balance(address)
}

#[wasm_bindgen]
pub fn is_blockchain_valid(blockchain_js: &JsValue) -> bool {
    let blockchain: Blockchain = blockchain_js.into_serde().unwrap();
    blockchain.is_chain_valid()
}
