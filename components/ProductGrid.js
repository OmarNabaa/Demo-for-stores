"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import shopConfig from "@/shopConfig";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? shopConfig.products
      : shopConfig.products.filter((p) => p.categoryId === activeCategory);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category filter */}
      <div className="mb-6">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 mb-4">
        {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "all" && (
          <span>
            {" "}in{" "}
            <span className="text-orange-500 font-medium">
              {shopConfig.categories.find((c) => c.id === activeCategory)?.label}
            </span>
          </span>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="font-medium">No items in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
