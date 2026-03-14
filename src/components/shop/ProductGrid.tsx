"use client";
import { LayoutGrid, List } from "lucide-react";
import ProductCard from "./ProductCard";
import { useState } from "react";

export default function ProductGrid({ products }: { products: any[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-10">
      {/* VIEW TOGGLE HEADER */}
      <div className="flex justify-end gap-4 border-b border-white/5 pb-4">
        <button
          onClick={() => setView("grid")}
          className={`flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors ${view === "grid" ? "text-[#C9A84C]" : "text-white/40"}`}
        >
          <LayoutGrid size={14} /> Grid
        </button>

        <button
          onClick={() => setView("list")}
          className={`flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors ${view === "list" ? "text-[#C9A84C]" : "text-white/40"}`}
        >
          <List size={14} /> List
        </button>
      </div>

      {/* The responsive grid logic */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10"
            : "flex flex-col gap-8"
        }
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={
              view === "list"
                ? "flex gap-8 items-center border-b border-white/5 pb-8"
                : ""
            }
          >
            <ProductCard product={product} />
            {view === "list" && (
              <div className="hidden md:block">
                <p className="text-white/40 text-sm line-clamp-2">
                  {product.description ||
                    "Luxury handcrafted piece from our latest collection."}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
