"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Users, Zap, Rocket } from "lucide-react"




export default function MohoAnimationSection() {
  return (
    <section id="moho-animation" className="min-h-screen relative overflow-hidden bg-primary">
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
              <div className=" rounded-lg p-4 mb-6">
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