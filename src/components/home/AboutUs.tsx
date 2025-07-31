"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"

// Interface for the API data structure
interface AboutUsData {
  title: string
  description: string
  items: {
    title: string
    description: string
  }[]
}

interface AboutUsProps {
  data?: AboutUsData
}

const AboutUs: React.FC<AboutUsProps> = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const defaultData: AboutUsData = {
    title: "What We Believe",
    description:
      "It's not just about 'getting paid'. Zepto solutions enable real-time collections and refunds, loan disbursements and repayments, superannuation contributions, funding of digital wallets, and endless other scenarios.",
    items: [
      {
        title: "Commitment to Excellence",
        description: "Zepto solutions enable real-time collections and refunds, loan disbursements, and more.",
      },
      {
        title: "Innovation First",
        description: "We leverage cutting-edge technology to deliver seamless payment experiences.",
      },
      {
        title: "Customer Focused",
        description: "Our solutions are designed with the end-user experience as our top priority.",
      },
      {
        title: "Reliable & Secure",
        description: "Built with enterprise-grade security and reliability standards.",
      },
      {
        title: "Global Reach",
        description: "Empowering businesses worldwide with scalable payment solutions.",
      },
    ],
  }

  const aboutData =  defaultData

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const titleWords = aboutData.title.split(" ")
  const firstPart = titleWords.slice(0, -1).join(" ")
  const lastWord = titleWords[titleWords.length - 1]

  return (
    <section id="about-us" ref={sectionRef} className="relative w-full bg-primary">
      <div className="container mx-auto px-6">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Sticky Container */}
          <div className="relative order-2 lg:order-1">
            <div
              ref={leftContentRef}
              className={`px-4 sm:px-6 md:px-8 lg:px-0 py-8 lg:py-12 text-white ${
                !isMobile ? "lg:sticky lg:top-24" : ""
              }`}
              style={{
                height: isMobile ? "auto" : "fit-content",
              }}
            >
              <div className="max-w-lg">
                <p className="italic tracking-wider text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
                  &quot;{aboutData.description}&quot;
                </p>
                <h5 className="uppercase leading-tight sm:leading-snug">
                  {firstPart && (
                    <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-white">
                      {firstPart}
                    </span>
                  )}
                  <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-transparent">
                    {lastWord}
                  </span>
                </h5>
                <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition text-sm sm:text-base">
                  Explore More Courses
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Scrollable Content */}
          <div
            ref={rightContentRef}
            className="py-8 lg:py-12 flex flex-col space-y-6 sm:space-y-8 lg:space-y-10 order-1 lg:order-2"
          >
            {(aboutData.items || []).map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-3xl flex flex-col justify-between py-6 sm:py-8 lg:py-12 w-full max-w-lg lg:w-[570px] h-auto min-h-[280px] sm:min-h-[320px] lg:h-[380px] rounded-xl p-4 sm:p-6 border border-gray-700 text-white hover:bg-white/15 transition-all duration-300 ml-auto"
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">0{index + 1}</h3>
                <h4 className="text-xl sm:text-2xl lg:text-[2.5rem] font-extrabold bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-transparent leading-tight">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
