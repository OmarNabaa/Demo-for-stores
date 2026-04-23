"use client";

import { ShoppingCart, Utensils } from "lucide-react";
import { useCart } from "@/context/CartContext";
import shopConfig from "@/shopConfig";

export default function Header({ onCartOpen }) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-200">
            <Utensils className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900 tracking-tight leading-none block">
              {shopConfig.shopName}
            </span>
            <span className="text-xs text-gray-400 leading-none">{shopConfig.tagline}</span>
          </div>
        </div>

        {/* Cart button */}
        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-md shadow-orange-200 transition-all duration-200 active:scale-95"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-bold animate-bounce-in">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
