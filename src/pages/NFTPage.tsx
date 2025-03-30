
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid3X3, List, TrendingUp, Upload, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import NFTCard from '@/components/NFTCard';
import StatCard from '@/components/ui/StatCard';
import { collections, nfts } from '@/lib/contracts/mockData';
import { getAllNFTs, getAllCollections, buyNFT, mintNFT } from '@/lib/contracts/contractUtils';
import { NFT, Collection } from '@/lib/contracts/types';

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const NFTPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [allNFTs, setAllNFTs] = useState<NFT[]>([]);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  
  // For minting NFT
  const [mintName, setMintName] = useState('');
  const [mintDescription, setMintDescription] = useState('');
  const [mintCollection, setMintCollection] = useState('');
  const [mintImage, setMintImage] = useState('');
  const [isMinting, setIsMinting] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nftsData, collectionsData] = await Promise.all([
          getAllNFTs(),
          getAllCollections()
        ]);
        
        setAllNFTs(nftsData);
        setAllCollections(collectionsData);
        
        if (collectionsData.length > 0) {
          setMintCollection(collectionsData[0].id);
        }
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        toast({
          title: "Error",
          description: "Failed to load NFT data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleBuyNFT = async (nft: NFT) => {
    try {
      await buyNFT(nft.id, nft.price.toString());
      
      toast({
        title: "Purchase successful!",
        description: `You are now the proud owner of ${nft.name}`,
      });
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleMintNFT = async () => {
    if (!mintName || !mintDescription || !mintImage) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsMinting(true);
    try {
      const result = await mintNFT(
        mintName,
        mintDescription,
        mintImage,
        mintCollection
      );

      toast({
        title: "NFT minted successfully!",
        description: `Your new NFT has been minted with ID: ${result.nftId}`,
      });

      // Reset form
      setMintName('');
      setMintDescription('');
      setMintImage('');
    } catch (error) {
      toast({
        title: "Minting failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  // Filter NFTs
  const filteredNFTs = allNFTs.filter(nft => {
    const matchesQuery = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          nft.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection = selectedCollection === 'all' || nft.collection === selectedCollection;
    return matchesQuery && matchesCollection;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4 nft-text-gradient">NFT Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover, collect, and sell extraordinary NFTs on the leading decentralized marketplace.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn}>
            <StatCard
              title="Total Volume"
              value="$16.4M"
              icon={<TrendingUp className="h-6 w-6" />}
              trend={8.3}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Floor Price"
              value="5.8 ETH"
              icon={<Upload className="h-6 w-6" />}
              trend={2.1}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="NFTs"
              value={isLoading ? '...' : allNFTs.length.toString()}
              icon={<Grid3X3 className="h-6 w-6" />}
              trend={12.5}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Collections"
              value={isLoading ? '...' : allCollections.length.toString()}
              icon={<List className="h-6 w-6" />}
              trend={5.7}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="mb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search NFTs by name or description..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4">
            <Select value={selectedCollection} onValueChange={setSelectedCollection}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Collections</SelectItem>
                {allCollections.map((collection) => (
                  <SelectItem key={collection.id} value={collection.id}>
                    {collection.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-1 border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-nft-gradient hover:opacity-90 transition-opacity">
                  <Plus className="h-4 w-4 mr-2" />
                  Create NFT
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New NFT</DialogTitle>
                  <DialogDescription>
                    Fill out the details to mint your unique NFT on the blockchain.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="My Awesome NFT"
                      value={mintName}
                      onChange={(e) => setMintName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your NFT..."
                      value={mintDescription}
                      onChange={(e) => setMintDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/my-nft-image.jpg"
                      value={mintImage}
                      onChange={(e) => setMintImage(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="collection">Collection</Label>
                    <Select value={mintCollection} onValueChange={setMintCollection}>
                      <SelectTrigger id="collection">
                        <SelectValue placeholder="Select collection" />
                      </SelectTrigger>
                      <SelectContent>
                        {allCollections.map((collection) => (
                          <SelectItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleMintNFT}
                    disabled={isMinting}
                    className="bg-nft-gradient hover:opacity-90 transition-opacity"
                  >
                    {isMinting ? (
                      <>
                        <Upload className="mr-2 h-4 w-4 animate-spin" />
                        Minting...
                      </>
                    ) : (
                      'Mint NFT'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Main NFT Interface */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Tabs defaultValue="explore" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            
            <TabsContent value="explore" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="crypto-card animate-pulse">
                      <div className="w-full aspect-square bg-secondary mb-4 rounded-lg"></div>
                      <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-secondary rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredNFTs.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No NFTs Found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredNFTs.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} onBuy={handleBuyNFT} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNFTs.map((nft) => (
                    <Card key={nft.id} className="crypto-card overflow-hidden flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 aspect-square">
                        <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold">{nft.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{nft.description}</p>
                        </div>
                        <div className="mt-auto space-y-4">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Collection</p>
                              <p className="font-medium">
                                {nft.collection?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Price</p>
                              <p className="font-medium">{nft.price} ETH</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              className="flex-1 bg-nft-gradient hover:opacity-90 transition-opacity"
                              onClick={() => handleBuyNFT(nft)}
                            >
                              Buy Now
                            </Button>
                            <Button asChild variant="outline" className="flex-1">
                              <Link to={`/nft/${nft.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="collections" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {isLoading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="crypto-card animate-pulse">
                      <div className="w-full aspect-[2/1] bg-secondary mb-4 rounded-lg"></div>
                      <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-secondary rounded w-1/2"></div>
                    </div>
                  ))
                ) : (
                  allCollections.map((collection) => (
                    <Link key={collection.id} to={`/nft/collection/${collection.id}`} className="block group">
                      <Card className="crypto-card overflow-hidden">
                        <div className="relative w-full aspect-[2/1] overflow-hidden rounded-t-lg">
                          <img
                            src={collection.image}
                            alt={collection.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-4">
                              <h3 className="text-xl font-semibold text-white">{collection.name}</h3>
                              <p className="text-sm text-white/80">by {collection.creator.slice(0, 6)}...{collection.creator.slice(-4)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Floor</p>
                            <p className="font-semibold">{collection.floorPrice} ETH</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Volume</p>
                            <p className="font-semibold">{collection.totalVolume.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Items</p>
                            <p className="font-semibold">{collection.items.toLocaleString()}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="mt-0">
              <div className="space-y-6">
                <Card className="overflow-hidden border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle>Trending NFTs</CardTitle>
                    <CardDescription>Most popular NFTs in the last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {nfts.map((nft) => (
                        <NFTCard key={nft.id} nft={nft} onBuy={handleBuyNFT} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle>Top Collections</CardTitle>
                    <CardDescription>Collections with the highest trading volume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {collections.map((collection, index) => (
                        <div key={collection.id} className="flex items-center p-4 border border-border rounded-lg">
                          <div className="text-xl font-bold w-6 mr-4">{index + 1}</div>
                          <img 
                            src={collection.image} 
                            alt={collection.name} 
                            className="w-12 h-12 rounded-full object-cover mr-4" 
                          />
                          <div className="flex-grow">
                            <h3 className="font-semibold">{collection.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Floor: {collection.floorPrice} ETH
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">
                              {collection.totalVolume.toLocaleString()} ETH
                            </div>
                            <div className="text-sm text-green-500">+{(Math.random() * 20).toFixed(2)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              <Card className="overflow-hidden border-border/40">
                <CardHeader>
                  <CardTitle>Upcoming Drops</CardTitle>
                  <CardDescription>Exciting NFT collections launching soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg overflow-hidden border border-border">
                      <div className="relative aspect-[3/1] overflow-hidden">
                        <img 
                          src="https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=1920" 
                          alt="Future Apes Collection" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                          <div className="p-6">
                            <h3 className="text-2xl font-bold text-white">Future Apes Collection</h3>
                            <p className="text-white/80">The next evolution of digital ape ownership</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-primary" />
                            <span className="font-semibold">Dropping in 2 days, 5 hours</span>
                          </div>
                          <Button className="bg-nft-gradient hover:opacity-90 transition-opacity">
                            Set Reminder
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Creator</p>
                            <p className="font-semibold">ApeStudios</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Supply</p>
                            <p className="font-semibold">10,000</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Mint Price</p>
                            <p className="font-semibold">2.5 ETH</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Blockchain</p>
                            <p className="font-semibold">Ethereum</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-border">
                      <div className="relative aspect-[3/1] overflow-hidden">
                        <img 
                          src="https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=1920" 
                          alt="Cybernetic Dreams" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                          <div className="p-6">
                            <h3 className="text-2xl font-bold text-white">Cybernetic Dreams</h3>
                            <p className="text-white/80">Futuristic digital art in a dystopian world</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-primary" />
                            <span className="font-semibold">Dropping in 5 days, 12 hours</span>
                          </div>
                          <Button className="bg-nft-gradient hover:opacity-90 transition-opacity">
                            Set Reminder
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Creator</p>
                            <p className="font-semibold">NeoArtists</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Supply</p>
                            <p className="font-semibold">5,000</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Mint Price</p>
                            <p className="font-semibold">1.8 ETH</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Blockchain</p>
                            <p className="font-semibold">Ethereum</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default NFTPage;
