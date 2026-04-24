"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import shopConfig from "@/shopConfig";

export default function Cart({ open, onClose, onCheckout }) {
  const { items, removeItem, updateQty, totalPrice } = useCart();
  const { symbol } = shopConfig.currency;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 animate-fade-slide-up"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#FAFAF8] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#1C1917]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <h2 className="font-['Playfair_Display'] font-bold italic text-white text-xl">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="bg-stone-700 text-stone-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.qty, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label="Close cart"
          >
            <X className="w-4 h-4 text-stone-300" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-5 px-6 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-stone-300" />
              </div>
              <div>
                <p className="font-semibold text-stone-700 text-base">Your cart is empty</p>
                <p className="text-sm text-stone-400 mt-1">Add some items to get started.</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white rounded-xl p-4 border border-stone-100"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm truncate">{item.name}</p>
                  <p className="text-[#EA580C] font-bold text-sm mt-0.5">
                    {symbol}{(item.price * item.qty).toFixed(2)}
                  </p>
                  <p className="text-stone-400 text-xs mt-0.5">
                    {symbol}{item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between gap-2">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-9 h-9 rounded-md hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-bold text-stone-800">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-9 h-9 rounded-md hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-9 h-9 rounded-md hover:bg-red-50 flex items-center justify-center text-stone-300 hover:text-red-400 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 px-6 py-5 space-y-4 bg-[#FAFAF8]">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium text-sm">Subtotal</span>
              <span className="text-2xl font-bold text-[#1C1917]">
                {symbol}{totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 text-base cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
