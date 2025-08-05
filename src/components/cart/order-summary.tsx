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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 h-fit">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Items ({itemCount})</span>
          <span className="font-semibold">{itemCount}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-green-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onCheckout}
          className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Proceed to Checkout
        </button>
        
        <button
          onClick={onContinueShopping}
          className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Continue Shopping
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Free shipping</strong> on orders over $50
        </p>
        <p className="text-sm text-gray-600 mt-1">
          30-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default OrderSummary; 