'use client';

import QuoteHeader from "../Title";

// Add the CSS animation for the shadow effect
const shadowStyles = `
  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

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
      {/* Inject CSS animation */}
      <style dangerouslySetInnerHTML={{ __html: shadowStyles }} />
      
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <QuoteHeader
          title="What Our Students Say"
          description="Whether you're a beginner or looking to refine your skills, our diverse range of animation courses has something for everyone."
        />
      </div>
      <div className="relative flex h-[30rem] w-full flex-col items-center justify-center gap-8 overflow-visible rounded-md antialiased z-10">
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
      <div className="relative w-full overflow-visible hover:pause-animation py-4">
      <div
        className="flex w-max gap-6 infinite-scroll"
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
            className="group/card relative w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] max-w-full flex-shrink-0 rounded-2xl bg-primary hover:cursor-pointer transition-all duration-500 ease-out overflow-visible shadow-lg hover:shadow-2xl hover:scale-105 hover:z-20 border border-white/20 hover:border-transparent transform-gpu"
          >
            {/* Shadow Effect Behind Card - matching your CSS exactly */}
            <div className="absolute -inset-4 opacity-0 group-hover/card:opacity-100 transition-all duration-500 pointer-events-none -z-10">
              <div 
                className="course-card_shadow rounded-2xl"
                style={{
                  filter: 'blur(20px)',
                  backgroundImage: 'linear-gradient(90deg, #394feb40, #fc4c4440)',
                  backgroundSize: '200% auto',
                  animation: 'textShine 3s ease-in-out infinite alternate',
                  flex: 'none',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  inset: '0%',
                  transform: 'translate3d(0, 0, 0)'
                }}
              />
            </div>
            
            {/* Card content - keeping original background */}
            <div className="relative z-10 w-full h-full rounded-2xl bg-primary px-6 sm:px-8 py-6 ring-1 ring-white/20 shadow-2xl transition-all duration-500 group-hover/card:ring-transparent">
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                >
                </div>
                <span className="relative z-20 text-sm leading-[1.6] font-normal text-emerald-100 break-words group-hover/card:text-white transition-all duration-500 group-hover/card:drop-shadow-lg">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] font-normal text-emerald-200 break-words group-hover/card:text-emerald-300 transition-all duration-500 group-hover/card:drop-shadow-lg group-hover/card:scale-105">
                      {item.course}
                    </span>
                  </span>
                </div>
              </blockquote>
            </div>
            
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-all duration-500 pointer-events-none">
              <div 
                className="rounded-2xl p-[2px]"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #394feb, #fc4c44)',
                  width: '100%',
                  height: '100%'
                }}
              >
                <div className="w-full h-full rounded-2xl bg-transparent" />
              </div>
            </div>
            
            {/* Top accent line with gradient colors */}
            <div className="absolute -top-0 left-[1.125rem] w-[calc(100%-2.25rem)] opacity-0 group-hover/card:opacity-100 transition-all duration-500">
              <span className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#394feb]/0 via-[#394feb]/80 to-[#fc4c44]/0" />
            </div>
            
            {/* Bottom accent line with gradient colors */}
            <div className="absolute -bottom-0 left-[1.125rem] w-[calc(100%-2.25rem)] opacity-0 group-hover/card:opacity-100 transition-all duration-500">
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#394feb]/0 via-[#fc4c44]/80 to-[#fc4c44]/0" />
            </div>
            
            {/* Corner highlights with gradient colors */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-[#394feb]/20 to-transparent rounded-tl-2xl opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#fc4c44]/20 to-transparent rounded-tr-2xl opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-[#394feb]/20 to-transparent rounded-bl-2xl opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-[#fc4c44]/20 to-transparent rounded-br-2xl opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
