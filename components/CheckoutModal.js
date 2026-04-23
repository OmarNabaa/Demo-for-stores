"use client";

import { useState } from "react";
import { X, User, MapPin, MessageSquare, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";
import shopConfig from "@/shopConfig";

export default function CheckoutModal({ open, onClose }) {
  const { items, totalPrice, clearCart } = useCart();
  const { symbol, code } = shopConfig.currency;

  const [form, setForm] = useState({ name: "", address: "", notes: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.address.trim()) e.address = "Delivery address is required.";
    return e;
  }

  function buildWhatsAppMessage() {
    const divider = "─".repeat(26);
    const itemLines = items
      .map((i) => `  • ${i.qty}x ${i.name} (${symbol}${(i.price * i.qty).toFixed(2)})`)
      .join("\n");

    let msg = `*New Order from ${form.name}*\n`;
    msg += `${divider}\n`;
    msg += `${itemLines}\n`;
    msg += `${divider}\n`;
    msg += `*Total:* ${symbol}${totalPrice.toFixed(2)} ${code}\n\n`;
    msg += `*Address:* ${form.address}`;
    if (form.notes.trim()) {
      msg += `\n*Notes:* ${form.notes.trim()}`;
    }
    return msg;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    clearCart();
    setForm({ name: "", address: "", notes: "" });
    setErrors({});
    onClose();
  }

  function handleChange(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
    };
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-slide-in sm:animate-fade-in overflow-hidden">
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-gray-900 text-xl">Complete Your Order</h2>
              <p className="text-sm text-gray-400 mt-0.5">
                We&apos;ll send your order directly via WhatsApp
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Order summary */}
          <div className="px-6 pt-4 pb-3 bg-orange-50 border-b border-orange-100">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">
              Order Summary
            </p>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.qty}× {item.name}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {symbol}{(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 pt-2 border-t border-orange-200">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-orange-600 text-lg">
                {symbol}{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                <User className="w-3.5 h-3.5 inline mr-1.5 text-gray-400" />
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="e.g. John Smith"
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-300 ${
                  errors.name
                    ? "border-red-300 bg-red-50 focus:border-red-400"
                    : "border-gray-200 focus:border-orange-400 bg-white"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-gray-400" />
                Delivery Address
              </label>
              <textarea
                value={form.address}
                onChange={handleChange("address")}
                placeholder="Street, building, floor, apartment…"
                rows={2}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-300 resize-none ${
                  errors.address
                    ? "border-red-300 bg-red-50 focus:border-red-400"
                    : "border-gray-200 focus:border-orange-400 bg-white"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 text-gray-400" />
                Additional Notes{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={form.notes}
                onChange={handleChange("notes")}
                placeholder="Allergies, special instructions, ring doorbell twice…"
                rows={2}
                className="w-full border border-gray-200 focus:border-orange-400 rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-300 resize-none bg-white"
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-md shadow-green-200 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2.5 text-base mt-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send Order on WhatsApp
              <Send className="w-4 h-4 opacity-80" />
            </button>

            <p className="text-center text-xs text-gray-400">
              You&apos;ll be redirected to WhatsApp to confirm your order with {shopConfig.shopName}.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
