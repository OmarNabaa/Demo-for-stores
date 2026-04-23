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
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {cartItem && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            {cartItem.qty} in cart
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug">{product.name}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-orange-500 font-bold text-lg">
            {symbol}{product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
              added
                ? "bg-green-500 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-200"
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
