"use client"

import { SyllabusItem } from "@/types/course"


interface CourseRequirementsProps {
  content: {
    title:string,
    items:SyllabusItem[]
  }
} 
const CourseRequirements = ({content}:CourseRequirementsProps) => {
  
  const syllabusData =content
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">{syllabusData.title}</h1>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-[#21002d]/50 rounded-full px-8 py-4 shadow-lg border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-slate-600">{syllabusData.items.length} Modules</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-slate-600">12 Weeks</span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-slate-600">Beginner Friendly</span>
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {syllabusData.items.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
              style={{
                background: `linear-gradient(135deg, ${item.color} 0%, white 100%)`,
              }}
            >
              {/* Course Number Badge */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>

              {/* Icon Container */}
              <div className="mb-6 h-24 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src={item.icon || "/placeholder.svg"} alt={item.title} className="h-10 w-10 object-contain" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-slate-800 leading-tight group-hover:text-slate-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {item.description}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Module {index + 1}</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < 3 ? "bg-blue-400" : "bg-slate-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        
      </div>
    </div>
  )
}

export default CourseRequirements
