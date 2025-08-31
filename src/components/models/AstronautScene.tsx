"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { SimpleAstronaut } from "./SimpleAstronaut"
import { useRef } from "react"
import * as THREE from "three"

interface AstronautSceneProps {
  className?: string
  enableControls?: boolean
  cameraPosition?: [number, number, number]
  cameraFov?: number
  rotateAstronaut?: boolean
  randomMovement?: boolean
}

function AstronautWithMovement({ rotateAstronaut = false, randomMovement = false }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    if (randomMovement) {
      // Random floating movement within bounds
      groupRef.current.position.x = Math.sin(time * 0.3) * 0.5
      groupRef.current.position.y = Math.cos(time * 0.4) * 0.3
      groupRef.current.position.z = Math.sin(time * 0.2) * 0.2
      
      // Random rotation
      groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.1
    }
  })
  
  return (
    <group ref={groupRef}>
      <SimpleAstronaut 
        rotation={rotateAstronaut ? [0, 0, -Math.PI / 2] : [0, 0, 0]} 
      />
    </group>
  )
}

export function AstronautScene({ 
  className = "", 
  enableControls = true,
  cameraPosition = [0, 0, 5],
  cameraFov = 50,
  rotateAstronaut = false,
  randomMovement = false
}: AstronautSceneProps) {
  return (
    <div className={`${className}`}>
      <Canvas 
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{ localClippingEnabled: true }}
      >
        {/* Enhanced Multi-Light Setup */}
        <ambientLight intensity={0.8} color="#ffffff" />
        
        {/* Main Directional Lights */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-8, 8, 4]} intensity={1} color="#e0e7ff" />
        
        {/* Colored Point Lights */}
        <pointLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />
        <pointLight position={[-5, 2, 3]} intensity={0.8} color="#a855f7" />
        <pointLight position={[0, -3, 2]} intensity={0.7} color="#34d399" />
        <pointLight position={[3, -2, -3]} intensity={0.6} color="#f59e0b" />
        
        {/* Rim Lighting */}
        <pointLight position={[-10, 0, -5]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[10, 0, -5]} intensity={1.2} color="#ec4899" />
        
        {/* Spot Lights for Drama */}
        <spotLight 
          position={[0, 12, 0]} 
          angle={0.4} 
          penumbra={1} 
          intensity={1.5} 
          color="#ffffff"
          castShadow
        />
        <spotLight 
          position={[8, 6, 8]} 
          angle={0.5} 
          penumbra={0.8} 
          intensity={1} 
          color="#3b82f6"
        />
        <spotLight 
          position={[-8, 6, 8]} 
          angle={0.5} 
          penumbra={0.8} 
          intensity={1} 
          color="#8b5cf6"
        />
        
        {/* Additional Model-Focused Lights */}
        <pointLight position={[2, 3, 2]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-2, 3, 2]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 5, 1]} intensity={1.8} color="#f0f9ff" />
        <pointLight position={[0, 1, 4]} intensity={1.3} color="#ffffff" />
        <pointLight position={[0, -1, 3]} intensity={1.1} color="#e0f2fe" />
        
        {/* Close-range colored accent lights */}
        <pointLight position={[1, 2, 1]} intensity={0.9} color="#60a5fa" />
        <pointLight position={[-1, 2, 1]} intensity={0.9} color="#a855f7" />
        <pointLight position={[0, 0, 2]} intensity={1.2} color="#fbbf24" />
        <pointLight position={[1, 1, 3]} intensity={0.8} color="#10b981" />
        <pointLight position={[-1, 1, 3]} intensity={0.8} color="#f59e0b" />
        
        {/* Helmet/Head focused lights */}
        <spotLight 
          position={[0, 4, 3]} 
          target-position={[0, 2, 0]}
          angle={0.6} 
          penumbra={0.5} 
          intensity={2} 
          color="#ffffff"
        />
        <spotLight 
          position={[2, 3, 3]} 
          target-position={[0, 1.5, 0]}
          angle={0.4} 
          penumbra={0.7} 
          intensity={1.5} 
          color="#ddd6fe"
        />
        <spotLight 
          position={[-2, 3, 3]} 
          target-position={[0, 1.5, 0]}
          angle={0.4} 
          penumbra={0.7} 
          intensity={1.5} 
          color="#bfdbfe"
        />
        
        {/* Even More Lights - Maximum Illumination */}
        <pointLight position={[0, 6, 0]} intensity={2} color="#ffffff" />
        <pointLight position={[0, -4, 0]} intensity={1.8} color="#f0f9ff" />
        <pointLight position={[4, 0, 0]} intensity={1.6} color="#fef3c7" />
        <pointLight position={[-4, 0, 0]} intensity={1.6} color="#e0e7ff" />
        <pointLight position={[0, 0, -4]} intensity={1.4} color="#fce7f3" />
        <pointLight position={[0, 0, 6]} intensity={1.4} color="#ecfdf5" />
        
        {/* Diagonal lights for complete coverage */}
        <pointLight position={[3, 3, 3]} intensity={1.3} color="#ddd6fe" />
        <pointLight position={[-3, 3, 3]} intensity={1.3} color="#fed7d7" />
        <pointLight position={[3, -3, 3]} intensity={1.3} color="#d1fae5" />
        <pointLight position={[-3, -3, 3]} intensity={1.3} color="#fef9e3" />
        <pointLight position={[3, 3, -3]} intensity={1.3} color="#e0f2fe" />
        <pointLight position={[-3, 3, -3]} intensity={1.3} color="#fdf2f8" />
        <pointLight position={[3, -3, -3]} intensity={1.3} color="#f0fdf4" />
        <pointLight position={[-3, -3, -3]} intensity={1.3} color="#fefce8" />
        
        {/* Ring of lights around the astronaut */}
        <pointLight position={[2, 2, 0]} intensity={1.1} color="#60a5fa" />
        <pointLight position={[-2, 2, 0]} intensity={1.1} color="#a855f7" />
        <pointLight position={[2, -2, 0]} intensity={1.1} color="#34d399" />
        <pointLight position={[-2, -2, 0]} intensity={1.1} color="#f59e0b" />
        <pointLight position={[0, 2, 2]} intensity={1.1} color="#ec4899" />
        <pointLight position={[0, -2, 2]} intensity={1.1} color="#06b6d4" />
        <pointLight position={[0, 2, -2]} intensity={1.1} color="#8b5cf6" />
        <pointLight position={[0, -2, -2]} intensity={1.1} color="#10b981" />
        
        {/* Additional spot lights for dramatic effect */}
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={2.5} 
          color="#ffffff"
          castShadow
        />
        <spotLight 
          position={[-5, 5, 5]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={2.5} 
          color="#f0f9ff"
          castShadow
        />
        <spotLight 
          position={[5, -5, 5]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={2.5} 
          color="#fef3c7"
        />
        <spotLight 
          position={[-5, -5, 5]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={2.5} 
          color="#e0e7ff"
        />
        <AstronautWithMovement 
          rotateAstronaut={rotateAstronaut}
          randomMovement={randomMovement}
        />
        {enableControls && <OrbitControls enableRotate={true} />}
      </Canvas>
    </div>
  )
}
