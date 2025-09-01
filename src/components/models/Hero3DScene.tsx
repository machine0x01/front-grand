'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import SimpleAstronaut
const DynamicSimpleAstronaut = dynamic(
  () => import('./MoonScene').then((mod) => ({ default: mod.default })),
  { ssr: false }
)

export default function Hero3DScene() {
  return (
    <Suspense fallback={null}>
      <DynamicSimpleAstronaut />
    </Suspense>
  )
}
