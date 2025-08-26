"use client"

import { motion } from "framer-motion"
import { ArrowUp, Palette, Video, Users, Globe } from "lucide-react"

interface NavigationIndicatorProps {
  activeSection: string
  onSectionClick: (section: string) => void
}

export default function NavigationIndicator({ activeSection, onSectionClick }: NavigationIndicatorProps) {
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