import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, FileCode, Github, Globe, Grid, Library, Puzzle, Server, Terminal, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const DeveloperPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4 hero-text-gradient">Developer Portal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Build decentralized applications with our comprehensive tools, APIs, and documentation.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {devStats.map((stat, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="crypto-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Tabs defaultValue="sdks" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="sdks">SDKs & Libraries</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="rust">Rust Smart Contracts</TabsTrigger>
            <TabsTrigger value="examples">Example Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sdks">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {sdks.map((sdk, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="crypto-card h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-secondary p-2 rounded">
                          <sdk.icon className="w-5 h-5 text-primary" />
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">v{sdk.version}</Button>
                      </div>
                      <CardTitle>{sdk.name}</CardTitle>
                      <CardDescription>{sdk.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <div className="bg-secondary/20 p-3 rounded text-xs font-mono overflow-x-auto">
                        {sdk.installCommand}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Compatible with:</p>
                        <div className="flex flex-wrap gap-2">
                          {sdk.compatibility.map((item, i) => (
                            <span key={i} className="text-xs bg-secondary/20 px-2 py-1 rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      <Button variant="default" size="sm">Documentation</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="api">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>REST API Documentation</CardTitle>
                <CardDescription>Comprehensive reference for DeepChain API endpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="border border-border rounded-md">
                      <div className="flex items-center p-3 border-b border-border bg-secondary/10">
                        <span className={`px-2 py-0.5 text-xs font-mono rounded mr-3 ${
                          endpoint.method === 'GET' ? 'bg-green-500/20 text-green-500' :
                          endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-500' :
                          endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>{endpoint.method}</span>
                        <span className="font-mono text-sm">{endpoint.path}</span>
                      </div>
                      <div className="p-3">
                        <p className="text-sm mb-2">{endpoint.description}</p>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Response Format:</p>
                          <div className="bg-secondary/20 p-2 rounded text-xs font-mono">
                            {endpoint.responseExample}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button>View Full API Documentation</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rust">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <Card className="crypto-card h-full">
                  <CardHeader>
                    <CardTitle>Rust Smart Contracts</CardTitle>
                    <CardDescription>High-performance, secure smart contracts written in Rust</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Build efficient, secure, and reliable smart contracts using Rust programming language. Our Rust-based smart contract framework offers superior performance and enhanced security compared to traditional solutions.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Benefits:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span>Memory safety without garbage collection</span>
                        </li>
                        <li className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span>Concurrency without data races</span>
                        </li>
                        <li className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span>Abstraction without overhead</span>
                        </li>
                        <li className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span>Enhanced security auditing capabilities</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Get Started with Rust</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:col-span-8">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Rust Smart Contract Example</CardTitle>
                    <CardDescription>Token contract implementation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/20 p-4 rounded text-sm font-mono whitespace-pre overflow-x-auto">
{`use deepchain_contract::prelude::*;

#[contract]
pub struct Token {
    token_name: String,
    token_symbol: String,
    decimals: u8,
    total_supply: Balance,
    balances: LookupMap<AccountId, Balance>,
    allowances: LookupMap<(AccountId, AccountId), Balance>,
}

#[deepchain]
impl Token {
    #[init]
    pub fn new(name: String, symbol: String, total_supply: Balance) -> Self {
        let mut contract = Self {
            token_name: name,
            token_symbol: symbol,
            decimals: 18,
            total_supply,
            balances: LookupMap::new(b"balances"),
            allowances: LookupMap::new(b"allowances"),
        };
        
        let owner_id = env::predecessor_account_id();
        contract.balances.insert(owner_id, &total_supply);
        
        contract
    }
    
    #[payable]
    pub fn transfer(&mut self, to: AccountId, amount: Balance) -> bool {
        let sender = env::predecessor_account_id();
        self._transfer(sender, to, amount)
    }
    
    #[payable]
    pub fn approve(&mut self, spender: AccountId, amount: Balance) -> bool {
        let owner = env::predecessor_account_id();
        self.allowances.insert(&(owner, spender), &amount);
        true
    }
    
    fn _transfer(
        &mut self,
        sender: AccountId,
        receiver: AccountId,
        amount: Balance,
    ) -> bool {
        let sender_balance = self.balance_of(sender.clone());
        require!(
            sender_balance >= amount,
            "Token: transfer amount exceeds balance"
        );
        
        self.balances.insert(&sender, &(sender_balance - amount));
        let receiver_balance = self.balance_of(receiver.clone());
        self.balances.insert(&receiver, &(receiver_balance + amount));
        
        true
    }
    
    pub fn balance_of(&self, owner: AccountId) -> Balance {
        self.balances.get(&owner).unwrap_or(0)
    }
}`}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="default">Documentation</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="examples">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {exampleProjects.map((project, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="crypto-card h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-primary/10 p-2 rounded">
                          <project.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center">
                          <Github className="w-4 h-4 mr-1" />
                          <span className="text-xs">{project.stars}</span>
                        </div>
                      </div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-secondary/20 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Project</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const devStats = [
  { 
    title: 'Total Developers',
    value: '2,500+',
    icon: Code
  },
  { 
    title: 'Smart Contracts',
    value: '1,200+',
    icon: FileCode
  },
  { 
    title: 'GitHub Stars',
    value: '12.4k',
    icon: Github
  },
  { 
    title: 'API Requests/Day',
    value: '14.5M',
    icon: Server
  },
];

const sdks = [
  {
    name: 'Web3.js SDK',
    description: 'JavaScript library for interacting with the DeepChain blockchain',
    version: '2.4.0',
    installCommand: 'npm install @deepchain/web3-sdk',
    compatibility: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    icon: Globe
  },
  {
    name: 'Python SDK',
    description: 'Python library for blockchain interaction and smart contract deployment',
    version: '1.8.2',
    installCommand: 'pip install deepchain-python',
    compatibility: ['Python 3.7+', 'Django', 'Flask', 'FastAPI'],
    icon: Terminal
  },
  {
    name: 'Rust Client',
    description: 'High-performance client for DeepChain written in Rust',
    version: '0.9.5',
    installCommand: 'cargo add deepchain-client',
    compatibility: ['Rust 1.60+', 'Linux', 'MacOS', 'Windows'],
    icon: Database
  },
  {
    name: 'Mobile SDK',
    description: 'Native integration for iOS and Android applications',
    version: '1.3.1',
    installCommand: 'pod install DeepChainSDK / implementation "com.deepchain:sdk:1.3.1"',
    compatibility: ['iOS 13+', 'Android 7.0+', 'React Native', 'Flutter'],
    icon: Grid
  },
  {
    name: 'Smart Contract SDK',
    description: 'Tools for developing, testing, and deploying smart contracts',
    version: '3.1.0',
    installCommand: 'npm install @deepchain/contract-sdk',
    compatibility: ['Solidity', 'Rust', 'AssemblyScript', 'Vyper'],
    icon: Puzzle
  },
  {
    name: 'Analytics SDK',
    description: 'Data analysis and visualization tools for blockchain metrics',
    version: '0.7.4',
    installCommand: 'npm install @deepchain/analytics',
    compatibility: ['JavaScript', 'React', 'Vue', 'D3.js'],
    icon: Library
  }
];

const apiEndpoints = [
  {
    method: 'GET',
    path: '/v1/blocks/latest',
    description: 'Retrieve information about the latest block',
    responseExample: '{ "height": 12345678, "hash": "0x1a2b...", "timestamp": 1678234567 }'
  },
  {
    method: 'GET',
    path: '/v1/transactions/{hash}',
    description: 'Get details about a specific transaction',
    responseExample: '{ "hash": "0xabc...", "status": "confirmed", "from": "0x123...", "to": "0x456..." }'
  },
  {
    method: 'POST',
    path: '/v1/transactions/submit',
    description: 'Submit a signed transaction to the network',
    responseExample: '{ "hash": "0xdef...", "status": "pending" }'
  },
  {
    method: 'GET',
    path: '/v1/accounts/{address}',
    description: 'Get account information and balances',
    responseExample: '{ "address": "0x789...", "balance": "123.456", "nonce": 42 }'
  },
  {
    method: 'GET',
    path: '/v1/contracts/{address}',
    description: 'Get information about a deployed contract',
    responseExample: '{ "address": "0xabc...", "creator": "0x123...", "bytecode": "0x..." }'
  },
  {
    method: 'POST',
    path: '/v1/contracts/call',
    description: 'Call a smart contract method (read-only)',
    responseExample: '{ "result": "0x...", "gasUsed": 21000 }'
  }
];

const exampleProjects = [
  {
    name: 'Token Exchange',
    description: 'Complete decentralized exchange with order book and liquidity pools',
    stars: '1.2k',
    tags: ['DeFi', 'React', 'Solidity', 'Web3.js'],
    icon: FileCode
  },
  {
    name: 'NFT Marketplace',
    description: 'Full-featured NFT marketplace with minting and trading',
    stars: '876',
    tags: ['NFT', 'ERC-721', 'ERC-1155', 'IPFS'],
    icon: Grid
  },
  {
    name: 'DAO Governance Portal',
    description: 'Governance interface for decentralized autonomous organizations',
    stars: '543',
    tags: ['DAO', 'Governance', 'Voting', 'React'],
    icon: Users
  },
  {
    name: 'Cross-Chain Bridge',
    description: 'Bridge for moving assets between different blockchain networks',
    stars: '321',
    tags: ['Cross-Chain', 'Bridge', 'Interoperability'],
    icon: Globe
  },
  {
    name: 'DID Identity Manager',
    description: 'Decentralized identity management application',
    stars: '289',
    tags: ['DID', 'Identity', 'Verification', 'ZK-Proofs'],
    icon: Code
  },
  {
    name: 'Smart Contract Wallet',
    description: 'Social recovery and multi-signature wallet implementation',
    stars: '456',
    tags: ['Wallet', 'Multi-sig', 'Recovery', 'Security'],
    icon: Puzzle
  }
];

export default DeveloperPage;
