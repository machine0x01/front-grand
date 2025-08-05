import { Quote } from 'lucide-react';
import React from 'react';

interface QuoteHeaderProps {
  title: string;
  description?: string; // Make description optional
}

const QuoteHeader: React.FC<QuoteHeaderProps> = ({ title, description }) => {
  return (
    <div className="relative mx-auto text-center w-full inline-block">
      <Quote
        size={32}
        className="text-white absolute -top-3 -left-6 sm:-top-5 sm:-left-8 opacity-30 transform rotate-180 sm:block hidden transition-all duration-1000 delay-300 ease-out"
      />
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white relative px-4 sm:px-0">
        {title}
      </h1>
      <Quote
        size={32}
        className="text-white absolute -bottom-3 -right-6 sm:-bottom-5 sm:-right-8 opacity-30 sm:block hidden transition-all duration-1000 delay-300 ease-out"
      />
      {description && (
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0 transition-all duration-1000 delay-200 ease-out opacity-100 translate-y-0">
          {description}
        </p>
      )}
    </div>
  );
};

export default QuoteHeader;
