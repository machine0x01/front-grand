'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export const DemoBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set your target date here (7 days from now as example)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sticky top-0 z-[999] bg-gradient-to-r from-[#0b000f]  to-[#21002d] p-4 text-center text-white shadow-lg">
      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        {/* Offer Text */}
        <div className="text-lg font-bold">
          🔥 LIMITED TIME: 50% OFF ALL COURSES! 🔥
        </div>

        {/* Countdown */}
        <div className="flex items-center space-x-2 text-sm font-semibold">
          <span>Ends in:</span>
          <div className="flex space-x-1">
            <div className="min-w-[2rem] rounded bg-white px-2 py-1 text-center text-red-600">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <span>:</span>
            <div className="min-w-[2rem] rounded bg-white px-2 py-1 text-center text-red-600">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <span>:</span>
            <div className="min-w-[2rem] rounded bg-white px-2 py-1 text-center text-red-600">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <span>:</span>
            <div className="min-w-[2rem] rounded bg-white px-2 py-1 text-center text-red-600">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/sign-up"
          className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-red-600 transition-colors duration-200 hover:bg-yellow-300"
        >
          Claim Your 50% Discount Now!
        </Link>
      </div>

      {/* Time labels */}
      <div className="mt-1 flex justify-center space-x-8 text-xs opacity-90 sm:hidden">
        <span>Days</span>
        <span>Hours</span>
        <span>Minutes</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};
