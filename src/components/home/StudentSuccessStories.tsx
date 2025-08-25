"use client"

import { motion } from "framer-motion"
import { Target, Award, Star, Globe, TrendingUp, Users, Clock, Zap } from "lucide-react"

interface StatItem {
  number: string
  label: string
  icon: any
  description: string
  color: string
}

const stats: StatItem[] = [
  {
    number: "95%",
    label: "Completion Rate",
    icon: Target,
    description: "Students complete their chosen learning paths",
    color: "from-green-500 to-emerald-600"
  },
  {
    number: "87%",
    label: "Career Advancement",
    icon: TrendingUp,
    description: "Graduates report career growth within 6 months",
    color: "from-blue-500 to-cyan-600"
  },
  {
    number: "4.9/5",
    label: "Student Satisfaction",
    icon: Star,
    description: "Average rating from our global community",
    color: "from-yellow-500 to-orange-600"
  },
  {
    number: "50+",
    label: "Countries Reached",
    icon: Globe,
    description: "Learners from around the world",
    color: "from-purple-500 to-pink-600"
  },
  {
    number: "100K+",
    label: "Active Learners",
    icon: Users,
    description: "Students currently enrolled",
    color: "from-indigo-500 to-purple-600"
  },
  {
    number: "24/7",
    label: "Learning Support",
    icon: Clock,
    description: "Round-the-clock assistance available",
    color: "from-red-500 to-pink-600"
  }
]

export default function StudentSuccessStories() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Student Success Stories
            </span>
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Join thousands of learners who have transformed their careers and unlocked new opportunities through our platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-400/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Stats */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-purple-200 font-semibold text-lg">{stat.label}</div>
                </div>
                
                {/* Description */}
                <p className="text-purple-300 text-sm leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Real Stories from Our Learners</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Frontend Developer",
                company: "Google",
                story: "Started with zero coding experience. Now working at Google after completing the Web Development path.",
                avatar: "SC",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Data Scientist",
                company: "Netflix",
                story: "The AI-powered learning helped me understand complex concepts faster than traditional courses.",
                avatar: "MR",
                rating: 5
              },
              {
                name: "Elena Petrov",
                role: "DevOps Engineer",
                company: "Microsoft",
                story: "The community support and mentorship were game-changers for my career transition.",
                avatar: "EP",
                rating: 5
              }
            ].map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-400/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Story */}
                <p className="text-purple-200 mb-6 leading-relaxed italic">"{story.story}"</p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{story.avatar}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{story.name}</div>
                    <div className="text-purple-300 text-sm">{story.role} at {story.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 border border-purple-400/20 rounded-2xl p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
              Start your learning journey today and become part of our growing community of successful learners.
            </p>
            <button className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Start Your Journey Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 