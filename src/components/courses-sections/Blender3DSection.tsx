"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Box, Zap, Rocket, Globe } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"

// Interactive 3D Model Component
function Interactive3DModel() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef}>
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
  )
}



export default function Blender3DSection() {
  return (
    <section id="blender-3d" className="min-h-screen relative overflow-hidden bg-primary">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
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
                    <Interactive3DModel />
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