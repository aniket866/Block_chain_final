
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, Database, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { executeTransaction, mineBlock } from '@/lib/rust/bridge';
import { useToast } from '@/components/ui/use-toast';

const BlockchainDemoSection: React.FC = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setWalletConnected(true);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected to DeepChain.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleSendTransaction = async () => {
    setIsSending(true);
    
    try {
      const randomAddress = `0x${Math.random().toString(16).slice(2, 42)}`;
      await executeTransaction('myWallet', randomAddress, 10, 0.001);
      
      toast({
        title: "Transaction Sent",
        description: "Your transaction has been submitted to the network.",
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to send transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const handleMineBlock = async () => {
    setIsMining(true);
    
    try {
      await mineBlock();
      
      toast({
        title: "Block Mined",
        description: "You successfully mined a new block and earned a reward!",
      });
    } catch (error) {
      toast({
        title: "Mining Failed",
        description: "Failed to mine block. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMining(false);
    }
  };

  return (
    <section className="py-16 bg-card/50">
      <div className="container px-4 mx-auto">
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Try our Blockchain Demo</h2>
          <p className="text-lg text-muted-foreground">
            Experience our Rust-powered blockchain with this interactive demo. Connect your wallet and start sending transactions right away.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="crypto-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-primary" />
              Connect Wallet
            </h3>
            <p className="text-muted-foreground mb-6">
              Connect to MetaMask, WalletConnect, or any other compatible wallet to interact with DeepChain.
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-accent to-primary"
              onClick={handleConnectWallet}
              disabled={isConnecting || walletConnected}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : walletConnected ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Connected
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect to MetaMask
                </>
              )}
            </Button>
          </motion.div>
          
          <motion.div
            className="crypto-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Coins className="mr-2 h-5 w-5 text-accent" />
              Send Transaction
            </h3>
            <p className="text-muted-foreground mb-6">
              Create a transaction on our test blockchain. This simulates sending tokens to another address.
            </p>
            <Button 
              className="w-full"
              variant="outline"
              onClick={handleSendTransaction}
              disabled={isSending || !walletConnected}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Coins className="mr-2 h-4 w-4" />
                  Send 10 DC
                </>
              )}
            </Button>
          </motion.div>
          
          <motion.div
            className="crypto-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Database className="mr-2 h-5 w-5 text-primary" />
              Mine Transactions
            </h3>
            <p className="text-muted-foreground mb-6">
              Mine pending transactions to add them to the blockchain and earn mining rewards.
            </p>
            <Button 
              className="w-full bg-black/20 hover:bg-black/30 text-foreground"
              onClick={handleMineBlock}
              disabled={isMining || !walletConnected}
            >
              {isMining ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mining...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Start Mining
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlockchainDemoSection;
