"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";

interface OrderSummaryProps {
  itemCount: number;
  totalPrice: number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  itemCount,
  totalPrice,
  onContinueShopping,
  onCheckout,
}) => {
  return (
    <div className="bg-purple-900/30 rounded-xl shadow-lg border border-purple-700/50 p-6 h-fit backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-purple-400" />
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-purple-200/70">Items ({itemCount})</span>
          <span className="font-semibold text-white">{itemCount}</span>
        </div>
        
        <div className="border-t border-purple-700/50 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white">Total</span>
            <span className="text-2xl font-bold text-purple-400">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg shadow-purple-600/25"
        >
          Proceed to Checkout
        </button>
        
        <button
          onClick={onContinueShopping}
          className="w-full bg-purple-800/50 text-purple-200 font-semibold py-3 px-4 rounded-xl hover:bg-purple-800/70 transition-all duration-200 border border-purple-700/50"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSummary; 