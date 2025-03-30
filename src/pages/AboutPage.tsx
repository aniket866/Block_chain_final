
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Github, Globe, Linkedin, Mail, MapPin, MessageSquare, Twitter, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

const AboutPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 hero-text-gradient">About DeepChain</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Building the future of decentralized applications through innovative blockchain solutions.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="default">Our Mission</Button>
              <Button variant="outline">Contact Us</Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
              <p className="text-muted-foreground mb-6">
                DeepChain is pioneering the next generation of blockchain technology, enabling a more accessible, efficient, and secure decentralized future. We're building an ecosystem where developers, businesses, and individuals can seamlessly interact with blockchain applications without technical barriers.
              </p>
              <p className="text-muted-foreground mb-6">
                Our vision is to create a world where blockchain technology powers the critical infrastructure of the digital economy, providing transparency, security, and efficiency across industries.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded mr-3 mt-1">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Empowering Developers</h3>
                    <p className="text-sm text-muted-foreground">Providing powerful tools and infrastructure to build the next generation of dApps</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded mr-3 mt-1">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Global Accessibility</h3>
                    <p className="text-sm text-muted-foreground">Creating blockchain solutions that work for everyone, everywhere</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded mr-3 mt-1">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Enterprise Solutions</h3>
                    <p className="text-sm text-muted-foreground">Developing secure, scalable solutions for businesses of all sizes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">3M+</h3>
                  <p className="text-sm text-muted-foreground">Users Worldwide</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">120+</h3>
                  <p className="text-sm text-muted-foreground">Countries Served</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">$2B+</h3>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">85+</h3>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="crypto-card overflow-hidden">
                  <div className="h-40 bg-primary/10 flex items-center justify-center">
                    <Avatar className="h-24 w-24 border-4 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-center text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Investors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {investors.map((investor, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl border border-border/40 p-6 flex flex-col items-center justify-center text-center h-32"
              >
                <img 
                  src={investor.logo} 
                  alt={investor.name} 
                  className="h-10 object-contain mb-3"
                />
                <p className="text-xs text-muted-foreground">{investor.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <Card className="crypto-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions or want to get in touch with our team? Reach out to us through any of the channels below.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-4" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">info@deepchain.io</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-4" />
                    <div>
                      <h3 className="font-medium">Offices</h3>
                      <p className="text-sm text-muted-foreground">San Francisco • Singapore • London • Berlin</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-primary mr-4" />
                    <div>
                      <h3 className="font-medium">Social Media</h3>
                      <div className="flex space-x-4 mt-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Github className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block bg-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 blockchain-grid opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-crypto-gradient animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Chief Executive Officer',
    avatar: 'https://i.pravatar.cc/300?u=sarah',
    bio: 'Former Silicon Valley tech executive with 15+ years experience in fintech and blockchain technologies.'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    avatar: 'https://i.pravatar.cc/300?u=michael',
    bio: 'Blockchain architect and former lead developer at Ethereum. PhD in Distributed Systems.'
  },
  {
    name: 'David Rodriguez',
    role: 'Head of Research',
    avatar: 'https://i.pravatar.cc/300?u=david',
    bio: 'Cryptography expert with multiple published papers on consensus algorithms and blockchain security.'
  },
  {
    name: 'Jessica Kim',
    role: 'Chief Operating Officer',
    avatar: 'https://i.pravatar.cc/300?u=jessica',
    bio: 'Operations expert with experience scaling global tech companies from startup to enterprise.'
  },
  {
    name: 'Thomas Wright',
    role: 'Chief Financial Officer',
    avatar: 'https://i.pravatar.cc/300?u=thomas',
    bio: 'Financial strategist with background in investment banking and cryptocurrency markets.'
  },
  {
    name: 'Elena Petrova',
    role: 'VP of Product',
    avatar: 'https://i.pravatar.cc/300?u=elena',
    bio: 'Product visionary focused on creating intuitive, user-friendly blockchain applications.'
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Partnerships',
    avatar: 'https://i.pravatar.cc/300?u=marcus',
    bio: 'Business development leader with strong connections across tech, finance, and blockchain industries.'
  },
  {
    name: 'Aisha Patel',
    role: 'Lead Smart Contract Developer',
    avatar: 'https://i.pravatar.cc/300?u=aisha',
    bio: 'Security-focused developer specializing in smart contract architecture and auditing.'
  }
];

const investors = [
  { name: 'Blockchain Capital', logo: 'https://i.pravatar.cc/150?u=blockchaincapital' },
  { name: 'Andreessen Horowitz', logo: 'https://i.pravatar.cc/150?u=a16z' },
  { name: 'Polychain Capital', logo: 'https://i.pravatar.cc/150?u=polychain' },
  { name: 'Pantera Capital', logo: 'https://i.pravatar.cc/150?u=pantera' },
  { name: 'Paradigm', logo: 'https://i.pravatar.cc/150?u=paradigm' },
  { name: 'Coinbase Ventures', logo: 'https://i.pravatar.cc/150?u=coinbase' },
  { name: 'Digital Currency Group', logo: 'https://i.pravatar.cc/150?u=dcg' },
  { name: 'Galaxy Digital', logo: 'https://i.pravatar.cc/150?u=galaxy' },
  { name: 'Binance Labs', logo: 'https://i.pravatar.cc/150?u=binance' },
  { name: 'Multicoin Capital', logo: 'https://i.pravatar.cc/150?u=multicoin' },
  { name: '3 Arrows Capital', logo: 'https://i.pravatar.cc/150?u=3arrows' },
  { name: 'Dragonfly Capital', logo: 'https://i.pravatar.cc/150?u=dragonfly' }
];

export default AboutPage;
