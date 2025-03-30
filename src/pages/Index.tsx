
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage after a brief delay to show the animation
    const timeout = setTimeout(() => {
      navigate('/home');
    }, 800); // Even faster redirect

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <ParticleBackground className="animate-pulse" />
      
      <div className="text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.3, // Faster animation
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            DeepChain
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            The Next Generation Blockchain Platform
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="w-12 h-12 relative">
              <motion.div 
                className="absolute inset-0 border-4 border-primary rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              />
              <motion.div 
                className="absolute inset-3 bg-primary rounded-full"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
