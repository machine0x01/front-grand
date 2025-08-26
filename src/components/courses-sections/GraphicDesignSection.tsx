"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Users, Award, Globe, Palette } from "lucide-react"




export default function GraphicDesignSection() {
  return (
    <section id="graphic-design" className="min-h-screen relative overflow-hidden bg-primary">
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