'use client';

import { Hero } from '@/types/home';
import { Play, X, Maximize2, Volume2, Video } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface HeroHomeProps {
  content: Hero
}

const HeroHome = ({ content }: HeroHomeProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showModal]);

  // Generate YouTube URL with proper parameters for fullscreen and sound
  const getVideoUrl = () => {
    const baseUrl = content.video_ref;
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      controls: '1',
      mute: '0', // Ensure sound is enabled
      fs: '1', // Enable fullscreen button
      playsinline: '0', // Allow fullscreen on mobile
      enablejsapi: '1',
      origin: window.location.origin
    });
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Open video in fullscreen directly
  const openVideoFullscreen = () => {
    setShowModal(true);
    // Small delay to ensure modal is rendered before going fullscreen
    setTimeout(() => {
      toggleFullscreen();
    }, 100);
  };

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
          alt="calgary landscaping"
        />

        <Image
          src="/assets/images/hero-bg-mobile.webp"
          fill
          priority
          quality={85}
          sizes="(max-width: 699px) 100vw, 0px"
          className="object-cover object-center block sm:hidden"
          alt="calgary landscaping"
        />

        {/* Optimized Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Floating Video Button - Top Right Corner */}
        <button
          onClick={openVideoFullscreen}
          className="fixed top-6 right-6 z-20 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 text-white shadow-lg transition-all duration-300 hover:from-purple-500 hover:to-purple-600 hover:scale-105 hover:shadow-xl"
          aria-label="Watch video in fullscreen"
        >
          <Video size={20} />
          <span className="hidden sm:inline text-sm font-semibold">Watch Video</span>
        </button>

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
                    onClick={openVideoFullscreen}
                  >
                    <div className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <Play size={24} className="ml-0.5 text-white" />
                    </div>
                  </button>
                </div>
              </div>

              <div className="px-6 text-center">

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
                
              </div>

              <div className="flex flex-col justify-center text-right">
                <h2 className="mb-3 text-2xl font-extrabold text-white xl:text-3xl">
                  {content.right_title}
                </h2>
                <p className="mb-6 bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-lg font-medium text-transparent xl:text-xl">
                  {content.right_subtitle}
                </p>

                <div className="rounded-xl border bg-white/10 p-6 backdrop-blur-xl">
                  <button
                    type="button"
                    aria-label="Play video"
                    className="group relative flex h-40 w-full items-center justify-center rounded-lg transition-all duration-300  xl:h-48 "
                    onClick={openVideoFullscreen}
                  >
                    <div className="rounded-full p-3  transition- duration-300 group-hover:scale-110 30">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              ref={modalRef}
              className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Control Buttons */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="group rounded-full bg-black/50 p-2 transition-colors duration-200 hover:bg-black/70"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  type="button"
                >
                  <Maximize2 size={20} className="text-white group-hover:text-gray-300" />
                </button>
                
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="group rounded-full bg-black/50 p-2 transition-colors duration-200 hover:bg-black/70"
                  aria-label="Close video"
                  type="button"
                >
                  <X size={20} className="text-white group-hover:text-gray-300" />
                </button>
              </div>

              {/* Sound Indicator */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1">
                <Volume2 size={16} className="text-white" />
                <span className="text-xs text-white">Sound enabled</span>
              </div>

              {/* Video Iframe */}
              <iframe
                ref={iframeRef}
                className="h-full w-full"
                src={getVideoUrl()}
                title="Video Player"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HeroHome;