"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const CourseFAQ = () => {
  // Changed initial state to null so all FAQs are closed by default
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const toggleFAQ = (faqId: number): void => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  const handleCTAClick = (): void => {
    console.log("CTA button clicked")
    // Add your CTA logic here
  }

  // Static FAQ data
  const faqs = [
    {
      id: 1,
      question: "What is included in this course?",
      answer:
        "This comprehensive course includes video lectures, hands-on projects, downloadable resources, lifetime access to course materials, and a certificate of completion. You'll also get access to our private community forum where you can connect with other students and instructors.",
    },
    {
      id: 2,
      question: "How long do I have access to the course?",
      answer:
        "You have lifetime access to all course materials. Once you enroll, you can learn at your own pace and revisit the content whenever you need a refresher. All future updates to the course content are included at no additional cost.",
    },
    {
      id: 3,
      question: "Do I need any prior experience?",
      answer:
        "No prior experience is required! This course is designed for beginners and will take you from zero to advanced level. We start with the fundamentals and gradually build up to more complex topics, ensuring you have a solid foundation before moving forward.",
    },
    {
      id: 4,
      question: "Is there a certificate upon completion?",
      answer:
        "Yes, you'll receive a certificate of completion that you can add to your LinkedIn profile or resume. The certificate is awarded after completing all course modules and passing the final assessment with a score of 80% or higher.",
    },
    {
      id: 5,
      question: "What if I'm not satisfied with the course?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not completely satisfied with the course content within the first 30 days of enrollment, simply contact our support team for a full refund, no questions asked.",
    },
  ]

  return (
    <div className="w-full mx-auto text-white min-h-screen p-8 ">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 animate-fade-in">Frequently Asked Questions</h1>
        <p className="text-gray-400 text-lg animate-fade-in">
          Got questions? We've got answers. Find everything you need to know about our course.
        </p>
      </div>
      {/* Removed max-w-4xl to allow it to take max width within parent padding */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-gray-700 rounded-lg bg-[#1e0029] overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-700/30 transition-all duration-200 transform hover:scale-[0.995] active:scale-95"
              type="button"
            >
              <h3 className="text-white text-lg font-medium pr-4">{faq.question}</h3>
              <div
                className={`transition-transform duration-200 ease-in-out ${expandedFAQ === faq.id ? "rotate-45" : "rotate-0"}`}
              >
                {expandedFAQ === faq.id ? (
                  <Minus className="w-5 h-5 text-gray-300 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-300 flex-shrink-0" />
                )}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedFAQ === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="px-6 pb-6">
                <div
                  className={`text-gray-300 leading-relaxed transition-all duration-200 delay-100 ${expandedFAQ === faq.id ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom CTA Section - Removed max-w-4xl */}
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default CourseFAQ
