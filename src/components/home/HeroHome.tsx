'use client';

import { Hero } from '@/types/home';
import { Play, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface HeroHomeProps {
  content: Hero
}

// Generate a simple blur placeholder (you can also use a tool like plaiceholder)
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const HeroHome = ({ content }: HeroHomeProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Preload the hero image */}
      <link
        rel="preload"
        as="image"
        href="/assets/images/hero-bg.webp"
        media="(min-width: 700px)"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/images/hero-bg-mobile.webp"
        media="(max-width: 699px)"
      />

      <header
        className="relative mx-auto h-[100svh] w-full max-w-[1920px] overflow-hidden sm:h-[calc(100vh-10rem)]"
        aria-labelledby="hero-heading"
      >
        {/* Desktop Image */}
        <Image
          src="/assets/images/hero-bg.webp"
          fill
          priority
          quality={85}
          sizes="(max-width: 699px) 0px, 100vw"
          className="object-cover object-center hidden sm:block"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
          alt="calgary landscaping"
        />

        <Image
          src="/assets/images/hero-bg-mobile.webp"
          fill
          priority
          quality={85}
          sizes="(max-width: 699px) 100vw, 0px"
          className="object-cover object-center block sm:hidden"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 1000))}`}
          alt="calgary landscaping"
        />

        {/* Optimized Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8">

            <div className="flex h-full flex-col justify-center lg:hidden">
              <div className="mb-8 space-y-4 text-center">
                <h1
                  id="hero-heading"
                  className="text-[clamp(2.5rem,12vw,4rem)] leading-[0.9] font-extrabold text-white"
                >
                  {content.left_title}
                </h1>
                <p className="mx-auto max-w-xs px-4 text-sm leading-relaxed text-white/90 sm:text-base">
                  {content.left_subtitle}
                </p>
              </div>

              <div className="mb-8 space-y-3 text-center">
                <h2 className="text-lg font-extrabold text-white sm:text-xl">
                  {content.right_title}
                </h2>
                <p className="bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-base font-medium text-transparent sm:text-lg">
                  {content.right_subtitle}
                </p>

                <div className="mx-auto max-w-xs">
                  <button
                    type="button"
                    aria-label="Play video"
                    className="group relative flex h-32 w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
                    onClick={() => setShowModal(true)}
                  >
                    <div className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <Play size={24} className="ml-0.5 text-white" />
                    </div>
                  </button>
                </div>
              </div>

              <div className="px-6 text-center">
                <button
                  type="button"
                  className="w-full max-w-xs rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  our courses
                </button>
              </div>
            </div>

            <div className="hidden h-full lg:grid lg:grid-cols-3 lg:gap-8">

              <div className="flex flex-col justify-center text-left">
                <h1
                  className="mb-4 text-5xl leading-tight font-extrabold text-white xl:text-6xl 2xl:text-7xl"
                >
                  {content.left_title}
                </h1>
                <p className="max-w-md text-lg leading-relaxed text-white/90 xl:text-xl">
                  {content.left_subtitle}
                </p>
              </div>

              <div className="flex items-end justify-center pb-8">
                <button
                  type="button"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold whitespace-nowrap text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  our courses
                </button>
              </div>

              <div className="flex flex-col justify-center text-right">
                <h2 className="mb-3 text-2xl font-extrabold text-white xl:text-3xl">
                  {content.right_title}
                </h2>
                <p className="mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-lg font-medium text-transparent xl:text-xl">
                  {content.right_subtitle}
                </p>

                <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                  <button
                    type="button"
                    aria-label="Play video"
                    className="group relative flex h-40 w-full items-center justify-center rounded-lg bg-white/5 transition-all duration-300 hover:bg-white/10 xl:h-48 focus:outline-none focus:ring-2 focus:ring-white/50"
                    onClick={() => setShowModal(true)}
                  >
                    <div className="rounded-full border border-white/30 bg-white/20 p-3 backdrop-blur-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <Play size={32} className="ml-1 text-white" />
                    </div>
                    <span className="absolute bottom-4 text-sm font-medium text-white/80">Click to play video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="group absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 transition-colors duration-200 hover:bg-black/70"
                aria-label="Close video"
                type="button"
              >
                <X size={24} className="text-white group-hover:text-gray-300" />
              </button>

              {/* Video Iframe - Lazy loaded */}
              <iframe
                className="h-full w-full"
                src={`${content.video_ref}?autoplay=1&rel=0&modestbranding=1`}
                title="Video Player"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HeroHome;