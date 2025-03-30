
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Code, Cpu, Shield, Fingerprint, Network, ServerOff, Layers, Globe } from 'lucide-react';

const technologies = [
  {
    name: "Decentralized Architecture",
    description: "Distributed systems with no central point of failure",
    icon: Network,
    color: "from-indigo-500 to-purple-500"
  },
  {
    name: "Smart Contracts",
    description: "Self-executing code with the terms directly written into lines of code",
    icon: Code,
    color: "from-cyan-500 to-blue-500"
  },
  {
    name: "Cryptographic Security",
    description: "Military-grade encryption protecting all transactions",
    icon: Shield,
    color: "from-red-500 to-rose-500"
  },
  {
    name: "Distributed Ledger",
    description: "Synchronized and distributed across all network participants",
    icon: Database,
    color: "from-emerald-500 to-green-500"
  },
  {
    name: "Blockchain Consensus",
    description: "Revolutionary proof mechanisms ensuring network agreement",
    icon: Layers,
    color: "from-amber-500 to-orange-500"
  },
  {
    name: "Zero Trust Architecture",
    description: "Verify everything, trust nothing security model",
    icon: ServerOff,
    color: "from-rose-500 to-pink-500"
  },
  {
    name: "Digital Identity",
    description: "Secure, private, and user-controlled digital identity system",
    icon: Fingerprint,
    color: "from-purple-500 to-violet-500"
  },
  {
    name: "Processing Power",
    description: "Harnessing computational resources across the network",
    icon: Cpu,
    color: "from-blue-500 to-indigo-500"
  },
  {
    name: "Global Accessibility",
    description: "Available to anyone with an internet connection",
    icon: Globe,
    color: "from-green-500 to-teal-500"
  }
];

