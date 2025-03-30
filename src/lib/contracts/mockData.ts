
import { Identity, Proposal, Collection, LiquidityPool, NFT, Token, Chain } from './types';

// Export mock identities data
export const identities: Identity[] = [
  {
    id: "1",
    name: "John Doe",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    did: "did:ethr:0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    createdAt: Date.now() - 1000000,
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=1",
    reputation: 92,
    credentials: [
      {
        type: "KYCVerified",
        issuer: "0x123456789abcdef",
        issuanceDate: Date.now() - 500000
      },
      {
        type: "VerifiedDeveloper",
        issuer: "0xabcdef123456789",
        issuanceDate: Date.now() - 300000
      }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    address: "0x8dA2F39C28AA345C4A1f3c68Cd8b8423AFcE7568",
    did: "did:ethr:0x8dA2F39C28AA345C4A1f3c68Cd8b8423AFcE7568",
    createdAt: Date.now() - 2000000,
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=2",
    reputation: 88,
    credentials: [
      {
        type: "DAOMember",
        issuer: "0x567890abcdef123",
        issuanceDate: Date.now() - 400000
      }
    ]
  }
];

// Export mock proposals data
export const proposals: Proposal[] = [
  {
    id: "1",
    title: "Treasury Diversification",
    description: "Diversify the DAO treasury by allocating 20% to stablecoins",
    proposer: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    status: "active",
    forVotes: 620,
    againstVotes: 380,
    createdAt: Date.now() - 864000000, // 10 days ago
    startDate: Date.now() - 864000000,
    endDate: Date.now() + 432000000, // 5 days from now
    executor: undefined,
    eta: undefined
  },
  {
    id: "2",
    title: "Increase Developer Grants",
    description: "Allocate additional funds to the developer grants program",
    proposer: "0x8dA2F39C28AA345C4A1f3c68Cd8b8423AFcE7568",
    status: "passed",
    forVotes: 750,
    againstVotes: 250,
    createdAt: Date.now() - 1728000000, // 20 days ago
    startDate: Date.now() - 1728000000,
    endDate: Date.now() - 432000000, // 5 days ago
    executor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    eta: Date.now() + 86400000 // 1 day from now
  }
];

// Export mock collections data
export const collections: Collection[] = [
  {
    id: "1",
    name: "DeepChain Founder Series",
    description: "Exclusive NFTs for early DeepChain adopters",
    image: "https://picsum.photos/400/400?random=101",
    creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    items: 50,
    floorPrice: 1.5,
    totalVolume: 120
  },
  {
    id: "2",
    name: "Blockchain Avatars",
    description: "Unique avatar NFTs with on-chain metadata",
    image: "https://picsum.photos/400/400?random=102",
    creator: "0x8dA2F39C28AA345C4A1f3c68Cd8b8423AFcE7568",
    items: 100,
    floorPrice: 0.8,
    totalVolume: 250
  }
];

// Export mock NFTs data
export const nfts: NFT[] = [
  {
    id: "1",
    name: "Crypto Punk #42",
    description: "A unique pixelated character from the CryptoPunks collection",
    image: "https://picsum.photos/400/400?random=1",
    creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    collection: "CryptoPunks",
    price: 5.2,
    createdAt: Date.now() - 5000000
  },
  {
    id: "2",
    name: "Digital Dreamscape",
    description: "An ethereal digital landscape representing the blockchain universe",
    image: "https://picsum.photos/400/400?random=2",
    creator: "0x8dA2F39C28AA345C4A1f3c68Cd8b8423AFcE7568",
    owner: "0x8dA2F39C28AA345C4A1f3c68Cd8b8423AFcE7568",
    collection: "Digital Dreams",
    price: 2.8,
    createdAt: Date.now() - 3500000
  },
  {
    id: "3",
    name: "Abstract Blockchain",
    description: "An abstract representation of blockchain technology",
    image: "https://picsum.photos/400/400?random=3",
    creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    owner: "0x8dA2F39C28AA345C4A1f3c68Cd8b8423AFcE7568",
    collection: "Blockchain Art",
    price: 1.5,
    createdAt: Date.now() - 2500000
  }
];

// Export mock liquidityPools data
export const liquidityPools: LiquidityPool[] = [
  {
    id: "1",
    token0: {
      name: "Ethereum",
      symbol: "ETH",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      price: 3200,
      logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      balance: "500"  // Adding the required balance property
    },
    token1: {
      name: "DeepChain",
      symbol: "DEEP",
      address: "0x1111111111111111111111111111111111111111",
      decimals: 18,
      price: 5.5,
      logoURI: "https://via.placeholder.com/32",
      balance: "300000"  // Adding the required balance property
    },
    reserve0: "500",
    reserve1: "300000",
    totalSupply: "400000",
    apr: 12.5,
    volume24h: 1200000,
    fee: 0.3
  },
  {
    id: "2",
    token0: {
      name: "USD Coin",
      symbol: "USDC",
      address: "0x2222222222222222222222222222222222222222",
      decimals: 6,
      price: 1,
      logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
      balance: "250000"  // Adding the required balance property
    },
    token1: {
      name: "DeepChain",
      symbol: "DEEP",
      address: "0x1111111111111111111111111111111111111111",
      decimals: 18,
      price: 5.5,
      logoURI: "https://via.placeholder.com/32",
      balance: "50000"  // Adding the required balance property
    },
    reserve0: "250000",
    reserve1: "50000",
    totalSupply: "350000",
    apr: 18.3,
    volume24h: 800000,
    fee: 0.3
  }
];

// Export mock tokens data with balance property added to all tokens
export const tokens: Token[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    balance: "5.3452",
    price: 3200,
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
  },
  {
    name: "DeepChain",
    symbol: "DEEP",
    address: "0x1111111111111111111111111111111111111111",
    decimals: 18,
    balance: "1250.75",
    price: 5.5,
    logoURI: "https://via.placeholder.com/32"
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x2222222222222222222222222222222222222222",
    decimals: 6,
    balance: "3500.42",
    price: 1,
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg"
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0x3333333333333333333333333333333333333333",
    decimals: 8,
    balance: "0.123456",
    price: 52000,
    logoURI: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg"
  }
];

// Export mock chains data
export const chains: Chain[] = [
  {
    id: 1,
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    blockExplorerUrl: "https://etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    }
  },
  {
    id: 137,
    name: "Polygon",
    rpcUrl: "https://polygon-rpc.com",
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
    blockExplorerUrl: "https://polygonscan.com",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18
    }
  },
  {
    id: 42161,
    name: "Arbitrum One",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    icon: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
    blockExplorerUrl: "https://arbiscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    }
  },
  {
    id: 56,
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    icon: "https://cryptologos.cc/logos/bnb-bnb-logo.svg",
    blockExplorerUrl: "https://bscscan.com",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18
    }
  }
];
