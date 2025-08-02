"use client"

import type { About } from "@/types/home"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface AboutUsProps {
  content: About
}

const AboutUs: React.FC<AboutUsProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const titleWords = content.title.split(" ")
  const firstPart = titleWords.slice(0, -1).join(" ")
  const lastWord = titleWords[titleWords.length - 1]

  return (
    <section id="about-us" ref={sectionRef} className="relative w-full bg-primary">
      <div className="container mx-auto px-6">
        <div ref={containerRef} className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left Column - Sticky Container */}
          <div className="relative order-2 flex-shrink-0 lg:order-1 lg:w-1/2">
            <div
              ref={leftContentRef}
              className={`px-4 py-8 text-white sm:px-6 md:px-8 lg:px-0 lg:py-12 ${
                !isMobile ? "lg:sticky lg:top-24" : ""
              }`}
              style={{
                height: isMobile ? "auto" : "fit-content",
              }}
            >
              <div className="max-w-lg">
                <p className="mb-4 text-sm leading-relaxed tracking-wider italic sm:mb-6 sm:text-base lg:text-lg">
                  &quot;{content.description}&quot;
                </p>
                <h5 className="leading-tight uppercase sm:leading-snug">
                  {firstPart && (
                    <span className="block text-3xl font-extrabold text-white sm:text-4xl md:text-6xl lg:text-8xl">
                      {firstPart}
                    </span>
                  )}
                  <span className="block bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl md:text-6xl lg:text-8xl">
                    {lastWord}
                  </span>
                </h5>
                <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-md transition hover:bg-gray-200 sm:mt-6 sm:px-6 sm:py-3 sm:text-base">
                  Explore More Courses
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Scrollable Content */}
          <div
            ref={rightContentRef}
            className="order-1 flex flex-1 flex-col space-y-6 py-8 sm:space-y-8 lg:order-2 lg:space-y-10 lg:py-12"
          >
            {(content.items || []).map((item, index) => (
              <div
                key={index}
                className="ml-auto flex h-auto min-h-[280px] w-full max-w-lg flex-col justify-between rounded-xl border border-gray-700 bg-white/10 p-4 py-6 text-white backdrop-blur-3xl transition-all duration-300 hover:bg-white/15 sm:min-h-[320px] sm:p-6 sm:py-8 lg:h-[380px] lg:w-[570px] lg:py-12"
              >
                <h3 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">0{index + 1}</h3>
                <h4 className="bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-xl leading-tight font-extrabold text-transparent sm:text-2xl lg:text-[2.5rem]">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
