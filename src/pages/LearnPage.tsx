
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, FileText, Play, Video, Users } from 'lucide-react';
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

const LearnPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4 hero-text-gradient">Learn Blockchain Technology</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive resources to help you understand blockchain technology, smart contracts, and decentralized applications.
          </p>
        </motion.div>

        <Tabs defaultValue="tutorials" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="whitepaper">Whitepaper</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tutorials">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {tutorials.map((tutorial, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="crypto-card h-full flex flex-col">
                    <CardHeader>
                      <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                        <tutorial.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle>{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2 text-sm">
                        {tutorial.topics.map((topic, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="default" className="w-full">Start Learning</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="documentation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Technical Documentation</CardTitle>
                  <CardDescription>Detailed reference materials for developers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Our technical documentation provides comprehensive information about the DeepChain protocol, APIs, smart contracts, and development tools. Use these references to build on top of our platform.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Key References:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <Code className="w-4 h-4 mr-2 text-primary" />
                        API Reference
                      </li>
                      <li className="flex items-center text-sm">
                        <FileText className="w-4 h-4 mr-2 text-primary" />
                        Smart Contract Documentation
                      </li>
                      <li className="flex items-center text-sm">
                        <BookOpen className="w-4 h-4 mr-2 text-primary" />
                        SDK Integration Guides
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Documentation</Button>
                </CardFooter>
              </Card>
              
              <div className="space-y-8">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>First steps to using DeepChain</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Learn the basics of how to set up and start using the DeepChain ecosystem with our beginner-friendly guides.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Explore Guides</Button>
                  </CardFooter>
                </Card>
                
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Common questions and answers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Find answers to common questions about DeepChain, blockchain technology, and decentralized applications.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View FAQs</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="guides">
            <div className="space-y-8">
              {guides.map((guide, index) => (
                <Card key={index} className="crypto-card">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-primary/5 flex items-center justify-center p-8">
                      <guide.icon className="w-16 h-16 text-primary" />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold mb-3">{guide.title}</h3>
                      <p className="text-muted-foreground mb-4">{guide.description}</p>
                      <div className="flex space-x-4">
                        <Button variant="default">Read Guide</Button>
                        <Button variant="outline">Download PDF</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="whitepaper">
            <Card className="crypto-card">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-primary/5 flex items-center justify-center p-12">
                  <FileText className="w-24 h-24 text-primary" />
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="text-2xl font-bold mb-4">DeepChain: A Next-Generation Blockchain Protocol</h2>
                  <p className="text-muted-foreground mb-6">
                    Our comprehensive whitepaper outlines the technical architecture, consensus mechanisms, and innovative features that power the DeepChain ecosystem. Understand the fundamental design principles and future roadmap of our blockchain technology.
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-medium">Key Topics Covered:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>Novel consensus algorithm with 10,000+ TPS capability</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>Cross-chain interoperability protocols</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>Zero-knowledge proof implementation for privacy</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>Sustainable economic model and tokenomics</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex space-x-4 mt-8">
                    <Button variant="default">Read Whitepaper</Button>
                    <Button variant="outline">Download PDF</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const tutorials = [
  {
    title: 'Blockchain Fundamentals',
    description: 'Learn the core concepts of blockchain technology',
    icon: BookOpen,
    topics: [
      'Introduction to Distributed Ledgers',
      'Cryptographic Primitives',
      'Consensus Mechanisms',
      'Blockchain Architecture',
      'Public vs Private Blockchains'
    ]
  },
  {
    title: 'Smart Contract Development',
    description: 'Build decentralized applications with smart contracts',
    icon: Code,
    topics: [
      'Solidity Programming Language',
      'Smart Contract Security',
      'Testing and Debugging',
      'Contract Optimization',
      'Development Frameworks'
    ]
  },
  {
    title: 'DeFi Fundamentals',
    description: 'Understanding decentralized finance protocols',
    icon: Play,
    topics: [
      'Lending and Borrowing',
      'Automated Market Makers',
      'Yield Farming Strategies',
      'Stablecoins',
      'Risk Management in DeFi'
    ]
  },
  {
    title: 'Web3 Development',
    description: 'Building decentralized applications with Web3',
    icon: Code,
    topics: [
      'Web3.js and Ethers.js',
      'Connecting to Wallets',
      'User Authentication',
      'State Management',
      'Frontend Integration'
    ]
  },
  {
    title: 'NFT Creation & Trading',
    description: 'Create, mint and trade non-fungible tokens',
    icon: Video,
    topics: [
      'NFT Standards (ERC-721, ERC-1155)',
      'Creating Digital Assets',
      'Minting Process',
      'Marketplace Integration',
      'Royalties and Revenue Models'
    ]
  },
  {
    title: 'DAO Governance',
    description: 'Understand decentralized autonomous organizations',
    icon: Users,
    topics: [
      'Governance Models',
      'Voting Mechanisms',
      'Treasury Management',
      'Proposal Creation',
      'Community Coordination'
    ]
  },
];

const guides = [
  {
    title: 'Beginner\'s Guide to DeepChain',
    description: 'A comprehensive introduction to the DeepChain ecosystem, explaining key concepts and how to get started.',
    icon: BookOpen
  },
  {
    title: 'Wallet Setup and Security',
    description: 'Learn how to set up your blockchain wallet securely, create backups, and best practices for managing your digital assets.',
    icon: FileText
  },
  {
    title: 'DeFi Strategies for Beginners',
    description: 'Understand the basics of decentralized finance and learn beginner-friendly strategies for participating in the DeFi ecosystem.',
    icon: Video
  }
];

export default LearnPage;
