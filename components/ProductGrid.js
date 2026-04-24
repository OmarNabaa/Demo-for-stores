"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import shopConfig from "@/shopConfig";
import { UtensilsCrossed } from "lucide-react";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? shopConfig.products
      : shopConfig.products.filter((p) => p.categoryId === activeCategory);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section header */}
      <div className="mb-8">
        <h2 className="font-['Playfair_Display'] font-bold text-3xl sm:text-4xl text-stone-900 mb-1">
          Our Menu
        </h2>
        <p className="text-stone-500 text-sm">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" && (
            <>
              {" "}in{" "}
              <span className="font-semibold text-stone-700">
                {shopConfig.categories.find((c) => c.id === activeCategory)?.label}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-8">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-stone-400 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
            <UtensilsCrossed className="w-8 h-8 text-stone-300" />
          </div>
          <p className="font-semibold text-base text-stone-500">No items in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
