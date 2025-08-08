"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  id: number;
  title: string;
  answer: string;
  faq: number;
}

interface FAQData {
  id: number;
  title: string;
  items: FAQItem[];
  course: number;
}

interface CourseFAQProps {
  faq: FAQData;
}

const CourseFAQ = ({ faq }: CourseFAQProps) => {
  // Changed initial state to null so all FAQs are closed by default
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const toggleFAQ = (faqId: number): void => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-[80vw] mx-auto text-white h-fit">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 animate-fade-in">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-lg animate-fade-in">
            Got questions? We've got answers. Find everything you need to know about our course.
          </p>
        </div>
        {/* Removed max-w-4xl to allow it to take max width within parent padding */}
        <div className="space-y-4">
          {faq.items.map((item, index) => (
            <div
              key={item.id}
              className="border border-gray-700 rounded-lg bg-[#1e0029] overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-700/30 transition-all duration-200 transform hover:scale-[0.995] active:scale-95"
                type="button"
              >
                <h3 className="text-white text-lg font-medium pr-4">{item.title}</h3>
                <div
                  className={`transition-transform duration-200 ease-in-out ${expandedFAQ === item.id ? "rotate-45" : "rotate-0"}`}
                >
                  {expandedFAQ === item.id ? (
                    <Minus className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedFAQ === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-6">
                  <div
                    className={`text-gray-300 leading-relaxed transition-all duration-200 delay-100 ${expandedFAQ === item.id ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom CTA Section - Removed max-w-4xl */}
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-5 sm:p-6">
            <div className="absolute inset-0 -z-10 opacity-30 blur-2xl" aria-hidden>
              <div className="h-full w-full bg-gradient-to-tr from-purple-600/40 via-fuchsia-500/30 to-pink-500/30" />
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-600/20 p-2 ring-1 ring-purple-400/30">
                  <ShoppingCart className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Ready to enroll?</h3>
                  <p className="text-sm text-purple-100/80">Add this course to your cart to lock in your spot and start learning.</p>
                </div>
              </div>
              <div className="flex w-full gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                >
                  Add to Cart
                </button>
                <Link
                  href="/cart"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        
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
    </div>
  )
}

export default CourseFAQ
