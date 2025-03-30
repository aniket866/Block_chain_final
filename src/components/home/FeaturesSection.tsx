
import React from 'react';
import { motion } from 'framer-motion';
import { PlusSquare, Users, EyeIcon, Code, Layers, Wallet, LockIcon } from 'lucide-react';

// Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 relative">
      <div className="container px-4 mx-auto">
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">Complete Blockchain Ecosystem</h2>
          <p className="text-muted-foreground">
            Our Rust-powered platform offers a comprehensive suite of blockchain solutions for the next generation of decentralized applications.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeIn}>
            <a href="https://en.wikipedia.org/wiki/Non-fungible_token" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="crypto-card h-full">
                <div className="rounded-xl bg-accent/10 p-4 mb-6 inline-block">
                  <PlusSquare className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">NFT Marketplace</h3>
                <p className="text-muted-foreground">
                  Create, buy, sell, and collect unique digital assets on our NFT marketplace.
                </p>
              </div>
            </a>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <a href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="crypto-card h-full">
                <div className="rounded-xl bg-pink-500/10 p-4 mb-6 inline-block">
                  <Users className="h-8 w-8 text-crypto-pink" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">DAO Governance</h3>
                <p className="text-muted-foreground">
                  Participate in decentralized governance and shape the future of the protocol.
                </p>
              </div>
            </a>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <a href="https://en.wikipedia.org/wiki/Self-sovereign_identity" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="crypto-card h-full">
                <div className="rounded-xl bg-teal-500/10 p-4 mb-6 inline-block">
                  <EyeIcon className="h-8 w-8 text-crypto-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Identity Solutions</h3>
                <p className="text-muted-foreground">
                  Decentralized identity verification and credential management.
                </p>
              </div>
            </a>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <a href="https://en.wikipedia.org/wiki/Smart_contract" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="crypto-card h-full">
                <div className="rounded-xl bg-green-500/10 p-4 mb-6 inline-block">
                  <Code className="h-8 w-8 text-crypto-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Smart Contracts</h3>
                <p className="text-muted-foreground">
                  Deploy and interact with custom smart contracts on multiple chains.
                </p>
              </div>
            </a>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <a href="https://en.wikipedia.org/wiki/Blockchain_interoperability" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="crypto-card h-full">
                <div className="rounded-xl bg-indigo-500/10 p-4 mb-6 inline-block">
                  <Layers className="h-8 w-8 text-crypto-indigo" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Cross-Chain Bridge</h3>
                <p className="text-muted-foreground">
                  Move assets seamlessly between different blockchain networks.
                </p>
              </div>
            </a>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <a href="https://en.wikipedia.org/wiki/Cryptocurrency_wallet" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="crypto-card h-full">
                <div className="rounded-xl bg-orange-500/10 p-4 mb-6 inline-block">
                  <Wallet className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Multi-Chain Wallet</h3>
                <p className="text-muted-foreground">
                  Securely store and manage crypto assets across multiple blockchains.
                </p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
