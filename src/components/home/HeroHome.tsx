'use client';

import { Hero } from '@/types/home';
import { motion } from 'framer-motion';
import TextPressure from '../ui/TextPressure';
import GradientBlinds from '../ui/GradientBlinds';
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

interface HeroHomeProps {
  content: Hero
}

function Model(props: any) {
  const { scene, animations } = useGLTF('/assets/images/walking_astronaut.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const headBonesRef = useRef<{
    head: THREE.Bone | null;
    neck: THREE.Bone | null;
    spine: THREE.Bone | null;
  }>({                                  
    head: null,
    neck: null,
    spine: null
  });

  // Initialize head bones and mixer
  useEffect(() => {
    if (groupRef.current) {
      // Create animation mixer
      mixerRef.current = new THREE.AnimationMixer(groupRef.current);
      
      // Find head and neck bones
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Bone) {
          const boneName = child.name.toLowerCase();
          
          // Find head and neck bones
          if (boneName.includes('head')) {
            headBonesRef.current.head = child;
          } else if (boneName.includes('neck')) {
            headBonesRef.current.neck = child;
          } else if (boneName.includes('spine') && boneName.includes('2')) {
            headBonesRef.current.spine = child;
          }
        }
      });
    }
  }, []);

  // Animation frame loop
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    // Control head based on mouse position when hovered
    if (props.isHovered && headBonesRef.current && props.mousePosition) {
      const { x, y } = props.mousePosition;
      
      // Convert mouse position (0-1) to rotation angles
      const headRotationY = (x - 0.5) * 0.8; // Left-right rotation
      const headRotationX = (y - 0.5) * 0.4; // Up-down rotation
      
      // Apply head rotation
      if (headBonesRef.current.head) {
        headBonesRef.current.head.rotation.y = headRotationY;
        headBonesRef.current.head.rotation.x = headRotationX;
      }
      
      // Apply neck rotation for more natural movement
      if (headBonesRef.current.neck) {
        headBonesRef.current.neck.rotation.y = headRotationY * 0.5;
        headBonesRef.current.neck.rotation.x = headRotationX * 0.3;
      }
      
      // Apply spine rotation for body follow
      if (headBonesRef.current.spine) {
        headBonesRef.current.spine.rotation.y = headRotationY * 0.2;
      }
    } else {
      // Smoothly reset head position when not hovered
      if (headBonesRef.current.head) {
        headBonesRef.current.head.rotation.y = THREE.MathUtils.lerp(
          headBonesRef.current.head.rotation.y, 0, delta * 2
        );
        headBonesRef.current.head.rotation.x = THREE.MathUtils.lerp(
          headBonesRef.current.head.rotation.x, 0, delta * 2
        );
      }
      
      if (headBonesRef.current.neck) {
        headBonesRef.current.neck.rotation.y = THREE.MathUtils.lerp(
          headBonesRef.current.neck.rotation.y, 0, delta * 2
        );
        headBonesRef.current.neck.rotation.x = THREE.MathUtils.lerp(
          headBonesRef.current.neck.rotation.x, 0, delta * 2
        );
      }
      
      if (headBonesRef.current.spine) {
        headBonesRef.current.spine.rotation.y = THREE.MathUtils.lerp(
          headBonesRef.current.spine.rotation.y, 0, delta * 2
        );
      }
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload('/assets/images/walking_astronaut.glb');

const HeroHome = ({ content }: HeroHomeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentGesture, setCurrentGesture] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const gestureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const gestures = ['wave', 'point', 'salute', 'peace'];
  
  const handleClick = () => {
    // Clear any existing timeout
    if (gestureTimeoutRef.current) {
      clearTimeout(gestureTimeoutRef.current);
    }
    
    // Cycle through gestures
    const nextGesture = gestures[clickCount % gestures.length];
    if (nextGesture) {
      setCurrentGesture(nextGesture);
      setClickCount(prev => prev + 1);
      
      // Reset gesture after animation
      gestureTimeoutRef.current = setTimeout(() => {
        setCurrentGesture(null);
      }, 2000);
    }
  };

  // Track mouse movement for head control
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <header className="relative mx-auto flex flex-col h-[100svh] items-center justify-center w-full max-w-[1920px] overflow-hidden">

      {/* 3D Model Canvas */}
      <div 
        className="absolute inset-0 z-0 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      >
        <Canvas
          camera={{ position: [0, 0, 20], fov: 25 }}
          style={{ background: 'transparent' }}
        >
          {/* Dynamic lighting based on hover */}
          <ambientLight intensity={isHovered ? 1.5 : 1} />
          <directionalLight 
            position={[2, 2, 2]} 
            intensity={isHovered ? 3 : 2}
            color={isHovered ? "#ff6b6b" : "#ffffff"}
          />
          <pointLight 
            position={[-2, -2, -2]} 
            intensity={isHovered ? 2 : 1.5}
            color={isHovered ? "#4ecdc4" : "#ffffff"}
          />
          
          {/* Additional hover lights */}
          {isHovered && (
            <>
              <pointLight position={[5, 5, 5]} intensity={2} color="#ffd93d" />
              <pointLight position={[-5, -5, 5]} intensity={1.5} color="#6c5ce7" />
            </>
          )}
          
          {/* Gesture-specific lighting */}
          {currentGesture && (
            <>
              <pointLight position={[0, 5, 0]} intensity={3} color="#ff6b6b" />
              <pointLight position={[0, -5, 0]} intensity={2} color="#4ecdc4" />
            </>
          )}
          
          <Model 
            position={[0, -3, 0]}
            scale={[0.8, 0.8, 0.8]}
            rotation={[0, 0, 0]}
            isHovered={isHovered}
            mousePosition={mousePosition}
          />
          
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={!isHovered && !currentGesture}
            autoRotateSpeed={0.15}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
        
        {/* Hover overlay effects */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Glowing border effect */}
            <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full blur-xl animate-pulse" />
            
            {/* Particle effect overlay */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        )}

        {/* Gesture indicator overlay */}
        {currentGesture && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {currentGesture === 'wave' && '👋'}
                  {currentGesture === 'point' && '👆'}
                  {currentGesture === 'salute' && '🫡'}
                  {currentGesture === 'peace' && '✌️'}
                </div>
                <div className="text-white font-semibold text-lg capitalize">
                  {currentGesture}!
                </div>
                <div className="text-white/70 text-sm mt-1">
                  Click again for more gestures
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Interactive hover indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="text-white/80 text-sm font-medium mb-2">
            {isHovered ? "👋 Astronaut is following your mouse! Move to control the head" : "Hover to interact • Move mouse to control head"}
          </div>
          <div className="text-white/60 text-xs mb-2">
            Click to trigger gestures!
          </div>
          <div className="flex space-x-2 justify-center">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-blue-400 scale-125' : 'bg-white/40'}`} />
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-purple-400 scale-125' : 'bg-white/40'}`} />
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-cyan-400 scale-125' : 'bg-white/40'}`} />
          </div>
        </motion.div>
      </div>

    </header>
  );
};

export default HeroHome;