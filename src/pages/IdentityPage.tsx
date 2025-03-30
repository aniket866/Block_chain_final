import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  CircleCheck, 
  Eye, 
  FileCheck, 
  Fingerprint, 
  Key, 
  Loader2, 
  Lock, 
  Plus, 
  ShieldCheck, 
  User, 
  UserCheck,
  CheckSquare,
  ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import StatCard from '@/components/ui/StatCard';
import { identities } from '@/lib/contracts/mockData';
import { getAllIdentities, createIdentity } from '@/lib/contracts/contractUtils';
import { Identity } from '@/lib/contracts/types';

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

const IdentityPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [allIdentities, setAllIdentities] = useState<Identity[]>([]);
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);
  
  const [newIdentityName, setNewIdentityName] = useState('');
  const [isCreatingIdentity, setIsCreatingIdentity] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const identitiesData = await getAllIdentities();
        setAllIdentities(identitiesData);
        
        if (identitiesData.length > 0) {
          setSelectedIdentity(identitiesData[0]);
        }
      } catch (error) {
        console.error("Error fetching identity data:", error);
        toast({
          title: "Error",
          description: "Failed to load identity data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleCreateIdentity = async () => {
    if (!newIdentityName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid name for your identity.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingIdentity(true);
    try {
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 42);
      const result = await createIdentity(newIdentityName, mockAddress, "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70));

      toast({
        title: "Identity created!",
        description: `Your new identity "${newIdentityName}" has been created with DID: ${result.did.slice(0, 10)}...`,
      });

      setNewIdentityName('');
      
      const updatedIdentities = await getAllIdentities();
      setAllIdentities(updatedIdentities);
      
      if (updatedIdentities.length > 0) {
        setSelectedIdentity(updatedIdentities[0]);
      }
    } catch (error) {
      toast({
        title: "Failed to create identity",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsCreatingIdentity(false);
    }
  };

  const renderDid = (identity: Identity | null) => {
    if (!identity || !identity.did) return 'Unknown';
    return `${identity.did.slice(0, 16)}...${identity.did.slice(-4)}`;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4 nft-text-gradient">Decentralized Identity</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Control your digital identity with blockchain-based verification and credentials that are private, secure, and owned by you.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn}>
            <StatCard
              title="Identities"
              value={isLoading ? '...' : allIdentities.length.toString()}
              icon={<Fingerprint className="h-6 w-6" />}
              trend={9.5}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Verified Credentials"
              value="14"
              icon={<FileCheck className="h-6 w-6" />}
              trend={5.2}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Trust Score"
              value="92%"
              icon={<ShieldCheck className="h-6 w-6" />}
              trend={1.8}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Authentications"
              value="235"
              icon={<Key className="h-6 w-6" />}
              trend={7.3}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <motion.div
            className="lg:w-2/3"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {isLoading ? (
              <Card className="crypto-card animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-secondary rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-secondary rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-60 bg-secondary rounded"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-secondary rounded w-full"></div>
                </CardFooter>
              </Card>
            ) : selectedIdentity ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="credentials">Credentials</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <Card className="crypto-card">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center">
                          <Avatar className="h-16 w-16 mr-4">
                            <AvatarImage src={selectedIdentity.avatar || 'https://i.pravatar.cc/150?img=1'} alt={selectedIdentity.name || 'User'} />
                            <AvatarFallback>{selectedIdentity.name?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-2xl">
                              {selectedIdentity.name || 'Anonymous User'}
                              {selectedIdentity.reputation && selectedIdentity.reputation > 90 && (
                                <CircleCheck className="inline-block ml-2 h-5 w-5 text-green-500" />
                              )}
                            </CardTitle>
                            <CardDescription className="mt-1 font-mono">
                              {renderDid(selectedIdentity)}
                            </CardDescription>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            <UserCheck className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                          <Badge variant="outline" className="bg-crypto-teal/10 text-crypto-teal border-crypto-teal/20">
                            <Award className="mr-1 h-3 w-3" />
                            Trusted
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Reputation Score</div>
                          <div className="flex items-center">
                            <div className="text-2xl font-bold mr-3">{selectedIdentity.reputation || 85}</div>
                            <Progress value={selectedIdentity.reputation || 85} className="h-2 flex-grow" />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {selectedIdentity.reputation && selectedIdentity.reputation > 90
                              ? 'Excellent reputation - highest level of trust'
                              : selectedIdentity.reputation && selectedIdentity.reputation > 70
                              ? 'Good reputation - trusted by many services'
                              : 'Average reputation - continue building trust'}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Last Activity</div>
                          <div className="text-lg font-medium">1 hour ago</div>
                          <div className="text-xs text-muted-foreground">
                            Used identity for authentication at DeFi platform
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center mb-2">
                            <FileCheck className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-medium">Credentials</h3>
                          </div>
                          <div className="text-2xl font-bold">{selectedIdentity.credentials?.length || 0}</div>
                          <p className="text-xs text-muted-foreground">Verified attestations</p>
                        </div>
                        
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center mb-2">
                            <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-medium">Verifications</h3>
                          </div>
                          <div className="text-2xl font-bold">8</div>
                          <p className="text-xs text-muted-foreground">Used as identity proof</p>
                        </div>
                        
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center mb-2">
                            <Lock className="h-5 w-5 mr-2 text-primary" />
                            <h3 className="font-medium">Recovery Keys</h3>
                          </div>
                          <div className="text-2xl font-bold">2</div>
                          <p className="text-xs text-muted-foreground">Backup guardians set</p>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <h3 className="font-medium mb-3">Connected Applications</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-crypto-blue flex items-center justify-center mb-2">
                              <User className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-sm">DeFi Platform</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-crypto-purple flex items-center justify-center mb-2">
                              <ShieldCheck className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-sm">DAO Voting</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-crypto-teal flex items-center justify-center mb-2">
                              <Award className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-sm">NFT Marketplace</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                              <Plus className="h-6 w-6" />
                            </div>
                            <span className="text-sm">Add More</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="credentials" className="mt-0">
                  <Card className="crypto-card">
                    <CardHeader>
                      <CardTitle>Verified Credentials</CardTitle>
                      <CardDescription>
                        Cryptographically secured attestations that verify aspects of your identity
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedIdentity.credentials && selectedIdentity.credentials.length > 0 ? (
                          selectedIdentity.credentials.map((credential, index) => (
                            <div key={index} className="p-4 border border-border rounded-lg">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center">
                                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                                    {credential.type === 'KYCVerified' ? (
                                      <UserCheck className="h-5 w-5 text-primary" />
                                    ) : credential.type === 'VerifiedDeveloper' ? (
                                      <FileCheck className="h-5 w-5 text-primary" />
                                    ) : (
                                      <Award className="h-5 w-5 text-primary" />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{credential.type}</h3>
                                    <p className="text-xs text-muted-foreground">
                                      Issued by: {credential.issuer.slice(0, 8)}...{credential.issuer.slice(-4)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Issuance date: {new Date(credential.issuanceDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Credentials Yet</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                              You don't have any verified credentials yet. Request credentials from trusted issuers to build your identity.
                            </p>
                            <Button>Request Credential</Button>
                          </div>
                        )}
                        
                        <div className="p-4 border border-dashed border-border rounded-lg text-center">
                          <Button variant="ghost">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Credential
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <Card className="crypto-card">
                    <CardHeader>
                      <CardTitle>Activity History</CardTitle>
                      <CardDescription>
                        Recent authentication and verification activity with your identity
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
                          
                          <div className="space-y-8">
                            <div className="flex gap-4 items-start relative">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center z-10">
                                <Key className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-grow pt-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <h4 className="font-semibold">Authentication</h4>
                                  <span className="text-sm text-muted-foreground">1 hour ago</span>
                                </div>
                                <p className="text-sm mb-2">Logged in to DeFi Platform</p>
                                <div className="p-2 bg-secondary/30 rounded-md text-xs text-muted-foreground font-mono">
                                  Service: defi.deepchain.network
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-4 items-start relative">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-crypto-green/10 flex items-center justify-center z-10">
                                <CheckSquare className="h-4 w-4 text-crypto-green" />
                              </div>
                              <div className="flex-grow pt-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <h4 className="font-semibold">Governance</h4>
                                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                                </div>
                                <p className="text-sm mb-2">Voted on DAO proposal #12</p>
                                <div className="p-2 bg-secondary/30 rounded-md text-xs text-muted-foreground font-mono">
                                  Proposal: Treasury Diversification
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-4 items-start relative">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-crypto-blue/10 flex items-center justify-center z-10">
                                <Award className="h-4 w-4 text-crypto-blue" />
                              </div>
                              <div className="flex-grow pt-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <h4 className="font-semibold">Credential Issuance</h4>
                                  <span className="text-sm text-muted-foreground">2 days ago</span>
                                </div>
                                <p className="text-sm mb-2">Received new credential</p>
                                <div className="p-2 bg-secondary/30 rounded-md text-xs text-muted-foreground font-mono">
                                  Credential: VerifiedDeveloper
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-4 items-start relative">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center z-10">
                                <Fingerprint className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-grow pt-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <h4 className="font-semibold">Identity Creation</h4>
                                  <span className="text-sm text-muted-foreground">14 days ago</span>
                                </div>
                                <p className="text-sm mb-2">Created decentralized identity</p>
                                <div className="p-2 bg-secondary/30 rounded-md text-xs text-muted-foreground font-mono">
                                  DID: {renderDid(selectedIdentity)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <Card className="crypto-card">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage the security and recovery options for your identity
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 border border-border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Key className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <h3 className="font-medium">Authentication Keys</h3>
                              <p className="text-sm text-muted-foreground">
                                Manage keys that can access your identity
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-secondary/20 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Primary Key</span>
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground">
                              0x7e3c4...f28b
                            </p>
                          </div>
                          <div className="p-3 bg-secondary/20 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Device Key</span>
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Mobile</Badge>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground">
                              0x9a2d3...e45c
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <ShieldCheck className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <h3 className="font-medium">Recovery Guardians</h3>
                              <p className="text-sm text-muted-foreground">
                                Trusted entities that can help recover your identity
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-secondary/20 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Hardware Wallet</span>
                              <Badge variant="outline" className="bg-crypto-purple/10 text-crypto-purple border-crypto-purple/20">Guardian</Badge>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground">
                              0xb8e5d...9c7a
                            </p>
                          </div>
                          <div className="p-3 bg-secondary/20 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Trusted Friend</span>
                              <Badge variant="outline" className="bg-crypto-teal/10 text-crypto-teal border-crypto-teal/20">Guardian</Badge>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground">
                              0x4f2a1...d63b
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-3 border border-dashed border-border rounded-md text-center">
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Guardian
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <Lock className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <h3 className="font-medium">Privacy Settings</h3>
                              <p className="text-sm text-muted-foreground">
                                Control what information is shared with services
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-md">
                            <span className="text-sm">Share identity verification status</span>
                            <Badge>Enabled</Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-md">
                            <span className="text-sm">Allow selective disclosure of credentials</span>
                            <Badge>Enabled</Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-md">
                            <span className="text-sm">Record authentication history</span>
                            <Badge variant="outline">Optional</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 crypto-card">
                <Fingerprint className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Identity Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You don't have any decentralized identities yet. Create your first DID to get started.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-nft-gradient hover:opacity-90 transition-opacity">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Identity
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Identity</DialogTitle>
                      <DialogDescription>
                        Set up your decentralized identity (DID) to manage your digital presence.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={newIdentityName}
                          onChange={(e) => setNewIdentityName(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleCreateIdentity}
                        disabled={isCreatingIdentity}
                        className="bg-nft-gradient hover:opacity-90 transition-opacity"
                      >
                        {isCreatingIdentity ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          'Create Identity'
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:w-1/3"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Your Identities</CardTitle>
                <CardDescription>
                  Manage all your decentralized identities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  [...Array(2)].map((_, i) => (
                    <div key={i} className="p-4 border border-border rounded-lg animate-pulse">
                      <div className="flex items-center">
                        <div className="rounded-full bg-secondary h-12 w-12 mr-4"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-secondary rounded w-1/3"></div>
                          <div className="h-3 bg-secondary rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : allIdentities.length > 0 ? (
                  allIdentities.map((identity) => (
                    <div
                      key={identity.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedIdentity?.id === identity.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40 hover:bg-secondary/30'
                      }`}
                      onClick={() => setSelectedIdentity(identity)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={identity.avatar || 'https://i.pravatar.cc/150?img=1'} alt={identity.name || 'User'} />
                          <AvatarFallback>{identity.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            {identity.name || 'Unnamed Identity'}
                            {identity.reputation && identity.reputation > 90 && (
                              <CircleCheck className="inline-block ml-1 h-4 w-4 text-green-500" />
                            )}
                          </h3>
                          <p className="text-xs text-muted-foreground font-mono">
                            {identity.did ? `${identity.did.slice(0, 10)}...${identity.did.slice(-4)}` : 'Unknown DID'}
                          </p>
                          {identity.credentials && (
                            <div className="flex gap-1 mt-1">
                              {identity.credentials.length > 0 && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {identity.credentials.length} Credentials
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">No identities found</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Create Identity</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Identity</DialogTitle>
                          <DialogDescription>
                            Set up your decentralized identity (DID) to manage your digital presence.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input
                              id="name"
                              placeholder="Enter your name"
                              value={newIdentityName}
                              onChange={(e) => setNewIdentityName(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleCreateIdentity}
                            disabled={isCreatingIdentity}
                            className="bg-nft-gradient hover:opacity-90 transition-opacity"
                          >
                            {isCreatingIdentity ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              'Create Identity'
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                
                {allIdentities.length > 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Identity
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Identity</DialogTitle>
                        <DialogDescription>
                          Set up your decentralized identity (DID) to manage your digital presence.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Display Name</Label>
                          <Input
                            id="name"
                            placeholder="Enter your name"
                            value={newIdentityName}
                            onChange={(e) => setNewIdentityName(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleCreateIdentity}
                          disabled={isCreatingIdentity}
                          className="bg-nft-gradient hover:opacity-90 transition-opacity"
                        >
                          {isCreatingIdentity ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            'Create Identity'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
            
            <Card className="crypto-card mt-6">
              <CardHeader>
                <CardTitle>Credential Issuers</CardTitle>
                <CardDescription>
                  Organizations that can issue verifiable credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-crypto-blue flex items-center justify-center mr-3">
                        <UserCheck className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">KYC Provider</h3>
                        <p className="text-xs text-muted-foreground">
                          Identity verification services
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-crypto-purple flex items-center justify-center mr-3">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Certification Authority</h3>
                        <p className="text-xs text-muted-foreground">
                          Technical and professional certifications
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-crypto-teal flex items-center justify-center mr-3">
                        <ShieldCheck className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">DAO Council</h3>
                        <p className="text-xs text-muted-foreground">
                          Governance participation credentials
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle>Benefits of Decentralized Identity</CardTitle>
              <CardDescription>
                Why blockchain-based identity solutions are the future of digital identity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-border rounded-lg">
                  <div className="rounded-full bg-crypto-blue/10 p-3 inline-block mb-4">
                    <User className="h-6 w-6 text-crypto-blue" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Self-Sovereign</h3>
                  <p className="text-muted-foreground">
                    You own and control your identity data, not corporations or governments. No more being locked out of accounts or having your data sold.
                  </p>
                </div>
                
                <div className="p-6 border border-border rounded-lg">
                  <div className="rounded-full bg-crypto-purple/10 p-3 inline-block mb-4">
                    <Lock className="h-6 w-6 text-crypto-purple" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Privacy-Preserving</h3>
                  <p className="text-muted-foreground">
                    Selective disclosure allows you to share only the minimum information needed. Prove your age without revealing your birthdate.
                  </p>
                </div>
                
                <div className="p-6 border border-border rounded-lg">
                  <div className="rounded-full bg-crypto-teal/10 p-3 inline-block mb-4">
                    <ShieldAlert className="h-6 w-6 text-crypto-teal" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Fraud-Resistant</h3>
                  <p className="text-muted-foreground">
                    Credentials are cryptographically verified and tamper-proof. Eliminate fake identities and reduce identity fraud.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default IdentityPage;
