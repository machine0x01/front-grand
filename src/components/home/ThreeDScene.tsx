'use client'

import React, { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the 3D scene content
const Hero3DScene = dynamic(() => import('../models/MoonScene'), { ssr: false })

export default function ThreeDScene() {
  const [Canvas, setCanvas] = useState<any>(null)
  const [OrbitControls, setOrbitControls] = useState<any>(null)

  useEffect(() => {
    // Import components only on client side
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei')
    ]).then(([fiberMod, dreiMod]) => {
      setCanvas(() => fiberMod.Canvas)
      setOrbitControls(() => dreiMod.OrbitControls)
    })
  }, [])

  if (!Canvas || !OrbitControls) {
    return <div className="w-full h-full bg-gray-800 animate-pulse" />
  }

  return (
    <Canvas camera={{ position: [2, 1, 4], fov: 60 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
