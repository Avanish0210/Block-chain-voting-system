
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';
import { useVoting } from '@/lib/hooks/useVoting';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, CheckCircle2, Vote } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { hasVoted, getResults, parties } = useVoting();
  const [results, setResults] = useState<any[]>([]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const voteResults = getResults();
    const formattedResults = parties.map(party => ({
      name: party,
      votes: voteResults[party] || 0
    }));
    
    setResults(formattedResults);
  }, [isAuthenticated, navigate, getResults, parties]);
  
  const renderCustomBarLabel = ({ x, y, width, value }: any) => {
    return value > 0 ? (
      <text x={x + width / 2} y={y - 6} fill="#666" textAnchor="middle" fontSize={12}>
        {value}
      </text>
    ) : null;
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            
            <Button variant={hasVoted ? "outline" : "default"} disabled={hasVoted} onClick={() => navigate('/vote')}>
              {hasVoted ? 'Already Voted' : 'Cast Your Vote'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Voter Status</CardTitle>
                <CardDescription>Your current voting status</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {hasVoted ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle2 />
                    <span className="font-medium">Vote Cast Successfully</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-500">
                    <AlertCircle />
                    <span className="font-medium">Not Voted Yet</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
                Voter ID: {user?.voterId}
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Election Information</CardTitle>
                <CardDescription>Current election details</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Election Type:</span>
                    <span>Presidential Election 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Start Date:</span>
                    <span>June 1, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">End Date:</span>
                    <span>June 15, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Live Election Results
              </CardTitle>
              <CardDescription>
                Real-time voting results from the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!hasVoted ? (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Vote to see results</AlertTitle>
                  <AlertDescription>
                    You need to cast your vote first to see the election results.
                  </AlertDescription>
                </Alert>
              ) : results.length > 0 ? (
                <div className="h-[400px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={results}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} votes`, 'Votes']}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                      <Bar 
                        dataKey="votes" 
                        label={renderCustomBarLabel}
                        animationDuration={1500}
                        radius={[4, 4, 0, 0]}
                      >
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  No votes have been cast yet.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
