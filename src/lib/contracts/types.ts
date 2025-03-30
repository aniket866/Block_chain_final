
export interface Identity {
  id: string;
  name: string;
  address: string;
  did: string;
  createdAt: number;
  verified: boolean;
  avatar: string;
  reputation: number;
  credentials: {
    type: string;
    issuer: string;
    issuanceDate: number;
  }[];
}

export interface Proposal {
  id: string; // Changed to string to make it consistent
  title: string;
  description: string;
  proposer: string;
  status: 'active' | 'passed' | 'executed' | 'failed';
  forVotes: number;
  againstVotes: number;
  createdAt: number;
  startDate: number;
  endDate: number;
  executor?: string; // Make this optional
  eta?: number; // Make this optional
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  creator: string;
  items: number;
  floorPrice: number;
  totalVolume: number;
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  creator: string;
  owner: string;
  collection: string;
  price: number;
  createdAt: number;
}

export interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  balance: string;
  price: number;
  logoURI: string;
}

export interface LiquidityPool {
  id: string;
  token0: Token;
  token1: Token;
  reserve0: string;
  reserve1: string;
  totalSupply: string;
  apr: number;
  volume24h: number;
  fee: number;
}

export interface Chain {
  id: number;
  name: string;
  rpcUrl: string;
  icon: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}
