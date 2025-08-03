"use client";
import React, { useState } from "react";
import { Star, ShoppingCart, Check } from "lucide-react";

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
}
}
export default function HeroCourses({ content }: HeroCoursesProps) {
  const [isAdded, setIsAdded] = useState(false);
  console.log(content)
  
  const cartItems: number[] = [];
  const isInCart = cartItems.includes(1); // Simulate product already in cart

  const handleAddToCart = () => {
    setIsAdded(true);
    // Add to cart logic here if needed
  };

  return (
    <div className="relative max-w-[1920px] mx-auto bg-[#0B000F] text-white">
      <div className="relative h-screen">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          src={content.video}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        />

        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent z-0"></div>

        <div className="relative z-10 w-full h-full flex items-end justify-center px-4 sm:px-6 lg:px-12 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 container w-full pb-12">
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
                  {Math.round((content.discount / content.price) * 100)}% Off
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
                    : isInCart
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
                ) : isInCart ? (
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
  );
}
