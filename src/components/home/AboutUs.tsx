"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Check, Users, Sparkles } from "lucide-react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sphere, Stars, Float, Text, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Suspense, useRef, useState } from "react"

// Simple Button Component
function Button({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}: {
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "default" | "lg"
  className?: string
  [key: string]: any
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  }
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8 py-4 text-lg"
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

// Central Sphere Component
function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.1}
          roughness={0.2}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Central Sphere Atmosphere */}
      <Sphere args={[1.8, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  )
}

// Orbital Paths Component
function OrbitalPaths() {
  const orbit1Ref = useRef<THREE.Mesh>(null)
  const orbit2Ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (orbit1Ref.current) {
      orbit1Ref.current.rotation.y = state.clock.elapsedTime * 0.5
    }
    if (orbit2Ref.current) {
      orbit2Ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group>
      {/* Inner orbit */}
      <mesh ref={orbit1Ref} position={[0, 0, 0]}>
        <ringGeometry args={[2.5, 2.7, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Outer orbit */}
      <mesh ref={orbit2Ref} position={[0, 0, 0]}>
        <ringGeometry args={[3.5, 3.7, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Orbiting Sphere Component
function OrbitingSphere({ position, size = 0.3 }: { position: [number, number, number], size?: number }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

// 3D Scene Component - Recreating the exact visual from the image
function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 0, 0]} intensity={0.3} color="#8b5cf6" />
        
        {/* Central Glowing Sphere */}
        <CentralSphere />
        
        {/* Orbital Paths - Dashed circles */}
        <OrbitalPaths />
        
        {/* Orbiting Spheres */}
        <OrbitingSphere position={[2.6, 0.5, 0]} size={0.3} />
        <OrbitingSphere position={[3.6, -0.8, 0]} size={0.25} />
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Suspense>
    </Canvas>
  )
}

export default function AboutUs() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative px-8 py-12 ">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >             

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
            >
              <span>Launch Your </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Potential
              </span>
              <br />
              <span>into the Cosmos</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-purple-200 leading-relaxed max-w-lg"
            >
              Master in-demand skills through immersive, expert-led courses. Chart your trajectory, explore new worlds of knowledge, and level up your career with a premium learning experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="flex items-center gap-2">
                  Explore Courses
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-purple-400/30 bg-purple-900/50 text-white hover:bg-purple-800/50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </motion.div>

            {/* Feature Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-400/30 rounded-lg text-white text-sm">
                <Check className="w-4 h-4" />
                <span>Certified Paths</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-400/30 rounded-lg text-white text-sm">
                <Users className="w-4 h-4" />
                <span>Community Labs</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-400/30 rounded-lg text-white text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Futuristic Curriculum</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] lg:h-[700px]"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden ">
              <HeroScene />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 