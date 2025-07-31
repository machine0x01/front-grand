'use client';

import Image from "next/image";
import { useState } from "react";
import { Play, X } from "lucide-react";
// import { useTranslations } from "next-intl";

const HeroHome = () => {
  // const t = useTranslations('Home');
  const [showModal, setShowModal] = useState(false);
  
  // Replace this with your actual video URL
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Example YouTube URL

  return (
    <header
      className="relative w-full h-[100svh] sm:h-[calc(100vh-10rem)] max-w-[1920px] mx-auto overflow-hidden"
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
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Layout */}
          <div className="h-full flex flex-col justify-center lg:hidden">
            {/* Mobile Hero Content */}
            <div className="text-center space-y-4 mb-8">
              <h1
                id="hero-heading"
                className="font-extrabold text-white leading-[0.9] text-[clamp(2.5rem,12vw,4rem)]"
              >
                courses
              </h1>
              <p className="text-white/90 text-sm sm:text-base max-w-xs mx-auto leading-relaxed px-4">
                courses subtitle
              </p>
            </div>

            {/* Mobile Right Content with Video */}
            <div className="text-center space-y-3 mb-8">
              <h2 className="text-white text-lg sm:text-xl font-extrabold">
                right title
              </h2>
              <p className="text-base sm:text-lg bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-transparent font-medium">
                right subtitle
              </p>
              
              {/* Mobile Video Button */}
              <div className="mx-auto max-w-xs">
                <div 
                  className="relative w-full h-32 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center cursor-pointer group hover:bg-white/15 transition-all duration-300"
                  onClick={() => setShowModal(true)}
                >
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <Play size={24} className="text-white ml-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="text-center px-6">
              <button className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-sm sm:text-base">
                our courses
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 h-full">
            
            {/* Left Content - Desktop */}
            <div className="flex flex-col justify-center text-left">
              <h1
                className="font-extrabold text-white leading-tight mb-4 text-5xl xl:text-6xl 2xl:text-7xl"
              >
                courses
              </h1>
              <p className="text-white/90 text-lg xl:text-xl max-w-md leading-relaxed">
                courses subtitle
              </p>
            </div>

            {/* Center Button - Desktop */}
            <div className="flex items-end justify-center pb-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap">
                our courses
              </button>
            </div>

            {/* Right Content - Desktop */}
            <div className="flex flex-col justify-center text-right">
              <h2 className="text-white text-2xl xl:text-3xl font-extrabold mb-3">
                right title
              </h2>
              <p className="text-lg xl:text-xl bg-gradient-to-r from-[#FEB101] to-[#FFD984] bg-clip-text text-transparent font-medium mb-6">
                right subtitle
              </p>
              
              {/* Desktop Content Box with Video */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                <div 
                  className="relative w-full h-40 xl:h-48 bg-white/5 rounded-lg flex items-center justify-center cursor-pointer group hover:bg-white/10 transition-all duration-300"
                  onClick={() => setShowModal(true)}
                >
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <span className="absolute bottom-4 text-white/80 text-sm font-medium">Click to play video</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-200 group"
              aria-label="Close video"
            >
              <X size={24} className="text-white group-hover:text-gray-300" />
            </button>
            
            {/* Video Iframe */}
            <iframe
              className="w-full h-full"
              src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
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