"use client";
import React, { useState, useRef, useEffect } from "react";
import { Star, ShoppingCart, Check, X, Gift } from "lucide-react";
import { Maximize2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { Offer, IncludedCourse } from "@/types/course";

interface HeroCoursesProps {
content: {
  title: string;
  overview: string;
  video: string;
  rating: string;
  students_rated: number;
  total_students: number;
  price: string;
  discount: string;
  instructor: string;
  slug: string;
  offer?: Offer;
}
}

export default function HeroCourses({ content }: HeroCoursesProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const { addToCart, isInCart } = useCart();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Convert string prices to numbers for calculations
  const price = parseFloat(content.price);
  const discount = parseFloat(content.discount);
  const courseId = content.slug; // Use the slug as course ID
  
  const isInCartState = isInCart(courseId);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;

      const heroSection = video.closest('.relative.h-screen');
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

      if (isVisible) {
        video.play().catch(console.error);
      } else {
        video.pause();
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ensure sound only during fullscreen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyMutedState = (shouldMute: boolean) => {
      video.muted = shouldMute;
      if (shouldMute) {
        video.controls = false;
      } else {
        video.controls = true;
        // Try to ensure playback when unmuted (some browsers require a play call)
        void video.play().catch(() => {});
      }
    };

    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement === video;
      applyMutedState(!isFullscreen);
    };

    const handleWebkitBeginFullscreen = () => {
      applyMutedState(false);
    };

    const handleWebkitEndFullscreen = () => {
      applyMutedState(true);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    // iOS Safari specific events
    (video as any).addEventListener('webkitbeginfullscreen', handleWebkitBeginFullscreen);
    (video as any).addEventListener('webkitendfullscreen', handleWebkitEndFullscreen);

    // Initialize to muted when not in fullscreen
    applyMutedState(!(document.fullscreenElement === video));

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      (video as any).removeEventListener('webkitbeginfullscreen', handleWebkitBeginFullscreen);
      (video as any).removeEventListener('webkitendfullscreen', handleWebkitEndFullscreen);
    };
  }, []);

  const hasOffer = Boolean(content.offer && content.offer.active && content.offer.included_courses && content.offer.included_courses.length > 0);

  const computeOfferTotals = (included: IncludedCourse[]) => {
    const originalTotal = included.reduce((sum, c) => sum + parseFloat(c.price), 0);
    const discountedTotal = included.reduce((sum, c) => sum + parseFloat(c.discount), 0);
    const savings = originalTotal - discountedTotal;
    const percent = originalTotal > 0 ? Math.round((savings / originalTotal) * 100) : 0;
    return { originalTotal, discountedTotal, savings, percent };
  };

  const handleAddToCart = () => {
    if (hasOffer) {
      setShowOfferModal(true);
      return;
    }
    addSingleCourse();
  };

  const addSingleCourse = () => {
    addToCart({
      course_id: courseId,
      title: content.title,
      price: price,
      discount: discount,
      instructor: content.instructor,
      thumbnail: undefined,
    });
    setIsAdded(true);
  };

  const addOfferCourses = () => {
    if (!content.offer?.included_courses) return;
    content.offer.included_courses.forEach((c) => {
      addToCart({
        course_id: c.course_id,
        title: c.name,
        price: parseFloat(c.price),
        discount: parseFloat(c.discount),
        instructor: content.instructor,
        thumbnail: undefined,
      });
    });
    setShowOfferModal(false);
  };

  const enterFullscreenWithSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // Request fullscreen first; event listeners will unmute when fullscreen is active
      if (video.requestFullscreen) {
        await video.requestFullscreen();
        return;
      }
      if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
        return;
      }
      if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
        return;
      }
      if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVideoClick = () => {
    void enterFullscreenWithSound();
  };

  return (
    <div className="relative w-full bg-[#0B000F] text-white">
      <div className="relative h-screen">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={content.video}
          className="absolute inset-0 w-full h-full object-cover z-0 cursor-pointer"
          autoPlay
          muted
          loop
          playsInline
          onClick={handleVideoClick}
          title="Click to view fullscreen"
        />

        </div>
        {/* Floating fullscreen button */}
        <button
          type="button"
          aria-label="Watch video in fullscreen with sound"
          onClick={handleVideoClick}
          className="absolute top-4 right-4 z-20 rounded-full border border-white/20 bg-black/50 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/70"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent z-0"></div>

        <div className="relative z-10 w-full h-full flex items-end justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <div className="max-w-[80vw] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full pb-12">
              {/* Left Column */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {content.title}
                </h1>

                <div className="text-sm text-gray-400 mb-2">
                  Instructor: {content.instructor}
                </div>

                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-yellow-400">
                    ${content.discount}
                  </span>
                  <span className="text-gray-400 line-through text-base sm:text-lg">
                    ${content.price}
                  </span>
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-md text-xs sm:text-sm">
                    {Math.round((discount / price) * 100)}% Off
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm sm:text-base mb-6">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-semibold ml-1">{content.rating}/5</span>
                  </div>
                  <span className="text-gray-400">{content.students_rated} students</span>
                </div>

                <button
                  className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-xl shadow-lg transition mb-8 ${
                    isAdded
                      ? "bg-green-600 text-white"
                      : isInCartState
                      ? "bg-gray-600 text-white"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAdded}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : isInCartState ? (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      In Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-purple-400">
                  Overview
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {content.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && content.offer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" onClick={() => setShowOfferModal(false)}>
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#120017] p-6 text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowOfferModal(false)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-lg bg-purple-600/20 p-2 ring-1 ring-purple-400/30"><Gift className="h-5 w-5 text-purple-300" /></span>
              <div>
                <h3 className="text-lg font-semibold">Special Offer Available</h3>
                <p className="text-sm text-gray-300">{content.offer.title}</p>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-black/20">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white/5 text-left">
                  <tr>
                    <th className="px-4 py-2 font-medium">Course</th>
                    <th className="px-4 py-2 font-medium">Original</th>
                    <th className="px-4 py-2 font-medium">Discounted</th>
                  </tr>
                </thead>
                <tbody>
                  {content.offer.included_courses.map((c) => (
                    <tr key={c.course_id} className="border-t border-white/10">
                      <td className="px-4 py-2">{c.name}</td>
                      <td className="px-4 py-2 text-gray-300">${parseFloat(c.price).toFixed(2)}</td>
                      <td className="px-4 py-2 text-green-400 font-semibold">${parseFloat(c.discount).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {(() => {
              const { originalTotal, discountedTotal, savings, percent } = computeOfferTotals(content.offer!.included_courses);
              return (
                <div className="mt-4 rounded-xl border border-green-600/20 bg-green-900/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                    <div className="text-gray-300">Bundle total</div>
                    <div className="font-semibold">${discountedTotal.toFixed(2)} <span className="ml-2 text-xs text-gray-400 line-through">${originalTotal.toFixed(2)}</span></div>
                  </div>
                  <div className="mt-1 text-xs text-green-400">You save ${savings.toFixed(2)} ({percent}% off)</div>
                </div>
              );
            })()}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => { setShowOfferModal(false); addSingleCourse(); }}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
              >
                Add only this course
              </button>
              <button
                type="button"
                onClick={addOfferCourses}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-500"
              >
                <ShoppingCart className="h-4 w-4" /> Add offer courses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}