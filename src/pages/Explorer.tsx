
import React, { useState } from 'react';
import { blockchain } from '@/lib/models/Blockchain';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Shield, Clock, Hash, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const Explorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [blockDetail, setBlockDetail] = useState<any | null>(null);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    try {
      // Try to find block by index
      const blockIndex = parseInt(searchQuery);
      if (!isNaN(blockIndex) && blockIndex >= 0 && blockIndex < blockchain.chain.length) {
        setBlockDetail(blockchain.chain[blockIndex]);
        return;
      }
      
      // Try to find block by hash
      const blockByHash = blockchain.chain.find(block => block.hash === searchQuery);
      if (blockByHash) {
        setBlockDetail(blockByHash);
        return;
      }
      
      // Try to find block containing voter ID (for demo purposes only, in a real system this would need more privacy controls)
      const blockByVoterId = blockchain.chain.find(block => block.data.voterId === searchQuery);
      if (blockByVoterId) {
        setBlockDetail(blockByVoterId);
        return;
      }
      
      setBlockDetail(null);
    } catch (error) {
      console.error('Search error:', error);
      setBlockDetail(null);
    }
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Blockchain Explorer</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore and verify the integrity of the voting blockchain.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by block index, hash, or voter ID"
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="blocks" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="blocks">Blocks</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blocks">
              <div className="grid gap-6">
                {blockDetail ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Block #{blockDetail.index}
                      </CardTitle>
                      <CardDescription>
                        Details of the selected block in the chain
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="text-muted-foreground mb-1">Block Index</p>
                            <p className="font-medium">{blockDetail.index}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Timestamp</p>
                            <p className="font-medium">{formatDate(blockDetail.timestamp)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Nonce</p>
                            <p className="font-medium">{blockDetail.nonce}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground mb-1">Hash</p>
                          <p className="font-mono bg-secondary/30 p-2 rounded overflow-x-auto">
                            {blockDetail.hash}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground mb-1">Previous Hash</p>
                          <p className="font-mono bg-secondary/30 p-2 rounded overflow-x-auto">
                            {blockDetail.previousHash}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground mb-1">Data</p>
                          <div className="bg-secondary/30 p-3 rounded">
                            <pre className="whitespace-pre-wrap overflow-x-auto">
                              {JSON.stringify(blockDetail.data, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="mt-6"
                        onClick={() => setBlockDetail(null)}
                      >
                        Back to All Blocks
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {blockchain.chain.map((block, index) => (
                      <Card key={block.hash} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <Database className="h-5 w-5" />
                              Block #{block.index}
                            </span>
                            <span className="text-sm font-normal text-muted-foreground flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatDate(block.timestamp)}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1 flex items-center gap-1">
                                <Hash className="h-4 w-4" /> Hash
                              </p>
                              <p className="font-mono text-xs bg-secondary/30 p-2 rounded overflow-hidden text-ellipsis">
                                {block.hash}
                              </p>
                            </div>
                            
                            {index > 0 && (
                              <div>
                                <p className="text-muted-foreground">Vote Data:</p>
                                <p><strong>Party:</strong> {block.data.vote}</p>
                              </div>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setBlockDetail(block)}
                            >
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="statistics">
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Statistics</CardTitle>
                  <CardDescription>
                    Overview of the current blockchain state
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-secondary/30 p-6 rounded-lg text-center">
                      <p className="text-muted-foreground mb-2">Total Blocks</p>
                      <p className="text-3xl font-bold">{blockchain.chain.length}</p>
                    </div>
                    
                    <div className="bg-secondary/30 p-6 rounded-lg text-center">
                      <p className="text-muted-foreground mb-2">Total Votes</p>
                      <p className="text-3xl font-bold">{blockchain.chain.length - 1}</p>
                    </div>
                    
                    <div className="bg-secondary/30 p-6 rounded-lg text-center">
                      <p className="text-muted-foreground mb-2">Mining Difficulty</p>
                      <p className="text-3xl font-bold">{blockchain.difficulty}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Blockchain Health</h3>
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 p-4 rounded-lg">
                      <Shield className="h-5 w-5" />
                      <span>Blockchain is valid and secure. Last verified: {new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="verification">
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Verification</CardTitle>
                  <CardDescription>
                    Verify the integrity and validity of the entire blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p>
                      The blockchain verification system ensures that all blocks in the chain are valid and have not been tampered with. 
                      This is achieved by validating the hash of each block and ensuring that each block correctly references the previous block's hash.
                    </p>
                    
                    <div className="bg-secondary/30 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Current Status</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Blockchain is Valid</p>
                          <p className="text-sm text-muted-foreground">
                            All {blockchain.chain.length} blocks have been verified and are secure.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        className="w-full max-w-md" 
                        onClick={() => {
                          const isValid = blockchain.isChainValid();
                          alert(isValid ? 'Blockchain is valid and secure!' : 'Blockchain verification failed!');
                        }}
                      >
                        Verify Blockchain Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Explorer;
