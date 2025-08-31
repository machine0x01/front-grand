'use client'

import React, { useEffect, useRef } from 'react'
import { AstronautScene } from '../models/AstronautScene'

export default function HeroHome() {
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createStars = () => {
      if (!starsRef.current) return

      const container = starsRef.current
      const numberOfStars = 100 // Reduced for better performance

      // Clear existing stars
      container.innerHTML = ''

      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div')
        const size = Math.random() * 4 + 1 // Bigger stars
        const left = Math.random() * 100
        const top = Math.random() * 100
        const animationDelay = Math.random() * 5
        const animationDuration = Math.random() * 4 + 2
        const moveSpeed = Math.random() * 20 + 10 // Movement speed
        
        // Fewer glowing stars for better performance
        const isGlowing = Math.random() > 0.7 // 30% chance
        const isSuperGlow = Math.random() > 0.9 // 10% chance for super glow

        let starClass, glowEffect
        if (isSuperGlow) {
          starClass = 'bg-white'
          glowEffect = 'shadow-[0_0_20px_#ffffff,0_0_40px_#60a5fa,0_0_60px_#3b82f6,0_0_80px_#1d4ed8] animate-pulse'
        } else if (isGlowing) {
          starClass = 'bg-blue-100'
          glowEffect = 'shadow-[0_0_15px_#60a5fa,0_0_30px_#3b82f6,0_0_45px_#1d4ed8] animate-pulse'
        } else {
          starClass = 'bg-white opacity-90'
          glowEffect = ''
        }

        star.className = `absolute rounded-full ${starClass} ${glowEffect}`
        
        star.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${left}%;
          top: ${top}%;
          animation-delay: ${animationDelay}s;
          animation-duration: ${animationDuration}s;
        `

        // Space-like floating animations
        const floatSpeed = Math.random() * 30 + 20 // Slower, more space-like movement
        if (isSuperGlow) {
          star.style.animation = `spaceFloat ${floatSpeed}s linear infinite ${animationDelay}s, superTwinkle ${animationDuration}s infinite ${animationDelay}s`
        } else if (isGlowing) {
          star.style.animation = `gentleFloat ${floatSpeed * 1.2}s linear infinite ${animationDelay}s, superTwinkle ${animationDuration}s infinite ${animationDelay}s`
        } else {
          star.style.animation = `slowDrift ${floatSpeed * 1.5}s linear infinite ${animationDelay}s, twinkle ${animationDuration}s infinite ${animationDelay}s`
        }

        container.appendChild(star)
      }
    }

    createStars()
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-6 overflow-hidden">
      {/* Animated Stars Background */}
      <div 
        ref={starsRef} 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(30, 30, 50, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(10, 10, 20, 0.3) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Nebula-like background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <h2 className="text-lg font-medium mb-2 text-blue-200 drop-shadow-lg">
          <span className="font-semibold text-white">Motion</span> Design School
        </h2>

        {/* Main Title */}
        <h1 className="text-6xl md:text-[20rem] font-extrabold leading-none text-center tracking-tight text-white drop-shadow-2xl">
          <span className="bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent">
            GRAND
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
            NOTION
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-center text-base md:text-lg max-w-xl text-blue-100 drop-shadow-lg">
          Learning and practicing from zero to pro <br /> Motion Design and CG area
        </p>
      </div>

      {/* 3D Astronaut Scene - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[600px] md:w-[500px] md:h-[700px] animate-slide-in-left">
        <AstronautScene 
          className="w-full h-full"
          enableControls={false}
          cameraPosition={[2, 1, 4]}
          cameraFov={60}
          rotateAstronaut={false}
          randomMovement={false}
        />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes superTwinkle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          25% { opacity: 1; transform: scale(1.5); }
          50% { opacity: 0.9; transform: scale(1.2); }
          75% { opacity: 1; transform: scale(1.4); }
        }
        
        @keyframes slowDrift {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(10px) translateY(-20px); }
          50% { transform: translateX(-8px) translateY(-40px); }
          75% { transform: translateX(12px) translateY(-60px); }
          100% { transform: translateX(0) translateY(-80px); }
        }
        
        @keyframes gentleFloat {
          0% { transform: translateX(0) translateY(0) scale(1); }
          20% { transform: translateX(15px) translateY(-25px) scale(1.05); }
          40% { transform: translateX(-12px) translateY(-50px) scale(1.1); }
          60% { transform: translateX(18px) translateY(-75px) scale(1.05); }
          80% { transform: translateX(-10px) translateY(-100px) scale(1.08); }
          100% { transform: translateX(0) translateY(-120px) scale(1); }
        }
        
        @keyframes spaceFloat {
          0% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
          16% { transform: translateX(20px) translateY(-30px) rotate(30deg) scale(1.1); }
          33% { transform: translateX(-15px) translateY(-60px) rotate(-20deg) scale(1.05); }
          50% { transform: translateX(25px) translateY(-90px) rotate(40deg) scale(1.15); }
          66% { transform: translateX(-18px) translateY(-120px) rotate(-30deg) scale(1.08); }
          83% { transform: translateX(22px) translateY(-150px) rotate(25deg) scale(1.12); }
          100% { transform: translateX(0) translateY(-180px) rotate(0deg) scale(1); }
        }
        
        @keyframes slide-in-left {
          0% { 
            transform: translateX(-100%); 
            opacity: 0; 
          }
          100% { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
