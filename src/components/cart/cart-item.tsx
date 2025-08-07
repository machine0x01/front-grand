"use client";

import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem } from "@/context/cart-context";

interface CartItemProps {
  item: CartItem;
  onRemove: (courseId: string) => void;
  onUpdateQuantity: (courseId: string, quantity: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(item.course_id, newQuantity);
  };

  console.log(item);

  return (
    <div className="bg-purple-900/30 rounded-xl shadow-lg border border-purple-700/50 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        {/* Course Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-16 bg-purple-800/50 rounded-lg flex items-center justify-center border border-purple-700/50">
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-purple-400/60 text-xs text-center">No Image</div>
            )}
          </div>
        </div>

        {/* Course Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">
            {item.title}
          </h3>
          <p className="text-sm text-purple-200/70 mb-2">by {item.instructor}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-purple-400">
              ${item.discount}
            </span>
            <span className="text-sm text-purple-300/50 line-through">
              ${item.price}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-purple-700/50 rounded-lg bg-purple-800/30">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-2 hover:bg-purple-800/50 transition-colors text-purple-200"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="px-4 py-2 text-center min-w-[3rem] text-white">
                {item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-2 hover:bg-purple-800/50 transition-colors text-purple-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onRemove(item.course_id)}
              className="text-red-400 hover:text-red-300 transition-colors p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Total Price for this item */}
        <div className="flex-shrink-0 text-right">
          <p className="text-lg font-bold text-white">
            ${(item.discount * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent; 