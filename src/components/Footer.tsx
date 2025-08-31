"use client"
import { ExternalLink, Facebook, Globe, Instagram, Linkedin, MapPin, Phone } from 'lucide-react';
import React, { useRef, useState } from 'react';
import LightRays from './shared/LightRays';
import { LampContainer } from './ui/lamp';
import { motion, useInView } from 'framer-motion';
import { SparklesCore } from './ui/sparkles';

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { 
    amount: 0.3,
    once: false 
  });
  
  // Add a delayed state for smoother transitions
  const [delayedInView, setDelayedInView] = useState(false);
  
  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setDelayedInView(true);
      }, 300); // 300ms delay
      return () => clearTimeout(timer);
    } else {
      setDelayedInView(false);
    }
  }, [isInView]);
  
  console.log('Footer isInView:', isInView, 'Delayed:', delayedInView);

  return (
    <motion.footer
      ref={footerRef}
      className="relative h-screen overflow-hidden text-white transition-all duration-1000 ease-in-out"
      style={{ 
        backgroundColor: delayedInView ? "rgb(0, 0, 0)" : "rgb(11, 0, 15)" 
      }}
    >
      {/* Space Background with Celestial Elements */}
      <div className="absolute inset-0 z-0">
        {/* Deep Space Background - Upper 2/3 */}
        <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-slate-800 via-slate-900 to-black" />
        
        {/* Scattered Stars */}
        <div className="absolute top-0 left-0 right-0 h-2/3">
          {Array.from({ length: 150 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 66}%`,
                backgroundColor: Math.random() > 0.7 ? '#fbbf24' : Math.random() > 0.5 ? '#3b82f6' : '#ffffff',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Large Light Green/Teal Planet (Bottom Third) */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #86efac, #4ade80, #22c55e, #16a34a)',
            boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.3), 0 0 80px rgba(134, 239, 172, 0.2)'
          }}
          animate={{
            y: [0, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Planet Surface Details - Subtle Craters */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-24 left-36 w-20 h-20 bg-black/15 rounded-full" />
            <div className="absolute top-44 right-28 w-16 h-16 bg-black/20 rounded-full" />
            <div className="absolute bottom-36 left-24 w-24 h-24 bg-black/18 rounded-full" />
            <div className="absolute bottom-24 right-44 w-18 h-18 bg-black/22 rounded-full" />
            <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-black/16 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </motion.div>

        {/* Mid-Ground Banded Planet (Top Right) */}
        <motion.div
          className="absolute top-1/4 right-1/5 w-56 h-56 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #86efac, #4ade80, #22c55e, #86efac)',
            boxShadow: '0 0 60px rgba(134, 239, 172, 0.3)'
          }}
          animate={{
            rotate: 360,
            y: [0, -8, 0]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Planet Bands */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-1/4 left-0 right-0 h-3 bg-green-300/70 rounded-full" />
            <div className="absolute top-1/2 left-0 right-0 h-4 bg-green-200/80 rounded-full" />
            <div className="absolute top-3/4 left-0 right-0 h-3 bg-green-400/60 rounded-full" />
          </div>
        </motion.div>

        {/* Astronaut - Centered, Looking Up */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          {/* Astronaut Body */}
          <div className="relative">
            {/* Helmet */}
            <div className="w-16 h-20 bg-gradient-to-b from-green-300 to-green-400 rounded-full border-2 border-green-500 shadow-lg">
              {/* Helmet Reflection */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full" />
              {/* Z Logo on Helmet */}
              <div className="absolute top-3 right-2 w-3 h-3 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">Z</span>
              </div>
            </div>
            
            {/* Body */}
            <div className="w-12 h-16 bg-gradient-to-b from-green-300 to-green-500 rounded-full mx-auto mt-2 border border-green-400" />
            
            {/* Arms */}
            <div className="absolute top-8 -left-2 w-3 h-8 bg-green-400 rounded-full transform rotate-12" />
            <div className="absolute top-8 -right-2 w-3 h-8 bg-green-400 rounded-full transform -rotate-12" />
            
            {/* Legs */}
            <div className="w-8 h-10 bg-green-400 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </div>

      {/* Text Overlay - Mission Statement */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Main Mission Text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-wider"
          >
            GRAND NOTION
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-300 to-green-400 bg-clip-text text-transparent uppercase tracking-wider"
          >
            IS LEADING
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-300 to-green-400 bg-clip-text text-transparent uppercase tracking-wider"
          >
            THAT MISSION
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering creativity through animation education and innovation
          </motion.p>
        </div>
      </div>

      {/* Footer Content - Semi-transparent overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundColor: delayedInView ? "rgba(0, 0, 0, 0.85)" : "rgba(11, 0, 15, 0.85)" 
        }}
      >
        <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div className="lg:col-span-1">
                <h3 className="mb-4 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                  Our Location
                </h3>
                <div className="group mb-4 flex h-32 w-full items-center justify-center rounded-xl border border-green-400/20 bg-gradient-to-br from-green-900/50 to-green-800/50 text-gray-300 shadow-2xl transition-all duration-300 hover:border-green-400/40 sm:h-36">
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto mb-2 transition-colors duration-300 group-hover:text-[#FEB101]" />
                    <p className="text-sm text-gray-400">Interactive Map</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-lg bg-gradient-to-r from-[#FEB101] to-[#FFD984] p-2">
                      <Phone size={14} className="text-[#4A044E]" />
                    </div>
                    <div>
                      <span className="text-base font-semibold text-white">Call Us</span>
                    </div>
                  </div>
                  <div className="ml-11">
                    <p className="text-sm leading-relaxed text-gray-200">
                      022343434 - 022343434
                      <br />
                      <span className="text-xs text-gray-400">Available 24/7</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <h3 className="mb-4 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-lg font-bold text-transparent">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {['Home', 'About Us', 'Courses', 'Gallery', 'Hire Us', 'Contact Us'].map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="group flex items-center text-sm text-gray-200 transition-all duration-300 hover:text-[#FEB101] sm:text-base"
                      >
                        <span className="mr-3 h-1 w-1 rounded-full bg-[#FEB101] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        {item}
                        <ExternalLink size={12} className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-1">
                <h3 className="mb-4 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-lg font-bold text-transparent">
                  Diplomas
                </h3>
                <ul className="space-y-2">
                  {['2D Animation', '3D Animation', 'Motion Graphics', 'Character Animation'].map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="group flex items-center text-sm text-gray-200 transition-all duration-300 hover:text-[#FEB101] sm:text-base"
                      >
                        <span className="mr-3 h-1 w-1 rounded-full bg-[#FEB101] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        {item}
                        <ExternalLink size={12} className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-1">
                <h3 className="mb-4 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-lg font-bold text-transparent">
                  Support
                </h3>
                <ul className="mb-6 space-y-2">
                  {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="group flex items-center text-sm text-gray-200 transition-all duration-300 hover:text-[#FEB101] sm:text-base"
                      >
                        <span className="mr-3 h-1 w-1 rounded-full bg-[#FEB101] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        {item}
                        <ExternalLink size={12} className="ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 mb-6 sm:mt-12">
              <div className="h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
