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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start gap-4">
        {/* Course Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-gray-400 text-xs text-center">No Image</div>
            )}
          </div>
        </div>

        {/* Course Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">by {item.instructor}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-green-600">
              ${item.discount}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${item.price}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="px-4 py-2 text-center min-w-[3rem]">
                {item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onRemove(item.course_id)}
              className="text-red-500 hover:text-red-700 transition-colors p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Total Price for this item */}
        <div className="flex-shrink-0 text-right">
          <p className="text-lg font-bold text-gray-900">
            ${(item.discount * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent; 