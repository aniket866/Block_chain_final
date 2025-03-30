import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, ArrowRight, BarChart3, Calendar, Coins, Database, Download, 
  LineChart, PieChart, Share2, Zap, Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

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

const AnalyticsPage = () => {
  const [timeframe, setTimeframe] = useState('month');

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4 hero-text-gradient">Network Analytics</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive insights into the DeepChain network performance, transactions, and usage metrics.
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <Button variant={timeframe === 'day' ? 'default' : 'outline'} onClick={() => setTimeframe('day')}>24H</Button>
            <Button variant={timeframe === 'week' ? 'default' : 'outline'} onClick={() => setTimeframe('week')}>7D</Button>
            <Button variant={timeframe === 'month' ? 'default' : 'outline'} onClick={() => setTimeframe('month')}>30D</Button>
            <Button variant={timeframe === 'year' ? 'default' : 'outline'} onClick={() => setTimeframe('year')}>1Y</Button>
            <Button variant={timeframe === 'all' ? 'default' : 'outline'} onClick={() => setTimeframe('all')}>All</Button>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Custom Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {networkStats.map((stat, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="crypto-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-primary/10 p-2 rounded">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${
                      stat.change > 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
                    }`}>
                      {stat.change > 0 ? '+' : ''}{stat.change}%
                    </div>
                  </div>
                  <h3 className="text-sm text-muted-foreground">{stat.title}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="mt-4 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        width={300}
                        height={40}
                        data={stat.chartData}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={stat.change > 0 ? '#10b981' : '#ef4444'}
                          strokeWidth={2}
                          dot={false}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Card className="crypto-card h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Transaction Volume</CardTitle>
                    <CardDescription>Network activity over time</CardDescription>
                  </div>
                  <Select defaultValue="txCount">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="txCount">Tx Count</SelectItem>
                      <SelectItem value="txVolume">Tx Volume</SelectItem>
                      <SelectItem value="txFees">Tx Fees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={transactionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip contentStyle={{ background: 'rgba(16, 16, 20, 0.8)', border: 'none', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="transactions" stroke="#8884d8" fillOpacity={1} fill="url(#colorTx)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Card className="crypto-card h-full">
              <CardHeader>
                <CardTitle>Network Distribution</CardTitle>
                <CardDescription>Activity by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={networkDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {networkDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="blockchains" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="blockchains">Blockchain Stats</TabsTrigger>
            <TabsTrigger value="defi">DeFi Metrics</TabsTrigger>
            <TabsTrigger value="nodes">Node Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blockchains">
            <div className="grid grid-cols-1 gap-8">
              <Card className="crypto-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Cross-Chain Activity</CardTitle>
                      <CardDescription>Transaction volume by blockchain</CardDescription>
                    </div>
                    <Select defaultValue="volume">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="volume">Volume</SelectItem>
                        <SelectItem value="txcount">Tx Count</SelectItem>
                        <SelectItem value="users">Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chainData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ background: 'rgba(16, 16, 20, 0.8)', border: 'none', borderRadius: '8px' }} />
                      <Legend />
                      <Bar dataKey="volume" name="Volume (USD)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="defi">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Total Value Locked (TVL)</CardTitle>
                  <CardDescription>Value locked in DeFi protocols</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={tvlData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip contentStyle={{ background: 'rgba(16, 16, 20, 0.8)', border: 'none', borderRadius: '8px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="tvl" name="TVL (USD)" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Detailed Breakdown</Button>
                </CardFooter>
              </Card>
              
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Protocol Distribution</CardTitle>
                  <CardDescription>TVL by protocol category</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={300}>
                      <Pie
                        data={protocolDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {protocolDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'rgba(16, 16, 20, 0.8)', border: 'none', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Protocols</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="nodes">
            <div className="grid grid-cols-1 gap-8">
              <Card className="crypto-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Global Node Distribution</CardTitle>
                      <CardDescription>Active nodes by region</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-muted-foreground">Total Active Nodes:</div>
                      <div className="text-xs font-bold">12,458</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-sm font-medium mb-4">Top Regions</div>
                      <div className="space-y-4">
                        {nodeRegions.map((region, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{region.name}</span>
                              <span className="font-medium">{region.count}</span>
                            </div>
                            <div className="w-full bg-secondary/20 rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: `${region.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="text-sm font-medium mb-4">Node Health</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-secondary/20 p-4 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Average Uptime</div>
                            <div className="text-2xl font-bold">99.87%</div>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Response Time</div>
                            <div className="text-2xl font-bold">124ms</div>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Staked Tokens</div>
                            <div className="text-2xl font-bold">35.2M</div>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Validator Reward</div>
                            <div className="text-2xl font-bold">12.4%</div>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-6">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Become a Validator
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle>Latest Blocks & Transactions</CardTitle>
              <CardDescription>Recent network activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Block</th>
                      <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Age</th>
                      <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Txn</th>
                      <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Fee</th>
                      <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Validator</th>
                      <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Gas Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestBlocks.map((block, index) => (
                      <tr key={index} className="border-b border-border/40 hover:bg-secondary/10">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-1 rounded mr-2">
                              <Database className="h-3 w-3 text-primary" />
                            </div>
                            <span className="font-mono text-sm">{block.number}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{block.age}</td>
                        <td className="py-3 px-4 text-sm">{block.txn}</td>
                        <td className="py-3 px-4 text-sm">{block.fee}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="font-mono text-sm">{`${block.validator.slice(0, 6)}...${block.validator.slice(-4)}`}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{block.gasUsed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Blocks</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const networkStats = [
  {
    title: 'Transactions (24h)',
    value: '1.2M',
    change: 12.5,
    icon: Activity,
    chartData: [
      { name: '1', value: 40 },
      { name: '2', value: 30 },
      { name: '3', value: 45 },
      { name: '4', value: 50 },
      { name: '5', value: 55 },
      { name: '6', value: 60 },
      { name: '7', value: 65 }
    ]
  },
  {
    title: 'Avg. Gas Price',
    value: '32 Gwei',
    change: -5.3,
    icon: LineChart,
    chartData: [
      { name: '1', value: 60 },
      { name: '2', value: 55 },
      { name: '3', value: 70 },
      { name: '4', value: 65 },
      { name: '5', value: 55 },
      { name: '6', value: 50 },
      { name: '7', value: 45 }
    ]
  },
  {
    title: 'Active Addresses',
    value: '525.6K',
    change: 8.2,
    icon: Users,
    chartData: [
      { name: '1', value: 30 },
      { name: '2', value: 40 },
      { name: '3', value: 35 },
      { name: '4', value: 50 },
      { name: '5', value: 55 },
      { name: '6', value: 60 },
      { name: '7', value: 70 }
    ]
  },
  {
    title: 'Network TPS',
    value: '3,256',
    change: 15.7,
    icon: Zap,
    chartData: [
      { name: '1', value: 40 },
      { name: '2', value: 60 },
      { name: '3', value: 55 },
      { name: '4', value: 70 },
      { name: '5', value: 65 },
      { name: '6', value: 80 },
      { name: '7', value: 85 }
    ]
  }
];

const transactionData = [
  { name: 'Jan', transactions: 4000 },
  { name: 'Feb', transactions: 3000 },
  { name: 'Mar', transactions: 5000 },
  { name: 'Apr', transactions: 4780 },
  { name: 'May', transactions: 6890 },
  { name: 'Jun', transactions: 8390 },
  { name: 'Jul', transactions: 9490 },
  { name: 'Aug', transactions: 8000 },
  { name: 'Sep', transactions: 9200 },
  { name: 'Oct', transactions: 9800 },
  { name: 'Nov', transactions: 8500 },
  { name: 'Dec', transactions: 9300 }
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const networkDistribution = [
  { name: 'DeFi', value: 40 },
  { name: 'NFTs', value: 25 },
  { name: 'Transfers', value: 20 },
  { name: 'Gaming', value: 10 },
  { name: 'Other', value: 5 }
];

const chainData = [
  { name: 'Ethereum', volume: 4000 },
  { name: 'BSC', volume: 3000 },
  { name: 'Polygon', volume: 2000 },
  { name: 'Solana', volume: 2780 },
  { name: 'Avalanche', volume: 1890 },
  { name: 'DeepChain', volume: 2390 },
];

const tvlData = [
  { date: 'Jan', tvl: 4000 },
  { date: 'Feb', tvl: 5000 },
  { date: 'Mar', tvl: 6000 },
  { date: 'Apr', tvl: 7000 },
  { date: 'May', tvl: 9000 },
  { date: 'Jun', tvl: 8000 },
  { date: 'Jul', tvl: 10000 },
];

const protocolDistribution = [
  { name: 'Lending', value: 35 },
  { name: 'DEX', value: 30 },
  { name: 'Yield', value: 15 },
  { name: 'Derivatives', value: 10 },
  { name: 'Insurance', value: 5 },
  { name: 'Other', value: 5 }
];

const nodeRegions = [
  { name: 'North America', count: '4,562', percentage: 36.6 },
  { name: 'Europe', count: '3,845', percentage: 30.9 },
  { name: 'Asia Pacific', count: '2,723', percentage: 21.9 },
  { name: 'South America', count: '825', percentage: 6.6 },
  { name: 'Africa', count: '503', percentage: 4.0 }
];

const latestBlocks = [
  { number: '#15874562', age: '28 secs ago', txn: 156, fee: '0.054 DC', validator: '0x8a3b87f98ca8a87dca', gasUsed: '65.4%' },
  { number: '#15874561', age: '42 secs ago', txn: 124, fee: '0.047 DC', validator: '0x2c7bb91a56dc456ef', gasUsed: '53.2%' },
  { number: '#15874560', age: '58 secs ago', txn: 187, fee: '0.062 DC', validator: '0x9d1c45eb78a452fcb', gasUsed: '72.1%' },
  { number: '#15874559', age: '1 min ago', txn: 98, fee: '0.039 DC', validator: '0x4f7ea129bd54c87de', gasUsed: '48.7%' },
  { number: '#15874558', age: '1 min ago', txn: 132, fee: '0.051 DC', validator: '0xa12b87c456de789f1', gasUsed: '59.3%' }
];

export default AnalyticsPage;
