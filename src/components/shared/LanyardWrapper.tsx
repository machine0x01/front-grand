'use client';

import { useState, useEffect } from 'react';
import Lanyard from './lanyard/Lanyard';

interface LanyardWrapperProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function LanyardWrapper(props: LanyardWrapperProps) {
  const [isTextureLoaded, setIsTextureLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if the texture file exists
    const checkTexture = async () => {
      try {
        const response = await fetch('/assets/images/3d/lanyard-purple-gradient.png');
        if (response.ok) {
          setIsTextureLoaded(true);
        } else {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      }
    };

    checkTexture();
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#4A1F63] to-[#3A1553] text-white">
        <div className="text-center max-w-md mx-auto p-8 rounded-2xl bg-black/20 backdrop-blur-sm border border-purple-400/20">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#6B2A8A] to-[#4A1F63] bg-clip-text text-transparent">
            🎨 Lanyard Component
          </h2>
          <p className="text-gray-300 mb-6">
            The purple gradient texture is missing. Please generate it first.
          </p>
          <div className="space-y-4">
            <a
              href="/gradient-generator.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#6B2A8A] to-[#4A1F63] text-white px-6 py-3 rounded-lg font-medium hover:from-[#8B5CF6] hover:to-[#6B2A8A] transition-all duration-300"
            >
              Generate Gradient Texture
            </a>
            <div className="text-sm text-gray-400">
              <p>1. Open the generator</p>
              <p>2. Download the PNG file</p>
              <p>3. Save as: <code className="bg-black/30 px-2 py-1 rounded">lanyard-purple-gradient.png</code></p>
              <p>4. Place in: <code className="bg-black/30 px-2 py-1 rounded">public/assets/images/3d/</code></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isTextureLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#4A1F63] to-[#3A1553]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#6B2A8A] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Lanyard Component...</p>
        </div>
      </div>
    );
  }

  return <Lanyard {...props} />;
} 