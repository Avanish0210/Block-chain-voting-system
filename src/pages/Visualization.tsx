
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';
import { useVoting } from '@/lib/hooks/useVoting';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { blockchain } from '@/lib/models/Blockchain';

function BlockchainModel() {
  const { getResults } = useVoting();
  const pointLight = useRef();
  useHelper(pointLight, PointLightHelper, 0.5, 'yellow');
  
  // Call getResults to ensure blockchain is up to date
  useEffect(() => {
    getResults();
  }, [getResults]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={pointLight} position={[10, 10, 10]} intensity={1} color="#ffffff" />
      
      {blockchain && blockchain.chain.map((block, index) => (
        <Block 
          key={index} 
          position={[index * 2 - (blockchain.chain.length - 1), 0, 0]} 
          block={block} 
          index={index} 
        />
      ))}
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
}

function Block({ position, block, index }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const color = hovered ? '#0070f3' : (index === 0 ? '#00ff00' : '#2a2a2a');
  const scale = clicked ? 1.2 : 1;
  
  return (
    <group position={position}>
      <mesh
        scale={[scale, scale, scale]}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.5, 1, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      <Text 
        position={[0, -1.5, 0]} 
        color="white" 
        fontSize={0.2}
        maxWidth={2}
        textAlign="center"
      >
        {`Block ${index}\nHash: ${block.hash.substring(0, 8)}...`}
      </Text>
      
      {clicked && (
        <Text 
          position={[0, 1.5, 0]} 
          color="white" 
          fontSize={0.15}
          maxWidth={3}
          textAlign="center"
        >
          {block.data ? `Vote: ${block.data.vote}\nTimestamp: ${new Date(block.timestamp).toLocaleString()}` : 'Genesis Block'}
        </Text>
      )}
    </group>
  );
}

const Visualization = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Blockchain Visualization</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the blockchain in an interactive 3D environment. Each block represents a vote or transaction in the system.
            </p>
          </div>
          
          <Card className="overflow-hidden border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
              <CardTitle className="text-2xl">3D Blockchain Viewer</CardTitle>
              <CardDescription>
                Interactive 3D visualization of the voting blockchain. Click on blocks to see details.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px] w-full bg-gradient-to-b from-black/95 to-black/80 overflow-hidden">
                <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                  <BlockchainModel />
                </Canvas>
              </div>
              <div className="bg-secondary/30 p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-sm">
                    <h3 className="font-medium mb-2 text-sm">Navigation</h3>
                    <p className="text-sm text-muted-foreground">Click and drag to rotate. Scroll to zoom. Right-click and drag to pan.</p>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-sm">
                    <h3 className="font-medium mb-2 text-sm">Interaction</h3>
                    <p className="text-sm text-muted-foreground">Click on a block to see detailed information about that transaction.</p>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-sm">
                    <h3 className="font-medium mb-2 text-sm">Block Legend</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-block w-3 h-3 bg-[#00ff00] rounded-sm"></span>
                      <span>Genesis Block</span>
                      <span className="inline-block w-3 h-3 bg-[#2a2a2a] rounded-sm ml-4"></span>
                      <span>Transaction Block</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Visualization;
