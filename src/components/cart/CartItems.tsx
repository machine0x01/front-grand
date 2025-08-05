"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import EmptyCart from "@/components/cart/empty-cart";
import CartItemComponent from "@/components/cart/cart-item";
import OrderSummary from "@/components/cart/order-summary";
import { useRouter } from "next/navigation"; // import router

const CartPage = () => {
  const router = useRouter(); // initialize router

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getItemCount,
  } = useCart();

  const handleCheckout = () => {
    router.push("/checkout")
  };

  const handleBack = () => {
    router.back(); // go back to the previous page
  };

  if (getItemCount() === 0) {
    return <EmptyCart onBack={handleBack} />;
  }

  return (
      <div className="max-w-7xl h-[70vh] flex items-center mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItemComponent
                key={item.course_id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              itemCount={getItemCount()}
              totalPrice={getTotalPrice()}
              onContinueShopping={handleBack}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
  );
};

export default CartPage;
