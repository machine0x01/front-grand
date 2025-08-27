"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none"
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 20;
        const position = idx * (800 / meteorCount) - 400;

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              // hidden by default, visible on hover
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300",

              // meteor body
              "absolute h-0.5 w-0.5 rotate-[45deg] rounded-full bg-slate-500",

              // NO shadow by default, shadow ONLY on hover
              // "shadow-none group-hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.2)]",
              // "transition-shadow duration-300",

              // meteor trail
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",

              // animation only on hover
              "group-hover:animate-meteor-effect",

              className
            )}
            style={{
              top: "-40px",
              left: position + "px",
              animationDelay: Math.random() * 5 + "s",
              animationDuration:
                Math.floor(Math.random() * (10 - 5) + 5) + "s",
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};