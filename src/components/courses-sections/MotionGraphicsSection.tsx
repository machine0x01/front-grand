"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Play, Zap, Rocket, Video } from "lucide-react"




export default function MotionGraphicsSection() {
  return (
    <section id="motion-graphics" className="min-h-screen relative overflow-hidden bg-primary">
            {/* Background 3D Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-black/20 to-transparent"></div>
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
            {[
              { number: "16", label: "Weeks" },
              { number: "1,923", label: "Students" },
              { number: "4.8", label: "Rating" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative">
                  <div className="text-4xl font-bold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-amber-200 group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-amber-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-150 group-hover:scale-100" />
                </div>
              </motion.div>
            ))}
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
                          {[45, 78, 32, 89, 56, 23, 67, 41].map((height, i) => (
                            <div key={i} className="w-1 bg-white opacity-40" style={{ height: `${height}%` }}></div>
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