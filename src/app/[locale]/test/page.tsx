"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Star, Rocket, Globe, Zap, Search, Check, Users, Sparkles, Target, Award, Lightbulb, Shield, Heart, Eye, Palette, Video, ArrowUp, Box } from "lucide-react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sphere, Stars, Float, Text, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Suspense, useRef, useState, useEffect } from "react"
import Navbar from "@/components/Navbar"

// Floating 3D Elements Component
function FloatingElements({ color, count = 5 }: { color: string; count?: number }) {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[0.1, 16, 16]} position={[Math.sin(i * 2) * 2, i * 0.5, Math.cos(i * 2) * 2]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// Navigation Indicator Component
function NavigationIndicator({ activeSection, onSectionClick }: { 
  activeSection: string; 
  onSectionClick: (section: string) => void 
}) {
  const sections = [
    { id: 'graphic-design', label: 'Graphic Design', icon: Palette, color: 'bg-primary' },
    { id: 'motion-graphics', label: 'Motion Graphics', icon: Video, color: 'bg-primary' },
    { id: 'moho-animation', label: 'Moho Animation', icon: Users, color: 'bg-primary' },
    { id: 'blender-3d', label: 'Blender 3D', icon: Globe, color: 'bg-primary' }
  ]

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
      {sections.map((section) => {
        const Icon = section.icon
        const isActive = activeSection === section.id
        
        return (
          <motion.button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
                        className={`group relative p-3 rounded-full transition-all duration-300 ${
              isActive 
                ? section.color + ' shadow-lg shadow-primary/25' 
                : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className={`w-6 h-6 transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
            }`} />
            
            {/* Tooltip */}
            <div className={`absolute left-full ml-3 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
              isActive ? 'opacity-100' : ''
            }`}>
              {section.label}
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/80"></div>
            </div>
          </motion.button>
        )
      })}
      
      {/* Scroll to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-8 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300" />
      </motion.button>
    </div>
  )
}

// Graphic Design Section
function GraphicDesignSection() {
  return (
    <section id="graphic-design" className="min-h-screen relative overflow-hidden bg-primary">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingElements color="#0b000f" count={8} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block p-4 rounded-full bg-emerald-500 mb-6"
          >
            <Palette className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Graphic Design
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Master the art of visual communication with our comprehensive graphic design course. 
            Learn to create stunning visuals that tell compelling stories.
          </p>

          {/* Course Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-300 mb-2">12</div>
              <div className="text-emerald-200">Weeks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-300 mb-2">2,847</div>
              <div className="text-emerald-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-300 mb-2">4.9</div>
              <div className="text-emerald-200">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-300 mb-2">98%</div>
              <div className="text-emerald-200">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Course Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left Column - Course Description */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-4">What You'll Learn</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-emerald-100 group-hover:text-white transition-colors duration-300">Master Adobe Creative Suite tools (Photoshop, Illustrator, InDesign)</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-emerald-100 group-hover:text-white transition-colors duration-300">Learn color theory and typography principles</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-emerald-100 group-hover:text-white transition-colors duration-300">Create brand identities and marketing materials</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-emerald-100 group-hover:text-white transition-colors duration-300">Understand print and digital design workflows</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-semibold text-white">Course Duration</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300">Total Hours:</span>
                  <span className="text-2xl font-bold text-emerald-300">24 Hours</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-emerald-300">Exercises:</span>
                  <span className="text-2xl font-bold text-emerald-300">48 Projects</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-emerald-300">Certification:</span>
                  <span className="text-emerald-300 font-semibold">Included</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-semibold text-white">Prerequisites</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-emerald-100">Basic computer skills • Creative mindset • No prior design experience required</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Photoshop Interface Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 group">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Photoshop Interface</h4>
              
              {/* Photoshop Interface Layout */}
              <div className="bg-gray-900 rounded-lg p-4 h-80">
                {/* Top Menu Bar */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
                  <span className="text-emerald-300 text-xs font-semibold">File Edit Image Layer</span>
                  <span className="text-emerald-300 text-xs">100%</span>
                </div>
                
                {/* Main Interface */}
                <div className="flex h-64 space-x-3">
                  {/* Left Side - Tools Panel */}
                  <div className="w-16 bg-gray-800 rounded p-2 space-y-2">
                    <div className="bg-emerald-500 rounded p-2 text-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                    <div className="bg-gray-700 rounded p-2 text-center">
                      <span className="text-gray-300 text-xs">M</span>
                    </div>
                    <div className="bg-gray-700 rounded p-2 text-center">
                      <span className="text-gray-300 text-xs">L</span>
                    </div>
                    <div className="bg-gray-700 rounded p-2 text-center">
                      <span className="text-gray-300 text-xs">B</span>
                    </div>
                    <div className="bg-gray-700 rounded p-2 text-center">
                      <span className="text-gray-300 text-xs">E</span>
                    </div>
                     
                  </div>
                  
                  {/* Center - Canvas Area */}
                  <div className="flex-1 bg-gray-800 rounded p-3 relative">
                    <div className="bg-emerald-600 rounded-lg h-full flex items-center justify-center relative overflow-hidden">
                      <span className="text-white text-sm font-semibold z-20">Image Canvas</span>
                      {/* Sample Image Elements */}
                      <div className="absolute inset-0 flex">
                        <div className="w-1/3 h-full bg-emerald-500 opacity-70"></div>
                        <div className="w-1/3 h-full bg-emerald-400 opacity-70"></div>
                        <div className="w-1/3 h-full bg-emerald-500 opacity-70"></div>
                      </div>
                      {/* Selection Outline */}
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed border-white opacity-60"></div>
                    </div>
                  </div>
                  
                  {/* Right Side - Layers Panel */}
                  <div className="w-32 bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-emerald-300 text-xs font-semibold">Layers</span>
                      <span className="text-emerald-300 text-xs">3</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                        <span className="text-emerald-200 text-xs">Background</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                        <span className="text-emerald-200 text-xs">Text Layer</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                        <span className="text-emerald-200 text-xs">Image Layer</span>
                      </div>
                    </div>
                    
                    {/* Properties */}
                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-200 text-xs">Opacity:</span>
                          <span className="text-emerald-200 text-xs">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-200 text-xs">Blend:</span>
                          <span className="text-emerald-200 text-xs">Normal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: Users, title: "Live Sessions", desc: "Weekly Q&A with industry experts" },
            { icon: Award, title: "Portfolio Building", desc: "Create 10+ professional projects" },
            { icon: Globe, title: "Global Community", desc: "Connect with designers worldwide" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 group text-center"
            >
              <div className="inline-block p-4 rounded-full bg-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-emerald-100 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <button className="group bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
            Start Learning
            <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// Motion Graphics Section
function MotionGraphicsSection() {
  return (
    <section id="motion-graphics" className="min-h-screen relative overflow-hidden bg-primary">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingElements color="#0b000f" count={6} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block p-4 rounded-full bg-amber-500 mb-6"
          >
            <Video className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Motion Graphics
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Bring your designs to life with dynamic motion graphics. 
            Learn animation principles and create engaging visual content.
          </p>

          {/* Course Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-300 mb-2">16</div>
              <div className="text-amber-200">Weeks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-300 mb-2">1,923</div>
              <div className="text-amber-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-300 mb-2">4.8</div>
              <div className="text-amber-200">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-300 mb-2">95%</div>
              <div className="text-amber-200">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Course Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left Column - Course Description */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-4">What You'll Learn</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-amber-100 group-hover:text-white transition-colors duration-300">Master After Effects and Premiere Pro workflows</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-amber-100 group-hover:text-white transition-colors duration-300">Learn keyframe animation and easing techniques</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-amber-100 group-hover:text-white transition-colors duration-300">Create smooth motion graphics and transitions</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-amber-100 group-hover:text-white transition-colors duration-300">Understand video editing and timeline management</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-semibold text-white">Course Duration</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-amber-300">Total Hours:</span>
                  <span className="text-2xl font-bold text-amber-300">32 Hours</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-amber-300">Exercises:</span>
                  <span className="text-2xl font-bold text-amber-300">64 Projects</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-amber-300">Certification:</span>
                  <span className="text-amber-300 font-semibold">Included</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-semibold text-white">Prerequisites</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-amber-100">Basic computer skills • Understanding of design principles • Creative mindset</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Video Player with Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-amber-400/50 transition-all duration-300 group">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Video Player & Timeline</h4>
              
              {/* Video Player */}
              <div className="bg-black rounded-lg p-4 mb-6">
                <div className="relative bg-amber-600 rounded-lg h-32 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/50 rounded-full h-1">
                      <div className="bg-amber-400 h-1 rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Interface */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 group-hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-300 text-sm">Timeline Sequence</span>
                    <span className="text-amber-300 text-sm">00:00 - 00:30</span>
                  </div>
                  
                  {/* Timeline Tracks with Moving Playhead */}
                  <div className="space-y-2 relative">
                    {/* Moving Playhead */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-300 text-xs w-16">Video</span>
                      <div className="flex-1 h-8 bg-amber-500 rounded flex items-center justify-center relative overflow-hidden">
                        <span className="text-white text-xs font-semibold z-20">Main Footage</span>
                        {/* Video Thumbnails */}
                        <div className="absolute inset-0 flex">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex-1 h-full bg-amber-400 opacity-60"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-300 text-xs w-16">Audio</span>
                      <div className="flex-1 h-6 bg-amber-600 rounded flex items-center justify-center relative overflow-hidden">
                        <span className="text-white text-xs font-semibold z-20">Background Music</span>
                        {/* Audio Waveform */}
                        <div className="absolute inset-0 flex items-end justify-around px-2">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="w-1 bg-white opacity-40" style={{ height: `${Math.random() * 100}%` }}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-300 text-xs w-16">Text</span>
                      <div className="flex-1 h-6 bg-amber-400 rounded flex items-center justify-center relative overflow-hidden">
                        <span className="text-white text-xs font-semibold z-20">Title Animation</span>
                        {/* Text Animation Preview */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-amber-200 text-sm">Master professional video editing workflows</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: Play, title: "Video Projects", desc: "Complete 15+ video projects" },
            { icon: Zap, title: "Animation Library", desc: "Access to 500+ animations" },
            { icon: Rocket, title: "Industry Tools", desc: "Learn professional software" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-amber-400/50 transition-all duration-300 group text-center"
            >
              <div className="inline-block p-4 rounded-full bg-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-amber-100 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <button className="group bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25">
            Start Learning
            <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// Moho Characters Animation Section
function MohoAnimationSection() {
  return (
    <section id="moho-animation" className="min-h-screen relative overflow-hidden bg-primary">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingElements color="#0b000f" count={7} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block p-4 rounded-full bg-violet-500 mb-6"
          >
            <Users className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Moho Characters Animation
          </h1>
          <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Master character animation with Moho Pro. Learn to create engaging 2D characters 
            and bring them to life with professional animation techniques.
          </p>

          {/* Course Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-300 mb-2">14</div>
              <div className="text-violet-200">Weeks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-300 mb-2">1,456</div>
              <div className="text-violet-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-300 mb-2">4.7</div>
              <div className="text-violet-200">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-300 mb-2">92%</div>
              <div className="text-violet-200">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Course Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left Column - Course Description */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-4">What You'll Learn</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-violet-100 group-hover:text-white transition-colors duration-300">Master Moho Pro 14 interface and tools</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-violet-100 group-hover:text-white transition-colors duration-300">Create and rig 2D characters with bones</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-violet-100 group-hover:text-white transition-colors duration-300">Learn advanced animation techniques</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-violet-100 group-hover:text-white transition-colors duration-300">Export animations for various platforms</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-semibold text-white">Course Duration</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-violet-300">Total Hours:</span>
                  <span className="text-2xl font-bold text-violet-300">28 Hours</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-violet-300">Exercises:</span>
                  <span className="text-2xl font-bold text-violet-300">56 Projects</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-violet-300">Certification:</span>
                  <span className="text-violet-300 font-semibold">Included</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-semibold text-white">Prerequisites</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-violet-100">Basic computer skills • Understanding of animation principles • Creative mindset</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Moho Animation Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-violet-400/50 transition-all duration-300 group">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Follow-Through Animation</h4>
              
              {/* Moho Animation GIF */}
              <div className="bg-black rounded-lg p-4 mb-6">
                <img 
                  src="https://moho.lostmarble.com/cdn/shop/files/follow_through2.gif?v=1691765371" 
                  alt="Moho Pro follow-through animation demo" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="text-center mt-4">
                <p className="text-violet-200 text-sm">Real Moho Pro animation demonstrating follow-through principles</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: Users, title: "Character Library", desc: "Access to 100+ character templates" },
            { icon: Zap, title: "Animation Presets", desc: "500+ ready-to-use animations" },
            { icon: Rocket, title: "Export Options", desc: "Multiple format support" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-violet-400/50 transition-all duration-300 group text-center"
            >
              <div className="inline-block p-4 rounded-full bg-violet-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-violet-100 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <button className="group bg-violet-500 hover:bg-violet-600 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25">
            Start Learning
            <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// Blender 3D Section
function Blender3DSection() {
  return (
    <section id="blender-3d" className="min-h-screen relative overflow-hidden bg-primary">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingElements color="#0b000f" count={9} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block p-4 rounded-full bg-teal-500 mb-6"
          >
            <Globe className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Blender 3D
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Master 3D modeling, animation, and rendering with Blender. Create stunning 3D worlds, 
            characters, and visual effects from concept to final render.
          </p>

          {/* Course Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-300 mb-2">18</div>
              <div className="text-teal-200">Weeks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-300 mb-2">2,134</div>
              <div className="text-teal-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-300 mb-2">4.9</div>
              <div className="text-teal-200">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-300 mb-2">96%</div>
              <div className="text-teal-200">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Course Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left Column - Course Description */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-4">What You'll Learn</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-teal-100 group-hover:text-white transition-colors duration-300">Master Blender 4.0 interface and modeling tools</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-teal-100 group-hover:text-white transition-colors duration-300">Create complex 3D models and environments</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-teal-100 group-hover:text-white transition-colors duration-300">Learn advanced texturing and material creation</p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-teal-100 group-hover:text-white transition-colors duration-300">Master lighting, rendering, and post-processing</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-semibold text-white">Course Duration</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-teal-300">Total Hours:</span>
                  <span className="text-2xl font-bold text-teal-300">36 Hours</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-teal-300">Exercises:</span>
                  <span className="text-2xl font-bold text-teal-300">72 Projects</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-teal-300">Certification:</span>
                  <span className="text-teal-300 font-semibold">Included</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h4 className="text-2xl font-semibold text-white">Prerequisites</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-teal-100">Basic computer skills • Creative mindset • No prior 3D experience required</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive 3D Model */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-teal-400/50 transition-all duration-300 group">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Interactive 3D Model</h4>
              
              {/* 3D Model Canvas */}
              <div className="bg-black rounded-lg p-4 mb-6 h-80">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <directionalLight position={[-5, 5, 5]} intensity={0.8} />
                  
                  {/* Custom 3D Model */}
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group>
                      {/* Main Body */}
                      <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[2, 1, 1]} />
                        <meshStandardMaterial color="#14b8a6" />
                      </mesh>
                      
                      {/* Head */}
                      <mesh position={[0, 1.5, 0]}>
                        <sphereGeometry args={[0.8, 16, 16]} />
                        <meshStandardMaterial color="#0d9488" />
                      </mesh>
                      
                      {/* Eyes */}
                      <mesh position={[-0.3, 1.7, 0.6]}>
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshStandardMaterial color="#ffffff" />
                      </mesh>
                      <mesh position={[0.3, 1.7, 0.6]}>
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshStandardMaterial color="#ffffff" />
                      </mesh>
                      
                      {/* Arms */}
                      <mesh position={[-1.5, 0, 0]}>
                        <boxGeometry args={[1, 0.3, 0.3]} />
                        <meshStandardMaterial color="#14b8a6" />
                      </mesh>
                      <mesh position={[1.5, 0, 0]}>
                        <boxGeometry args={[1, 0.3, 0.3]} />
                        <meshStandardMaterial color="#14b8a6" />
                      </mesh>
                      
                      {/* Legs */}
                      <mesh position={[-0.5, -1.5, 0]}>
                        <boxGeometry args={[0.3, 1, 0.3]} />
                        <meshStandardMaterial color="#0d9488" />
                      </mesh>
                      <mesh position={[0.5, -1.5, 0]}>
                        <boxGeometry args={[0.3, 1, 0.3]} />
                        <meshStandardMaterial color="#0d9488" />
                      </mesh>
                    </group>
                  </Float>
                  
                  <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
                </Canvas>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-teal-200 text-sm">Drag to rotate • Scroll to zoom • Explore the 3D model</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: Box, title: "3D Modeling", desc: "Master polygon and subdivision modeling" },
            { icon: Zap, title: "Material Library", desc: "Access to 1000+ materials" },
            { icon: Rocket, title: "Render Engine", desc: "Learn Cycles and Eevee" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-teal-400/50 transition-all duration-300 group text-center"
            >
              <div className="inline-block p-4 rounded-full bg-teal-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-teal-100 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <button className="group bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25">
            Start Learning
            <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default function TestPage() {
  const [activeSection, setActiveSection] = useState('graphic-design')

  // Handle section navigation
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['graphic-design', 'motion-graphics', 'moho-animation', 'blender-3d']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navigation Indicator */}
      <NavigationIndicator 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick} 
      />

      {/* Graphic Design Section */}
      <GraphicDesignSection />

      {/* Motion Graphics Section */}
      <MotionGraphicsSection />

      {/* Moho Animation Section */}
      <MohoAnimationSection />

      {/* Blender 3D Section */}
      <Blender3DSection />
    </div>
  )
}

