"use client";

import { ShoppingCart, Utensils } from "lucide-react";
import { useCart } from "@/context/CartContext";
import shopConfig from "@/shopConfig";

export default function Header({ onCartOpen }) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-xl border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1C1917] flex items-center justify-center">
            <Utensils className="w-5 h-5 text-orange-500" strokeWidth={2} />
          </div>
          <span className="font-['Playfair_Display'] font-bold italic text-xl text-stone-900 leading-none">
            {shopConfig.shopName}
          </span>
        </div>

        {/* Cart button */}
        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 bg-[#1C1917] hover:bg-stone-800 text-white px-5 py-3 min-h-[44px] rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold shadow-md">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
