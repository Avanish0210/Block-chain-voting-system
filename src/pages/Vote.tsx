
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';
import { useVoting } from '@/lib/hooks/useVoting';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';

const Vote = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { parties, hasVoted, castVote, isLoading } = useVoting();
  const [selectedParty, setSelectedParty] = useState<string>('');
  const [confirmState, setConfirmState] = useState<'idle' | 'confirming' | 'processing' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (hasVoted) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, hasVoted, navigate]);
  
  const handleSelectParty = (value: string) => {
    setSelectedParty(value);
    setError(null);
  };
  
  const handleConfirmVote = () => {
    if (!selectedParty) {
      setError('Please select a party to vote for');
      return;
    }
    
    setConfirmState('confirming');
  };
  
  const handleCancelConfirm = () => {
    setConfirmState('idle');
  };
  
  const handleSubmitVote = async () => {
    setConfirmState('processing');
    
    try {
      const success = await castVote(selectedParty);
      
      if (success) {
        setConfirmState('success');
        
        // Redirect to dashboard after a delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setConfirmState('idle');
        setError('Failed to cast your vote. Please try again.');
      }
    } catch (err) {
      setConfirmState('idle');
      setError('An unexpected error occurred. Please try again.');
    }
  };
  
  const renderVotingCard = () => {
    if (confirmState === 'confirming') {
      return (
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Confirm Your Vote</CardTitle>
            <CardDescription>
              Please confirm your vote for the following party:
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="bg-secondary/50 rounded-xl p-8 text-center mb-6">
              <p className="text-muted-foreground mb-2">Your vote will be cast for:</p>
              <p className="text-2xl font-bold">{selectedParty}</p>
            </div>
            
            <Alert className="mb-6 border-amber-500 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
              <AlertTitle className="text-amber-800 dark:text-amber-400">Important Notice</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                Once cast, your vote cannot be changed. This action is permanent and will be recorded on the blockchain.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" onClick={handleCancelConfirm}>
              Go Back
            </Button>
            <Button onClick={handleSubmitVote}>
              Confirm Vote
            </Button>
          </CardFooter>
        </Card>
      );
    }
    
    if (confirmState === 'processing') {
      return (
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Processing Your Vote</CardTitle>
            <CardDescription>
              Please wait while your vote is being recorded on the blockchain...
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loader2 className="w-10 h-10 text-primary animate-pulse" />
              </div>
            </div>
            <p className="mt-8 text-muted-foreground text-center max-w-md">
              Your vote is being securely written to the blockchain. This process ensures complete transparency and immutability.
            </p>
          </CardContent>
        </Card>
      );
    }
    
    if (confirmState === 'success') {
      return (
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">Vote Successfully Cast!</CardTitle>
            <CardDescription>
              Your vote has been securely recorded on the blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6"
            >
              <ShieldCheck className="w-12 h-12 text-green-600" />
            </motion.div>
            <p className="text-center max-w-md mb-4">
              Thank you for participating in the democratic process. Your vote has been anonymously and securely recorded.
            </p>
            <p className="text-muted-foreground text-sm">
              Redirecting to dashboard in a moment...
            </p>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Cast Your Vote</CardTitle>
          <CardDescription>
            Select the party you would like to vote for in this election.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <RadioGroup value={selectedParty} onValueChange={handleSelectParty} className="space-y-4">
            {parties.map((party) => (
              <div key={party} className="flex items-center space-x-2 bg-secondary/40 rounded-lg p-4 transition-colors hover:bg-secondary/60">
                <RadioGroupItem value={party} id={party} />
                <Label htmlFor={party} className="flex-1 cursor-pointer py-2">
                  {party}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleConfirmVote} disabled={!selectedParty || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Election 2024: Presidential Vote</h1>
              <p className="text-muted-foreground">
                Your vote is secure, anonymous, and unchangeable once cast.
              </p>
            </div>
            
            {renderVotingCard()}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Vote;
