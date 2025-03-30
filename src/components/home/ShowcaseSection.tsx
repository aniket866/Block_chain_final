
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TokenSwap from '@/components/TokenSwap';
import NFTCard from '@/components/NFTCard';
import ProposalCard from '@/components/ProposalCard';

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface ShowcaseSectionProps {
  nfts: any[];
  proposals: any[];
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ nfts, proposals }) => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* DeFi Swap Widget */}
          <div className="lg:col-span-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-2xl font-semibold mb-6">Swap Tokens</h3>
              <TokenSwap />
            </motion.div>
          </div>
          
          {/* NFT Preview */}
          <div className="lg:col-span-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Featured NFTs</h3>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/nft">View All</Link>
                </Button>
              </div>
              <div className="space-y-6">
                <NFTCard nft={nfts[1]} />
              </div>
            </motion.div>
          </div>
          
          {/* DAO Preview */}
          <div className="lg:col-span-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Active Proposals</h3>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/dao">View All</Link>
                </Button>
              </div>
              <div>
                <ProposalCard proposal={proposals[0]} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
