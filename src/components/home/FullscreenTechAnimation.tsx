
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Lock, Code, Server, Activity, Cpu, Wifi, Shield, Bitcoin } from 'lucide-react';

const FullscreenTechAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation for the floating nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Node properties
    const nodes: {x: number, y: number, vx: number, vy: number, radius: number}[] = [];
    const numNodes = 50;
    const connectionDistance = 150;
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update nodes
      nodes.forEach(node => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(94, 234, 212, 0.5)'; // Teal color with transparency
        ctx.fill();
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.2)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            // Make connections fade with distance
            ctx.globalAlpha = 1 - distance / connectionDistance;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      // Data packet animations
      if (Math.random() > 0.95) {
        // Select random nodes
        const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
        const nodeB = nodes[Math.floor(Math.random() * nodes.length)];
        
        // Animate data packet
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
        
        // Pulse effect at destination
        ctx.beginPath();
        ctx.arc(nodeB.x, nodeB.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  // Variants for icon animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10,
        delay: 0.5
      } 
    },
    pulse: { 
      scale: [1, 1.2, 1], 
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse" as const, 
        duration: 1.5 
      } 
    }
  };
  
  // Digital data flow animation
  const dataFlowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 0.5
      } 
    }
  };
  
  // Random noise animation for data blocks
  const noiseVariants = {
    animate: {
      y: [0, -10, 0, 5, 0],
      x: [0, 5, 0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div 
          className="grid grid-cols-3 md:grid-cols-3 gap-16 md:gap-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* First Row */}
          <motion.div 
            variants={iconVariants} 
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30"
          >
            <Database className="h-10 w-10 text-primary" />
          </motion.div>
          
          <motion.div 
            variants={iconVariants}
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30"
          >
            <Lock className="h-10 w-10 text-accent" />
          </motion.div>
          
          <motion.div 
            variants={iconVariants}
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30"
          >
            <Code className="h-10 w-10 text-primary" />
          </motion.div>
          
          {/* Second Row */}
          <motion.div 
            variants={iconVariants}
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30"
          >
            <Server className="h-10 w-10 text-accent" />
          </motion.div>
          
          <motion.div 
            variants={iconVariants}
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30 relative"
          >
            <Bitcoin className="h-14 w-14 text-primary animate-pulse" />
            <motion.div 
              className="absolute inset-0 border-2 border-primary rounded-full"
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [1, 0.5, 1] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          
          <motion.div 
            variants={iconVariants}
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30"
          >
            <Activity className="h-10 w-10 text-accent" />
          </motion.div>
          
          {/* Third Row */}
          <motion.div 
            variants={iconVariants}
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30"
          >
            <Cpu className="h-10 w-10 text-primary" />
          </motion.div>
          
          <motion.div 
            variants={iconVariants}
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30"
          >
            <Wifi className="h-10 w-10 text-accent" />
          </motion.div>
          
          <motion.div 
            variants={iconVariants}
            animate={["visible", "pulse"]}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-primary/30"
          >
            <Shield className="h-10 w-10 text-primary" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Digital data blocks */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-8 h-8 bg-primary/20 backdrop-blur-sm border border-primary/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={noiseVariants}
            animate="animate"
            transition={{
              delay: index * 0.2
            }}
          />
        ))}
      </div>
      
      {/* Digital noise effect */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default FullscreenTechAnimation;
