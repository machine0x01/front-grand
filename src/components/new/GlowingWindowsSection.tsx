"use client"

import React from "react"
import { motion } from "framer-motion"
import { Zap, Shield, Rocket, Globe, Users, Target, Award, Lightbulb } from "lucide-react"

const GlowingWindowsSection: React.FC = () => {
  const windows = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Payments",
      description: "Accelerate cash flow with instant payment processing and real-time settlements.",
      gradient: "from-cyan-400 to-teal-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Transactions",
      description: "Bank-grade security with advanced encryption and fraud protection systems.",
      gradient: "from-emerald-400 to-green-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Streamlined Operations",
      description: "Automate payment workflows and reduce manual processing overhead.",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Connect with customers worldwide through multi-currency payment solutions.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Experience",
      description: "Deliver seamless payment experiences that delight your customers.",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Analytics & Insights",
      description: "Gain valuable insights into payment patterns and customer behavior.",
      gradient: "from-indigo-400 to-purple-500"
    }
  ]

  return (
    <section className="relative w-full bg-gray-900 min-h-screen py-20 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              PAYMENTS
            </span>
            <span className="text-white"> FUTURE</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Accelerate cash flow, streamline operations, and reimagine payment experiences with real-time payments.
          </p>
        </motion.div>

        {/* Glowing Windows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {windows.map((window, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glowing Border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${window.gradient} p-[2px] opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r ${window.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" />
              </div>
              
              {/* Window Content */}
              <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 h-full border border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${window.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {window.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                  {window.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {window.description}
                </p>
                
                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${window.gradient} rounded-b-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-cyan-600 hover:to-teal-600"
            >
              Account-to-Account Solutions
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full text-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
            >
              Discover the Platform
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GlowingWindowsSection 