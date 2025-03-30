import React, { useState } from 'react';
import { ArrowRight, ArrowDown, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { chains, tokens } from '@/lib/contracts/mockData';
import { bridgeAsset } from '@/lib/contracts/contractUtils';
import { useToast } from '@/components/ui/use-toast';

interface ChainBridgeCardProps {
  className?: string;
}

const ChainBridgeCard: React.FC<ChainBridgeCardProps> = ({ className }) => {
  const { toast } = useToast();
  const [sourceChain, setSourceChain] = useState(chains[0].id.toString());
  const [targetChain, setTargetChain] = useState(chains[1].id.toString());
  const [token, setToken] = useState(tokens[2].address); // WETH by default
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapChains = () => {
    const temp = sourceChain;
    setSourceChain(targetChain);
    setTargetChain(temp);
  };

  const handleBridge = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to bridge.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const selectedToken = tokens.find(t => t.address === token);
      
      if (!selectedToken) {
        throw new Error("Invalid token selected");
      }

      const result = await bridgeAsset(
        parseInt(sourceChain),
        parseInt(targetChain),
        selectedToken.symbol
      );

      toast({
        title: "Bridge initiated!",
        description: `Successfully bridged ${amount} ${selectedToken.symbol} from ${chains.find(c => c.id.toString() === sourceChain)?.name} to ${chains.find(c => c.id.toString() === targetChain)?.name}`,
      });

      // Reset form
      setAmount('');
    } catch (error) {
      toast({
        title: "Bridge failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`crypto-card border-border/40 ${className || ''}`}>
      <CardHeader>
        <CardTitle>Cross-Chain Bridge</CardTitle>
        <CardDescription>Move assets between different blockchains</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">From</label>
          <Select value={sourceChain} onValueChange={setSourceChain}>
            <SelectTrigger>
              <SelectValue placeholder="Select source chain" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  <div className="flex items-center">
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-5 h-5 mr-2 rounded-full"
                    />
                    {chain.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-secondary"
            onClick={handleSwapChains}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">To</label>
          <Select value={targetChain} onValueChange={setTargetChain}>
            <SelectTrigger>
              <SelectValue placeholder="Select target chain" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  <div className="flex items-center">
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-5 h-5 mr-2 rounded-full"
                    />
                    {chain.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Token</label>
          <Select value={token} onValueChange={setToken}>
            <SelectTrigger>
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              {tokens.map((token) => (
                <SelectItem key={token.address} value={token.address}>
                  <div className="flex items-center">
                    {token.logoURI && (
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="w-5 h-5 mr-2 rounded-full"
                      />
                    )}
                    {token.symbol}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="text-xs text-right text-muted-foreground">
            Balance: {tokens.find(t => t.address === token)?.balance || '0'}
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Bridge Fee</span>
            <span>0.001 {tokens.find(t => t.address === token)?.symbol}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-muted-foreground">Estimated Time</span>
            <span>~15 minutes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-nft-gradient hover:opacity-90 transition-opacity"
          disabled={isLoading || !amount || parseFloat(amount) <= 0}
          onClick={handleBridge}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Bridging...
            </>
          ) : (
            'Bridge Assets'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChainBridgeCard;
