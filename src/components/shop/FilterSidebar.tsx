"use client";
import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Slider from "@radix-ui/react-slider";
import { ChevronDown, Filter, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "Beads",
  "Jewelry Supplies",
  "Art Tools",
  "Fabric & Thread",
  "Kits & Bundles",
];
const tags = ["Handmade", "Premium", "Starter Kit", "Limited Edition"];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // 1. Initialize state from the URL (or defaults)
  // This ensures that if you refresh the page, the filters stay where they were
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("min")) || 0,
    Number(searchParams.get("max")) || 100000,
  ]);

  // Track selected categories as an array
  const selectedCats = searchParams.get("category")?.split(",") || [];

  // 2. The Master Sync Function
  // This takes your current UI state and pushes it to the URL
  const applyFilters = (cats: string[], prices: number[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (cats.length > 0) {
      params.set("category", cats.join(",").toLowerCase());
    } else {
      params.delete("category");
    }

    params.set("min", prices[0].toString());
    params.set("max", prices[1].toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    const next = selectedCats.includes(lowerCat)
      ? selectedCats.filter((c) => c !== lowerCat)
      : [...selectedCats, lowerCat];

    applyFilters(next, priceRange);
  };

  const handleClearAll = () => {
    setPriceRange([0, 100000]);
    router.push("/products", { scroll: false }); // Resets everything
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Header & Clear All */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#FDFBF7] font-bold text-xl uppercase tracking-wider">
          Filters
        </h2>
        <button
          onClick={handleClearAll}
          className="text-[#C9A84C] text-xs hover:underline uppercase tracking-tighter"
        >
          Clear All
        </button>
      </div>

      <Accordion.Root
        type="multiple"
        defaultValue={["category", "price"]}
        className="space-y-4"
      >
        {/* 1. CATEGORY - Checkboxes */}
        <Accordion.Item
          value="category"
          className="border-b border-white/10 pb-4"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between text-[#FDFBF7] py-2 group">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Category
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pt-4 space-y-3">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat.toLowerCase())}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-4 h-4 rounded border-white/20 bg-transparent checked:bg-[#C9A84C] accent-[#C9A84C] cursor-pointer"
                />
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </Accordion.Content>
        </Accordion.Item>

        {/* 2. PRICE RANGE - Radix Dual Slider */}
        <Accordion.Item value="price" className="border-b border-white/10 pb-4">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between text-[#FDFBF7] py-2 group">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Price Range
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pt-8 px-2">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={priceRange}
              onValueChange={setPriceRange} // Updates UI text immediately
              onValueCommit={(val) => applyFilters(selectedCats, val)} // Updates URL only when you let go
              max={100000}
              step={1000}
            >
              <Slider.Track className="bg-white/10 relative grow h-[2px]">
                <Slider.Range className="absolute bg-[#C9A84C] h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-[#FDFBF7] rounded-full hover:scale-110 transition-transform focus:outline-none shadow-[0_0_10px_rgba(201,168,76,0.5)] cursor-pointer" />
              <Slider.Thumb className="block w-4 h-4 bg-[#FDFBF7] rounded-full hover:scale-110 transition-transform focus:outline-none shadow-[0_0_10px_rgba(201,168,76,0.5)] cursor-pointer" />
            </Slider.Root>
            <div className="flex justify-between mt-4 text-[11px] font-mono text-white/50">
              <span>₦{priceRange[0].toLocaleString()}</span>
              <span>₦{priceRange[1].toLocaleString()}</span>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        {/* 3. RATING - Visual only for now */}
        <Accordion.Item
          value="rating"
          className="border-b border-white/10 pb-4"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between text-[#FDFBF7] py-2 group">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Rating
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pt-4 space-y-2">
            {[4, 3, 2].map((star) => (
              <button
                key={star}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-[#C9A84C] transition-colors w-full text-left"
              >
                <div className="flex gap-0.5">
                  {[...Array(star)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-[#C9A84C] text-[#C9A84C]"
                    />
                  ))}
                  {[...Array(5 - star)].map((_, i) => (
                    <Star key={i} size={12} className="text-white/10" />
                  ))}
                </div>
                <span>& Up</span>
              </button>
            ))}
          </Accordion.Content>
        </Accordion.Item>

        {/* 4. TAGS */}
        <Accordion.Item value="tags" className="border-b border-white/10 pb-4">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between text-[#FDFBF7] py-2 group">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Tags
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1.5 rounded-md border border-white/10 text-[10px] uppercase tracking-tighter text-white/60 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
              >
                {tag}
              </button>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#C9A84C] text-black p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold"
      >
        <Filter size={20} />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto border-t border-white/10">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
            <FilterContent />
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-8 bg-[#FDFBF7] text-black py-4 rounded-xl font-bold"
            >
              Show Results
            </button>
          </div>
        </div>
      )}

      <aside className="hidden lg:block w-64 shrink-0 h-fit sticky top-28">
        <FilterContent />
      </aside>
    </>
  );
}
