"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

const SpaceWindowSection: React.FC = () => {
  const [portalOpen, setPortalOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hasTriggered, setHasTriggered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.8,
    margin: "-100px"
  })

  useEffect(() => {
    if (portalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [portalOpen])

  // Auto-trigger portal when section comes into view
  useEffect(() => {
    console.log('isInView:', isInView, 'hasTriggered:', hasTriggered)
    
    if (isInView && !hasTriggered) {
      console.log('Triggering portal in 1 second...')
      setHasTriggered(true)
      // Add a small delay for better UX
      const timer = setTimeout(() => {
        console.log('Opening portal now!')
        setPortalOpen(true)
      }, 1000) // 1 second delay after section is visible
      
      return () => clearTimeout(timer)
    }
  }, [isInView, hasTriggered])

  // Trigger portal when user reaches the end of the section
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && !hasTriggered) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionBottom = rect.bottom
        const windowHeight = window.innerHeight
        
        // Trigger when user reaches the bottom of the section
        if (sectionBottom <= windowHeight + 50) { // 50px buffer
          console.log('Reached end of section! Opening portal...')
          console.log('sectionBottom:', sectionBottom, 'windowHeight:', windowHeight)
          setHasTriggered(true)
          
          // Open portal immediately instead of using setTimeout
          console.log('Opening portal immediately!')
          setPortalOpen(true)
        }
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [hasTriggered])

  const handleEnterPortal = () => {
    setPortalOpen(true)
    // Scroll to top when portal opens
    window.scrollTo(0, 0)
  }

  const handleExitPortal = () => {
    setPortalOpen(false)
    setHasTriggered(false) // Reset trigger state so portal can open again
    console.log('Portal closed, resetting trigger state')
  }

  // Space scene content for immersive scrolling - First section is the preview
  const spaceSections = [
    {
      id: 'preview-window',
      title: 'Space Window Preview',
      description: 'The glowing window that opens to reveal the cosmos',
      color: 'from-[#0b000f] via-[#1a0033] to-black',
      height: 'h-screen',
      isPreview: true
    },
    {
      id: 'nebula',
      title: 'Cosmic Nebula',
      description: 'Drifting through clouds of stellar gas and cosmic dust',
      color: 'from-[#0b000f] to-[#1a0033]',
      height: 'h-screen'
    },
    {
      id: 'asteroid-belt',
      title: 'Asteroid Belt',
      description: 'Navigating through ancient rocky fragments of a destroyed world',
      color: 'from-[#0b000f] to-[#330033]',
      height: 'h-screen'
    },
    {
      id: 'distant-planet',
      title: 'Distant Planet',
      description: 'Approaching a mysterious world with unknown secrets',
      color: 'from-[#0b000f] to-[#003333]',
      height: 'h-screen'
    },
    {
      id: 'black-hole',
      title: 'Event Horizon',
      description: 'The edge of reality where space and time bend',
      color: 'from-[#0b000f] via-[#1a0033] to-[#0b000f]',
      height: 'h-screen'
    },
    {
      id: 'galaxy-core',
      title: 'Galactic Core',
      description: 'The heart of the galaxy where stars are born',
      color: 'from-[#330000] via-[#660033] to-[#330000]',
      height: 'h-screen'
    }
  ]

  console.log('Rendering component - portalOpen:', portalOpen, 'hasTriggered:', hasTriggered)
  
  return (
    <section ref={sectionRef} className="relative w-full bg-[#0b000f] min-h-screen py-20 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(51,0,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,0,51,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#660033] to-[#003333] bg-clip-text text-transparent">
              SPACE
            </span>
            <span className="text-white"> WINDOW</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#660033] max-w-4xl mx-auto leading-relaxed">
            Scroll to the end of this section and the portal will automatically open
          </p>
          
          {/* Debug Info */}
          <div className="text-center mt-4 text-sm text-[#660033]/70">
            <p>Debug: isInView: {isInView ? 'true' : 'false'}</p>
            <p>Debug: hasTriggered: {hasTriggered ? 'true' : 'false'}</p>
            <p>Debug: portalOpen: {portalOpen ? 'true' : 'false'}</p>
          </div>
          
          {/* Portal Trigger Indicator */}
          {hasTriggered && !portalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#660033]/20 border border-[#660033]/50 rounded-full">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-[#660033] rounded-full"
                />
                <span className="text-[#660033] text-sm font-medium">Portal opening immediately!</span>
              </div>
            </motion.div>
          )}

          {/* Ready to Trigger Indicator */}
          {!hasTriggered && !portalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600/20 border border-green-600/50 rounded-full">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-green-600 rounded-full"
                />
                <span className="text-green-600 text-sm font-medium">Ready to trigger portal - scroll to end of section</span>
              </div>
            </motion.div>
          )}

          {/* Manual Trigger Button (Fallback) */}
          {!hasTriggered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <button
                onClick={handleEnterPortal}
                className="px-6 py-3 bg-[#660033] hover:bg-[#880044] text-white font-semibold rounded-full transition-colors duration-300"
              >
                Open Portal Manually
              </button>
            </motion.div>
          )}

          {/* Force Portal Open Button (Debug) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-4"
          >
            <button
              onClick={() => {
                console.log('Force opening portal!')
                setPortalOpen(true)
                setHasTriggered(true)
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full transition-colors duration-300"
            >
              Force Open Portal (Debug)
            </button>
          </motion.div>
        </motion.div>

        {/* Main Glowing Window - This will animate to fill the screen */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative mx-auto max-w-4xl"
          animate={portalOpen ? {
            scale: 12,
            borderRadius: "0px",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "0%",
            left: "0%",
            zIndex: 9999
          } : {
            scale: 1,
            borderRadius: "24px",
            width: "100%",
            height: "600px",
            position: "relative",
            top: "0%",
            left: "0%",
            zIndex: 10
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
          style={{
            transformOrigin: "center center"
          }}
        >
          {/* Glowing Border */}
          <div className="relative">
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#0b000f] via-[#330033] to-[#0b000f] p-[3px] opacity-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#0b000f] via-[#330033] to-[#0b000f] opacity-30 blur-2xl" />
            </div>
            
            {/* Inner Glow with Chromatic Aberration Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#0b000f] via-[#330033] to-[#0b000f] p-[2px] opacity-60">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#660033] to-[#003333] opacity-20 blur-xl" />
            </div>
            
            {/* Window Content */}
            <div className="relative bg-gradient-to-br from-[#0b000f] via-[#1a0033] to-black rounded-3xl p-8 md:p-12 min-h-[600px] border border-[#330033]/50 backdrop-blur-xl overflow-hidden">
              {/* Space Background with Stars */}
              <div className="absolute inset-0 rounded-3xl">
                {/* Enhanced Starfield */}
                <div className="absolute inset-0">
                  {[...Array(150)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.8 + 0.2,
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
                
                {/* Multiple Glowing Dots */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute top-16 right-20 w-6 h-6"
                >
                  <div className="w-full h-full rounded-full bg-[#660033] shadow-lg shadow-[#660033]/50 animate-pulse" />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute top-32 left-16 w-4 h-4"
                >
                  <div className="w-full h-full rounded-full bg-[#003333] shadow-lg shadow-[#003333]/50 animate-pulse" />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="absolute bottom-32 right-32 w-5 h-5"
                >
                  <div className="w-full h-full rounded-full bg-[#880044] shadow-lg shadow-[#880044]/50 animate-pulse" />
                </motion.div>
              </div>
              
              {/* Floating Space Elements */}
              <div className="relative z-10">
                {/* Central Orb */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 2, type: "spring", delay: 0.5 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#660033]/40 to-[#003333]/40 backdrop-blur-xl border border-[#660033]/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-lg font-bold mb-2">SPACE</h3>
                      <p className="text-sm opacity-80">PORTAL</p>
                    </div>
                  </div>
                  {/* Orb Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#660033]/20 to-[#003333]/20 blur-xl animate-pulse" />
                </motion.div>
                
                {/* Orbital Rings */}
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  whileInView={{ opacity: 1, rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                >
                  <div className="w-full h-full rounded-full border border-[#660033]/30" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  whileInView={{ opacity: 1, rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64"
                >
                  <div className="w-full h-full rounded-full border border-[#003333]/20" />
                </motion.div>
                
                {/* Enhanced Scanlines Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-10">
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px bg-[#660033]"
                      style={{ top: `${(i * 4)}%` }}
                    />
                  ))}
                </div>
                
                {/* Corner Glows */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-[#660033]/20 to-transparent rounded-full blur-lg" />
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-bl from-[#003333]/20 to-transparent rounded-full blur-lg" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-[#880044]/20 to-transparent rounded-full blur-lg" />
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-tl from-[#660033]/20 to-transparent rounded-full blur-lg" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* When portal is open, show the immersive space journey */}
      {portalOpen && (
        <div className="fixed inset-0 z-[9998] bg-[#0b000f] overflow-y-auto">
          {/* Immersive Space Scrolling */}
          <div className="relative w-full">
            {spaceSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={`relative ${section.height} flex items-center justify-center overflow-hidden`}
              >
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${section.color}`} />
                
                {/* Stars Layer */}
                <div className="absolute inset-0">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.8 + 0.2,
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Section Specific Content */}
                {section.id === 'preview-window' && (
                  <div className="relative z-10 text-center text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2, type: "spring" }}
                      className="w-96 h-96 rounded-full bg-gradient-to-r from-[#660033]/30 to-[#003333]/30 backdrop-blur-xl border border-[#660033]/50 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">Space Window</h2>
                        <p className="text-xl opacity-90">The glowing portal to the cosmos</p>
                      </div>
                    </motion.div>
                    
                    {/* Exit Button - Only show when portal is open */}
                    <motion.button
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={handleExitPortal}
                      className="absolute top-6 right-6 z-50 px-4 py-2 bg-[#660033] hover:bg-[#880044] text-white rounded-full font-semibold transition-colors duration-300"
                    >
                      Exit Portal
                    </motion.button>
                  </div>
                )}

                {section.id === 'nebula' && (
                  <div className="relative z-10 text-center text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2, type: "spring" }}
                      className="w-96 h-96 rounded-full bg-gradient-to-r from-[#660033]/30 to-[#003333]/30 backdrop-blur-xl border border-[#660033]/50 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">Cosmic Nebula</h2>
                        <p className="text-xl opacity-90">Drifting through clouds of stellar gas</p>
                      </div>
                    </motion.div>
                  </div>
                )}

                {section.id === 'asteroid-belt' && (
                  <div className="relative z-10 text-center text-center text-white">
                    <div className="flex space-x-8">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ rotate: 0, scale: 0 }}
                          animate={{ rotate: 360, scale: 1 }}
                          transition={{ duration: 3, delay: i * 0.2 }}
                          className="w-24 h-24 bg-gradient-to-br from-[#660033] to-[#003333] rounded-full border-2 border-[#660033]"
                        />
                      ))}
                    </div>
                    <h2 className="text-4xl font-bold mt-8">Asteroid Belt</h2>
                    <p className="text-xl opacity-90 mt-4">Navigating through ancient fragments</p>
                  </div>
                )}

                {section.id === 'distant-planet' && (
                  <div className="relative z-10 text-center text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2, type: "spring" }}
                      className="w-80 h-80 rounded-full bg-gradient-to-br from-[#003333] to-[#006666] relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#003333]/50 to-transparent" />
                      <div className="absolute top-8 left-8 w-16 h-16 bg-[#660033] rounded-full" />
                      <div className="absolute top-20 right-12 w-12 h-12 bg-[#003333] rounded-full" />
                    </motion.div>
                    <h2 className="text-4xl font-bold mt-8">Distant Planet</h2>
                    <p className="text-xl opacity-90 mt-4">A mysterious world awaits</p>
                  </div>
                )}

                {section.id === 'black-hole' && (
                  <div className="relative z-10 text-center text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2, type: "spring" }}
                      className="w-96 h-96 rounded-full bg-gradient-to-br from-[#0b000f] via-[#330033] to-[#0b000f] relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#660033]/20 to-transparent animate-pulse" />
                      <div className="absolute inset-8 rounded-full border-2 border-[#660033]/50 animate-spin" style={{ animationDuration: '10s' }} />
                    </motion.div>
                    <h2 className="text-4xl font-bold mt-8">Event Horizon</h2>
                    <p className="text-xl opacity-90 mt-4">Where reality bends</p>
                  </div>
                )}

                {section.id === 'galaxy-core' && (
                  <div className="relative z-10 text-center text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2, type: "spring" }}
                      className="w-96 h-96 rounded-full bg-gradient-to-br from-[#660033] via-[#880044] to-[#660033] relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#660033]/50 to-transparent animate-pulse" />
                      <div className="absolute inset-4 rounded-full border-4 border-[#660033]/50 animate-spin" style={{ animationDuration: '8s' }} />
                    </motion.div>
                    <h2 className="text-4xl font-bold mt-8">Galactic Core</h2>
                    <p className="text-xl opacity-90 mt-4">The heart of creation</p>
                  </div>
                )}

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#660033] text-sm"
                >
                  {index < spaceSections.length - 1 ? 'Scroll to continue journey' : 'End of journey'}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default SpaceWindowSection 