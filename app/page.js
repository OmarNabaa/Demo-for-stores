"use client";

import { useState } from "react";
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
    <div className="min-h-screen bg-gray-50">
      <Header onCartOpen={() => setCartOpen(true)} />

      {/* Hero banner */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-orange-100 font-medium text-sm uppercase tracking-widest mb-2">
            Welcome to
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            {shopConfig.shopName}
          </h1>
          <p className="text-orange-100 text-lg mt-3 max-w-md">
            {shopConfig.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30">
              🚀 Fast Delivery
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30">
              💬 Order via WhatsApp
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30">
              ✅ No App Needed
            </span>
          </div>
        </div>
      </div>

      {/* Product catalog */}
      <ProductGrid />

      {/* Cart drawer */}
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={openCheckout} />

      {/* Checkout modal */}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
