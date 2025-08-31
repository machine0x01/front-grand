"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Environment, OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function PlanetMesh({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Base slow rotation
      meshRef.current.rotation.y += isHovered ? 0.02 : 0.005
      
      // Gentle floating motion - adjusted for massive planet
      meshRef.current.position.y = -32 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      
      // Slight wobble effect
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
    }
  })

  return (
    <group>
      {/* Main Planet - Massive size for dramatic effect */}
      <Sphere ref={meshRef} args={[40, 64, 64]} position={[0, -32, 0]}>
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.4}
          roughness={0.6}
          envMapIntensity={1.2}
        >
          {/* Enhanced Planet surface texture */}
          <primitive 
            attach="map" 
            object={(() => {
              const canvas = document.createElement('canvas')
              canvas.width = 1024
              canvas.height = 1024
              const ctx = canvas.getContext('2d')!
              
              // Create base planet surface with hero-matching colors
              const baseGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512)
              baseGradient.addColorStop(0, '#a855f7')  // purple-500
              baseGradient.addColorStop(0.3, '#8b5cf6') // purple-500
              baseGradient.addColorStop(0.6, '#7c3aed') // purple-600
              baseGradient.addColorStop(0.8, '#6d28d9') // purple-700
              baseGradient.addColorStop(1, '#5b21b6')   // purple-800
              
              ctx.fillStyle = baseGradient
              ctx.fillRect(0, 0, 1024, 1024)
              
              // Add continent-like landmasses
              for (let i = 0; i < 8; i++) {
                const centerX = Math.random() * 1024
                const centerY = Math.random() * 1024
                const baseSize = 80 + Math.random() * 120
                
                // Create organic continent shape
                ctx.beginPath()
                for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
                  const noise = Math.sin(angle * 3) * 0.3 + Math.cos(angle * 5) * 0.2
                  const radius = baseSize * (0.7 + noise)
                  const x = centerX + Math.cos(angle) * radius
                  const y = centerY + Math.sin(angle) * radius
                  
                  if (angle === 0) ctx.moveTo(x, y)
                  else ctx.lineTo(x, y)
                }
                ctx.closePath()
                
                const continentGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseSize)
                continentGradient.addColorStop(0, '#ec4899') // pink-500
                continentGradient.addColorStop(0.5, '#be185d') // pink-700
                continentGradient.addColorStop(1, '#9d174d')   // pink-800
                
                ctx.fillStyle = continentGradient
                ctx.fill()
              }
              
              // Add detailed surface features (craters, mountains)
              for (let i = 0; i < 300; i++) {
                const x = Math.random() * 1024
                const y = Math.random() * 1024
                const size = Math.random() * 15 + 3
                
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                
                const featureGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
                if (Math.random() > 0.5) {
                  // Bright features
                  featureGradient.addColorStop(0, '#60a5fa') // blue-400
                  featureGradient.addColorStop(1, '#3b82f6') // blue-500
                } else {
                  // Dark features
                  featureGradient.addColorStop(0, '#1e1b4b') // indigo-900
                  featureGradient.addColorStop(1, '#312e81') // indigo-800
                }
                
                ctx.fillStyle = featureGradient
                ctx.fill()
              }
              
              // Add atmospheric glow effect
              const glowGradient = ctx.createRadialGradient(512, 512, 400, 512, 512, 512)
              glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0)')
              glowGradient.addColorStop(0.8, 'rgba(139, 92, 246, 0.1)')
              glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0.3)')
              
              ctx.fillStyle = glowGradient
              ctx.fillRect(0, 0, 1024, 1024)
              
              const texture = new THREE.CanvasTexture(canvas)
              texture.wrapS = texture.wrapT = THREE.RepeatWrapping
              return texture
            })()}
          />
        </meshStandardMaterial>
      </Sphere>
      

      

      
      {/* Sparkle particles above massive planet */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={`sparkle-${i}`}
          position={[
            (Math.random() - 0.5) * 60,
            Math.random() * 15 - 2,
            (Math.random() - 0.5) * 60
          ]}
        >
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

interface Planet3DProps {
  className?: string
}

export default function Planet3D({ className = "" }: Planet3DProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`relative ${className} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 8, 30], fov: 65 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#8b5cf6" />
        <pointLight position={[-10, 5, 5]} intensity={1} color="#ec4899" />
        <pointLight position={[0, -8, 10]} intensity={0.8} color="#60a5fa" />
        <pointLight position={[0, 8, -10]} intensity={0.6} color="#a855f7" />
        
        <PlanetMesh isHovered={isHovered} />
        
        <Environment preset="night" />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
      

      
      {/* Hover instruction */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-purple-200 text-sm opacity-80 pointer-events-none">
        Hover to spin faster
      </div>
    </div>
  )
}
