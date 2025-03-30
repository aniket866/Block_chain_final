
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Animations
const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8,
      type: "spring",
      stiffness: 100
    } 
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      delay: 0.4
    } 
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400
    }
  }
};

const floatingCircleVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
};

interface HeroSectionProps {
  heroImages: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroImages }) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text Content */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              The Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">Blockchain</span> is Here
            </h1>
            <p className="text-xl text-muted-foreground">
              Experience the power of decentralized applications with our comprehensive blockchain platform built on cutting-edge Rust technology.
            </p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity">
                <a href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" rel="noopener noreferrer">
                  Explore Blockchain
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" rel="noopener noreferrer">
                  Read Docs
                </a>
              </Button>
            </motion.div>
            
            <motion.div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">Rust-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">Multi-Chain Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">Secure & Audited</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side - Animation */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Decorative circles */}
            <motion.div 
              className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-xl"
              style={{ top: '10%', left: '20%' }}
              variants={floatingCircleVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
              style={{ bottom: '20%', right: '15%' }}
              variants={floatingCircleVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
            />
            <motion.div 
              className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl"
              style={{ top: '40%', right: '30%' }}
              variants={floatingCircleVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 2 }}
            />
            
            {/* Animated blockchain nodes */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-r from-accent to-primary rounded-lg p-1"
                style={{ 
                  width: `${Math.random() * 60 + 40}px`, 
                  height: `${Math.random() * 60 + 40}px`,
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: [0, Math.random() * 20 - 10, 0],
                  y: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-full h-full bg-background rounded-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </motion.div>
            ))}
            
            {/* Animated connecting lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.path
                  key={i}
                  d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100 + 100},${Math.random() * 200} ${Math.random() * 100 + 200},${Math.random() * 100 + 200}`}
                  stroke="url(#line-gradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 5,
                    delay: i * 0.7,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              ))}
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
