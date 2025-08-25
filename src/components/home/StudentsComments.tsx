'use client';

import QuoteHeader from "../Title";

const testimonials = [
  {
    quote:
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
    name: 'Charles Dickens',
    title: 'A Tale of Two Cities',
  },
  {
    quote:
      'To be, or not to be, that is the question: Whether \'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.',
    name: 'William Shakespeare',
    title: 'Hamlet',
  },
  {
    quote: 'All that we see or seem is but a dream within a dream.',
    name: 'Edgar Allan Poe',
    title: 'A Dream Within a Dream',
  },
  {
    quote:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    name: 'Jane Austen',
    title: 'Pride and Prejudice',
  },
  {
    quote:
      'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
    name: 'Herman Melville',
    title: 'Moby-Dick',
  },
];

interface StudentsCommentsProps {
  content: {
    quote: string;
    course:string  
    ref:string
  }[]
}

export function StudentsComments({content}:StudentsCommentsProps) {
  console.log(content,'content');
  
  const data = content || testimonials
  
  return (
    <div className="w-full h-screen flex justify-center flex-col overflow-hidden relative">
    
      
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <QuoteHeader
          title="What Our Students Say"
          description="Whether you're a beginner or looking to refine your skills, our diverse range of animation courses has something for everyone."
        />
      </div>
      <div className="relative flex h-[30rem] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-md antialiased z-10">
        <InfiniteMovingCards items={data} direction="right" speed="fast" />
        <InfiniteMovingCards items={data} direction="left" speed="fast" />
      </div>
    </div>
  );
}

type TestimonialItem = {
  quote: string;
  course: string;
  ref: string;
};

type InfiniteMovingCardsProps = {
  items: TestimonialItem[];
  direction: 'left' | 'right';
  speed: 'fast' | 'normal' | 'slow';
};

function InfiniteMovingCards({ items, direction, speed }: InfiniteMovingCardsProps) {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items];

  const getAnimationDuration = (speed: string) => {
    switch (speed) {
      case 'fast':
        return '20s';
      case 'normal':
        return '40s';
      case 'slow':
        return '60s';
      default:
        return '40s';
    }
  };

  const animationDirection = direction === 'left' ? 'scroll-left' : 'scroll-right';
  const duration = getAnimationDuration(speed);

  return (
  <div className="relative w-full group">
      <div className="relative w-full overflow-hidden hover:pause-animation">
      <div
        className="flex w-max gap-4 infinite-scroll"
        style={{
          animation: `${animationDirection} ${duration} linear infinite`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = 'running';
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="relative w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] max-w-full flex-shrink-0 rounded-2xl border bg-[#20002b] px-6 sm:px-8 py-6 hover:cursor-pointer transition-transform hover:scale-105"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              >
              </div>
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-gray-700 dark:text-gray-100 break-words">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal text-gray-900 dark:text-gray-100 break-words">
                    {item.course}
                  </span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
