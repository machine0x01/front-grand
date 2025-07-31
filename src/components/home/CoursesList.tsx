import Image from "next/image"
import { Clock, Users, Globe } from "lucide-react"

export default function CoursesList() {
  return (
    <div className="max-w-6xl bg-red-500 mx-auto p-6">
      <div className="relative bg-gradient-to-br from-purple-900 via-gray-900 to-black rounded-3xl p-8 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-white">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-orange-400 mb-4">3D Animation</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Learn the fundamentals of 2D animation using industry-standard software. Perfect for those looking to
                create captivating animated stories.
              </p>
            </div>

            {/* Course Details */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Duration:</span>
                <span>6 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-medium">level:</span>
                <span>beginner</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="font-medium">language:</span>
                <span>Arabic</span>
              </div>
            </div>

            {/* Course Include */}
            <div>
              <h3 className="font-bold text-white mb-3 tracking-wider">COURSE INCLUDE</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  Storyboarding,
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  Animation Principles
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  Software Training
                </li>
              </ul>
            </div>

            {/* Software Icons */}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                Ae
              </div>
              <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                Id
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                Ps
              </div>
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                Ai
              </div>
            </div>

            {/* Button */}
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium"
            >
              Show more details
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative bg-gray-800 rounded-2xl overflow-hidden">
              <Image
                src="/astronaut.png"
                alt="Astronaut in space suit"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />

              {/* Decorative M badges */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <div className="absolute top-1/3 left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
