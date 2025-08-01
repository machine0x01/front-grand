'use client';

import { Hero } from '@/types/home';
import { Play, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
// import { useTranslations } from "next-intl";

interface HeroHomeProps {
  content:Hero
}
const HeroHome = ({content}:HeroHomeProps) => {
  // const t = useTranslations('Home');
  const [showModal, setShowModal] = useState(false);


  return (
    <header
      className="relative mx-auto h-[100svh] w-full max-w-[1920px] overflow-hidden sm:h-[calc(100vh-10rem)]"
      aria-labelledby="hero-heading"
    >
      {/* Background Image */}
      <Image
        src="/assets/images/hero-bg.webp"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5JPkBCO8qsHYyiVUqQU3KlIjjjl/8ADa"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8">

          {/* Mobile Layout */}
          <div className="flex h-full flex-col justify-center lg:hidden">
            {/* Mobile Hero Content */}
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

            {/* Mobile Right Content with Video */}
            <div className="mb-8 space-y-3 text-center">
              <h2 className="text-lg font-extrabold text-white sm:text-xl">
                {content.right_title}
              </h2>
              <p className="bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-base font-medium text-transparent sm:text-lg">
                {content.right_subtitle}
              </p>

              {/* Mobile Video Button */}
              <div className="mx-auto max-w-xs">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Play video"
                  className="group relative flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
                  onClick={() => setShowModal(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowModal(true);
                    }
                  }}
                >
                  <div className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                    <Play size={24} className="ml-0.5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="px-6 text-center">
              <button 
                type="button"
                className="w-full max-w-xs rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                our courses
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden h-full lg:grid lg:grid-cols-3 lg:gap-8">

            {/* Left Content - Desktop */}
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

            {/* Center Button - Desktop */}
            <div className="flex items-end justify-center pb-8">
              <button 
                type="button"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold whitespace-nowrap text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                our courses
              </button>
            </div>

            {/* Right Content - Desktop */}
            <div className="flex flex-col justify-center text-right">
              <h2 className="mb-3 text-2xl font-extrabold text-white xl:text-3xl">
                {content.right_title}
              </h2>
              <p className="mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-lg font-medium text-transparent xl:text-xl">
                {content.right_subtitle}
              </p>

              {/* Desktop Content Box with Video */}
              <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Play video"
                  className="group relative flex h-40 w-full cursor-pointer items-center justify-center rounded-lg bg-white/5 transition-all duration-300 hover:bg-white/10 xl:h-48 focus:outline-none focus:ring-2 focus:ring-white/50"
                  onClick={() => setShowModal(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowModal(true);
                    }
                  }}
                >
                  <div className="rounded-full border border-white/30 bg-white/20 p-3 backdrop-blur-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                    <Play size={32} className="ml-1 text-white" />
                  </div>
                  <span className="absolute bottom-4 text-sm font-medium text-white/80">Click to play video</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="group absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 transition-colors duration-200 hover:bg-black/70"
              aria-label="Close video"
            >
              <X size={24} className="text-white group-hover:text-gray-300" />
            </button>

            {/* Video Iframe */}
            <iframe
              className="h-full w-full"
              src={`${content.video_ref}?autoplay=1&rel=0&modestbranding=1`}
              title="Video Player"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeroHome;
