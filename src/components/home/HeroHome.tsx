'use client';

import { Hero } from '@/types/home';
import { motion } from 'framer-motion';

interface HeroHomeProps {
  content: Hero
}

const HeroHome = ({ content }: HeroHomeProps) => {
  return (
    <header className="relative mx-auto h-[100svh] w-full max-w-[1920px] overflow-hidden">
      {/* Primary Color Background */}
      <div className="absolute inset-0 bg-primary" />
      
      {/* Creating Spots Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        {/* Large spots */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-sm" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-sm" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white rounded-full blur-sm" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-sm" />
        
        {/* Medium spots */}
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white rounded-full blur-sm" />
        <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-white rounded-full blur-sm" />
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full blur-sm" />
        
        {/* Small spots */}
        <div className="absolute top-16 right-1/4 w-8 h-8 bg-white rounded-full blur-sm" />
        <div className="absolute bottom-1/3 left-16 w-10 h-10 bg-white rounded-full blur-sm" />
        <div className="absolute top-3/4 right-16 w-6 h-6 bg-white rounded-full blur-sm" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full space-y-4"
        >
          {/* Slogan Above */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-lg text-white/90 sm:text-xl lg:text-2xl font-medium"
          >
            Building the future, one idea at a time
          </motion.p>

          {/* Main Headline - GRAND and NOTION on separate lines, taking 80% of screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-1"
          >
            <h1 className="text-[clamp(6rem,25vw,22rem)] leading-[0.7] font-black text-white">
              GRAND
            </h1>
            <h1 className="text-[clamp(5rem,22vw,20rem)] leading-[0.7] font-black text-white">
              NOTION
            </h1>
          </motion.div>

          {/* Slogan Below */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg text-white/90 sm:text-xl lg:text-2xl font-medium"
          >
            Where innovation meets imagination
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroHome;