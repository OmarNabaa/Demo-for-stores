"use client";

import { useState } from "react";
import { Zap, MessageCircle, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Cart from "@/components/Cart";
import CheckoutModal from "@/components/CheckoutModal";
import shopConfig from "@/shopConfig";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  function openCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Header onCartOpen={() => setCartOpen(true)} />

      {/* Hero */}
      <section
        className="bg-[#1C1917] relative"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-28 sm:pb-36">
          <p className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Order in seconds
          </p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl lg:text-7xl font-bold italic text-[#F7F3EE] leading-[1.05] mb-4">
            {shopConfig.shopName}.
          </h1>
          <p className="text-stone-400 text-base sm:text-xl max-w-lg leading-relaxed mb-10">
            Fresh food, delivered fast — just send us a WhatsApp message and we&apos;ll handle the rest.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Zap, label: "Fast Delivery" },
              { icon: MessageCircle, label: "Order via WhatsApp" },
              { icon: ShieldCheck, label: "No App Needed" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 bg-stone-800 text-stone-300 rounded-full px-4 py-2 text-sm font-medium"
              >
                <Icon className="w-4 h-4 text-orange-400" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Product catalog */}
      <div className="-mt-6 relative z-10">
        <ProductGrid />
      </div>

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={openCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
