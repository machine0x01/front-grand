'use client';

import { useEffect, useState } from "react";

// CSS animations for the floating stars
const starStyles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 0.7;
    }
  }
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(0.8);
    }
  }
`;

// Floating Stars Component
export function FloatingStars({ isHovered }: { isHovered: boolean }) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number; rotation: number }>>([]);

  useEffect(() => {
    if (isHovered) {
      // Create 12 stars with random positions and properties
      const newStars = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100, // Random X position (0-100%)
        y: Math.random() * 100, // Random Y position (0-100%)
        delay: Math.random() * 2, // Random delay (0-2s)
        size: Math.random() * 0.5 + 0.5, // Random size (0.5-1.0)
        rotation: Math.random() * 360, // Random rotation (0-360deg)
      }));
      setStars(newStars);
    } else {
      setStars([]);
    }
  }, [isHovered]);

  if (!isHovered) return null;

  return (
    <>
      {/* Inject CSS animations */}
      <style dangerouslySetInnerHTML={{ __html: starStyles }} />
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute text-yellow-300"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size * 1.5}rem`,
              transform: `rotate(${star.rotation}deg)`,
              animation: `float 3s ease-in-out ${star.delay}s infinite, twinkle 2s ease-in-out ${star.delay}s infinite`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>
    </>
  );
}

// Hook for easy usage in blog posts
export function useFloatingStars() {
  const [isHovered, setIsHovered] = useState(false);
  
  return {
    isHovered,
    setIsHovered,
    FloatingStars: () => <FloatingStars isHovered={isHovered} />
  };
} 