import { Clock, Globe, Users } from 'lucide-react';
import Image from 'next/image';

export default function CoursesList() {
  return (
    <div className="mx-auto max-w-6xl bg-red-500 p-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-gray-900 to-black p-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6 text-white">
            <div>
              <h1 className="mb-4 text-5xl font-bold text-orange-400 lg:text-6xl">3D Animation</h1>
              <p className="text-lg leading-relaxed text-gray-300">
                Learn the fundamentals of 2D animation using industry-standard software. Perfect for those looking to
                create captivating animated stories.
              </p>
            </div>

            {/* Course Details */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Duration:</span>
                <span>6 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">level:</span>
                <span>beginner</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="font-medium">language:</span>
                <span>Arabic</span>
              </div>
            </div>

            {/* Course Include */}
            <div>
              <h3 className="mb-3 font-bold tracking-wider text-white">COURSE INCLUDE</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white"></div>
                  Storyboarding,
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white"></div>
                  Animation Principles
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white"></div>
                  Software Training
                </li>
              </ul>
            </div>

            {/* Software Icons */}
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                Ae
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-600 text-sm font-bold text-white">
                Id
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-sm font-bold text-white">
                Ps
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">
                Ai
              </div>
            </div>

            {/* Button */}
            <button
              className="rounded-full bg-purple-600 px-8 py-3 font-medium text-white hover:bg-purple-700"
            >
              Show more details
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-gray-800">
              <Image
                src="/astronaut.png"
                alt="Astronaut in space suit"
                width={500}
                height={600}
                className="h-auto w-full object-cover"
              />

              {/* Decorative M badges */}
              <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                M
              </div>
              <div className="absolute top-1/3 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                M
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
