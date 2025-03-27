
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';
import { useVoting } from '@/lib/hooks/useVoting';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

function BlockchainModel() {
  const { blockchain } = useVoting();
  const pointLight = useRef();
  useHelper(pointLight, PointLightHelper, 0.5, 'yellow');
  
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
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Blockchain Visualization</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>3D Blockchain Viewer</CardTitle>
              <CardDescription>
                Interactive 3D visualization of the voting blockchain. Click on blocks to see details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] w-full bg-black/90 rounded-md overflow-hidden">
                <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                  <BlockchainModel />
                </Canvas>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Navigation: Click and drag to rotate. Scroll to zoom. Right-click and drag to pan.</p>
                <p>Interaction: Click on a block to see detailed information about that transaction.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Visualization;
