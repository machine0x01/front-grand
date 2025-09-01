'use client'

import React, { useMemo } from 'react'

interface Star {
  size: number
  left: number
  top: number
  animationDelay: number
  isGlowing: boolean
  isSuperGlow: boolean
}

interface AnimatedStarsProps {
  count?: number
  className?: string
  background?: string
  starSizeRange?: { min: number; max: number }
  glowIntensity?: 'low' | 'medium' | 'high'
  zIndex?: number
}

// Simple deterministic random function
function seededRandom(seed: string, index: number): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Use index to create variation
  const combined = hash + index
  const x = Math.sin(combined) * 10000
  return x - Math.floor(x)
}

export default function AnimatedStars({
  count = 100,
  className = '',
  background = `
    radial-gradient(ellipse at top, rgba(30, 30, 50, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at bottom, rgba(10, 10, 20, 0.3) 0%, transparent 50%)
  `,
  starSizeRange = { min: 1, max: 4 },
  glowIntensity = 'medium',
  zIndex = 0,
}: AnimatedStarsProps) {
  const seed = 'stars-seed-123'
  
  const stars = useMemo<Star[]>(() => {
    const generatedStars: Star[] = []

    for (let i = 0; i < count; i++) {
      const size = seededRandom(seed, i) * (starSizeRange.max - starSizeRange.min) + starSizeRange.min
      const left = seededRandom(seed, i + 1000) * 100
      const top = seededRandom(seed, i + 2000) * 100
      const animationDelay = seededRandom(seed, i + 3000) * 5

      let isGlowing, isSuperGlow
      switch (glowIntensity) {
        case 'low':
          isGlowing = seededRandom(seed, i + 6000) > 0.8
          isSuperGlow = seededRandom(seed, i + 6000) > 0.95
          break
        case 'high':
          isGlowing = seededRandom(seed, i + 6000) > 0.5
          isSuperGlow = seededRandom(seed, i + 6000) > 0.8
          break
        default:
          isGlowing = seededRandom(seed, i + 6000) > 0.7
          isSuperGlow = seededRandom(seed, i + 6000) > 0.9
      }

      generatedStars.push({
        size,
        left,
        top,
        animationDelay,
        isGlowing,
        isSuperGlow,
      })
    }

    return generatedStars
  }, [count, starSizeRange.min, starSizeRange.max, glowIntensity]) // Fixed: Use primitive values instead of object

  const renderStar = (star: Star, index: number) => {
    let starClass, glowEffect

    if (star.isSuperGlow) {
      starClass = 'bg-white animate-pulse'
      glowEffect = 'shadow-[0_0_20px_#ffffff,0_0_40px_#60a5fa,0_0_60px_#3b82f6,0_0_80px_#1d4ed8]'
    } else if (star.isGlowing) {
      starClass = 'bg-blue-100 animate-pulse'
      glowEffect = 'shadow-[0_0_15px_#60a5fa,0_0_30px_#3b82f6,0_0_45px_#1d4ed8]'
    } else {
      starClass = 'bg-white opacity-90'
      glowEffect = ''
    }

    return (
      <div
        key={index}
        className={`absolute rounded-full ${starClass} ${glowEffect} animate-bounce`}
        style={{
          width: `${star.size.toFixed(4)}px`, // Fixed: Round to prevent precision differences
          height: `${star.size.toFixed(4)}px`,
          left: `${star.left.toFixed(4)}%`,
          top: `${star.top.toFixed(4)}%`,
          animationDelay: `${star.animationDelay.toFixed(4)}s`,
        }}
      />
    )
  }

  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        background,
        zIndex,
      }}
    >
      {stars.map((star, index) => renderStar(star, index))}
    </div>
  )
}