
import React, { createContext, useContext, useState } from 'react';
import { blockchain } from '../models/Blockchain';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from './useAuth';

interface VotingContextProps {
  isLoading: boolean;
  hasVoted: boolean;
  parties: string[];
  results: Record<string, number> | null;
  castVote: (party: string) => Promise<boolean>;
  checkVotingStatus: () => boolean;
  getResults: () => Record<string, number>;
}

const parties = [
  'Democratic Party',
  'Republican Party',
  'Green Party',
  'Libertarian Party',
  'Independent'
];

const VotingContext = createContext<VotingContextProps | undefined>(undefined);

export const VotingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const { user } = useAuth();
  
  const checkVotingStatus = () => {
    if (!user) return false;
    return blockchain.hasVoted(user.voterId);
  };
  
  const castVote = async (party: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to vote.",
        variant: "destructive",
      });
      return false;
    }
    
    if (checkVotingStatus()) {
      toast({
        title: "Already voted",
        description: "You have already cast your vote in this election.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate blockchain mining delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      blockchain.addBlock({
        voterId: user.voterId,
        vote: party,
        timestamp: Date.now()
      });
      
      toast({
        title: "Vote recorded",
        description: "Your vote has been successfully recorded on the blockchain.",
        variant: "default",
      });
      
      // Update results
      setResults(blockchain.getResults());
      
      return true;
    } catch (error) {
      console.error('Voting error', error);
      
      toast({
        title: "Voting error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getResults = () => {
    const currentResults = blockchain.getResults();
    setResults(currentResults);
    return currentResults;
  };
  
  return (
    <VotingContext.Provider value={{
      isLoading,
      hasVoted: user ? checkVotingStatus() : false,
      parties,
      results,
      castVote,
      checkVotingStatus,
      getResults
    }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  
  if (context === undefined) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  
  return context;
};
