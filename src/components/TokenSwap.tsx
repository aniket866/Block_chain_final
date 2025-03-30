
import React, { useState } from 'react';
import { ArrowDownIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { tokens } from '@/lib/contracts/mockData';
import { swapTokens } from '@/lib/contracts/contractUtils';

const TokenSwap = () => {
  const { toast } = useToast();
  const [fromToken, setFromToken] = useState(tokens[0].address);
  const [toToken, setToToken] = useState(tokens[2].address);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    // Simple mock price calculation
    const fromTokenObj = tokens.find(t => t.address === fromToken);
    const toTokenObj = tokens.find(t => t.address === toToken);
    
    if (fromTokenObj && toTokenObj && fromTokenObj.price && toTokenObj.price) {
      const fromValue = parseFloat(value) || 0;
      const exchangeRate = fromTokenObj.price / toTokenObj.price;
      setToAmount((fromValue * exchangeRate).toFixed(6));
    }
  };

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const fromTokenObj = tokens.find(t => t.address === fromToken);
      const toTokenObj = tokens.find(t => t.address === toToken);
      
      if (!fromTokenObj || !toTokenObj) {
        throw new Error("Invalid tokens selected");
      }

      const result = await swapTokens(
        fromTokenObj.symbol,
        toTokenObj.symbol,
        fromAmount
      );

      toast({
        title: "Swap successful!",
        description: `Successfully swapped ${fromAmount} ${fromTokenObj.symbol} to ${toAmount} ${toTokenObj.symbol}`,
      });

      // Reset form
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      toast({
        title: "Swap failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchTokens = () => {
    const tempFromToken = fromToken;
    const tempToToken = toToken;
    setFromToken(tempToToken);
    setToToken(tempFromToken);

    // Also update the amounts
    if (fromAmount) {
      handleFromAmountChange({ target: { value: fromAmount } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Exchange tokens at the best rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fromToken">From</Label>
          <div className="flex space-x-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[180px]">
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
            <Input
              id="fromAmount"
              value={fromAmount}
              onChange={handleFromAmountChange}
              type="number"
              placeholder="0.0"
              className="flex-1"
            />
          </div>
          <div className="text-sm text-right text-muted-foreground">
            Balance: {tokens.find(t => t.address === fromToken)?.balance || '0'}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-secondary"
            onClick={handleSwitchTokens}
          >
            <ArrowDownIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="toToken">To</Label>
          <div className="flex space-x-2">
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-[180px]">
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
            <Input
              id="toAmount"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="flex-1 bg-secondary/50"
            />
          </div>
          <div className="text-sm text-right text-muted-foreground">
            Balance: {tokens.find(t => t.address === toToken)?.balance || '0'}
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate</span>
            <span>
              1 {tokens.find(t => t.address === fromToken)?.symbol || ''} ≈{' '}
              {
                (() => {
                  const fromTokenObj = tokens.find(t => t.address === fromToken);
                  const toTokenObj = tokens.find(t => t.address === toToken);
                  
                  if (fromTokenObj && toTokenObj && fromTokenObj.price && toTokenObj.price) {
                    return (fromTokenObj.price / toTokenObj.price).toFixed(6);
                  }
                  return '0';
                })()
              } {tokens.find(t => t.address === toToken)?.symbol || ''}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-muted-foreground">Fee</span>
            <span>0.3%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-crypto-gradient hover:opacity-90 transition-opacity"
          disabled={isLoading || !fromAmount || parseFloat(fromAmount) <= 0}
          onClick={handleSwap}
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Swapping...
            </>
          ) : (
            'Swap Tokens'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenSwap;
