"use client";

import shopConfig from "@/shopConfig";

const ALL = "all";

export default function CategoryFilter({ active, onChange }) {
  const tabs = [{ id: ALL, label: "All" }, ...shopConfig.categories];

  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-shrink-0 px-5 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500 ${
            active === tab.id
              ? "bg-[#1C1917] text-white shadow-sm"
              : "text-stone-500 bg-transparent hover:bg-stone-100 hover:text-stone-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
