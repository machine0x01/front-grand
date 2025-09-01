'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

const host = "http://localhost:3000/"
function Model({ path }: { path: string }) {
  const { scene } = useGLTF(host + path) as any
  return <primitive object={scene} scale={1} />
}

export default function MoonScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Model path="/assets/3d/small-asturnate.glb" />
      </Suspense>
      {/* استخدم OrbitControls من drei مباشرة */}
      <OrbitControls />
    </Canvas>
  )
}
