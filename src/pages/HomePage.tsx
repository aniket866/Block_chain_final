
import React from 'react';
import { Wallet, LineChart, Server, CheckCircle } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import ShowcaseSection from '@/components/home/ShowcaseSection';
import BlockchainDemoSection from '@/components/home/BlockchainDemoSection';
import LiveNetworkSection from '@/components/home/LiveNetworkSection';
import CTASection from '@/components/home/CTASection';
import ParticleBackground from '@/components/ParticleBackground';
import { nfts, proposals } from '@/lib/contracts/mockData';
import { getBlockchainInfo } from '@/lib/rust/blockchain';
import FullscreenTechAnimation from '@/components/home/FullscreenTechAnimation';

const HomePage = () => {
  // Hero image background options (not using these anymore)
  const heroImages = [
    '/blockchain-bg.svg',
    'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=2070&q=80',
  ];

  const blockchainInfo = getBlockchainInfo();

  const stats = {
    totalValue: "$2.5B",
    activeUsers: "250k+",
    totalTransactions: "12.5M",
    avgGasPrice: "25 Gwei"
  };

  return (
    <div className="relative overflow-hidden">
      {/* Enhanced fullscreen tech animation that covers the entire page */}
      <div className="absolute inset-0 pointer-events-none">
        <FullscreenTechAnimation />
      </div>
      
      <div className="relative z-20">
        <HeroSection 
          heroImages={heroImages} 
        />
        
        <StatsSection stats={stats} />
        
        <FeaturesSection />
        
        <LiveNetworkSection blockchainInfo={blockchainInfo} />
        
        <ShowcaseSection nfts={nfts} proposals={proposals} />
        
        <BlockchainDemoSection />
        
        <CTASection />
      </div>
    </div>
  );
};

export default HomePage;
