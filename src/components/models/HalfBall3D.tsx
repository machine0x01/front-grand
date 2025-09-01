"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Environment, OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function PlanetMesh({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Only rotate when hovered, and rotate on X-axis (top to bottom)
      if (isHovered) {
        meshRef.current.rotation.x += 0.02
      }
      
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
              canvas.width = 2048
              canvas.height = 2048
              const ctx = canvas.getContext('2d')!
              
              // Create base planet surface with primary brand colors
              const baseGradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024)
              baseGradient.addColorStop(0, '#3b82f6')  // blue-500
              baseGradient.addColorStop(0.2, '#1d4ed8') // blue-700
              baseGradient.addColorStop(0.4, '#1e40af') // blue-800
              baseGradient.addColorStop(0.6, '#1e3a8a') // blue-900
              baseGradient.addColorStop(0.8, '#172554') // blue-950
              baseGradient.addColorStop(1, '#0f172a')   // slate-900
              
              ctx.fillStyle = baseGradient
              ctx.fillRect(0, 0, 2048, 2048)
              
              // Add multiple layers of continents with different biomes
              for (let layer = 0; layer < 3; layer++) {
                for (let i = 0; i < 12; i++) {
                  const centerX = Math.random() * 2048
                  const centerY = Math.random() * 2048
                  const baseSize = 100 + Math.random() * 200
                  
                  // Create organic continent shape with more detail
                  ctx.beginPath()
                  for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
                    const noise = Math.sin(angle * 4) * 0.4 + Math.cos(angle * 7) * 0.3 + Math.sin(angle * 11) * 0.2
                    const radius = baseSize * (0.6 + noise)
                    const x = centerX + Math.cos(angle) * radius
                    const y = centerY + Math.sin(angle) * radius
                    
                    if (angle === 0) ctx.moveTo(x, y)
                    else ctx.lineTo(x, y)
                  }
                  ctx.closePath()
                  
                  // Different biome colors for each layer
                  let continentGradient
                  if (layer === 0) {
                    // Primary continents - white/light blue
                    continentGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseSize)
                    continentGradient.addColorStop(0, '#ffffff') // white
                    continentGradient.addColorStop(0.3, '#f1f5f9') // slate-100
                    continentGradient.addColorStop(0.7, '#e2e8f0') // slate-200
                    continentGradient.addColorStop(1, '#cbd5e1')   // slate-300
                  } else if (layer === 1) {
                    // Secondary continents - light blue tones
                    continentGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseSize)
                    continentGradient.addColorStop(0, '#dbeafe') // blue-100
                    continentGradient.addColorStop(0.4, '#bfdbfe') // blue-200
                    continentGradient.addColorStop(0.8, '#93c5fd') // blue-300
                    continentGradient.addColorStop(1, '#60a5fa')   // blue-400
                  } else {
                    // Tertiary continents - teal tones
                    continentGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseSize)
                    continentGradient.addColorStop(0, '#ccfbf1') // teal-100
                    continentGradient.addColorStop(0.4, '#99f6e4') // teal-200
                    continentGradient.addColorStop(0.8, '#5eead4') // teal-300
                    continentGradient.addColorStop(1, '#14b8a6')   // teal-400
                  }
                  
                  ctx.fillStyle = continentGradient
                  ctx.fill()
                }
              }
              
              // Add detailed surface features with better variety
              for (let i = 0; i < 800; i++) {
                const x = Math.random() * 2048
                const y = Math.random() * 2048
                const size = Math.random() * 25 + 5
                
                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                
                const featureGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
                const featureType = Math.random()
                
                if (featureType > 0.7) {
                  // Bright crystalline features
                  featureGradient.addColorStop(0, '#ffffff') // white
                  featureGradient.addColorStop(0.5, '#f8fafc') // slate-50
                  featureGradient.addColorStop(1, '#e2e8f0')   // slate-200
                } else if (featureType > 0.4) {
                  // Blue features
                  featureGradient.addColorStop(0, '#60a5fa') // blue-400
                  featureGradient.addColorStop(0.5, '#3b82f6') // blue-500
                  featureGradient.addColorStop(1, '#1d4ed8')   // blue-700
                } else {
                  // Dark features
                  featureGradient.addColorStop(0, '#0f172a') // slate-900
                  featureGradient.addColorStop(0.5, '#1e293b') // slate-800
                  featureGradient.addColorStop(1, '#334155')   // slate-700
                }
                
                ctx.fillStyle = featureGradient
                ctx.fill()
              }
              
              // Add mountain ranges and ridges
              for (let i = 0; i < 15; i++) {
                const startX = Math.random() * 2048
                const startY = Math.random() * 2048
                const length = 100 + Math.random() * 300
                const angle = Math.random() * Math.PI * 2
                
                ctx.beginPath()
                ctx.moveTo(startX, startY)
                
                for (let j = 0; j < 20; j++) {
                  const progress = j / 20
                  const x = startX + Math.cos(angle) * length * progress
                  const y = startY + Math.sin(angle) * length * progress
                  const offset = Math.sin(progress * Math.PI * 4) * 30
                  
                  ctx.lineTo(x + Math.cos(angle + Math.PI/2) * offset, 
                            y + Math.sin(angle + Math.PI/2) * offset)
                }
                
                ctx.strokeStyle = '#ffffff'
                ctx.lineWidth = 6
                ctx.stroke()
              }
              
              // Add subtle atmospheric glow effect
              const glowGradient = ctx.createRadialGradient(1024, 1024, 800, 1024, 1024, 2048)
              glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0)')
              glowGradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.03)')
              glowGradient.addColorStop(0.9, 'rgba(59, 130, 246, 0.06)')
              glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)')
              
              ctx.fillStyle = glowGradient
              ctx.fillRect(0, 0, 2048, 2048)
              
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
