'use client'

import React, { useRef } from 'react'
import AnimatedStars from '../shared/AnimatedStars'
import dynamic from 'next/dynamic'
import MoonScene from '../models/MoonScene'
  
// Dynamically import the 3D scene wrapper
const ThreeDScene = dynamic(() => import('./ThreeDScene'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-800 animate-pulse" />
})

export default function HeroHome() {
  const starsRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-6 overflow-hidden">
      {/* Animated Stars Background */}
      <AnimatedStars 
        count={100}
        glowIntensity="medium"
        zIndex={0}
      />
      
      {/* Nebula-like background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-15 animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
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
          Learning and practicing from zero to pro <br /> Motion Design and CG
          area
        </p>
      </div>

      {/* 3D Astronaut Scene - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[600px] md:w-[500px] md:h-[700px] animate-slide-in-left">
        {/* <MoonScene /> */}
      </div>

      {/* Custom CSS for slide-in animation */}
      <style jsx>{`
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
  )
}
