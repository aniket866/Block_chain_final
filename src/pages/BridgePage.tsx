
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart3, 
  CircleEllipsis, 
  Clock, 
  Database, 
  LayersIcon, 
  Link, 
  Link2, 
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatCard from '@/components/ui/StatCard';
import ChainBridgeCard from '@/components/ChainBridgeCard';
import { chains } from '@/lib/contracts/mockData';
import { formatAddress } from '@/lib/contracts/contractUtils';

// Animations
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

const BridgePage = () => {
  const [activeTransfers] = useState([
    {
      id: 'tx1',
      fromChain: chains[0],
      toChain: chains[1],
      token: 'WETH',
      amount: '1.5',
      status: 'confirming',
      progress: 35,
      timeRemaining: '~12 minutes',
      hash: '0x1a2b3c4d5e6f',
      timestamp: Date.now() - 5 * 60 * 1000,
    },
    {
      id: 'tx2',
      fromChain: chains[1],
      toChain: chains[3],
      token: 'USDC',
      amount: '500',
      status: 'processing',
      progress: 75,
      timeRemaining: '~4 minutes',
      hash: '0x7a8b9c0d1e2f',
      timestamp: Date.now() - 10 * 60 * 1000,
    },
  ]);

  const [completedTransfers] = useState([
    {
      id: 'tx3',
      fromChain: chains[0],
      toChain: chains[2],
      token: 'WBTC',
      amount: '0.05',
      status: 'completed',
      hash: '0x3c4d5e6f7a8b',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
    },
    {
      id: 'tx4',
      fromChain: chains[2],
      toChain: chains[0],
      token: 'LINK',
      amount: '25',
      status: 'completed',
      hash: '0x5e6f7a8b9c0d',
      timestamp: Date.now() - 8 * 60 * 60 * 1000,
    },
    {
      id: 'tx5',
      fromChain: chains[1],
      toChain: chains[0],
      token: 'MATIC',
      amount: '100',
      status: 'completed',
      hash: '0x7a8b9c0d1e2f',
      timestamp: Date.now() - 16 * 60 * 60 * 1000,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirming':
        return 'text-yellow-500';
      case 'processing':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirming':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <CircleEllipsis className="h-4 w-4" />;
      case 'completed':
        return <ArrowRight className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <CircleEllipsis className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes ago`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(seconds / 86400)} days ago`;
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
          <h1 className="text-4xl font-bold mb-4 nft-text-gradient">Cross-Chain Bridge</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Seamlessly transfer assets between different blockchain networks with our secure bridge protocol.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn}>
            <StatCard
              title="Total Bridged Volume"
              value="$125.8M"
              icon={<BarChart3 className="h-6 w-6" />}
              trend={8.2}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Supported Chains"
              value={chains.length.toString()}
              icon={<LayersIcon className="h-6 w-6" />}
              trend={10.5}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Total Transactions"
              value="8,245"
              icon={<Database className="h-6 w-6" />}
              trend={5.7}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Bridge Fee"
              value="0.1%"
              icon={<Wallet className="h-6 w-6" />}
              trend={-2.5}
            />
          </motion.div>
        </motion.div>

        {/* Bridge Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bridge Form */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <ChainBridgeCard />
          </motion.div>

          {/* Right Column - Transfers and History */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="active">Active Transfers</TabsTrigger>
                <TabsTrigger value="history">Transfer History</TabsTrigger>
                <TabsTrigger value="assets">My Assets</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-0">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Active Bridge Transfers</CardTitle>
                    <CardDescription>
                      Monitor your ongoing cross-chain transfers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeTransfers.length > 0 ? (
                      <div className="space-y-6">
                        {activeTransfers.map((transfer) => (
                          <div key={transfer.id} className="p-4 border border-border rounded-lg">
                            <div className="flex justify-between mb-3">
                              <div className="flex items-center">
                                <div className="flex items-center space-x-1">
                                  <img src={transfer.fromChain.icon} alt={transfer.fromChain.name} className="w-6 h-6 rounded-full" />
                                  <span className="font-medium">{transfer.fromChain.name}</span>
                                </div>
                                <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                                <div className="flex items-center space-x-1">
                                  <img src={transfer.toChain.icon} alt={transfer.toChain.name} className="w-6 h-6 rounded-full" />
                                  <span className="font-medium">{transfer.toChain.name}</span>
                                </div>
                              </div>
                              <div className={`flex items-center ${getStatusColor(transfer.status)}`}>
                                {getStatusIcon(transfer.status)}
                                <span className="ml-1 capitalize">{transfer.status}</span>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Progress</span>
                                <span>{transfer.progress}%</span>
                              </div>
                              <Progress value={transfer.progress} className="h-2" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                              <div>
                                <span className="text-muted-foreground block">Amount</span>
                                <span className="font-medium">{transfer.amount} {transfer.token}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block">Estimated Time</span>
                                <span className="font-medium">{transfer.timeRemaining}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block">Transaction</span>
                                <span className="font-medium font-mono">{transfer.hash}...</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block">Initiated</span>
                                <span className="font-medium">{formatTimeAgo(transfer.timestamp)}</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" className="flex-1">
                                <Link className="h-4 w-4 mr-2" />
                                View on Explorer
                              </Button>
                              <Button variant="secondary" className="flex-1">
                                <Link2 className="h-4 w-4 mr-2" />
                                Check Status
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="mx-auto rounded-full bg-secondary/40 p-3 w-12 h-12 flex items-center justify-center mb-4">
                          <Clock className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">No Active Transfers</h3>
                        <p className="text-muted-foreground">
                          You don't have any active cross-chain transfers. Start a new bridge transaction.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Transfer History</CardTitle>
                    <CardDescription>
                      Past cross-chain transfers and their details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {completedTransfers.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>From → To</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>TxHash</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {completedTransfers.map((transfer) => (
                            <TableRow key={transfer.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={transfer.fromChain.icon} alt={transfer.fromChain.name} className="w-5 h-5 rounded-full" />
                                  <span className="mx-1">→</span>
                                  <img src={transfer.toChain.icon} alt={transfer.toChain.name} className="w-5 h-5 rounded-full" />
                                  <span className="ml-2 text-xs">{transfer.fromChain.name.slice(0, 3)} → {transfer.toChain.name.slice(0, 3)}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {transfer.amount} {transfer.token}
                              </TableCell>
                              <TableCell>
                                <div className={`flex items-center ${getStatusColor(transfer.status)}`}>
                                  {getStatusIcon(transfer.status)}
                                  <span className="ml-1 capitalize text-xs">{transfer.status}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {formatTimeAgo(transfer.timestamp)}
                              </TableCell>
                              <TableCell className="font-mono text-xs">
                                {formatAddress(transfer.hash)}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  <Link className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-10">
                        <div className="mx-auto rounded-full bg-secondary/40 p-3 w-12 h-12 flex items-center justify-center mb-4">
                          <Database className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">No Transfer History</h3>
                        <p className="text-muted-foreground">
                          You haven't made any cross-chain transfers yet.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline">
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="assets" className="mt-0">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Cross-Chain Assets</CardTitle>
                    <CardDescription>
                      Your assets across different blockchain networks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="ethereum" className="w-full">
                      <TabsList className="mb-6">
                        {chains.map((chain) => (
                          <TabsTrigger key={chain.id} value={chain.name.toLowerCase()}>
                            <div className="flex items-center">
                              <img src={chain.icon} alt={chain.name} className="w-4 h-4 rounded-full mr-2" />
                              {chain.name}
                            </div>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {chains.map((chain) => (
                        <TabsContent key={chain.id} value={chain.name.toLowerCase()} className="mt-0">
                          <div className="space-y-4">
                            <div className="p-4 border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" className="w-8 h-8 rounded-full mr-3" />
                                  <div>
                                    <h3 className="font-medium">{chain.nativeCurrency.name}</h3>
                                    <p className="text-xs text-muted-foreground">Native Token</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-semibold">2.5 {chain.nativeCurrency.symbol}</div>
                                  <p className="text-xs text-muted-foreground">≈ $8,753.13</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" className="flex-1">
                                  Send
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  Receive
                                </Button>
                                <Button className="flex-1 bg-nft-gradient hover:opacity-90 transition-opacity">
                                  Bridge
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-4 border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <img src="https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png" alt="DAI" className="w-8 h-8 rounded-full mr-3" />
                                  <div>
                                    <h3 className="font-medium">DAI</h3>
                                    <p className="text-xs text-muted-foreground">Stablecoin</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-semibold">1,200 DAI</div>
                                  <p className="text-xs text-muted-foreground">≈ $1,200.00</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" className="flex-1">
                                  Send
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  Receive
                                </Button>
                                <Button className="flex-1 bg-nft-gradient hover:opacity-90 transition-opacity">
                                  Bridge
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-4 border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <img src="https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png" alt="LINK" className="w-8 h-8 rounded-full mr-3" />
                                  <div>
                                    <h3 className="font-medium">LINK</h3>
                                    <p className="text-xs text-muted-foreground">Chainlink</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-semibold">45 LINK</div>
                                  <p className="text-xs text-muted-foreground">≈ $621.90</p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" className="flex-1">
                                  Send
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  Receive
                                </Button>
                                <Button className="flex-1 bg-nft-gradient hover:opacity-90 transition-opacity">
                                  Bridge
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Network Information */}
        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle>Supported Networks</CardTitle>
              <CardDescription>
                Blockchains currently supported by our cross-chain bridge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {chains.map((chain) => (
                  <div key={chain.id} className="p-6 border border-border rounded-lg">
                    <div className="flex items-center mb-4">
                      <img src={chain.icon} alt={chain.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <h3 className="font-semibold">{chain.name}</h3>
                        <p className="text-xs text-muted-foreground">Chain ID: {chain.id}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Native Currency:</span>
                        <span className="ml-2 font-medium">{chain.nativeCurrency.name} ({chain.nativeCurrency.symbol})</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Confirmation Time:</span>
                        <span className="ml-2 font-medium">
                          {chain.name === 'Ethereum' ? '~15 mins' : 
                           chain.name === 'Polygon' ? '~7 mins' : 
                           chain.name === 'BNB Chain' ? '~3 mins' : 
                           chain.name === 'Avalanche' ? '~2 mins' : '~5 mins'}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Bridge Fee:</span>
                        <span className="ml-2 font-medium">0.1%</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <a href={chain.blockExplorerUrl} target="_blank" rel="noopener noreferrer">
                        <Link className="mr-2 h-4 w-4" />
                        Explorer
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Understanding the cross-chain bridge mechanism
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-border -translate-x-1/2"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                      <span className="font-bold text-primary-foreground">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Lock or Burn</h3>
                      <p className="text-muted-foreground">
                        When you initiate a bridge transfer, your assets on the source chain are either locked in a smart contract or burned (depending on the asset type).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                      <span className="font-bold text-primary-foreground">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Verify Transaction</h3>
                      <p className="text-muted-foreground">
                        Bridge validators confirm that your assets have been properly locked or burned on the source chain. This process ensures security and prevents double-spending.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                      <span className="font-bold text-primary-foreground">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Generate Proof</h3>
                      <p className="text-muted-foreground">
                        A cryptographic proof is generated to verify the transaction details, including the token type, amount, sender, and recipient addresses.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10">
                      <span className="font-bold text-primary-foreground">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Release or Mint</h3>
                      <p className="text-muted-foreground">
                        Once verified, the equivalent assets are either released from a smart contract or newly minted on the destination chain and transferred to your wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 border border-border rounded-lg bg-secondary/20">
                <h3 className="font-medium mb-2">Security Measures</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <CheckIcon className="h-3 w-3 text-primary" />
                    </div>
                    <span>Multi-signature validation requires multiple validators to confirm each transfer</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <CheckIcon className="h-3 w-3 text-primary" />
                    </div>
                    <span>Regular security audits by leading blockchain security firms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <CheckIcon className="h-3 w-3 text-primary" />
                    </div>
                    <span>Timelock mechanisms for large transfers to provide additional security</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <CheckIcon className="h-3 w-3 text-primary" />
                    </div>
                    <span>Real-time monitoring and anomaly detection systems</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// This component is only used in this file
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

// This component is only used in this file
const XCircle = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M15 9l-6 6M9 9l6 6"/>
  </svg>
);

export default BridgePage;
