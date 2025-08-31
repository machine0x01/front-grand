"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Users, Sparkles, Award, Globe, Zap, Target, BookOpen, Star, CheckCircle, Rocket, Heart } from "lucide-react"
import { useState } from "react"

// Simple Button Component
function Button({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}: {
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "default" | "lg"
  className?: string
  [key: string]: any
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-purple-400/30 bg-purple-900/50 text-white hover:bg-purple-800/50"
  }
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8 py-4 text-lg"
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default function AboutUs() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-slate-900/20 to-purple-900/10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10 px-4">
        
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900/20 border border-purple-400/20 rounded-full text-purple-300 text-sm font-medium mb-8"
          >
            <Award className="w-4 h-4" />
            <span>Leading Digital Education Platform</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8 max-w-5xl mx-auto"
          >
            Empowering <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Creators</span> Worldwide
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-purple-200 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            We're on a mission to democratize creative education, making world-class skills accessible to everyone. 
            Through cutting-edge technology and expert mentorship, we're building the future of learning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="flex items-center gap-2">
                Start Learning Today
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          
          {/* Left Side - Company Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Our Story */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Story</h2>
              </div>
              <p className="text-lg text-purple-200 leading-relaxed">
                Founded by industry veterans and creative professionals, Grand Notion emerged from a simple belief: 
                everyone deserves access to the skills that shape our digital world. We've grown from a small 
                community to a global platform serving creators in over 50 countries.
              </p>
            </div>

            {/* What We Do */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">What We Do</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-purple-900/10 rounded-xl border border-purple-400/10">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Comprehensive Learning Paths</h3>
                    <p className="text-purple-300 text-sm">From beginner to expert, structured courses designed by industry leaders</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-purple-900/10 rounded-xl border border-purple-400/10">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Community & Mentorship</h3>
                    <p className="text-purple-300 text-sm">Connect with peers and get guidance from experienced professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-purple-900/10 rounded-xl border border-purple-400/10">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Cutting-Edge Technology</h3>
                    <p className="text-purple-300 text-sm">Learn the latest tools and techniques used in today's creative industry</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - New Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Main Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-3xl border border-purple-400/20" />
              
              {/* Animated Grid Pattern */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`
                  }} />
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-16 left-16 w-32 h-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl border border-purple-400/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-white text-xs font-medium">Courses</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-32 right-20 w-28 h-16 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-2xl border border-pink-400/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-white text-xs font-medium">Community</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -25, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
                className="absolute bottom-24 left-24 w-24 h-24 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl border border-blue-400/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-white text-xs font-medium">Innovation</div>
                </div>
              </motion.div>

              {/* Central Hub */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.8, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Main Circle */}
                  <div className="w-40 h-40 bg-gradient-to-br from-purple-500/40 via-pink-500/40 to-blue-500/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-400/30 shadow-2xl">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full rounded-3xl" style={{ zIndex: -1 }}>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.5, duration: 2 }}
                  d="M 120 120 Q 300 100 400 200 Q 300 300 120 280"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2, duration: 2 }}
                  d="M 400 120 Q 300 200 120 200 Q 300 280 400 280"
                  stroke="rgba(236, 72, 153, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Background Particles */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full"
              />
              <motion.div
                animate={{ 
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-pink-400/40 rounded-full"
              />
              <motion.div
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400/40 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Numbers that tell the story of our commitment to creative education
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-purple-900/20 border border-purple-400/20 rounded-2xl backdrop-blur-sm hover:bg-purple-900/30 transition-colors duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-3">50K+</div>
              <div className="text-purple-300">Active Students</div>
            </div>
            
            <div className="text-center p-8 bg-purple-900/20 border border-purple-400/20 rounded-2xl backdrop-blur-sm hover:bg-purple-900/30 transition-colors duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-3">50+</div>
              <div className="text-purple-300">Countries</div>
            </div>
            
            <div className="text-center p-8 bg-purple-900/20 border border-purple-400/20 rounded-2xl backdrop-blur-sm hover:bg-purple-900/30 transition-colors duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-3">4.9/5</div>
              <div className="text-purple-300">Student Rating</div>
            </div>
            
            <div className="text-center p-8 bg-purple-900/20 border border-purple-400/20 rounded-2xl backdrop-blur-sm hover:bg-purple-900/30 transition-colors duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-3">95%</div>
              <div className="text-purple-300">Success Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-purple-900/20 border border-purple-400/20 rounded-2xl backdrop-blur-sm hover:bg-purple-900/30 transition-colors duration-300">
              <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Innovation First</h3>
              <p className="text-purple-300">We constantly push boundaries to deliver cutting-edge learning experiences that prepare students for the future.</p>
            </div>
            
            <div className="p-8 bg-purple-900/20 border border-purple-400/20 rounded-2xl backdrop-blur-sm hover:bg-purple-900/30 transition-colors duration-300">
              <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Community Driven</h3>
              <p className="text-purple-300">Building meaningful connections and fostering collaboration among creators worldwide through shared learning experiences.</p>
            </div>
            
            <div className="p-8 bg-purple-900/20 border border-purple-400/20 rounded-2xl backdrop-blur-sm hover:bg-purple-900/30 transition-colors duration-300">
              <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Excellence</h3>
              <p className="text-purple-300">Committed to delivering the highest quality education, support, and resources to ensure student success.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 