"use client"
import type { Course } from "@/types/home"
import { Clock, Globe, Users } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import QuoteHeader from "../Title"
import Link from "next/link"

interface CoursesListProps {
  content: {
    title: string
    description: string
    courses: Course[]
  }
}

export default function CoursesList({ content }: CoursesListProps) {
  // Group courses by category
  console.log(content);
  
  const categoriesWithCourses = content.courses.reduce((acc, course) => {
    const existingCategory = acc.find(c => c.name === course.category.name);
    if (existingCategory) {
      existingCategory.courses.push(course);
    } else {
      acc.push({
        ...course.category,
        courses: [course]
      });
    }
    return acc;
  }, [] as Array<typeof content.courses[0]['category'] & { courses: typeof content.courses }>);

  // Use IDs instead of indices
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(categoriesWithCourses[0]?.slug || '');
  const [selectedCourseId, setSelectedCourseId] = useState(content.courses[0]?.id || '');

  // Helper functions to find items by ID
  const selectedCategory = categoriesWithCourses.find(cat => cat.slug === selectedCategorySlug);
  const selectedCourse = content.courses.find(course => course.id === selectedCourseId);

  console.log(selectedCourse);

  return (
    <section className="max-w-[1920px] flex flex-col gap-11 mx-auto   items-center justify-center relative">
     <div className="w-1/3">
     <QuoteHeader title={content.title} description={content.description} />
     </div>
      <div className="mb-12 flex gap-5">
        {/* Category Tabs */}
        {categoriesWithCourses.map((category) => (
          <div
            key={category.slug}
            onClick={() => {
              setSelectedCategorySlug(category.slug);
              // Set the first course of the selected category as the default selected course
              if (category.courses.length > 0) {
                setSelectedCourseId(category.courses[0].id);
              }
            }}
            className={`cursor-pointer z-20 space-y-6 ${selectedCategorySlug === category.slug ? '' : ''
              }`}
          >
            {/* Category Header */}
            <div className="relative rounded-3xl overflow-hidden w-md h-72">
              <Image
                src={category.background}
                alt="Line"
                fill
                className="object-cover absolute"
              />
              <div className="relative z-10 flex flex-col items-center justify-center text-white h-full">
                {category.icon && (
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-center">{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Category's Courses */}
      <div className="space-x-4 flex">
        {selectedCategory?.courses.map((course) => (
          <div
            onClick={() => setSelectedCourseId(course.id)}
            key={course.id}
            className={`px-3 py-2 cursor-pointer z-20 rounded-lg backdrop-blur-sm ${
              selectedCourseId === course.id ? 'bg-white/20' : 'bg-white/10'
            }`}
          >
            <div className="text-white text-sm font-medium">{course.name}</div>
          </div>
        ))}
      </div>

      <div className="w-full h-9"> </div>
      <div className="mx-auto w-[90vw] max-w-7xl">
        {/* Categories Grid */}

        <Image src="/assets/images/courses-text.png" alt="Line" fill className="object-cover" />

        {/* Course Details Section */}
        {selectedCourse && (
          <div className="w-full rounded-2xl bg-white/10 backdrop-blur-lg border shadow-lg p-6">
            <div className="relative overflow-hidden rounded-3xl p-8">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                {/* Left Content */}
                <div className="space-y-6 text-white">
                  <div>
                    <h1 className="mb-4 text-5xl font-bold text-orange-400 lg:text-6xl">{selectedCourse.name}</h1>
                    <p className="text-lg leading-relaxed text-gray-300">
                      {selectedCourse.overview}
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
                      {selectedCourse.includes?.map((include, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-1 w-1 rounded-full bg-white"></div>
                          {include.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Software Icons */}
                  <div className="flex gap-3">
                    {selectedCourse.include_softwares?.map((software, index) => (
                      <Image
                        key={index}
                        src={software.image}
                        alt={software.alt_text}
                        width={48}
                        height={48}
                      />
                    ))}
                  </div>

                  {/* Button */}
<Link href={`/course/${selectedCourse.slug}`}>
<button className="rounded-full bg-purple-600 px-8 py-3 font-medium text-white hover:bg-purple-700 transition-colors duration-300">
                    Show more details
                  </button>

</Link>                </div>

                {/* Right Image */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-800 aspect-square">
                    <Image
                      src={selectedCourse.thumbnaill}
                      alt={selectedCourse.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}