"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import shopConfig from "@/shopConfig";

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const cartItem = items.find((i) => i.id === product.id);
  const { symbol } = shopConfig.currency;

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="group overflow-hidden rounded-2xl bg-[#F7F3EE] hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {cartItem && (
          <div className="absolute top-2 right-2 bg-[#1C1917] text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            {cartItem.qty} in cart
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-['Playfair_Display'] font-semibold text-stone-900 text-lg leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#1C1917]">
            {symbol}{product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-colors duration-200 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500 ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-[#EA580C] hover:bg-orange-700 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
