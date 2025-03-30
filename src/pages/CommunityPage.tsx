import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Lightbulb, MessageSquare, Share2, Twitter, Users, Youtube, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const CommunityPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4 hero-text-gradient">Join Our Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with builders, developers, and enthusiasts in the DeepChain ecosystem.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {communityPlatforms.map((platform, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="crypto-card h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4 flex items-center justify-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                      <platform.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">{platform.name}</CardTitle>
                  <CardDescription className="text-center">{platform.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-sm text-muted-foreground">{platform.members}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button variant="default">
                    {platform.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Tabs defaultValue="events" className="w-full mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="forum">Forum Discussions</TabsTrigger>
            <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {events.map((event, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="crypto-card h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className={`px-3 py-1 text-xs rounded-full ${
                          event.type === 'Online' ? 'bg-blue-500/20 text-blue-500' :
                          event.type === 'In-Person' ? 'bg-green-500/20 text-green-500' :
                          'bg-purple-500/20 text-purple-500'
                        }`}>
                          {event.type}
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        {event.date} • {event.time}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm mb-4">{event.description}</p>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Register Now</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="forum">
            <div className="space-y-6">
              {forumDiscussions.map((discussion, index) => (
                <Card key={index} className="crypto-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                        <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{discussion.title}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-xs text-muted-foreground">by {discussion.author}</span>
                              <span className="text-xs text-muted-foreground">• {discussion.date}</span>
                            </div>
                          </div>
                          <div className={`px-2 py-0.5 text-xs rounded-full ${
                            discussion.category === 'Technical' ? 'bg-blue-500/20 text-blue-500' :
                            discussion.category === 'Governance' ? 'bg-purple-500/20 text-purple-500' :
                            discussion.category === 'General' ? 'bg-green-500/20 text-green-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {discussion.category}
                          </div>
                        </div>
                        <p className="text-sm mb-3">{discussion.preview}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{discussion.views} views</span>
                          </div>
                          <div className="flex-grow"></div>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-center">
                <Button>View All Discussions</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contributors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contributors.map((contributor, index) => (
                <Card key={index} className="crypto-card">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4 border-2 border-primary/20">
                      <AvatarImage src={contributor.avatar} alt={contributor.name} />
                      <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium mb-1">{contributor.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{contributor.role}</p>
                    <div className="flex space-x-2 mb-4">
                      {contributor.badges.map((badge, i) => (
                        <div 
                          key={i} 
                          className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                          title={badge.name}
                        >
                          <badge.icon className="w-3 h-3 text-primary" />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">{contributor.contributions} contributions</p>
                    <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Ecosystem Projects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ecosystemProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl border border-border/40 p-6 flex flex-col items-center text-center transition-all hover:border-primary/40"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                  <img 
                    src={project.logo} 
                    alt={project.name} 
                    className="w-10 h-10 rounded-full object-contain"
                  />
                </div>
                <h3 className="font-medium text-sm mb-1">{project.name}</h3>
                <p className="text-xs text-muted-foreground">{project.category}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const communityPlatforms = [
  {
    name: 'Discord Community',
    description: 'Chat with community members and get real-time support',
    members: '25,000+ members',
    buttonText: 'Join Discord',
    icon: MessageSquare
  },
  {
    name: 'Forum',
    description: 'Participate in technical discussions and governance proposals',
    members: '12,500+ members',
    buttonText: 'Visit Forum',
    icon: Users
  },
  {
    name: 'Social Media',
    description: 'Follow us on Twitter, YouTube, and other platforms',
    members: '78,000+ followers',
    buttonText: 'Follow Us',
    icon: Share2
  }
];

const events = [
  {
    title: 'DeepChain Developer Conference',
    type: 'In-Person',
    date: 'June 15-17, 2023',
    time: '9:00 AM - 6:00 PM',
    description: 'Join us for three days of workshops, presentations, and networking with the top minds in blockchain development.',
    attendees: '450'
  },
  {
    title: 'DeFi Integration Workshop',
    type: 'Online',
    date: 'May 22, 2023',
    time: '1:00 PM - 4:00 PM UTC',
    description: 'Learn how to integrate with DeepChain\'s DeFi protocols and leverage our ecosystem for your applications.',
    attendees: '320'
  },
  {
    title: 'Community Town Hall',
    type: 'Online',
    date: 'May 5, 2023',
    time: '6:00 PM - 7:30 PM UTC',
    description: 'Monthly community gathering to discuss project updates, governance proposals, and answer community questions.',
    attendees: '590'
  },
  {
    title: 'Rust Smart Contract Hackathon',
    type: 'Hybrid',
    date: 'June 3-4, 2023',
    time: 'All Day',
    description: 'Build innovative blockchain applications using Rust smart contracts on DeepChain with $50,000 in prizes.',
    attendees: '275'
  },
  {
    title: 'Web3 For Beginners Webinar',
    type: 'Online',
    date: 'May 18, 2023',
    time: '3:00 PM - 4:30 PM UTC',
    description: 'Introduction to Web3 technologies and how to get started with blockchain development.',
    attendees: '680'
  },
  {
    title: 'Asia Blockchain Summit',
    type: 'In-Person',
    date: 'July 10-12, 2023',
    time: '9:00 AM - 5:00 PM SGT',
    description: 'DeepChain will be presenting at Asia\'s largest blockchain conference in Singapore.',
    attendees: '350'
  }
];

const forumDiscussions = [
  {
    title: 'Implementing Cross-Chain Communication Protocol',
    author: 'alexdev',
    authorAvatar: 'https://i.pravatar.cc/150?u=alexdev',
    date: '2 hours ago',
    preview: 'I\'ve been working on a cross-chain messaging system and would like to share my approach with the community...',
    category: 'Technical',
    replies: 24,
    views: 342
  },
  {
    title: 'Proposal: Treasury Fund Allocation for Q3 2023',
    author: 'sarahgov',
    authorAvatar: 'https://i.pravatar.cc/150?u=sarahgov',
    date: '1 day ago',
    preview: 'This proposal outlines how we should allocate the treasury funds for ecosystem growth in the next quarter...',
    category: 'Governance',
    replies: 56,
    views: 782
  },
  {
    title: 'Rust vs Solidity: Performance Benchmarks',
    author: 'rustdev',
    authorAvatar: 'https://i.pravatar.cc/150?u=rustdev',
    date: '3 days ago',
    preview: 'I\'ve run some comprehensive performance tests comparing Rust and Solidity smart contracts...',
    category: 'Technical',
    replies: 87,
    views: 1205
  },
  {
    title: 'Community AMA with the Core Team - Submit Questions',
    author: 'moderator',
    authorAvatar: 'https://i.pravatar.cc/150?u=moderator',
    date: '5 days ago',
    preview: 'We\'re hosting an AMA with the core development team next week. Please submit your questions here...',
    category: 'General',
    replies: 142,
    views: 2376
  }
];

const contributors = [
  {
    name: 'Alex Chen',
    role: 'Core Developer',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    contributions: '342',
    badges: [
      { name: 'Top Contributor', icon: Lightbulb },
      { name: 'Core Team', icon: Users },
      { name: 'Technical Writer', icon: MessageSquare }
    ]
  },
  {
    name: 'Maria Rodriguez',
    role: 'DeFi Specialist',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    contributions: '205',
    badges: [
      { name: 'DeFi Expert', icon: Globe },
      { name: 'Community Mentor', icon: Users }
    ]
  },
  {
    name: 'James Wilson',
    role: 'Security Researcher',
    avatar: 'https://i.pravatar.cc/150?u=james',
    contributions: '187',
    badges: [
      { name: 'Security Expert', icon: Lightbulb },
      { name: 'Bug Hunter', icon: Code }
    ]
  },
  {
    name: 'Sophie Taylor',
    role: 'Community Manager',
    avatar: 'https://i.pravatar.cc/150?u=sophie',
    contributions: '276',
    badges: [
      { name: 'Community Leader', icon: Users },
      { name: 'Moderator', icon: MessageSquare },
      { name: 'Event Organizer', icon: Calendar }
    ]
  }
];

const ecosystemProjects = [
  { name: 'DeepSwap', category: 'DeFi', logo: 'https://i.pravatar.cc/150?u=deepswap' },
  { name: 'ChainVault', category: 'Storage', logo: 'https://i.pravatar.cc/150?u=chainvault' },
  { name: 'BlockID', category: 'Identity', logo: 'https://i.pravatar.cc/150?u=blockid' },
  { name: 'DeepNFT', category: 'NFT', logo: 'https://i.pravatar.cc/150?u=deepnft' },
  { name: 'ChainDAO', category: 'Governance', logo: 'https://i.pravatar.cc/150?u=chaindao' },
  { name: 'DeepPay', category: 'Payments', logo: 'https://i.pravatar.cc/150?u=deeppay' },
  { name: 'NodeGuard', category: 'Security', logo: 'https://i.pravatar.cc/150?u=nodeguard' },
  { name: 'DeepBridge', category: 'Bridge', logo: 'https://i.pravatar.cc/150?u=deepbridge' },
  { name: 'ChainData', category: 'Analytics', logo: 'https://i.pravatar.cc/150?u=chaindata' },
  { name: 'BlockLend', category: 'Lending', logo: 'https://i.pravatar.cc/150?u=blocklend' },
  { name: 'DeepGame', category: 'Gaming', logo: 'https://i.pravatar.cc/150?u=deepgame' },
  { name: 'ChainSocial', category: 'Social', logo: 'https://i.pravatar.cc/150?u=chainsocial' }
];

export default CommunityPage;