const TechAnimation = () => {
  const [currentTech, setCurrentTech] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech(prev => {
        // Determine new direction at endpoints
        if (prev === technologies.length - 1) {
          setDirection(-1);
          return prev - 1;
        } else if (prev === 0) {
          setDirection(1);
          return prev + 1;
        }
        // Continue in current direction
        return prev + direction;
      });
    }, 2500); // Faster transitions for more aggressive feel

    return () => clearInterval(interval);
  }, [direction]);

  // Animation variants with more aggressive transitions
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08 // Faster staggering
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.7,
      rotate: -8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, // More aggressive spring
        damping: 10,    // Less damping for more bounce
        velocity: 2     // Higher initial velocity
      }
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.7,
      rotate: 8,
      transition: { duration: 0.25 } // Faster exit
    }
  };

  const iconVariants = {
    hidden: { scale: 0.2, rotate: -90 }, // More dramatic starting position
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 600, // Even more aggressive spring for icons
        damping: 8,     // Less damping
        delay: 0.1,
        velocity: 3     // Higher velocity
      }
    },
    pulse: {
      scale: [1, 1.3, 1], // More dramatic pulse
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse" as const, // Explicitly typed as "reverse"
        duration: 1.5     // Faster pulse
      }
    }
  };

  const lineVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%", 
      transition: { 
        duration: 0.5, // Faster line drawing
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Glitch effect variants
  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0.5, 1],
      x: [0, -5, 5, 0],
      transition: {
        duration: 0.3,
        repeat: 2,
        repeatType: "reverse" as const
      }
    }
  };

  const tech = technologies[currentTech];
  const IconComponent = tech.icon;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 8px rgba(124,58,237,0.8)", "0px 0px 0px rgba(255,255,255,0)"]
            }}
            transition={{ 
              duration: 0.6,
              textShadow: {
                repeat: Infinity,
                repeatType: "reverse" as const,
                duration: 2
              }
            }}
          >
            Cutting-Edge <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Blockchain Technology</span>
          </motion.h2>
        </div>
        
        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl">
            {/* Tech visualizer with enhanced animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTech}
                className="crypto-card p-8 overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
              >
                {/* Enhanced background gradient effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-10 blur-xl`}
                  animate={{
                    scale: [1, 1.2, 1], 
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse" as const
                  }}
                ></motion.div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Icon with enhanced animated container */}
                    <motion.div
                      className={`relative flex-shrink-0 w-28 h-28 rounded-2xl flex items-center justify-center bg-gradient-to-br ${tech.color} shadow-lg`}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        rotate: [0, -2, 2, 0],
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white opacity-10 rounded-2xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.1, 0.3, 0.1],
                          borderRadius: ["16px", "20px", "16px"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse" as const
                        }}
                      />
                      
                      {/* Digital noise effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-2xl"
                        animate={{
                          opacity: [0, 0.05, 0.1, 0.05, 0],
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      <motion.div
                        variants={iconVariants}
                        animate="pulse"
                      >
                        <IconComponent className="w-14 h-14 text-white" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Content with enhanced animations */}
                    <div className="flex-grow text-center md:text-left">
                      <motion.h3 
                        className="text-2xl font-bold mb-2"
                        variants={itemVariants}
                        animate={{
                          textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 6px rgba(124,58,237,0.6)", "0px 0px 0px rgba(255,255,255,0)"]
                        }}
                        transition={{
                          textShadow: {
                            repeat: Infinity,
                            repeatType: "reverse" as const,
                            duration: 2
                          }
                        }}
                      >
                        {tech.name}
                      </motion.h3>
                      
                      <motion.div 
                        className={`h-1 w-full bg-gradient-to-r ${tech.color} rounded mb-3`}
                        variants={lineVariants}
                      />
                      
                      <motion.p 
                        className="text-lg text-muted-foreground"
                        variants={itemVariants}
                      >
                        {tech.description}
                      </motion.p>
                    </div>
                  </div>
                
                  {/* Enhanced connected nodes visualization */}
                  <motion.div 
                    className="mt-10 relative h-24"
                    variants={itemVariants}
                  >
                    <div className="absolute inset-0 flex items-center justify-around">
                      {[...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${tech.color}`}
                          animate={{
                            scale: [1, i % 3 === 0 ? 1.8 : 1.4, 1],
                            opacity: [0.7, 1, 0.7],
                            boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(124,58,237,0.8)", "0px 0px 0px rgba(255,255,255,0)"]
                          }}
                          transition={{
                            duration: 1.5 + (i * 0.1),
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatType: "reverse" as const
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="absolute inset-0">
                      <svg width="100%" height="100%" className="opacity-60">
                        {/* Data flow animation */}
                        <motion.line
                          x1="10%" y1="50%" x2="90%" y2="50%"
                          stroke="currentColor"
                          strokeWidth="1"
                          animate={{
                            pathLength: [0, 1],
                            opacity: [0.2, 0.8, 0.2],
                            strokeDasharray: ["1 5", "5 10", "10 15"]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity
                          }}
                        />
                        {[...Array(7)].map((_, i) => (
                          <motion.line
                            key={i}
                            x1={`${15 + i * 10}%`} y1="50%"
                            x2={`${25 + i * 10}%`} y2="50%"
                            stroke="currentColor"
                            strokeWidth="2"
                            animate={{
                              x1: [`${15 + i * 10}%`, `${10 + i * 10}%`],
                              x2: [`${25 + i * 10}%`, `${20 + i * 10}%`],
                              opacity: [0.8, 0.2],
                              strokeDasharray: ["1", "3", "5"]
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.2,
                              repeat: Infinity,
                              repeatType: "reverse" as const
                            }}
                          />
                        ))}
                      </svg>
                    </div>
                    
                    {/* Digital glitch effect */}
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0"
                      animate={{
                        opacity: [0, 0.01, 0.02, 0],
                        skewX: [0, -2, 2, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tech indicators with enhanced animations */}
            <div className="flex justify-center mt-6">
              {technologies.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                    index === currentTech 
                      ? `w-8 bg-gradient-to-r ${technologies[index].color}` 
                      : 'bg-muted'
                  }`}
                  onClick={() => setCurrentTech(index)}
                  whileHover={{ 
                    scale: 1.2,
                    backgroundColor: index !== currentTech ? "#666" : undefined
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={index === currentTech ? {
                    boxShadow: ["0px 0px 0px rgba(124,58,237,0)", "0px 0px 8px rgba(124,58,237,0.8)", "0px 0px 0px rgba(124,58,237,0)"]
                  } : {}}
                  transition={index === currentTech ? {
                    boxShadow: {
                      repeat: Infinity,
                      repeatType: "reverse" as const,
                      duration: 2
                    }
                  } : {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechAnimation;
