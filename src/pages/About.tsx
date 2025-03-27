
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Shield, Lock, Vote, Fingerprint, CheckSquare, UserCheck } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <UserCheck className="h-8 w-8 text-primary" />,
      title: 'Voter Registration',
      description: 'Secure registration process that verifies voter eligibility through identity verification, ensuring that only eligible citizens can participate in the democratic process.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Blockchain Security',
      description: 'Our voting system utilizes blockchain technology to create an immutable record of votes, making tampering with election results virtually impossible.'
    },
    {
      icon: <Vote className="h-8 w-8 text-primary" />,
      title: 'Transparent Voting',
      description: 'Every vote is recorded on a public blockchain, allowing for complete transparency while maintaining voter anonymity, ensuring trust in the electoral process.'
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: 'Privacy Protection',
      description: 'Advanced cryptographic techniques ensure that while votes are publicly verifiable, the identity of individual voters remains completely private and protected.'
    },
    {
      icon: <Fingerprint className="h-8 w-8 text-primary" />,
      title: 'Biometric Verification',
      description: 'State-of-the-art biometric verification ensures that each voter can only cast one vote, eliminating the possibility of duplicate voting or identity fraud.'
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-primary" />,
      title: 'Vote Verification',
      description: 'Voters can verify that their vote was correctly recorded and counted in the final tally, providing unprecedented peace of mind and confidence in the voting process.'
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About BallotChain</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing democracy through secure, transparent blockchain voting technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg leading-relaxed mb-6">
                BallotChain was founded with a singular mission: to restore trust in democratic processes through technological innovation. We believe that voting systems should be secure, transparent, and accessible to all eligible citizens.
              </p>
              <p className="text-lg leading-relaxed">
                By leveraging blockchain technology, we've created a voting platform that ensures every vote is counted accurately, eliminates fraud, and provides verifiable results that anyone can audit—all while maintaining the privacy and security of individual voters.
              </p>
            </div>
            
            <div className="glass p-1 rounded-2xl">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Secure voting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative z-10">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h3 className="text-xl font-medium mb-2">1. Registration</h3>
                    <p>Citizens register using their voter ID and personal information. The system verifies eligibility criteria such as age and citizenship status.</p>
                  </div>
                  <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                </div>
                
                <div className="md:mt-24 relative z-10">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h3 className="text-xl font-medium mb-2">2. Authentication</h3>
                    <p>Registered voters authenticate using secure credentials. The system verifies identity while maintaining privacy protection.</p>
                  </div>
                  <div className="absolute top-1/2 left-0 md:right-auto transform -translate-x-1/2 md:translate-x-0 md:left-0 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h3 className="text-xl font-medium mb-2">3. Vote Casting</h3>
                    <p>Voters select their preferred candidate or party. The vote is encrypted and prepared for submission to the blockchain.</p>
                  </div>
                  <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                </div>
                
                <div className="md:mt-24 relative z-10">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h3 className="text-xl font-medium mb-2">4. Blockchain Recording</h3>
                    <p>The encrypted vote is added to the blockchain, creating a permanent, immutable record that cannot be altered or deleted.</p>
                  </div>
                  <div className="absolute top-1/2 left-0 md:right-auto transform -translate-x-1/2 md:translate-x-0 md:left-0 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h3 className="text-xl font-medium mb-2">5. Vote Verification</h3>
                    <p>Voters receive a unique receipt that allows them to verify their vote was correctly recorded, without revealing their specific choice.</p>
                  </div>
                  <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                </div>
                
                <div className="md:mt-24 relative z-10">
                  <div className="bg-background p-6 rounded-lg border shadow-sm">
                    <h3 className="text-xl font-medium mb-2">6. Results Tabulation</h3>
                    <p>When the election closes, votes are automatically tabulated and results are published in real-time with complete transparency.</p>
                  </div>
                  <div className="absolute top-1/2 left-0 md:right-auto transform -translate-x-1/2 md:translate-x-0 md:left-0 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Card className="h-full flex flex-col">
                    <CardContent className="pt-6 flex-1 flex flex-col">
                      <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              BallotChain uses cutting-edge technologies to ensure security, transparency, and efficiency.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="p-6 border rounded-lg bg-secondary/20">
                <h3 className="font-medium mb-2">Blockchain</h3>
                <p className="text-sm text-muted-foreground">Immutable ledger recording all votes</p>
              </div>
              
              <div className="p-6 border rounded-lg bg-secondary/20">
                <h3 className="font-medium mb-2">Cryptography</h3>
                <p className="text-sm text-muted-foreground">Securing voter information and ballots</p>
              </div>
              
              <div className="p-6 border rounded-lg bg-secondary/20">
                <h3 className="font-medium mb-2">Biometrics</h3>
                <p className="text-sm text-muted-foreground">Ensuring single-vote per eligible citizen</p>
              </div>
              
              <div className="p-6 border rounded-lg bg-secondary/20">
                <h3 className="font-medium mb-2">Zero-Knowledge Proofs</h3>
                <p className="text-sm text-muted-foreground">Verifying without revealing private data</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
