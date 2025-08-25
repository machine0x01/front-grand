"use client"

import React from "react"
import { motion } from "framer-motion"

const AboutSection: React.FC = () => {
  return (
    <section className="relative w-full bg-primary min-h-screen overflow-hidden py-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 lg:items-start">
          {/* Left Column */}
          <div className="relative order-2 flex-shrink-0 lg:order-1 lg:w-1/2">
            <div className="lg:sticky lg:top-24 px-4 py-8 text-white sm:px-6 md:px-8 lg:px-0 lg:py-12">
              <div className="max-w-lg">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 text-sm leading-relaxed tracking-wider italic sm:mb-6 sm:text-base lg:text-lg"
                >
                  "Empowering creativity through innovative design education and cutting-edge technology."
                </motion.p>
                <motion.h5 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="leading-tight uppercase sm:leading-snug"
                >
                  <span className="block text-3xl font-extrabold text-white sm:text-4xl md:text-6xl lg:text-8xl">
                    DESIGN
                  </span>
                  <span className="block bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-6xl lg:text-8xl">
                    MASTERY
                  </span>
                </motion.h5>
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-md transition hover:bg-gray-200 sm:mt-6 sm:px-6 sm:py-3 sm:text-base"
                >
                  Explore More Courses
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="order-1 flex flex-1 flex-col space-y-6 py-8 sm:space-y-8 lg:order-2 lg:space-y-10 lg:py-12">
            {[
              {
                title: "Creative Excellence",
                description: "Master the fundamentals of design with our comprehensive curriculum."
              },
              {
                title: "Industry Ready",
                description: "Learn from professionals and build a portfolio that stands out."
              },
              {
                title: "Innovation First",
                description: "Stay ahead with cutting-edge tools and techniques."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="ml-auto flex h-auto min-h-[280px] w-full max-w-lg flex-col justify-between rounded-xl border border-gray-700 bg-white/10 p-4 py-6 text-white backdrop-blur-3xl transition-all duration-300 hover:bg-white/15 sm:min-h-[320px] sm:p-6 sm:py-8 lg:h-[380px] lg:w-[570px] lg:py-12"
              >
                <h3 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">0{index + 1}</h3>
                <h4 className="bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-xl leading-tight font-extrabold text-transparent sm:text-2xl lg:text-[2.5rem]">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 