
import { proposals, collections, nfts, tokens, chains, identities, liquidityPools } from './mockData';
import { Proposal, Collection, NFT, Token, LiquidityPool, Identity, Chain } from './types';

// Mock implementation for getAllProposals
export const getAllProposals = async (): Promise<Proposal[]> => {
  return Promise.resolve(proposals);
};

// Mock implementation for createProposal
export const createProposal = async (title: string, description: string): Promise<{ proposalId: string }> => {
  const newId = (proposals.length + 1).toString();
  const newProposal: Proposal = {
    id: newId,
    title,
    description,
    proposer: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    status: "active",
    forVotes: 0,
    againstVotes: 0,
    createdAt: Date.now(),
    startDate: Date.now(),
    endDate: Date.now() + 604800000, // 7 days from now
  };

  proposals.push(newProposal);
  return { proposalId: newId };
};

// Mock implementation for voteOnProposal
export const voteOnProposal = async (proposalId: string, support: boolean): Promise<void> => {
  const proposal = proposals.find(p => p.id === proposalId);
  if (proposal) {
    if (support) {
      proposal.forVotes += 100;
    } else {
      proposal.againstVotes += 100;
    }
  }
  return Promise.resolve();
};

// Mock implementation for executeProposal
export const executeProposal = async (proposalId: string): Promise<void> => {
  const proposal = proposals.find(p => p.id === proposalId);
  if (proposal) {
    proposal.status = "executed";
    proposal.executor = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
    proposal.eta = Date.now() + 86400000; // 1 day from now
  }
  return Promise.resolve();
};

// Mock implementation for getAllNFTs
export const getAllNFTs = async (): Promise<NFT[]> => {
  return Promise.resolve(nfts);
};

// Mock implementation for getAllCollections
export const getAllCollections = async (): Promise<Collection[]> => {
  return Promise.resolve(collections);
};

// Mock implementation for buyNFT
export const buyNFT = async (nftId: string, price: string): Promise<void> => {
  // Simulate buying NFT
  return Promise.resolve();
};

// Mock implementation for mintNFT
export const mintNFT = async (name: string, description: string, image: string, collectionId: string): Promise<{ nftId: string }> => {
  const newId = (nfts.length + 1).toString();
  const newNFT: NFT = {
    id: newId,
    name,
    description,
    image,
    creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    collection: collectionId,
    price: 0.1,
    createdAt: Date.now(),
  };

  nfts.push(newNFT);
  return { nftId: newId };
};

// Format address for display
export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Mock implementation for swapTokens
export const swapTokens = async (tokenInAddress: string, tokenOutAddress: string, amount: string): Promise<{ amountOut: string }> => {
  // Simulate token swap
  return { amountOut: (parseFloat(amount) * 0.98).toString() }; // 2% slippage
};

// Mock implementation for bridge asset - updating signature to match calls in ChainBridgeCard.tsx
export const bridgeAsset = async (sourceChainId: number, targetChainId: number, token: string): Promise<{ txHash: string }> => {
  // Simulate asset bridging
  return { txHash: `0x${Math.random().toString(16).slice(2)}` };
};

// Define SmartContractDeployer object with methods
export const SmartContractDeployer = {
  deployToken: async (name: string, symbol: string, supply: string): Promise<{ address: string, hash: string }> => {
    // Simulate token deployment
    return {
      address: `0x${Math.random().toString(16).slice(2)}`,
      hash: `0x${Math.random().toString(16).slice(2)}`
    };
  },
  
  deployNFTCollection: async (name: string, symbol: string): Promise<{ address: string, hash: string }> => {
    // Simulate NFT collection deployment
    return {
      address: `0x${Math.random().toString(16).slice(2)}`,
      hash: `0x${Math.random().toString(16).slice(2)}`
    };
  },
  
  deployDAO: async (name: string, tokenAddress: string): Promise<{ address: string, hash: string }> => {
    // Simulate DAO deployment
    return {
      address: `0x${Math.random().toString(16).slice(2)}`,
      hash: `0x${Math.random().toString(16).slice(2)}`
    };
  },
  
  deployDeFiProtocol: async (name: string, feeBps: string): Promise<{ address: string, hash: string }> => {
    // Simulate DeFi protocol deployment
    return {
      address: `0x${Math.random().toString(16).slice(2)}`,
      hash: `0x${Math.random().toString(16).slice(2)}`
    };
  }
};

// Mock implementations for DeFi functions
export const getAllTokens = async (): Promise<Token[]> => {
  return Promise.resolve(tokens);
};

export const getAllLiquidityPools = async (): Promise<LiquidityPool[]> => {
  return Promise.resolve(liquidityPools);
};

// Updated addLiquidity function with the correct parameter count to match calls in DeFiPage.tsx
export const addLiquidity = async (
  token0Address: string, 
  token1Address: string, 
  amount0: string
): Promise<{ lpTokens: string }> => {
  // Simulate adding liquidity
  return { lpTokens: (parseFloat(amount0) * 2).toString() };
};

export const stake = async (poolId: string, amount: string): Promise<void> => {
  // Simulate staking
  return Promise.resolve();
};

export const formatBalance = (balance: string, decimals: number = 18): string => {
  const balanceNum = parseFloat(balance);
  return balanceNum.toFixed(decimals > 6 ? 6 : decimals);
};

export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

// Mock implementation for identity functions
export const getAllIdentities = async (): Promise<Identity[]> => {
  return Promise.resolve(identities);
};

export const createIdentity = async (name: string, address: string, avatar: string): Promise<{ did: string }> => {
  const newId = (identities.length + 1).toString();
  const did = `did:ethr:${address}`;
  
  const newIdentity: Identity = {
    id: newId,
    name,
    address,
    did,
    createdAt: Date.now(),
    verified: false,
    avatar: avatar || "https://i.pravatar.cc/150?img=3",
    reputation: 50,
    credentials: []
  };
  
  identities.push(newIdentity);
  return { did };
};
