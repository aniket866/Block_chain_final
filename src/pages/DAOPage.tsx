import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  CheckCircle, 
  Clock, 
  FilePlus, 
  Shield, 
  ThumbsDown, 
  ThumbsUp, 
  Users, 
  Vote, 
  XCircle,
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import StatCard from '@/components/ui/StatCard';
import ProposalCard from '@/components/ProposalCard';
import { proposals } from '@/lib/contracts/mockData';
import { 
  getAllProposals, 
  createProposal, 
  voteOnProposal, 
  executeProposal,
  formatAddress
} from '@/lib/contracts/contractUtils';
import { Proposal } from '@/lib/contracts/types';

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

const DAOPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [allProposals, setAllProposals] = useState<Proposal[]>([]);
  
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  
  const [votingStatus, setVotingStatus] = useState<Record<string, {isVoting: boolean, vote?: boolean}>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proposalsData = await getAllProposals();
        setAllProposals(proposalsData);
      } catch (error) {
        console.error("Error fetching DAO data:", error);
        toast({
          title: "Error",
          description: "Failed to load DAO data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleCreateProposal = async () => {
    if (!proposalTitle || !proposalDescription) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description for your proposal.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreatingProposal(true);
    try {
      const result = await createProposal(
        proposalTitle,
        proposalDescription
      );

      toast({
        title: "Proposal created!",
        description: `Your proposal has been successfully created with ID: ${result.proposalId}`,
      });

      setProposalTitle('');
      setProposalDescription('');
    } catch (error) {
      toast({
        title: "Failed to create proposal",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsCreatingProposal(false);
    }
  };

  const handleVote = async (proposalId: string, support: boolean) => {
    setVotingStatus({
      ...votingStatus,
      [proposalId]: { isVoting: true, vote: support }
    });
    
    try {
      await voteOnProposal(proposalId, support);
      
      toast({
        title: "Vote cast!",
        description: `You have successfully voted ${support ? 'for' : 'against'} proposal ${proposalId}.`,
      });
      
      setAllProposals(proposals.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            forVotes: support ? p.forVotes + 1000 : p.forVotes,
            againstVotes: !support ? p.againstVotes + 1000 : p.againstVotes
          };
        }
        return p;
      }));
    } catch (error) {
      toast({
        title: "Failed to cast vote",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setVotingStatus({
        ...votingStatus,
        [proposalId]: { isVoting: false, vote: support }
      });
    }
  };

  const handleExecute = async (proposalId: string) => {
    try {
      await executeProposal(proposalId);
      
      toast({
        title: "Proposal executed!",
        description: `Proposal ${proposalId} has been successfully executed.`,
      });
      
      setAllProposals(proposals.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            status: 'executed' as 'executed',
            executor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            eta: Date.now() + 86400000
          };
        }
        return p;
      }));
    } catch (error) {
      toast({
        title: "Failed to execute proposal",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const activeProposals = allProposals.filter(p => p.status === 'active').length;
  const totalVoters = 1250;
  const totalVotes = allProposals.reduce((acc, proposal) => acc + proposal.forVotes + proposal.againstVotes, 0);
  const averageParticipation = (totalVotes / (totalVoters * allProposals.length)) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4 defi-text-gradient">DAO Governance</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Participate in decentralized governance and help shape the future of the protocol through community-driven proposals.
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
              title="Active Proposals"
              value={isLoading ? '...' : activeProposals.toString()}
              icon={<Vote className="h-6 w-6" />}
              trend={7.5}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Members"
              value={totalVoters.toLocaleString()}
              icon={<Users className="h-6 w-6" />}
              trend={4.2}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Passed Proposals"
              value={isLoading ? '...' : allProposals.filter(p => p.status === 'passed' || p.status === 'executed').length.toString()}
              icon={<CheckCircle className="h-6 w-6" />}
              trend={3.8}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <StatCard
              title="Participation Rate"
              value={isLoading ? '...' : `${averageParticipation.toFixed(1)}%`}
              icon={<BarChart3 className="h-6 w-6" />}
              trend={2.3}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col-reverse md:flex-row gap-8 mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="md:w-2/3">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Proposal Overview</CardTitle>
                <CardDescription>
                  Status and timeline of ongoing governance proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg mb-6">
                  <div className="flex items-center">
                    <Shield className="h-10 w-10 text-primary mr-4" />
                    <div>
                      <h3 className="font-semibold">Governance Parameters</h3>
                      <p className="text-sm text-muted-foreground">Current configuration</p>
                    </div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="text-sm text-muted-foreground mb-1">Quorum</h4>
                    <p className="text-xl font-semibold">400,000 votes</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="text-sm text-muted-foreground mb-1">Proposal Threshold</h4>
                    <p className="text-xl font-semibold">100,000 DEEP</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="text-sm text-muted-foreground mb-1">Voting Period</h4>
                    <p className="text-xl font-semibold">7 days</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="text-sm text-muted-foreground mb-1">Timelock Delay</h4>
                    <p className="text-xl font-semibold">48 hours</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Proposal Timeline</h3>
                    <div className="relative">
                      <div className="absolute left-4 md:left-7 top-0 bottom-0 w-px bg-border"></div>
                      
                      <div className="space-y-8">
                        <div className="flex gap-4 md:gap-8 items-start relative">
                          <div className="flex-shrink-0 w-8 md:w-14 h-8 md:h-14 rounded-full bg-primary/10 flex items-center justify-center z-10">
                            <FilePlus className="h-4 md:h-6 w-4 md:w-6 text-primary" />
                          </div>
                          <div className="flex-grow pt-1">
                            <h4 className="font-semibold">Creation</h4>
                            <p className="text-sm text-muted-foreground mb-2">Proposal is submitted by a community member</p>
                            <p className="text-xs text-muted-foreground">Requires: 100,000 DEEP tokens to propose</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 md:gap-8 items-start relative">
                          <div className="flex-shrink-0 w-8 md:w-14 h-8 md:h-14 rounded-full bg-primary/10 flex items-center justify-center z-10">
                            <Vote className="h-4 md:h-6 w-4 md:w-6 text-primary" />
                          </div>
                          <div className="flex-grow pt-1">
                            <h4 className="font-semibold">Voting Period</h4>
                            <p className="text-sm text-muted-foreground mb-2">Community votes for or against the proposal</p>
                            <p className="text-xs text-muted-foreground">Duration: 7 days</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 md:gap-8 items-start relative">
                          <div className="flex-shrink-0 w-8 md:w-14 h-8 md:h-14 rounded-full bg-primary/10 flex items-center justify-center z-10">
                            <Clock className="h-4 md:h-6 w-4 md:w-6 text-primary" />
                          </div>
                          <div className="flex-grow pt-1">
                            <h4 className="font-semibold">Timelock</h4>
                            <p className="text-sm text-muted-foreground mb-2">If passed, proposal enters timelock period</p>
                            <p className="text-xs text-muted-foreground">Duration: 48 hours</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 md:gap-8 items-start relative">
                          <div className="flex-shrink-0 w-8 md:w-14 h-8 md:h-14 rounded-full bg-primary/10 flex items-center justify-center z-10">
                            <CheckCircle className="h-4 md:h-6 w-4 md:w-6 text-primary" />
                          </div>
                          <div className="flex-grow pt-1">
                            <h4 className="font-semibold">Execution</h4>
                            <p className="text-sm text-muted-foreground mb-2">Proposal is executed on-chain</p>
                            <p className="text-xs text-muted-foreground">Anyone can trigger execution after timelock</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-1/3">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Create Proposal</CardTitle>
                <CardDescription>
                  Submit a new governance proposal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="proposal-title">Title</Label>
                    <Input 
                      id="proposal-title" 
                      placeholder="Enter proposal title" 
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="proposal-description">Description</Label>
                    <Textarea 
                      id="proposal-description" 
                      placeholder="Describe your proposal in detail..."
                      value={proposalDescription}
                      onChange={(e) => setProposalDescription(e.target.value)}
                      rows={5}
                    />
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Proposal Threshold</span>
                      <span>100,000 DEEP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Your DEEP Balance</span>
                      <span>125,000 DEEP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status</span>
                      <span className="text-green-500">Eligible to Propose</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-defi-gradient hover:opacity-90 transition-opacity"
                  onClick={handleCreateProposal}
                  disabled={isCreatingProposal}
                >
                  {isCreatingProposal ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Proposal...
                    </>
                  ) : (
                    'Create Proposal'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="passed">Passed</TabsTrigger>
              <TabsTrigger value="executed">Executed</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  [...Array(2)].map((_, i) => (
                    <Card key={i} className="crypto-card animate-pulse">
                      <CardHeader className="pb-2">
                        <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-secondary rounded w-1/2"></div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="h-20 bg-secondary rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-secondary rounded"></div>
                          <div className="h-2 bg-secondary rounded"></div>
                          <div className="h-4 bg-secondary rounded"></div>
                          <div className="h-2 bg-secondary rounded"></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="h-10 bg-secondary rounded w-full"></div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  allProposals
                    .filter(proposal => proposal.status === 'active')
                    .map(proposal => (
                      <Card key={proposal.id} className="crypto-card overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{proposal.title}</CardTitle>
                              <CardDescription>
                                Proposed by {formatAddress(proposal.proposer)} · {new Date(proposal.createdAt).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs">
                              <Clock className="h-3 w-3" />
                              <span>Active</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            {proposal.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>For</span>
                              <span>{proposal.forVotes.toLocaleString()} votes</span>
                            </div>
                            <Progress value={proposal.forVotes / (proposal.forVotes + proposal.againstVotes) * 100} className="h-2 bg-secondary" />
                            
                            <div className="flex justify-between text-sm">
                              <span>Against</span>
                              <span>{proposal.againstVotes.toLocaleString()} votes</span>
                            </div>
                            <Progress value={proposal.againstVotes / (proposal.forVotes + proposal.againstVotes) * 100} className="h-2 bg-secondary" />
                          </div>
                        </CardContent>
                        <CardFooter className="flex-col space-y-2">
                          <div className="flex w-full space-x-2">
                            <Button
                              variant="outline"
                              className="flex-1 bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
                              onClick={() => handleVote(proposal.id, true)}
                              disabled={votingStatus[proposal.id]?.isVoting}
                            >
                              {votingStatus[proposal.id]?.isVoting && votingStatus[proposal.id]?.vote ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <ThumbsUp className="mr-2 h-4 w-4" />
                              )}
                              For
                            </Button>
                            
                            <Button
                              variant="outline"
                              className="flex-1 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
                              onClick={() => handleVote(proposal.id, false)}
                              disabled={votingStatus[proposal.id]?.isVoting}
                            >
                              {votingStatus[proposal.id]?.isVoting && !votingStatus[proposal.id]?.vote ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <ThumbsDown className="mr-2 h-4 w-4" />
                              )}
                              Against
                            </Button>
                          </div>
                          <Button variant="secondary" className="w-full">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))
                )}
                
                {!isLoading && allProposals.filter(proposal => proposal.status === 'active').length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No Active Proposals</h3>
                    <p className="text-muted-foreground">There are no active proposals at the moment.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="passed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  [...Array(2)].map((_, i) => (
                    <Card key={i} className="crypto-card animate-pulse">
                      <CardHeader className="pb-2">
                        <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-secondary rounded w-1/2"></div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="h-20 bg-secondary rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-secondary rounded"></div>
                          <div className="h-2 bg-secondary rounded"></div>
                          <div className="h-4 bg-secondary rounded"></div>
                          <div className="h-2 bg-secondary rounded"></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="h-10 bg-secondary rounded w-full"></div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  allProposals
                    .filter(proposal => proposal.status === 'passed')
                    .map(proposal => (
                      <Card key={proposal.id} className="crypto-card overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{proposal.title}</CardTitle>
                              <CardDescription>
                                Proposed by {formatAddress(proposal.proposer)} · {new Date(proposal.createdAt).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">
                              <CheckCircle className="h-3 w-3" />
                              <span>Passed</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            {proposal.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>For</span>
                              <span>{proposal.forVotes.toLocaleString()} votes</span>
                            </div>
                            <Progress value={proposal.forVotes / (proposal.forVotes + proposal.againstVotes) * 100} className="h-2 bg-secondary" />
                            
                            <div className="flex justify-between text-sm">
                              <span>Against</span>
                              <span>{proposal.againstVotes.toLocaleString()} votes</span>
                            </div>
                            <Progress value={proposal.againstVotes / (proposal.forVotes + proposal.againstVotes) * 100} className="h-2 bg-secondary" />
                          </div>
                        </CardContent>
                        <CardFooter className="flex-col space-y-2">
                          <Button
                            className="w-full bg-crypto-gradient hover:opacity-90 transition-opacity"
                            onClick={() => handleExecute(proposal.id)}
                          >
                            Execute Proposal
                          </Button>
                          <Button variant="secondary" className="w-full">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))
                )}
                
                {!isLoading && allProposals.filter(proposal => proposal.status === 'passed').length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No Passed Proposals</h3>
                    <p className="text-muted-foreground">There are no passed proposals waiting for execution.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="executed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  [...Array(2)].map((_, i) => (
                    <Card key={i} className="crypto-card animate-pulse">
                      <CardHeader className="pb-2">
                        <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-secondary rounded w-1/2"></div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="h-20 bg-secondary rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-secondary rounded"></div>
                          <div className="h-2 bg-secondary rounded"></div>
                          <div className="h-4 bg-secondary rounded"></div>
                          <div className="h-2 bg-secondary rounded"></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="h-10 bg-secondary rounded w-full"></div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  allProposals
                    .filter(proposal => proposal.status === 'executed')
                    .map(proposal => (
                      <Card key={proposal.id} className="crypto-card overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{proposal.title}</CardTitle>
                              <CardDescription>
                                Proposed by {formatAddress(proposal.proposer)} · {new Date(proposal.createdAt).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">
                              <CheckCircle className="h-3 w-3" />
                              <span>Executed</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            {proposal.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>For</span>
                              <span>{proposal.forVotes.toLocaleString()} votes</span>
                            </div>
                            <Progress value={proposal.forVotes / (proposal.forVotes + proposal.againstVotes) * 100} className="h-2 bg-secondary" />
                            
                            <div className="flex justify-between text-sm">
                              <span>Against</span>
                              <span>{proposal.againstVotes.toLocaleString()} votes</span>
                            </div>
                            <Progress value={proposal.againstVotes / (proposal.forVotes + proposal.againstVotes) * 100} className="h-2 bg-secondary" />
                          </div>
                          
                          <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
                            <div className="flex justify-between text-sm">
                              <span>Executed by</span>
                              <span>{formatAddress(proposal.executor || '')}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span>Execution date</span>
                              <span>{new Date((proposal.eta || 0) * 1000).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))
                )}
                
                {!isLoading && allProposals.filter(proposal => proposal.status === 'executed').length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No Executed Proposals</h3>
                    <p className="text-muted-foreground">There are no executed proposals yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="failed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  [...Array(2)].map((_, i) => (
                    <Card key={i} className="crypto-card animate-pulse">
                      <CardHeader className="pb-2">
                        <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-secondary rounded w-1/2"></div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="h-20 bg-secondary rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-secondary rounded"></div>
                          <div className="h-2 bg-secondary rounded"></div>
                          <div className="h-4 bg-secondary rounded"></div>
                          <div className="h-2 bg-secondary rounded"></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="h-10 bg-secondary rounded w-full"></div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  allProposals
                    .filter(proposal => proposal.status === 'failed')
                    .map(proposal => (
                      <Card key={proposal.id} className="crypto-card overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{proposal.title}</CardTitle>
                              <CardDescription>
                                Proposed by {formatAddress(proposal.proposer)} · {new Date(proposal.createdAt).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex items-center space-x-1 px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs">
                              <XCircle className="h-3 w-3" />
                              <span>Failed</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            {proposal.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>For</span>
                              <span>{proposal.forVotes.toLocaleString()} votes</span>
                            </div>
                            <Progress value={proposal.forVotes / (proposal.forVotes + proposal.againstVotes) * 100} className="h-2 bg-secondary" />
                            
                            <div className="flex justify-between text-sm">
                              <span>Against</span>
                              <span>{proposal.againstVotes.toLocaleString()} votes</span>
                            </div>
                            <Progress value={proposal.againstVotes / (proposal.forVotes + proposal.againstVotes) * 100} className="h-2 bg-secondary" />
                          </div>
                          
                          <div className="mt-4 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                            <div className="text-sm text-red-500">
                              <span>Reason for failure: </span>
                              <span>Quorum not reached or majority against</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))
                )}
                
                {!isLoading && allProposals.filter(proposal => proposal.status === 'failed').length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No Failed Proposals</h3>
                    <p className="text-muted-foreground">There are no failed proposals in the system.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Card className="crypto-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest governance actions and votes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Proposal</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                        Vote For
                      </div>
                    </TableCell>
                    <TableCell>Treasury Diversification</TableCell>
                    <TableCell>0x742d...8f44e</TableCell>
                    <TableCell>2 hours ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <ThumbsDown className="h-4 w-4 mr-2 text-red-500" />
                        Vote Against
                      </div>
                    </TableCell>
                    <TableCell>Treasury Diversification</TableCell>
                    <TableCell>0x63a9...af9F3</TableCell>
                    <TableCell>5 hours ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FilePlus className="h-4 w-4 mr-2 text-primary" />
                        Create Proposal
                      </div>
                    </TableCell>
                    <TableCell>Treasury Diversification</TableCell>
                    <TableCell>0x742d...8f44e</TableCell>
                    <TableCell>1 day ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Execute
                      </div>
                    </TableCell>
                    <TableCell>Community Fund Allocation</TableCell>
                    <TableCell>0x63a9...af9F3</TableCell>
                    <TableCell>2 days ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle>Governance Token</CardTitle>
              <CardDescription>DEEP token statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-crypto-gradient mr-4"></div>
                  <div>
                    <h3 className="font-semibold text-lg">DEEP</h3>
                    <p className="text-sm text-muted-foreground">DeepChain Governance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">$12.85</div>
                  <div className="text-sm text-green-500">+3.2%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <h4 className="text-sm text-muted-foreground mb-1">Total Supply</h4>
                  <p className="text-lg font-semibold">100,000,000</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <h4 className="text-sm text-muted-foreground mb-1">Circulating</h4>
                  <p className="text-lg font-semibold">65,432,100</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <h4 className="text-sm text-muted-foreground mb-1">Locked</h4>
                  <p className="text-lg font-semibold">42,580,000</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <h4 className="text-sm text-muted-foreground mb-1">Staked</h4>
                  <p className="text-lg font-semibold">38,745,200</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Token Distribution</h4>
                <div className="h-4 rounded-full overflow-hidden bg-secondary flex">
                  <div className="bg-primary h-full" style={{ width: '35%' }}></div>
                  <div className="bg-crypto-purple h-full" style={{ width: '25%' }}></div>
                  <div className="bg-crypto-blue h-full" style={{ width: '20%' }}></div>
                  <div className="bg-crypto-teal h-full" style={{ width: '20%' }}></div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-1"></div>
                    <span>Community</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-crypto-purple mr-1"></div>
                    <span>Team</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-crypto-blue mr-1"></div>
                    <span>Treasury</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-crypto-teal mr-1"></div>
                    <span>Investors</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Buy DEEP Token</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DAOPage;
