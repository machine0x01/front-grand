"use client"

import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function SimpleAstronaut(props: any) {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const { mouse } = useThree()
  const [modelPath, setModelPath] = useState('')
  const [debugInfo, setDebugInfo] = useState<any>({})
  
  // Try different possible paths
  useEffect(() => {
    const possiblePaths = [
      '/assets/3d/small-asturnate.glb',
      './assets/3d/small-asturnate.glb',
      '/small-asturnate.glb',
      '/public/assets/3d/small-asturnate.glb'
    ]
    
    // Test which path works
    const testPath = async () => {
      for (const path of possiblePaths) {
        try {
          const response = await fetch(path)
          if (response.ok) {
            console.log(`✅ Found model at: ${path}`)
            setModelPath(path)
            return
          }
        } catch (error) {
          console.log(`❌ Failed to load from: ${path}`)
        }
      }
      console.error('❌ Model not found in any expected location')
    }
    
    testPath()
  }, [])
  
  // Load GLTF model only when path is found
  const gltfResult = useGLTF(modelPath || '/assets/3d/small-asturnate.glb')
  const { nodes, materials, scene } = gltfResult
  
  // Enhanced debugging
  useEffect(() => {
    const debug = {
      modelPath,
      hasNodes: !!nodes && Object.keys(nodes).length > 0,
      nodeKeys: nodes ? Object.keys(nodes) : [],
      hasMaterials: !!materials && Object.keys(materials).length > 0,
      materialKeys: materials ? Object.keys(materials) : [],
      hasScene: !!scene,
      sceneChildren: scene ? scene.children.length : 0
    }
    
    setDebugInfo(debug)
    console.log('🔍 GLTF Debug Info:', debug)
    
    // Log all available nodes and materials
    if (nodes) {
      console.log('📦 Available nodes:', Object.keys(nodes))
      Object.entries(nodes).forEach(([key, node]: [string, any]) => {
        console.log(`  - ${key}:`, node.type, node.geometry ? '(has geometry)' : '(no geometry)')
      })
    }
    
    if (materials) {
      console.log('🎨 Available materials:', Object.keys(materials))
    }
  }, [nodes, materials, scene, modelPath])
  
  // Try to find any valid geometry and material
  const findValidMesh = () => {
    if (!nodes) return null
    
    // Try the specific node first
    const specificNode = nodes['tripo_node_111858a9-4903-4081-8c9b-62d190723d3f']
    if (specificNode?.geometry) {
      return {
        geometry: specificNode.geometry,
        material: materials?.['tripo_mat_111858a9-4903-4081-8c9b-62d190723d3f'] || new THREE.MeshStandardMaterial({ color: 'orange' })
      }
    }
    
    // Fallback: find any node with geometry
    for (const [key, node] of Object.entries(nodes)) {
      const nodeObj = node as any
      if (nodeObj?.geometry) {
        console.log(`🎯 Using fallback node: ${key}`)
        return {
          geometry: nodeObj.geometry,
          material: Object.values(materials || {})[0] || new THREE.MeshStandardMaterial({ color: 'orange' })
        }
      }
    }
    
    return null
  }
  
  const meshData = findValidMesh()
  
  // Simple mouse tracking animation
  useFrame(() => {
    if (meshRef.current && mouse) {
      const targetRotationY = mouse.x * 0.3
      const targetRotationX = mouse.y * 0.2
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      )
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1
      )
    }
  })
  
  // Show debug info in development
  if (process.env.NODE_ENV === 'development' && !modelPath) {
    return (
      <group {...props}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <Html position={[0, 2, 0]}>
          <div style={{ background: 'black', color: 'white', padding: '10px', borderRadius: '5px' }}>
            Model not found. Check console for debug info.
          </div>
        </Html>
      </group>
    )
  }
  
  // If no valid mesh data found, show fallback
  if (!meshData) {
    console.warn('⚠️ No valid geometry found, showing fallback')
    return (
      <group {...props}>
        <mesh ref={meshRef} castShadow receiveShadow scale={[3, 3, 3]} position={[0, 0, 0]} rotation={[1, 0, 0]}>
          <capsuleGeometry args={[0.5, 1, 4, 8]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>
    )
  }
  
  console.log('✅ Rendering astronaut with valid geometry')
  
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={meshData.geometry}
        material={meshData.material}
        scale={[3, 3, 3]}
        position={[0, 0, 0]}
        rotation={[1, 0, 0]}
      />
    </group>
  )
}

// Don't preload until we know the correct path
// useGLTF.preload('/assets/3d/small-asturnate.glb')