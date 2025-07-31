"use client"


export function StudentsComments() {
  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto w-full">
        {/* <QuoteHeader
          title="What Our Students Say"
          description="Whether you're a beginner or looking to refine your skills, our diverse range of animation courses has something for everyone."
        /> */}
      </div>
      <div className="h-[40rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden w-full gap-4">
        <InfiniteMovingCards items={testimonials} direction="right" speed="fast" />
        <InfiniteMovingCards items={testimonials} direction="left" speed="fast" />
      </div>
    </div>
  )
}

interface TestimonialItem {
  quote: string
  name: string
  title: string
}

interface InfiniteMovingCardsProps {
  items: TestimonialItem[]
  direction: "left" | "right"
  speed: "fast" | "normal" | "slow"
}

function InfiniteMovingCards({ items, direction, speed }: InfiniteMovingCardsProps) {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items]

  const getAnimationDuration = (speed: string) => {
    switch (speed) {
      case "fast":
        return "20s"
      case "normal":
        return "40s"
      case "slow":
        return "60s"
      default:
        return "40s"
    }
  }

  const animationDirection = direction === "left" ? "scroll-left" : "scroll-right"
  const duration = getAnimationDuration(speed)

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${animationDirection} ${duration} linear infinite`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="relative w-[350px] max-w-full flex-shrink-0 rounded-2xl border border-slate-700 px-8 py-6 md:w-[450px] bg-white dark:bg-slate-900"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm leading-[1.6] text-gray-700 dark:text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-900 dark:text-gray-100 font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-gray-500 dark:text-gray-400 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  )
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
]
