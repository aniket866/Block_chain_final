import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from './ThemeToggle';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const location = useLocation();
  const { toast } = useToast();

  const navItems = [
    { title: "Home", path: "/" },
    { title: "NFT Marketplace", path: "/nft" },
    { title: "DAO", path: "/dao" },
    { title: "Smart Contracts", path: "/contracts" },
    { title: "Identity", path: "/identity" },
    { title: "Bridge", path: "/bridge" },
    { title: "Analytics", path: "/analytics" },
    { title: "Learn", path: "/learn" },
    { title: "Developer", path: "/developer" },
  ];

  const dropdownItems = [
    { title: "Community", path: "/community" },
    { title: "About", path: "/about" },
  ];

  const toggleWallet = async () => {
    if (isWalletConnected) {
      // Disconnect wallet
      setIsWalletConnected(false);
      setWalletAddress("");
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected",
      });
      return;
    }

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWalletAddress(address);
        setIsWalletConnected(true);
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        });
      } catch (error) {
        toast({
          title: "Connection failed",
          description: "Failed to connect to wallet. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "MetaMask not installed",
        description: "Please install MetaMask extension to connect your wallet",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent to-primary animate-pulse-slow"></div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">DeepChain</span>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm transition-colors rounded-md hover:bg-secondary ${
                  location.pathname === item.path 
                    ? "bg-secondary text-primary font-medium" 
                    : "text-foreground/80"
                }`}
              >
                {item.title}
              </Link>
            ))}
            
            {dropdownItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-3 py-2 text-sm">
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {dropdownItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          
          <Button
            onClick={toggleWallet}
            variant={isWalletConnected ? "default" : "outline"}
            size="sm"
            className={`hidden sm:flex ${
              isWalletConnected ? "bg-gradient-to-r from-accent to-primary" : ""
            }`}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isWalletConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="glass-effect md:hidden border-b border-border/40">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm rounded-md ${
                    location.pathname === item.path 
                      ? "bg-secondary text-primary font-medium" 
                      : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              {dropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm rounded-md ${
                    location.pathname === item.path 
                      ? "bg-secondary text-primary font-medium" 
                      : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-border/40">
                <ThemeToggle />
                <Button
                  onClick={toggleWallet}
                  variant={isWalletConnected ? "default" : "outline"}
                  size="sm"
                  className={`${
                    isWalletConnected ? "bg-gradient-to-r from-accent to-primary" : ""
                  }`}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isWalletConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
