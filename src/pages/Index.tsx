
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';
import { useVoting } from '@/lib/hooks/useVoting';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Shield, Lock, Vote, Fingerprint } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { hasVoted } = useVoting();
  const { scrollYProgress } = useScroll();
  const [showScrollHint, setShowScrollHint] = useState(true);
  
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.05], [0, -50]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const features = [
    {
      title: 'Secure Authentication',
      description: 'Register with your voter ID and personal details to ensure only eligible citizens can participate.',
      icon: <Shield className="h-10 w-10 text-primary" />
    },
    {
      title: 'Transparent Voting',
      description: 'Cast your vote with confidence knowing that the blockchain provides full transparency and immutability.',
      icon: <Vote className="h-10 w-10 text-primary" />
    },
    {
      title: 'Privacy Protected',
      description: 'Your identity remains secure while your vote is anonymously recorded on the public blockchain.',
      icon: <Lock className="h-10 w-10 text-primary" />
    },
    {
      title: 'Biometric Verification',
      description: 'Advanced biometric verification ensures that each vote is cast by the rightful voter.',
      icon: <Fingerprint className="h-10 w-10 text-primary" />
    }
  ];
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05),transparent_65%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Secure and Transparent Voting with <span className="text-primary">Blockchain</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            A decentralized voting platform that ensures transparency, security, and accessibility for all citizens.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Button asChild size="lg" className="animate-pulse">
                  <Link to="/register">Register to Vote</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Login <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </>
            ) : !hasVoted ? (
              <Button asChild size="lg" className="animate-pulse">
                <Link to="/vote">Cast Your Vote</Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/dashboard">View Results</Link>
              </Button>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          style={{ opacity, y }} 
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center"
        >
          {showScrollHint && (
            <div className="animate-bounce">
              <div className="w-8 h-12 rounded-full border-2 border-muted-foreground flex items-start justify-center p-1">
                <div className="w-1 h-2 bg-muted-foreground rounded-full animate-[scroll_1.5s_ease-in-out_infinite]" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Scroll to explore</p>
            </div>
          )}
        </motion.div>
      </section>
      
      {/* Features section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Redefining Democratic Participation</h2>
            <p className="text-muted-foreground">Our blockchain voting system combines cutting-edge technology with democratic principles to create a voting experience that's secure, transparent, and accessible to all.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-background rounded-xl p-6 border border-border shadow-sm"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative overflow-hidden bg-primary text-primary-foreground rounded-2xl p-10 md:p-16"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to experience the future of voting?</h2>
              <p className="text-primary-foreground/80 mb-6 text-lg">
                Join thousands of citizens who have already embraced secure blockchain voting. Register today and make your voice heard.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/register">Register Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-white/20 hover:bg-white/10">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
