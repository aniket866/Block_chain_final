
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-crypto-gradient"></div>
              <span className="text-xl font-bold tracking-tight hero-text-gradient">DeepChain</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building the future of decentralized applications through innovative blockchain solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/defi" className="text-muted-foreground hover:text-primary transition-colors">DeFi Platform</Link></li>
              <li><Link to="/nft" className="text-muted-foreground hover:text-primary transition-colors">NFT Marketplace</Link></li>
              <li><Link to="/dao" className="text-muted-foreground hover:text-primary transition-colors">DAO Governance</Link></li>
              <li><Link to="/identity" className="text-muted-foreground hover:text-primary transition-colors">Identity Solutions</Link></li>
              <li><Link to="/bridge" className="text-muted-foreground hover:text-primary transition-colors">Cross-Chain Bridge</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learn" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/developer" className="text-muted-foreground hover:text-primary transition-colors">Developer Portal</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="/learn" className="text-muted-foreground hover:text-primary transition-colors">Tutorials</Link></li>
              <li><Link to="/learn" className="text-muted-foreground hover:text-primary transition-colors">Whitepaper</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Press</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DeepChain. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
