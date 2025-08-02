"use client"

interface SyllabusItem {
  id: number
  color: string
  icon: string
  title: string
  description: string
}

const CourseRequirements = () => {
  const syllabusData = {
    title: "Web Development Fundamentals",
    items: [
      {
        id: 1,
        color: "#E3F2FD",
        icon: "/placeholder.svg?height=64&width=64",
        title: "HTML & Semantic Markup",
        description:
          "Learn the foundation of web development with HTML5, semantic elements, accessibility best practices, and modern markup techniques.",
      },
      {
        id: 2,
        color: "#F3E5F5",
        icon: "/placeholder.svg?height=64&width=64",
        title: "CSS & Responsive Design",
        description:
          "Master styling with CSS3, Flexbox, Grid, responsive design principles, and modern layout techniques for all devices.",
      },
      {
        id: 3,
        color: "#E8F5E8",
        icon: "/placeholder.svg?height=64&width=64",
        title: "JavaScript Fundamentals",
        description:
          "Understand core JavaScript concepts, DOM manipulation, event handling, ES6+ features, and asynchronous programming.",
      },
      {
        id: 4,
        color: "#FFF3E0",
        icon: "/placeholder.svg?height=64&width=64",
        title: "React Development",
        description:
          "Build dynamic user interfaces with React, hooks, state management, component lifecycle, and modern React patterns.",
      },
      {
        id: 5,
        color: "#FFEBEE",
        icon: "/placeholder.svg?height=64&width=64",
        title: "Backend with Node.js",
        description:
          "Create server-side applications using Node.js, Express.js, RESTful APIs, and database integration techniques.",
      },
      {
        id: 6,
        color: "#E0F2F1",
        icon: "/placeholder.svg?height=64&width=64",
        title: "Database Management",
        description:
          "Work with databases, SQL queries, data modeling, and learn both relational and NoSQL database systems.",
      },
    ],
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">{syllabusData.title}</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-600">syllabus.</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

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
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-slate-600">6 Modules</span>
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
      </div>
    </div>
  )
}

export default CourseRequirements
