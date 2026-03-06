"use client";
import React, { useState, useEffect } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion
import { ChevronDown, Filter, Star, X } from "lucide-react";
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

  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("min")) || 0,
    Number(searchParams.get("max")) || 100000,
  ]);

  const selectedCats = searchParams.get("category")?.split(",") || [];

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
    router.push("/shop", { scroll: false });
  };

  // REUSABLE ANIMATED ACCORDION CONTENT
  const AnimatedContent = ({ children }: { children: React.ReactNode }) => (
    <Accordion.Content asChild forceMount>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-4 pb-4">{children}</div>
      </motion.div>
    </Accordion.Content>
  );

  const FilterContent = () => (
    <div className="space-y-8">
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
        {/* Category Section */}
        <Accordion.Item value="category" className="border-b border-white/10">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between text-[#FDFBF7] py-4 group">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Category
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <AnimatedContent>
            <div className="space-y-3">
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
            </div>
          </AnimatedContent>
        </Accordion.Item>

        {/* Price Slider Section */}
        <Accordion.Item value="price" className="border-b border-white/10">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between text-[#FDFBF7] py-4 group">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Price Range
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <AnimatedContent>
            <div className="px-2 pt-4">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={priceRange}
                onValueChange={setPriceRange}
                onValueCommit={(val) => applyFilters(selectedCats, val)}
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
            </div>
          </AnimatedContent>
        </Accordion.Item>

        {/* Rating Section */}
        <Accordion.Item value="rating" className="border-b border-white/10">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between text-[#FDFBF7] py-4 group">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Rating
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <AnimatedContent>
            <div className="space-y-2">
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
            </div>
          </AnimatedContent>
        </Accordion.Item>

        {/* Tags Section */}
        <Accordion.Item value="tags" className="border-b border-white/10">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between text-[#FDFBF7] py-4 group">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Tags
              </span>
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <AnimatedContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 rounded-md border border-white/10 text-[10px] uppercase tracking-tighter text-white/60 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </AnimatedContent>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#C9A84C] text-black p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold hover:scale-105 active:scale-95 transition-all"
      >
        <Filter size={20} />
        <span className="text-xs uppercase tracking-widest">Filters</span>
      </button>

      {/* MOBILE DRAWER WITH LUXURY SLIDE */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-[#0A0A0A] rounded-t-[2.5rem] p-8 max-h-[90vh] flex flex-col border-t border-[#C9A84C]/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Handle Bar */}
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6 shrink-0" />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-white/20 hover:text-white"
              >
                <X size={24} />
              </button>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <FilterContent />
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#C9A84C] text-black py-5 rounded-2xl font-bold uppercase tracking-[2.5em] text-xs transition-all active:scale-95"
              >
                Apply & Show Results
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <aside className="hidden lg:block w-72 shrink-0 h-fit sticky top-28 border-r border-white/5 pr-8">
        <FilterContent />
      </aside>
    </>
  );
}
