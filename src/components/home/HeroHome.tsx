'use client';

import { Hero } from '@/types/home';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect } from 'react';

interface HeroHomeProps {
  content: Hero
}

// Astronaut 3D Model Component
const Astronaut = () => {
  const { scene } = useGLTF('/assets/images/hero/astronaut.glb');
  
  // Clone the scene to avoid conflicts
  const clonedScene = scene.clone();
  
  return (
    <primitive 
      object={clonedScene} 
      position={[0, 0, 0]} 
      rotation={[0, Math.PI / 4, 0]}
      scale={[2.5, 2.5, 2.5]}
    />
  );
};

// 3D Scene for Astronaut
const AstronautScene = () => {
  return (
    <motion.div
      animate={{ 
        y: [0, -20, 0],
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ 
        position: 'absolute', 
        bottom: '-100px', 
        left: '-200px', 
        width: '800px', 
        height: '800px', 
        zIndex: 2 
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ 
          width: '100%', 
          height: '100%'
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} />
        
        <Suspense fallback={null}>
          <Astronaut />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </motion.div>
  );
};

const HeroHome = ({ content }: HeroHomeProps) => {
  return (
    <header className="relative mx-auto h-[100svh] w-full max-w-[1920px] overflow-hidden">
      {/* Primary Color Background */}
      <div className="absolute inset-0 bg-primary" />
      
      {/* Creating Spots Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        {/* Large spots */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-sm" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-sm" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white rounded-full blur-sm" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-sm" />
        
        {/* Medium spots */}
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white rounded-full blur-sm" />
        <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-white rounded-full blur-sm" />
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full blur-sm" />
        
        {/* Small spots */}
        <div className="absolute top-16 right-1/4 w-8 h-8 bg-white rounded-full blur-sm" />
        <div className="absolute bottom-1/3 left-16 w-10 h-10 bg-white rounded-full blur-sm" />
        <div className="absolute top-3/4 right-16 w-6 h-6 bg-white rounded-full blur-sm" />
      </div>
      
      {/* Astronaut 3D Model - Left Bottom */}
      <AstronautScene />
      
      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full space-y-4"
        >
          {/* Slogan Above */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-lg text-white/90 sm:text-xl lg:text-2xl font-medium"
          >
            Building the future, one idea at a time
          </motion.p>

          {/* Main Headline - GRAND and NOTION on separate lines, taking 80% of screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-1"
          >
            <h1 className="text-[clamp(6rem,25vw,22rem)] leading-[0.7] font-black text-white">
              GRAND
            </h1>
            <h1 className="text-[clamp(5rem,22vw,20rem)] leading-[0.7] font-black text-white">
              NOTION
            </h1>
          </motion.div>

          {/* Slogan Below */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg text-white/90 sm:text-xl lg:text-2xl font-medium"
          >
            Where innovation meets imagination
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroHome;