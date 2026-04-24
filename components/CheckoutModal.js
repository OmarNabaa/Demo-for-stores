"use client";

import { useState } from "react";
import { X, User, MapPin, MessageSquare } from "lucide-react";
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

  return (
    <>
      {/* Modal backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          open ? "modal-enter-active" : "modal-exit-active"
        }`}
        style={{ pointerEvents: open ? "auto" : "none" }}
        aria-modal="true"
        role="dialog"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-[#FAFAF8] rounded-2xl shadow-2xl max-w-md w-full mx-4 p-5 sm:p-8 relative"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5 text-stone-600" />
          </button>

          <h2 className="font-['Playfair_Display'] font-bold italic text-2xl text-stone-900 mb-1">
            Checkout
          </h2>
          <p className="text-stone-500 mb-6 text-sm">Complete your order details below.</p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="name">
              <User className="inline w-4 h-4 mr-1.5 -mt-0.5 text-orange-500" />
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all ${
                errors.name ? "border-red-400" : "border-stone-200"
              }`}
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange("name")}
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="address">
              <MapPin className="inline w-4 h-4 mr-1.5 -mt-0.5 text-orange-500" />
              Delivery Address
            </label>
            <input
              id="address"
              type="text"
              className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all ${
                errors.address ? "border-red-400" : "border-stone-200"
              }`}
              placeholder="Street, city, postcode"
              value={form.address}
              onChange={handleChange("address")}
              autoComplete="street-address"
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          {/* Notes */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="notes">
              <MessageSquare className="inline w-4 h-4 mr-1.5 -mt-0.5 text-orange-500" />
              Notes{" "}
              <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <textarea
              id="notes"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-all resize-none"
              placeholder="Allergies, special requests..."
              value={form.notes}
              onChange={handleChange("notes")}
              rows={2}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-base transition-all duration-200 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Place Order via WhatsApp
          </button>
        </form>
      </div>
    </>
  );
}
