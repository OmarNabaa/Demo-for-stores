"use client";

import shopConfig from "@/shopConfig";

const ALL = "all";

export default function CategoryFilter({ active, onChange }) {
  const tabs = [{ id: ALL, label: "All" }, ...shopConfig.categories];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            active === tab.id
              ? "bg-orange-500 text-white shadow-md shadow-orange-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
