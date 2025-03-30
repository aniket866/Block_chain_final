
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Clock, Coins, DollarSign, Link2, LineChart, Percent, RefreshCcw, Siren, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/ui/StatCard';
import TokenSwap from '@/components/TokenSwap';
import { useToast } from '@/components/ui/use-toast';
import { tokens, liquidityPools } from '@/lib/contracts/mockData';
import { 
  getAllTokens, 
  getAllLiquidityPools,
  addLiquidity,
  stake,
  formatBalance, 
  formatCurrency
} from '@/lib/contracts/contractUtils';
import { Token, LiquidityPool } from '@/lib/contracts/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

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

const DeFiPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [pools, setPools] = useState<LiquidityPool[]>([]);
  
  // For liquidity tab
  const [token0, setToken0] = useState('');
  const [token1, setToken1] = useState('');
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');
  
  // For staking tab
  const [stakeToken, setStakeToken] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  
  const [addingLiquidity, setAddingLiquidity] = useState(false);
  const [staking, setStaking] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tokensData, poolsData] = await Promise.all([
          getAllTokens(),
          getAllLiquidityPools()
        ]);
        
        setAllTokens(tokensData);
        setPools(poolsData);
        
        // Set default values
        if (tokensData.length > 0) {
          setToken0(tokensData[0].address);
          if (tokensData.length > 1) {
            setToken1(tokensData[1].address);
          }
          setStakeToken(tokensData[0].address);
        }
      } catch (error) {
        console.error("Error fetching DeFi data:", error);
        toast({
          title: "Error",
          description: "Failed to load DeFi data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleAddLiquidity = async () => {
    if (!amount0 || !amount1 || parseFloat(amount0) <= 0 || parseFloat(amount1) <= 0) {
      toast({
        title: "Invalid amounts",
        description: "Please enter valid amounts for both tokens.",
        variant: "destructive",
      });
      return;
    }
    
    setAddingLiquidity(true);
    try {
      const token0Obj = allTokens.find(t => t.address === token0);
      const token1Obj = allTokens.find(t => t.address === token1);
      
      if (!token0Obj || !token1Obj) {
        throw new Error("Invalid tokens selected");
      }

      // Fix the call to addLiquidity to match the function signature
      const result = await addLiquidity(
        token0,
        token1,
        amount0
      );

      toast({
        title: "Liquidity added!",
        description: `Successfully added ${amount0} ${token0Obj.symbol} and ${amount1} ${token1Obj.symbol} to the pool.`,
      });

      // Reset form
      setAmount0('');
      setAmount1('');
    } catch (error) {
      toast({
        title: "Failed to add liquidity",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setAddingLiquidity(false);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake.",
        variant: "destructive",
      });
      return;
    }
    
    setStaking(true);
    try {
      const tokenObj = allTokens.find(t => t.address === stakeToken);
      
      if (!tokenObj) {
        throw new Error("Invalid token selected");
      }

      const result = await stake(
        tokenObj.symbol,
        stakeAmount
      );

      toast({
        title: "Tokens staked!",
        description: `Successfully staked ${stakeAmount} ${tokenObj.symbol}.`,
      });

      // Reset form
      setStakeAmount('');
    } catch (error) {
      toast({
        title: "Failed to stake",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setStaking(false);
    }
  };

  // Calculate total value locked
  const calculateTVL = () => {
    return pools.reduce((total, pool) => {
      const value0 = parseFloat(pool.reserve0) * (pool.token0.price || 0);
      const value1 = parseFloat(pool.reserve1) * (pool.token1.price || 0);
      return total + value0 + value1;
    }, 0);
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
          <h1 className="text-4xl font-bold mb-4 defi-text-gradient">Decentralized Finance</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Access powerful DeFi tools for swapping, adding liquidity, and staking your assets to earn passive income.
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
              title="Total Value Locked"
              value={formatCurrency(calculateTVL())}
              icon={<DollarSign className="h-6 w-6" />}
              trend={7.2}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="24h Trading Volume"
              value={formatCurrency(856432.51)}
              icon={<BarChart className="h-6 w-6" />}
              trend={4.8}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Total Pools"
              value={isLoading ? '...' : pools.length.toString()}
              icon={<Percent className="h-6 w-6" />}
              trend={2.3}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Average APR"
              value="12.16%"
              icon={<LineChart className="h-6 w-6" />}
              trend={-1.5}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        {/* Main DeFi Interface */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="swap">Swap</TabsTrigger>
              <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
              <TabsTrigger value="stake">Stake</TabsTrigger>
              <TabsTrigger value="farm">Yield Farm</TabsTrigger>
              <TabsTrigger value="borrow">Borrow</TabsTrigger>
              <TabsTrigger value="pools">Pools</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column for forms */}
              <div className="lg:col-span-1">
                <TabsContent value="swap" className="mt-0">
                  <TokenSwap />
                </TabsContent>
                
                <TabsContent value="liquidity" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Liquidity</CardTitle>
                      <CardDescription>
                        Provide liquidity to earn trading fees and LP rewards
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="token0">First Token</Label>
                        <Select value={token0} onValueChange={setToken0}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent>
                            {allTokens.map((token) => (
                              <SelectItem key={token.address} value={token.address}>
                                <div className="flex items-center">
                                  {token.logoURI && (
                                    <img
                                      src={token.logoURI}
                                      alt={token.symbol}
                                      className="w-5 h-5 mr-2 rounded-full"
                                    />
                                  )}
                                  {token.symbol}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amount0}
                          onChange={(e) => setAmount0(e.target.value)}
                          className="mt-2"
                        />
                        <div className="text-xs text-right text-muted-foreground">
                          Balance: {allTokens.find(t => t.address === token0)?.balance || '0'}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <span className="bg-secondary rounded-full p-2">+</span>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="token1">Second Token</Label>
                        <Select value={token1} onValueChange={setToken1}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent>
                            {allTokens.map((token) => (
                              <SelectItem key={token.address} value={token.address}>
                                <div className="flex items-center">
                                  {token.logoURI && (
                                    <img
                                      src={token.logoURI}
                                      alt={token.symbol}
                                      className="w-5 h-5 mr-2 rounded-full"
                                    />
                                  )}
                                  {token.symbol}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amount1}
                          onChange={(e) => setAmount1(e.target.value)}
                          className="mt-2"
                        />
                        <div className="text-xs text-right text-muted-foreground">
                          Balance: {allTokens.find(t => t.address === token1)?.balance || '0'}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleAddLiquidity}
                        disabled={addingLiquidity}
                        className="w-full bg-defi-gradient hover:opacity-90 transition-opacity"
                      >
                        {addingLiquidity ? (
                          <>
                            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                            Adding Liquidity...
                          </>
                        ) : (
                          'Add Liquidity'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="stake" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stake Tokens</CardTitle>
                      <CardDescription>
                        Stake your tokens to earn passive income
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="stakeToken">Token to Stake</Label>
                        <Select value={stakeToken} onValueChange={setStakeToken}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent>
                            {allTokens.map((token) => (
                              <SelectItem key={token.address} value={token.address}>
                                <div className="flex items-center">
                                  {token.logoURI && (
                                    <img
                                      src={token.logoURI}
                                      alt={token.symbol}
                                      className="w-5 h-5 mr-2 rounded-full"
                                    />
                                  )}
                                  {token.symbol}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stakeAmount">Amount to Stake</Label>
                        <Input
                          id="stakeAmount"
                          type="number"
                          placeholder="0.0"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                        />
                        <div className="text-xs text-right text-muted-foreground">
                          Balance: {allTokens.find(t => t.address === stakeToken)?.balance || '0'}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Annual Percentage Rate</span>
                          <span className="font-semibold">8.5%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lock Period</span>
                          <span>30 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Early Withdrawal Fee</span>
                          <span>3%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={handleStake}
                        disabled={staking}
                        className="w-full bg-defi-gradient hover:opacity-90 transition-opacity"
                      >
                        {staking ? (
                          <>
                            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                            Staking...
                          </>
                        ) : (
                          'Stake Now'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="farm" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Yield Farming</CardTitle>
                      <CardDescription>
                        Earn additional rewards by farming your LP tokens
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="flex -space-x-2 mr-3">
                                <img src={tokens[0].logoURI} alt="UNI" className="w-8 h-8 rounded-full border-2 border-background" />
                                <img src={tokens[2].logoURI} alt="WETH" className="w-8 h-8 rounded-full border-2 border-background" />
                              </div>
                              <div>
                                <h4 className="font-medium">UNI-WETH LP</h4>
                                <p className="text-xs text-muted-foreground">2x Rewards</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-semibold">52.8%</div>
                              <p className="text-xs text-muted-foreground">APR</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="w-full">
                            Farm
                          </Button>
                        </div>
                        
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="flex -space-x-2 mr-3">
                                <img src={tokens[1].logoURI} alt="DAI" className="w-8 h-8 rounded-full border-2 border-background" />
                                <img src={tokens[2].logoURI} alt="WETH" className="w-8 h-8 rounded-full border-2 border-background" />
                              </div>
                              <div>
                                <h4 className="font-medium">DAI-WETH LP</h4>
                                <p className="text-xs text-muted-foreground">Base Rewards</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-semibold">24.5%</div>
                              <p className="text-xs text-muted-foreground">APR</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="w-full">
                            Farm
                          </Button>
                        </div>
                        
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="flex -space-x-2 mr-3">
                                <img src={tokens[5].logoURI} alt="LINK" className="w-8 h-8 rounded-full border-2 border-background" />
                                <img src={tokens[2].logoURI} alt="WETH" className="w-8 h-8 rounded-full border-2 border-background" />
                              </div>
                              <div>
                                <h4 className="font-medium">LINK-WETH LP</h4>
                                <p className="text-xs text-muted-foreground">1.5x Rewards</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-semibold">37.2%</div>
                              <p className="text-xs text-muted-foreground">APR</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="w-full">
                            Farm
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="borrow" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Borrow Assets</CardTitle>
                      <CardDescription>
                        Borrow assets using your collateral
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Collateral</Label>
                        <Select defaultValue={tokens[2].address}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent>
                            {allTokens.map((token) => (
                              <SelectItem key={token.address} value={token.address}>
                                <div className="flex items-center">
                                  {token.logoURI && (
                                    <img
                                      src={token.logoURI}
                                      alt={token.symbol}
                                      className="w-5 h-5 mr-2 rounded-full"
                                    />
                                  )}
                                  {token.symbol}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="0.0"
                          className="mt-2"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Borrow</Label>
                        <Select defaultValue={tokens[1].address}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent>
                            {allTokens.map((token) => (
                              <SelectItem key={token.address} value={token.address}>
                                <div className="flex items-center">
                                  {token.logoURI && (
                                    <img
                                      src={token.logoURI}
                                      alt={token.symbol}
                                      className="w-5 h-5 mr-2 rounded-full"
                                    />
                                  )}
                                  {token.symbol}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="0.0"
                          className="mt-2"
                        />
                      </div>
                      
                      <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Collateral Value</span>
                          <span>$2,500.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Loan-to-Value</span>
                          <span>65%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Liquidation Threshold</span>
                          <span>75%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Annual Interest Rate</span>
                          <span>3.5%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Health Factor</span>
                          <span className="text-green-500">1.85</span>
                        </div>
                        <Progress value={65} className="h-2 bg-secondary" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Liquidation</span>
                          <span>Safe</span>
                          <span>Optimal</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-defi-gradient hover:opacity-90 transition-opacity">
                        Borrow Now
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </div>

              {/* Right column for stats and data */}
              <div className="lg:col-span-2">
                <TabsContent value="swap" className="mt-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Recent Swaps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tokens</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Value</TableHead>
                              <TableHead>Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[0].logoURI} alt="UNI" className="w-5 h-5 mr-1" />
                                  <span>→</span>
                                  <img src={tokens[2].logoURI} alt="WETH" className="w-5 h-5 ml-1 mr-1" />
                                  <span className="text-sm">UNI → WETH</span>
                                </div>
                              </TableCell>
                              <TableCell>120.5 UNI</TableCell>
                              <TableCell>$1,237.54</TableCell>
                              <TableCell>2 minutes ago</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[2].logoURI} alt="WETH" className="w-5 h-5 mr-1" />
                                  <span>→</span>
                                  <img src={tokens[1].logoURI} alt="DAI" className="w-5 h-5 ml-1 mr-1" />
                                  <span className="text-sm">WETH → DAI</span>
                                </div>
                              </TableCell>
                              <TableCell>2.5 WETH</TableCell>
                              <TableCell>$8,753.13</TableCell>
                              <TableCell>5 minutes ago</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[5].logoURI} alt="LINK" className="w-5 h-5 mr-1" />
                                  <span>→</span>
                                  <img src={tokens[4].logoURI} alt="MATIC" className="w-5 h-5 ml-1 mr-1" />
                                  <span className="text-sm">LINK → MATIC</span>
                                </div>
                              </TableCell>
                              <TableCell>50 LINK</TableCell>
                              <TableCell>$691.00</TableCell>
                              <TableCell>15 minutes ago</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Price Chart</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-[16/9] bg-secondary/50 rounded-md flex items-center justify-center">
                          <div className="text-muted-foreground">
                            <LineChart className="h-12 w-12 mb-2 mx-auto opacity-50" />
                            <p>Interactive price chart will be displayed here</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="liquidity" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Liquidity Positions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pools.map((pool, index) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <div className="flex -space-x-2 mr-3">
                                  <img src={pool.token0.logoURI} alt={pool.token0.symbol} className="w-8 h-8 rounded-full border-2 border-background" />
                                  <img src={pool.token1.logoURI} alt={pool.token1.symbol} className="w-8 h-8 rounded-full border-2 border-background" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{pool.token0.symbol}-{pool.token1.symbol}</h4>
                                  <p className="text-xs text-muted-foreground">Fee tier: 0.3%</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">{pool.apr}%</div>
                                <p className="text-xs text-muted-foreground">APR</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Your Pooled {pool.token0.symbol}</p>
                                <p className="font-medium">{(parseFloat(pool.reserve0) * 0.01).toFixed(4)} {pool.token0.symbol}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Your Pooled {pool.token1.symbol}</p>
                                <p className="font-medium">{(parseFloat(pool.reserve1) * 0.01).toFixed(4)} {pool.token1.symbol}</p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2 mt-3">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Wallet className="h-4 w-4 mr-2" />
                                Collect Fees
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                Remove
                              </Button>
                              <Button size="sm" variant="secondary" className="flex-1">
                                Add
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="stake" className="mt-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Staked Assets</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <img src={tokens[2].logoURI} alt="WETH" className="w-8 h-8 rounded-full mr-3" />
                                <div>
                                  <h4 className="font-medium">{tokens[2].symbol}</h4>
                                  <p className="text-xs text-muted-foreground">Staked 30 days ago</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">2.5 WETH</div>
                                <p className="text-xs text-green-500">+0.0128 WETH earned</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Lock Period</span>
                                <span>30 days</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Unlocks in</span>
                                <span className="text-yellow-500">No lock</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>APR</span>
                                <span>8.5%</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Siren className="h-4 w-4 mr-2" />
                                Unstake
                              </Button>
                              <Button size="sm" variant="secondary" className="flex-1">
                                <Coins className="h-4 w-4 mr-2" />
                                Claim Rewards
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <img src={tokens[0].logoURI} alt="UNI" className="w-8 h-8 rounded-full mr-3" />
                                <div>
                                  <h4 className="font-medium">{tokens[0].symbol}</h4>
                                  <p className="text-xs text-muted-foreground">Staked 15 days ago</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">50 UNI</div>
                                <p className="text-xs text-green-500">+0.82 UNI earned</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Lock Period</span>
                                <span>90 days</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Unlocks in</span>
                                <span>75 days</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>APR</span>
                                <span>12.5%</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Siren className="h-4 w-4 mr-2" />
                                Unstake
                              </Button>
                              <Button size="sm" variant="secondary" className="flex-1">
                                <Coins className="h-4 w-4 mr-2" />
                                Claim Rewards
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Staking Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Token</TableHead>
                              <TableHead>APR</TableHead>
                              <TableHead>Lock Period</TableHead>
                              <TableHead>Total Staked</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[2].logoURI} alt="WETH" className="w-5 h-5 mr-2" />
                                  <span>WETH</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">8.5%</TableCell>
                              <TableCell>30 days</TableCell>
                              <TableCell>5.2K WETH</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">Stake</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[0].logoURI} alt="UNI" className="w-5 h-5 mr-2" />
                                  <span>UNI</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">12.5%</TableCell>
                              <TableCell>90 days</TableCell>
                              <TableCell>180K UNI</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">Stake</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[1].logoURI} alt="DAI" className="w-5 h-5 mr-2" />
                                  <span>DAI</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">5.2%</TableCell>
                              <TableCell>No lock</TableCell>
                              <TableCell>1.2M DAI</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">Stake</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="farm" className="mt-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Farming Positions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 border border-border rounded-lg mb-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="flex -space-x-2 mr-3">
                                <img src={tokens[0].logoURI} alt="UNI" className="w-8 h-8 rounded-full border-2 border-background" />
                                <img src={tokens[2].logoURI} alt="WETH" className="w-8 h-8 rounded-full border-2 border-background" />
                              </div>
                              <div>
                                <h4 className="font-medium">UNI-WETH LP</h4>
                                <p className="text-xs text-muted-foreground">2x Rewards</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold">10.25 LP</div>
                              <p className="text-xs text-green-500">$5,280 Value</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Earned Rewards</span>
                              <span className="font-medium">24.6 DEEP ($123)</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>APR</span>
                              <span className="font-medium">52.8%</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Deposited</span>
                              <span>3 days ago</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Unstake
                            </Button>
                            <Button size="sm" variant="secondary" className="flex-1">
                              <Coins className="h-4 w-4 mr-2" />
                              Harvest
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="flex -space-x-2 mr-3">
                                <img src={tokens[1].logoURI} alt="DAI" className="w-8 h-8 rounded-full border-2 border-background" />
                                <img src={tokens[2].logoURI} alt="WETH" className="w-8 h-8 rounded-full border-2 border-background" />
                              </div>
                              <div>
                                <h4 className="font-medium">DAI-WETH LP</h4>
                                <p className="text-xs text-muted-foreground">Base Rewards</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold">25.8 LP</div>
                              <p className="text-xs text-green-500">$12,450 Value</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Earned Rewards</span>
                              <span className="font-medium">18.2 DEEP ($91)</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>APR</span>
                              <span className="font-medium">24.5%</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Deposited</span>
                              <span>1 week ago</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Unstake
                            </Button>
                            <Button size="sm" variant="secondary" className="flex-1">
                              <Coins className="h-4 w-4 mr-2" />
                              Harvest
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="borrow" className="mt-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Borrowing Positions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <img src={tokens[1].logoURI} alt="DAI" className="w-8 h-8 rounded-full mr-3" />
                                <div>
                                  <h4 className="font-medium">DAI</h4>
                                  <p className="text-xs text-muted-foreground">Borrowed 2 weeks ago</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">1,500 DAI</div>
                                <p className="text-xs text-muted-foreground">$1,500.00</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Collateral</span>
                                <span>1.0 WETH ($3,501.25)</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Interest Rate</span>
                                <span>3.5% APR</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Health Factor</span>
                                <span className="text-green-500">2.33</span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Loan to Value</span>
                                  <span>42.8%</span>
                                </div>
                                <Progress value={42.8} className="h-2 bg-secondary" />
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                  Repay
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  Add Collateral
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Borrowing Markets</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Asset</TableHead>
                              <TableHead>Total Supply</TableHead>
                              <TableHead>APR</TableHead>
                              <TableHead>Collateral Factor</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[1].logoURI} alt="DAI" className="w-5 h-5 mr-2" />
                                  <span>DAI</span>
                                </div>
                              </TableCell>
                              <TableCell>5.2M</TableCell>
                              <TableCell>3.5%</TableCell>
                              <TableCell>80%</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">Borrow</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[3].logoURI} alt="WBTC" className="w-5 h-5 mr-2" />
                                  <span>WBTC</span>
                                </div>
                              </TableCell>
                              <TableCell>120</TableCell>
                              <TableCell>1.2%</TableCell>
                              <TableCell>70%</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">Borrow</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className="flex items-center">
                                  <img src={tokens[0].logoURI} alt="UNI" className="w-5 h-5 mr-2" />
                                  <span>UNI</span>
                                </div>
                              </TableCell>
                              <TableCell>250K</TableCell>
                              <TableCell>5.8%</TableCell>
                              <TableCell>65%</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">Borrow</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="pools" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Liquidity Pools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Pool</TableHead>
                            <TableHead>TVL</TableHead>
                            <TableHead>Volume (24h)</TableHead>
                            <TableHead>APR</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pools.map((pool, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="flex -space-x-2 mr-2">
                                    <img src={pool.token0.logoURI} alt={pool.token0.symbol} className="w-6 h-6 rounded-full border border-background" />
                                    <img src={pool.token1.logoURI} alt={pool.token1.symbol} className="w-6 h-6 rounded-full border border-background" />
                                  </div>
                                  <span>{pool.token0.symbol}-{pool.token1.symbol}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {formatCurrency(
                                  parseFloat(pool.reserve0) * (pool.token0.price || 0) +
                                  parseFloat(pool.reserve1) * (pool.token1.price || 0)
                                )}
                              </TableCell>
                              <TableCell>
                                {formatCurrency(
                                  (parseFloat(pool.reserve0) * (pool.token0.price || 0) +
                                  parseFloat(pool.reserve1) * (pool.token1.price || 0)) * 0.1
                                )}
                              </TableCell>
                              <TableCell className="font-medium">{pool.apr}%</TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">
                                  <Link2 className="h-4 w-4 mr-2" />
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default DeFiPage;
