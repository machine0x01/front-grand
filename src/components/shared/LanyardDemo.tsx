'use client';

import Lanyard from './lanyard/Lanyard';

export default function LanyardDemo() {
  return (
    <div className="w-full h-screen">
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </div>
  );
} 