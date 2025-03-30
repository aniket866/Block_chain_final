import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  CopyIcon, 
  FileCode, 
  FileText, 
  Info, 
  Layers, 
  Loader2, 
  UploadCloud 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StatCard from '@/components/ui/StatCard';
import { useToast } from '@/hooks/use-toast';
import { SmartContractDeployer } from '@/lib/contracts/contractUtils';
import { chains } from '@/lib/contracts/mockData';
import { Coins, Image, RefreshCw, Users } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ContractsPage = () => {
  const { toast } = useToast();
  const [selectedContract, setSelectedContract] = useState('token');
  const [selectedChain, setSelectedChain] = useState(chains[0].id.toString());
  
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  
  const [nftName, setNftName] = useState('');
  const [nftSymbol, setNftSymbol] = useState('');
  
  const [daoName, setDaoName] = useState('');
  const [daoToken, setDaoToken] = useState('');
  
  const [defiName, setDefiName] = useState('');
  const [defiFeeBps, setDefiFeeBps] = useState('');
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedContract, setDeployedContract] = useState<{
    address: string;
    hash: string;
    type: string;
  } | null>(null);

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    try {
      let result;
      
      switch (selectedContract) {
        case 'token':
          if (!tokenName || !tokenSymbol || !tokenSupply) {
            throw new Error("Please fill out all token fields");
          }
          result = await SmartContractDeployer.deployToken(tokenName, tokenSymbol, tokenSupply);
          setDeployedContract({
            ...result,
            type: 'token'
          });
          break;
          
        case 'nft':
          if (!nftName || !nftSymbol) {
            throw new Error("Please fill out all NFT fields");
          }
          result = await SmartContractDeployer.deployNFTCollection(nftName, nftSymbol);
          setDeployedContract({
            ...result,
            type: 'nft'
          });
          break;
          
        case 'dao':
          if (!daoName || !daoToken) {
            throw new Error("Please fill out all DAO fields");
          }
          result = await SmartContractDeployer.deployDAO(daoName, daoToken);
          setDeployedContract({
            ...result,
            type: 'dao'
          });
          break;
          
        case 'defi':
          if (!defiName || !defiFeeBps) {
            throw new Error("Please fill out all DeFi fields");
          }
          result = await SmartContractDeployer.deployDeFiProtocol(defiName, defiFeeBps);
          setDeployedContract({
            ...result,
            type: 'defi'
          });
          break;
          
        default:
          throw new Error("Invalid contract type selected");
      }
      
      toast({
        title: "Contract deployed successfully!",
        description: `Your ${getContractTypeLabel(selectedContract)} has been deployed at ${result.address.slice(0, 8)}...${result.address.slice(-6)}`,
      });
    } catch (error) {
      toast({
        title: "Deployment failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'token': return 'Token Contract';
      case 'nft': return 'NFT Collection Contract';
      case 'dao': return 'DAO Governance Contract';
      case 'defi': return 'DeFi Protocol Contract';
      default: return 'Smart Contract';
    }
  };

  const handleCopyAddress = () => {
    if (deployedContract?.address) {
      navigator.clipboard.writeText(deployedContract.address);
      toast({
        title: "Copied to clipboard",
        description: "Contract address copied to clipboard",
      });
    }
  };

  const getContractCode = () => {
    switch (selectedContract) {
      case 'token':
        return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${tokenName || 'MyToken'} is ERC20, Ownable {
    constructor() ERC20("${tokenName || 'My Token'}", "${tokenSymbol || 'MTK'}") {
        _mint(msg.sender, ${tokenSupply || '1000000'} * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`;
      
      case 'nft':
        return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ${nftName || 'MyNFT'} is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("${nftName || 'My NFT Collection'}", "${nftSymbol || 'MNFT'}") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}`;
      
      case 'dao':
        return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

contract ${daoName || 'MyDAO'} is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl {
    constructor(
        IVotes _token,
        TimelockController _timelock
    )
        Governor("${daoName || 'My DAO'}")
        GovernorSettings(7200, /* 1 day */ 50400, /* 1 week */ 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4)
        GovernorTimelockControl(_timelock)
    {}

    function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingDelay();
    }

    function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber) public view override(IGovernor, GovernorVotesQuorumFraction) returns (uint256) {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
        return super.state(proposalId);
    }

    function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description)
        public override(Governor, IGovernor) returns (uint256) {
        return super.propose(targets, values, calldatas, description);
    }

    function _execute(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId) public view override(Governor, GovernorTimelockControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}`;
      
      case 'defi':
        return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ${defiName || 'MyDeFi'} is Ownable, ReentrancyGuard {
    string public name = "${defiName || 'My DeFi Protocol'}";
    uint256 public feeBps = ${defiFeeBps || '30'}; // 0.3% fee

    mapping(address => mapping(address => uint256)) public liquidity;
    mapping(address => mapping(address => uint256)) public reserves;

    event LiquidityAdded(address indexed provider, address indexed tokenA, address indexed tokenB, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed provider, address indexed tokenA, address indexed tokenB, uint256 amountA, uint256 amountB);
    event Swap(address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB
    ) external nonReentrant returns (uint256 liquidityAmount) {
        require(tokenA != tokenB, "Identical tokens");
        require(amountA > 0 && amountB > 0, "Zero amounts");

        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);

        reserves[tokenA][tokenB] += amountA;
        reserves[tokenB][tokenA] += amountB;

        liquidityAmount = (amountA + amountB) / 2;
        liquidity[msg.sender][tokenA] += liquidityAmount;
        liquidity[msg.sender][tokenB] += liquidityAmount;

        emit LiquidityAdded(msg.sender, tokenA, tokenB, amountA, amountB);
        return liquidityAmount;
    }

    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external nonReentrant returns (uint256 amountOut) {
        require(tokenIn != tokenOut, "Identical tokens");
        require(amountIn > 0, "Zero amount");
        require(reserves[tokenIn][tokenOut] > 0, "Insufficient reserves");

        uint256 reserveIn = reserves[tokenIn][tokenOut];
        uint256 reserveOut = reserves[tokenOut][tokenIn];

        amountOut = (amountIn * (10000 - feeBps) * reserveOut) / (reserveIn * 10000 + amountIn * (10000 - feeBps));
        require(amountOut > 0, "Insufficient output amount");

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).transfer(msg.sender, amountOut);

        reserves[tokenIn][tokenOut] += amountIn;
        reserves[tokenOut][tokenIn] -= amountOut;

        emit Swap(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
        return amountOut;
    }
}`;
      
      default:
        return '// Select a contract type to see sample code';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4 hero-text-gradient">Smart Contracts</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Deploy and interact with smart contracts on multiple blockchain networks.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn}>
            <StatCard
              title="Deployed Contracts"
              value="24"
              icon={<FileCode className="h-6 w-6" />}
              trend={5.8}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Networks"
              value={chains.length.toString()}
              icon={<Layers className="h-6 w-6" />}
              trend={2.3}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Contract Interactions"
              value="1,285"
              icon={<Code className="h-6 w-6" />}
              trend={9.2}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Gas Saved"
              value="$1,245.32"
              icon={<Info className="h-6 w-6" />}
              trend={12.5}
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Card className="crypto-card h-full">
              <CardHeader>
                <CardTitle>Deploy Smart Contract</CardTitle>
                <CardDescription>
                  Select a template and customize your contract
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contract-type">Contract Type</Label>
                  <Select value={selectedContract} onValueChange={setSelectedContract}>
                    <SelectTrigger id="contract-type">
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="token">Token (ERC20)</SelectItem>
                      <SelectItem value="nft">NFT Collection (ERC721)</SelectItem>
                      <SelectItem value="dao">DAO Governance</SelectItem>
                      <SelectItem value="defi">DeFi Protocol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="blockchain">Target Blockchain</Label>
                  <Select value={selectedChain} onValueChange={setSelectedChain}>
                    <SelectTrigger id="blockchain">
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      {chains.map((chain) => (
                        <SelectItem key={chain.id} value={chain.id.toString()}>
                          <div className="flex items-center">
                            <img src={chain.icon} alt={chain.name} className="w-5 h-5 mr-2 rounded-full" />
                            {chain.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedContract === 'token' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="token-name">Token Name</Label>
                      <Input
                        id="token-name"
                        placeholder="e.g., My Token"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="token-symbol">Token Symbol</Label>
                      <Input
                        id="token-symbol"
                        placeholder="e.g., MTK"
                        value={tokenSymbol}
                        onChange={(e) => setTokenSymbol(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="token-supply">Initial Supply</Label>
                      <Input
                        id="token-supply"
                        placeholder="e.g., 1000000"
                        type="number"
                        value={tokenSupply}
                        onChange={(e) => setTokenSupply(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {selectedContract === 'nft' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nft-name">Collection Name</Label>
                      <Input
                        id="nft-name"
                        placeholder="e.g., My NFT Collection"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nft-symbol">Collection Symbol</Label>
                      <Input
                        id="nft-symbol"
                        placeholder="e.g., MNFT"
                        value={nftSymbol}
                        onChange={(e) => setNftSymbol(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {selectedContract === 'dao' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dao-name">DAO Name</Label>
                      <Input
                        id="dao-name"
                        placeholder="e.g., My DAO"
                        value={daoName}
                        onChange={(e) => setDaoName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dao-token">Governance Token Address</Label>
                      <Input
                        id="dao-token"
                        placeholder="e.g., 0x1234..."
                        value={daoToken}
                        onChange={(e) => setDaoToken(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {selectedContract === 'defi' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="defi-name">Protocol Name</Label>
                      <Input
                        id="defi-name"
                        placeholder="e.g., My DeFi Protocol"
                        value={defiName}
                        onChange={(e) => setDefiName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="defi-fee">Fee (Basis Points)</Label>
                      <Input
                        id="defi-fee"
                        placeholder="e.g., 30 (0.3%)"
                        type="number"
                        value={defiFeeBps}
                        onChange={(e) => setDefiFeeBps(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">100 basis points = 1%</p>
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-secondary/20 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Gas</span>
                    <span className="text-sm">
                      {selectedContract === 'token' ? '~1.2M gas' : 
                       selectedContract === 'nft' ? '~2.5M gas' : 
                       selectedContract === 'dao' ? '~4.8M gas' : 
                       selectedContract === 'defi' ? '~3.2M gas' : '~2.0M gas'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Cost</span>
                    <span className="text-sm">
                      {selectedContract === 'token' ? '~0.008 ETH' : 
                       selectedContract === 'nft' ? '~0.015 ETH' : 
                       selectedContract === 'dao' ? '~0.03 ETH' : 
                       selectedContract === 'defi' ? '~0.021 ETH' : '~0.012 ETH'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Compiler Version</span>
                    <span className="text-sm">v0.8.19</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Optimization</span>
                    <span className="text-sm">Enabled</span>
                  </div>
                </div>
                
                {deployedContract && (
                  <div className="p-4 border border-green-500/20 bg-green-500/5 rounded-lg space-y-2">
                    <h3 className="font-medium text-green-500 flex items-center">
                      <FileCode className="h-4 w-4 mr-2" />
                      Contract Deployed!
                    </h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contract Type</span>
                        <span className="text-sm">{getContractTypeLabel(deployedContract.type)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Network</span>
                        <span className="text-sm">{chains.find(c => c.id.toString() === selectedChain)?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Address</span>
                        <div className="flex items-center">
                          <span className="text-sm font-mono">{`${deployedContract.address.slice(0, 6)}...${deployedContract.address.slice(-4)}`}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={handleCopyAddress}>
                            <CopyIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Transaction Hash</span>
                        <span className="text-sm font-mono">{`${deployedContract.hash.slice(0, 6)}...${deployedContract.hash.slice(-4)}`}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="w-full bg-crypto-gradient hover:opacity-90 transition-opacity"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Deploy Contract
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="code">Contract Code</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
                <TabsTrigger value="interact">Interact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="code" className="mt-0">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Smart Contract Source Code</CardTitle>
                    <CardDescription>
                      Solidity code for the {getContractTypeLabel(selectedContract).toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-secondary/20 rounded-lg overflow-x-auto">
                      <pre className="text-sm font-mono whitespace-pre-wrap">
                        {getContractCode()}
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Copy Code
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Export ABI
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="docs" className="mt-0">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>{getContractTypeLabel(selectedContract)} Documentation</CardTitle>
                    <CardDescription>
                      Technical details and usage instructions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedContract === 'token' && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">ERC20 Token Contract</h3>
                          <p className="text-muted-foreground">
                            An ERC20 token contract that follows the standard interface for fungible tokens on Ethereum. 
                            This contract provides basic functionality for transfers, allowances, and minting new tokens.
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Features</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Standard ERC20 transfer and approval functions</li>
                            <li>Owner-only minting capability</li>
                            <li>Decimals support (18 by default)</li>
                            <li>Gas-optimized implementation</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Functions</h4>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">constructor</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Initializes the contract with a name, symbol, and initial supply.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              constructor() ERC20("Token Name", "TKN")
                            </div>
                          </div>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">mint</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Creates new tokens and assigns them to an address. Only callable by the contract owner.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function mint(address to, uint256 amount) public onlyOwner
                            </div>
                          </div>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">transfer</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Moves tokens from the caller's account to the recipient.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function transfer(address to, uint256 amount) public returns (bool)
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {selectedContract === 'nft' && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">ERC721 NFT Collection</h3>
                          <p className="text-muted-foreground">
                            An ERC721 contract that follows the standard interface for non-fungible tokens (NFTs) on Ethereum.
                            Each token represents a unique asset with its own metadata URI.
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Features</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Standard ERC721 transfer and approval functions</li>
                            <li>Metadata URI storage for each token</li>
                            <li>Owner-only minting capability</li>
                            <li>Automatic ID tracking</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Functions</h4>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">constructor</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Initializes the contract with a collection name and symbol.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              constructor() ERC721("Collection Name", "NFT")
                            </div>
                          </div>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">safeMint</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Creates a new token and assigns it to an address with the specified metadata URI.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function safeMint(address to, string memory uri) public onlyOwner
                            </div>
                          </div>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">tokenURI</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Returns the URI for a given token ID.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function tokenURI(uint256 tokenId) public view override returns (string memory)
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {selectedContract === 'dao' && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">DAO Governance Contract</h3>
                          <p className="text-muted-foreground">
                            A governance contract that enables token holders to propose, vote on, and execute changes to the protocol.
                            Built using OpenZeppelin's Governor framework with timelock functionality.
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Features</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Token-based voting power</li>
                            <li>Configurable voting delay, period, and quorum</li>
                            <li>Proposal creation and voting</li>
                            <li>Timelock for execution delay</li>
                            <li>Execute and cancel proposals</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Functions</h4>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">propose</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Creates a new governance proposal.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description) public returns (uint256)
                            </div>
                          </div>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">votingDelay</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Returns the delay before voting starts.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function votingDelay() public view returns (uint256)
                            </div>
                          </div>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">votingPeriod</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Returns the period during which votes can be cast.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function votingPeriod() public view returns (uint256)
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {selectedContract === 'defi' && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">DeFi Protocol Contract</h3>
                          <p className="text-muted-foreground">
                            A decentralized finance protocol that provides liquidity pools and swap functionality.
                            Includes security features and fee mechanisms.
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Features</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Liquidity provision and removal</li>
                            <li>Token swapping with automated pricing</li>
                            <li>Configurable fee structure</li>
                            <li>Reentrancy protection</li>
                            <li>Owner-only administrative functions</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Functions</h4>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">addLiquidity</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Adds liquidity to a token pair pool.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external returns (uint256 liquidityAmount)
                            </div>
                          </div>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">swap</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Exchanges one token for another through the protocol.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              function swap(address tokenIn, address tokenOut, uint256 amountIn) external returns (uint256 amountOut)
                            </div>
                          </div>
                          
                          <div className="p-3 border border-border rounded-lg">
                            <h5 className="font-medium">reserves</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Returns the reserve amount for a token pair.
                            </p>
                            <div className="text-xs font-mono bg-secondary/20 p-2 rounded-md">
                              mapping(address ={">"} mapping(address ={">"} uint256)) public reserves
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="interact" className="mt-0">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Interact with Smart Contracts</CardTitle>
                    <CardDescription>
                      Call functions and read data from deployed contracts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Deploy a contract first or connect to an existing contract to interact
                      </p>
                      <Button variant="outline" disabled={!deployedContract}>
                        Connect to Contract
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContractsPage;
