
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { formatAddress } from '@/lib/contracts/contractUtils';
import { NFT } from '@/lib/contracts/types';

interface NFTCardProps {
  nft: NFT;
  onBuy?: (nft: NFT) => void;
}

export function NFTCard({ nft, onBuy }: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBuy) {
      onBuy(nft);
    }
  };

  return (
    <Link to={`/nft/${nft.id}`} className="block">
      <div className="crypto-card overflow-hidden group relative">
        {/* NFT Image with loading state */}
        <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-secondary/50 mb-3">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 animate-pulse">
              <span className="text-lg text-muted-foreground">Loading...</span>
            </div>
          )}
          <img
            src={nft.image}
            alt={nft.name}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Like button */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 bg-black/60 rounded-full p-2 transition-colors hover:bg-black/80"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
          
          {/* Price badge */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <img
              src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
              alt="ETH"
              className="w-4 h-4"
            />
            <span className="text-sm font-semibold text-white">{nft.price}</span>
          </div>
          
          {/* Collection badge */}
          {nft.collection && (
            <Badge className="absolute bottom-3 right-3 bg-primary/80 hover:bg-primary">
              {nft.collection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
          )}
        </div>
        
        {/* NFT Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold truncate">{nft.name}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="text-xs">Creator: {formatAddress(nft.creator)}</p>
                    <p className="text-xs">Owner: {formatAddress(nft.owner)}</p>
                    <p className="text-xs">Created: {new Date(nft.createdAt).toLocaleDateString()}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              by <span className="hover:text-primary">{formatAddress(nft.creator)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span>{likeCount} likes</span>
            </div>
          </div>
          
          {/* Buy button */}
          {onBuy && (
            <Button
              onClick={handleBuy}
              className="w-full mt-4 bg-crypto-gradient hover:opacity-90 transition-opacity"
              size="sm"
            >
              Buy Now
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default NFTCard;
