"use client";

import { AstronautScene } from "@/components/models/AstronautScene";

export default function Page() {
  return (
    <section className="relative h-screen w-full bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
      <AstronautScene className="w-full h-full" />
    </section>
  );
}
