"use client";

import React from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";

interface EmptyCartProps {
  onBack: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onBack }) => {
  return (
    <div className="max-w-7xl h-[70vh] flex items-center justify-center mx-auto">
      <div className="text-center">
        <div className="mb-6">
          <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any courses to your cart yet.
          </p>
        </div>
        
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors mx-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart; 