"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterChips({
  categoryParam,
  minPrice,
  maxPrice,
}: {
  categoryParam?: string;
  minPrice: number;
  maxPrice: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "category" && value) {
      const currentCats = params.get("category")?.split(",") || [];
      const newCats = currentCats.filter((c) => c !== value);
      if (newCats.length > 0) params.set("category", newCats.join(","));
      else params.delete("category");
    } else {
      params.delete(key);
      if (key === "price") {
        params.delete("min");
        params.delete("max");
      }
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (!categoryParam && minPrice === 0 && maxPrice === 100000) return null;

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* Category Chips */}
      {categoryParam?.split(",").map((cat) => (
        <button
          key={cat}
          onClick={() => removeFilter("category", cat)}
          className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest hover:border-[#C9A84C] transition-colors"
        >
          <span>{cat}</span>
          <X size={12} className="text-[#C9A84C]" />
        </button>
      ))}

      {/* Price Chip */}
      {(minPrice > 0 || maxPrice < 100000) && (
        <button
          onClick={() => removeFilter("price")}
          className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest hover:border-[#C9A84C] transition-colors"
        >
          <span>
            ₦{minPrice.toLocaleString()} - ₦{maxPrice.toLocaleString()}
          </span>
          <X size={12} className="text-[#C9A84C]" />
        </button>
      )}
    </div>
  );
}
