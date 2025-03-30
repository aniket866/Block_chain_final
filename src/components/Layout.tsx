
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useToast } from '@/hooks/use-toast';
import { initBlockchainWasm } from '@/lib/rust/blockchain';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize blockchain WASM module
    const initBlockchain = async () => {
      try {
        const result = await initBlockchainWasm();
        console.log('Blockchain module initialized:', result);
      } catch (error) {
        console.error('Failed to initialize blockchain module:', error);
        toast({
          title: 'Initialization Error',
          description: 'Failed to initialize blockchain module. Some features may not work correctly.',
          variant: 'destructive',
        });
      }
    };
    
    initBlockchain();
  }, [toast]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
