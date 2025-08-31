"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Target,
  Eye,
  BookOpen,
  Users,
  Award,
  Zap,
  Sparkles,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Globe,
  Heart,
  Shield,
  Lightbulb
} from "lucide-react";

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState<string>("mission");

  const companyData = {
    mission: {
      title: "Our Mission",
      subtitle: "Empowering Creative Minds",
      description: "We're on a mission to democratize creative education, making world-class design and animation skills accessible to everyone, everywhere.",
      icon: Target,
      color: "from-blue-500 to-purple-600",
      bgColor: "from-blue-500/10 to-purple-600/10",
      borderColor: "border-blue-500/30"
    },
    vision: {
      title: "Our Vision",
      subtitle: "Future of Creative Learning",
      description: "To become the global leader in creative education, building a world where anyone with passion can master the art of digital creation.",
      icon: Eye,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-500/10 to-pink-600/10",
      borderColor: "border-purple-500/30"
    },
    story: {
      title: "Our Story",
      subtitle: "From Passion to Purpose",
      description: "Born from a love of creativity and technology, we've evolved from a small design studio to a comprehensive creative education platform.",
      icon: BookOpen,
      color: "from-pink-500 to-red-600",
      bgColor: "from-pink-500/10 to-red-600/10",
      borderColor: "border-pink-500/30"
    }
  };

  const stats = [
    { number: "50K+", label: "Students Worldwide", icon: Users },
    { number: "200+", label: "Course Modules", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: Award },
    { number: "24/7", label: "Support Available", icon: Shield }
  ];

  const values = [
    { title: "Innovation", description: "Pushing creative boundaries", icon: Lightbulb, color: "from-yellow-400 to-orange-500" },
    { title: "Excellence", description: "Quality in everything we do", icon: Star, color: "from-blue-400 to-cyan-500" },
    { title: "Community", description: "Building creative networks", icon: Heart, color: "from-pink-400 to-rose-500" },
    { title: "Accessibility", description: "Education for everyone", icon: Globe, color: "from-green-400 to-emerald-500" }
  ];

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      {/* Animated Background Elements - Matching Hero */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Space Stars - Matching Hero */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const isGlowing = Math.random() > 0.7;
          const size = Math.random() * 3 + 1;
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                isGlowing 
                  ? 'bg-blue-100 shadow-[0_0_15px_#60a5fa,0_0_30px_#3b82f6] animate-pulse' 
                  : 'bg-white opacity-80'
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200 font-medium">Creative Education Platform</span>
          </motion.div>

          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            We're Building the
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Future of Learning
            </span>
          </h1>

          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Empowering creators worldwide with cutting-edge design, animation, and creative skills.
            Join thousands of students who've transformed their passion into profession.
          </p>
        </motion.div>

        {/* Interactive Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${companyData[activeSection as keyof typeof companyData].color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {(() => {
                      const IconComponent = companyData[activeSection as keyof typeof companyData].icon;
                      return <IconComponent className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {companyData[activeSection as keyof typeof companyData].title}
                    </h3>
                    <p className="text-purple-300 font-medium">
                      {companyData[activeSection as keyof typeof companyData].subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-purple-200 leading-relaxed">
                  {companyData[activeSection as keyof typeof companyData].description}
                </p>

              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Interactive Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Visual Container - Galaxy Background */}
            <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 rounded-3xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
              {/* Galaxy Background with Stars */}
              <div className="absolute inset-0">
                {/* Deep space gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 via-blue-900/10 to-slate-900"></div>

                {/* Nebula clouds */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                  <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>
                </div>

                {/* Scattered stars */}
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
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

                {/* Shooting stars */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`shooting-${i}`}
                    className="absolute w-0.5 h-16 bg-gradient-to-r from-white via-blue-200 to-transparent rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                    }}
                    animate={{
                      x: [0, 100],
                      y: [0, 100],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 2,
                    }}
                  />
                ))}
              </div>

              {/* Central Sun */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  scale: { duration: 4, repeat: Infinity }
                }}
                className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-orange-500/50 flex items-center justify-center"
              >
                {/* Sun glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/50 to-orange-500/50 rounded-full blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Clean Wave-like Orbit Paths */}
              <svg className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 400 400">
                {/* Mercury's clean wave orbit */}
                <path
                  d="M 200 200 m -80 0 a 80 80 0 1 1 160 0 a 80 80 0 1 1 -160 0"
                  fill="none"
                  stroke="url(#purpleGradient)"
                  strokeWidth="1.5"
                  opacity="0.4"
                  className="animate-pulse"
                  style={{ animationDuration: '4s' }}
                />

                {/* Venus's clean wave orbit */}
                <path
                  d="M 200 200 m -120 0 a 120 120 0 1 1 240 0 a 120 120 0 1 1 -240 0"
                  fill="none"
                  stroke="url(#blueGradient)"
                  strokeWidth="1.5"
                  opacity="0.4"
                  className="animate-pulse"
                  style={{ animationDuration: '4s', animationDelay: '1s' }}
                />

                {/* Earth's clean wave orbit */}
                <path
                  d="M 200 200 m -160 0 a 160 160 0 1 1 320 0 a 160 160 0 1 1 -320 0"
                  fill="none"
                  stroke="url(#pinkGradient)"
                  strokeWidth="1.5"
                  opacity="0.4"
                  className="animate-pulse"
                  style={{ animationDuration: '4s', animationDelay: '2s' }}
                />

                {/* Saturn's clean wave orbit */}
                <path
                  d="M 200 200 m -200 0 a 200 200 0 1 1 400 0 a 200 200 0 1 1 -400 0"
                  fill="none"
                  stroke="url(#yellowGradient)"
                  strokeWidth="1.5"
                  opacity="0.4"
                  className="animate-pulse"
                  style={{ animationDuration: '4s', animationDelay: '3s' }}
                />

                {/* Subtle wave ripples - clean and orderly */}
                <path
                  d="M 200 200 m -80 0 a 80 80 0 1 1 160 0 a 80 80 0 1 1 -160 0"
                  fill="none"
                  stroke="url(#purpleGradient)"
                  strokeWidth="0.5"
                  opacity="0.8"
                  className="animate-pulse"
                  style={{ animationDuration: '6s' }}
                />

                <path
                  d="M 200 200 m -120 0 a 120 120 0 1 1 240 0 a 120 120 0 1 1 -240 0"
                  fill="none"
                  stroke="url(#blueGradient)"
                  strokeWidth="0.5"
                  opacity="0.8"
                  className="animate-pulse"
                  style={{ animationDuration: '6s', animationDelay: '1s' }}
                />

                <path
                  d="M 200 200 m -160 0 a 160 160 0 1 1 320 0 a 160 160 0 1 1 -320 0"
                  fill="none"
                  stroke="url(#pinkGradient)"
                  strokeWidth="0.5"
                  opacity="0.8"
                  className="animate-pulse"
                  style={{ animationDuration: '6s', animationDelay: '2s' }}
                />

                <path
                  d="M 200 200 m -200 0 a 200 200 0 1 1 400 0 a 200 200 0 1 1 -400 0"
                  fill="none"
                  stroke="url(#yellowGradient)"
                  strokeWidth="0.5"
                  opacity="0.8"
                  className="animate-pulse"
                  style={{ animationDuration: '6s', animationDelay: '3s' }}
                />

                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Orbiting Planets - Around Sun Center */}
              {[
                { name: "Mercury", size: "w-8 h-8", texture: "from-gray-300 via-gray-500 to-gray-700", orbit: 70, speed: 6, startAngle: 0 },
                { name: "Venus", size: "w-10 h-10", texture: "from-yellow-200 via-orange-300 to-red-500", orbit: 90, speed: 12, startAngle: 90 },
                { name: "Earth", size: "w-12 h-12", texture: "from-blue-500 via-green-400 to-blue-600", orbit: 180, speed: 14, startAngle: 180 },
                { name: "Saturn", size: "w-12 h-12", texture: "from-yellow-100 via-orange-200 to-yellow-300", orbit: 220, speed: 28, startAngle: 270 },
              ].map((planet) => (
                <motion.div
                  key={planet.name}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: `${planet.orbit * 2}px`,
                    height: `${planet.orbit * 2}px`,
                    marginLeft: `-${planet.orbit}px`,
                    marginTop: `-${planet.orbit}px`,
                    borderRadius: "50%",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className={`${planet.size} rounded-full bg-gradient-to-br ${planet.texture} shadow-lg absolute`}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${planet.startAngle}deg) translate(${planet.orbit}px, -50%)`,
                    }}
                  >
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/80">
                      {/* {planet.name} */}
                    </div>
                  </div>
                </motion.div>
              ))}



              {/* Floating Info Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-20 left-8 w-32 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-xs text-purple-200">Students</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-16 right-12 w-28 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-400/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-xl font-bold text-white">200+</div>
                  <div className="text-xs text-blue-200">Courses</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                className="absolute bottom-20 left-16 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl border border-pink-400/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-xl font-bold text-white">95%</div>
                  <div className="text-xs text-pink-200">Success</div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Navigation Buttons */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4">
              {Object.entries(companyData).map(([key, data]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeSection === key
                      ? `bg-gradient-to-r ${data.color} text-white shadow-lg shadow-purple-500/25`
                      : `bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50`
                    }`}
                >
                  {data.title}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-purple-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{value.title}</h3>
                <p className="text-purple-200 text-center text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-400/30 rounded-3xl p-12 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Creative Journey?
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who've already transformed their skills and careers with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Learning
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 text-white font-semibold rounded-xl border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                View Courses
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
