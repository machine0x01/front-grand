"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react" 
const data = {
  details: [
    {
      id: 2,
      title: "تفصيل 1",
      description:
        "Fund must improve great. Station trip friend discuss note great. Garden age understand true.\r\nRight marriage treatment maintain. Stock race bring later boy direction another. Fill subject happen.",
      steps: [
        {
          id: 2,
          title: "خطوة 1",
          description:
            "Might compare citizen laugh. Wait fish this soldier girl hard country. Learn seven computer way see stand sort.",
          banner: "http://127.0.0.1:8000/media/course_detail_steps/banner_0_0_0_0.jpg",
          detail: 2,
        },
        {
          id: 3,
          title: "خطوة 2",
          description:
            "Important from each few whose hundred ball. Last policy memory.\nAnswer beautiful interest. Authority memory last game me agreement. Magazine really accept base lead.",
          banner: "http://127.0.0.1:8000/media/course_detail_steps/banner_0_0_0_1.jpg",
          detail: 2,
        },
      ],
      course: 8,
    },
    {
      id: 3,
      title: "تفصيل 2",
      description:
        "Thing sense fill yet major. Simply a assume administration. Budget common past save.\r\nYour economic strong. Floor start somebody recent.",
      steps: [
        {
          id: 4,
          title: "خطوة 1",
          description:
            "Involve item out almost on unit take.\nCity later movie common usually table leader. Relate use rich over.\nFear she send analysis away body law. Fund today similar base.",
          banner: "http://127.0.0.1:8000/media/course_detail_steps/banner_0_0_1_0.jpg",
          detail: 3,
        },
        {
          id: 5,
          title: "خطوة 2",
          description: "Measure movie sign. Still well drop consumer. Almost recently employee account.",
          banner: "http://127.0.0.1:8000/media/course_detail_steps/banner_0_0_1_1.jpg",
          detail: 3,
        },
      ],
      course: 8,
    },
  ],
}

export default function StepsComponentNative() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const handleToggle = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Course Details and Steps</h1>
      <div className="w-full border rounded-lg overflow-hidden">
        {data.details.map((detail) => (
          <div key={detail.id} className="border-b last:border-b-0">
            <button
              className="flex items-center justify-between w-full py-4 px-6 text-lg font-semibold text-right cursor-pointer hover:bg-gray-50 focus:outline-none"
              onClick={() => handleToggle(detail.id)}
              aria-expanded={openItem === detail.id}
              aria-controls={`content-${detail.id}`}
            >
              {detail.title}
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openItem === detail.id ? "rotate-180" : ""}`}
              />
            </button>
            {openItem === detail.id && (
              <div id={`content-${detail.id}`} className="pt-4 pb-6 px-6 bg-white">
                <p className="text-gray-600 mb-6 whitespace-pre-wrap text-right">{detail.description}</p>
                <div className="space-y-8">
                  {detail.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex flex-col md:flex-row items-start gap-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                    >
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xl">
                        {index + 1}
                      </div>
                      <div className="grid gap-2 flex-grow text-right">
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">{step.description}</p>
                        {step.banner && (
                          <img
                            src={`/placeholder.svg?height=200&width=300&query=${encodeURIComponent(step.title)}`}
                            alt={step.title}
                            className="mt-4 rounded-md object-cover w-full max-h-48 md:max-h-64"
                            width={300}
                            height={200}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
