'use client';

import { ReactNode } from 'react';
import SpaceBackground from './SpaceBackground';

interface GlobalSpaceBackgroundProps {
  children: ReactNode;
  dotCount?: number;
}

export default function GlobalSpaceBackground({ children, dotCount = 60 }: GlobalSpaceBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-[#0B000F]">
      {/* Global Space Background */}
      <SpaceBackground 
        dotCount={dotCount} 
        className="fixed inset-0 z-0 pointer-events-none"
      />
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 