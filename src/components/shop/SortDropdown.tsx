"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const options = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  // Get current label from URL or default to Featured
  const currentSort = searchParams.get("sort") || "featured";
  const currentLabel =
    options.find((opt) => opt.value === currentSort)?.label || "Featured";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full min-w-[160px] sm:w-[200px] z-40">
      {/* 1. THE TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-white/5 border border-white/10 px-4 py-2.5 text-xs md:text-sm rounded-sm text-white transition-all hover:border-[#C9A84C]/50"
      >
        <span className="uppercase tracking-widest">{currentLabel}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={14} className="text-[#C9A84C]" />
        </motion.div>
      </button>

      {/* 2. THE ANIMATED LIST */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 mt-1 overflow-hidden bg-[#111111] border border-white/10 rounded-sm shadow-2xl"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`w-full px-4 py-3 text-left text-[11px] uppercase tracking-tighter transition-colors
                  ${
                    currentSort === option.value
                      ? "bg-[#C9A84C] text-black font-bold"
                      : "text-white/70 hover:bg-white/5 hover:text-[#C9A84C]"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CLICK-AWAY OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
