
import React from 'react';
import { CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatAddress } from '@/lib/contracts/contractUtils';
import { Proposal } from '@/lib/contracts/types';
import { Link } from 'react-router-dom';

interface ProposalCardProps {
  proposal: Proposal;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const { id, title, description, proposer, status, forVotes, againstVotes, createdAt } = proposal;
  
  const totalVotes = forVotes + againstVotes;
  const forPercentage = totalVotes > 0 ? (forVotes / totalVotes) * 100 : 0;
  
  const getStatusIcon = () => {
    switch (status) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'executed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Active</Badge>;
      case 'passed':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Passed</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>;
      case 'executed':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Executed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="crypto-card overflow-hidden hover:border-primary/40 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-sm">
              Proposed by {formatAddress(proposer)} · {new Date(createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>For</span>
            <span>{forVotes.toLocaleString()} votes ({forPercentage.toFixed(2)}%)</span>
          </div>
          <Progress value={forPercentage} className="h-2 bg-secondary" />
          
          <div className="flex justify-between text-sm">
            <span>Against</span>
            <span>{againstVotes.toLocaleString()} votes ({(100 - forPercentage).toFixed(2)}%)</span>
          </div>
          <Progress value={100 - forPercentage} className="h-2 bg-secondary" />
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/dao/${id}`} className="w-full">
          <Button variant="outline" className="w-full justify-between">
            View Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProposalCard;
