
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BarChart3, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface BlockchainInfo {
  networkName: string;
  blockHeight: number;
  gasPrice: string;
  tps: number;
  activeValidators: number;
  totalSupply: string;
}

interface LiveNetworkSectionProps {
  blockchainInfo: BlockchainInfo;
}

const LiveNetworkSection: React.FC<LiveNetworkSectionProps> = ({ blockchainInfo }) => {
  return (
    <section className="py-12 relative">
      <div className="container px-4 mx-auto">
        <motion.div
          className="text-center mb-8 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">Live Network Data</h2>
          <p className="text-muted-foreground">
            DeepChain's blockchain statistics powered by our Rust implementation
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <motion.div 
            className="crypto-card relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/5 backdrop-blur-sm"></div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Terminal className="mr-2 h-5 w-5 text-primary" />
              Network
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="font-medium">{blockchainInfo.networkName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Block Height:</span>
                <span className="font-medium">{blockchainInfo.blockHeight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Gas Price:</span>
                <span className="font-medium">{blockchainInfo.gasPrice}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="crypto-card relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-accent/5 backdrop-blur-sm"></div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-accent" />
              Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">TPS:</span>
                <span className="font-medium">{blockchainInfo.tps.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Validators:</span>
                <span className="font-medium">{blockchainInfo.activeValidators.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Supply:</span>
                <span className="font-medium">{blockchainInfo.totalSupply}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="crypto-card relative overflow-hidden sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/5 backdrop-blur-sm"></div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Code className="mr-2 h-5 w-5 text-primary" />
              DeepChain SDK
            </h3>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Try our Rust-powered blockchain with these commands:
              </p>
              <div className="bg-black/20 rounded-lg p-3 overflow-x-auto">
                <code className="text-xs text-primary">
                  <span className="text-accent">const</span> deepchain = <span className="text-accent">await</span> DeepChain.initialize();<br/>
                  <span className="text-accent">const</span> wallet = <span className="text-accent">await</span> deepchain.connectWallet("metamask");<br/>
                  <span className="text-accent">await</span> deepchain.sendTransaction(receiver, amount);
                </code>
              </div>
            </div>
            <Button variant="outline" asChild className="w-full">
              <Link to="/developer">
                <Terminal className="mr-2 h-4 w-4" />
                Developer Portal
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveNetworkSection;
