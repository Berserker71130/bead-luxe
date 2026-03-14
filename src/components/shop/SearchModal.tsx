"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data/products";
import { useEffect, useMemo, useState } from "react";
import { Search, ShoppingBag, X } from "lucide-react";

export default function SearchModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredResults = useMemo(() => {
    if (query.length < 2) return [];
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] animate-in fade-in duration-300" />

        <Dialog.Content className="fixed inset-0 z-[101] flex flex-col p-6 md:p-12 outline-none">
          <Dialog.Title className="sr-only">Search our Collection</Dialog.Title>
          <Dialog.Description className="sr-only">
            Type to search for jewelry, beads and luxury accessories.
          </Dialog.Description>

          {/* Header & Input - SLIMMER VERSION */}
          <div className="max-w-2xl w-full mx-auto relative pt-10">
            <Search
              className="absolute left-0 top-[70%] -translate-y-1/2 text-[#C9A84C]/60"
              size={18}
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search our collection..."
              className="w-full bg-transparent border-b border-[#C9A84C]/20 pl-8 py-2 text-base md:text-lg font-serif outline-none placeholder:text-white/20 text-[#FDFBF7] transition-all focus:border-[#C9A84C]/60"
            />
            <Dialog.Close className="absolute right-0 top-[70%] -translate-y-1/2 text-white/40 hover:text-white transition-colors">
              <X size={18} />
            </Dialog.Close>
          </div>

          {/* Result Area */}
          <div className="max-w-2xl w-full mx-auto mt-8 overflow-y-auto">
            {query.length >= 2 ? (
              <div className="grid grid-cols-1 gap-3">
                {" "}
                {/* Single column for cleaner list view */}
                {filteredResults.length > 0 ? (
                  filteredResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#C9A84C]/20 transition-all"
                    >
                      {/* Image Container */}
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* 🚀 FIXED: TEXT CONTENT ADDED HERE */}
                      <div className="flex flex-col">
                        <h4 className="text-sm font-medium text-white/90 group-hover:text-[#C9A84C] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-[10px] uppercase tracking-widest text-white/40">
                          {product.category}
                        </p>
                        <p className="text-xs text-[#C9A84C]/80 mt-1">
                          ₦{product.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center">
                    <ShoppingBag
                      className="mx-auto text-white/10 mb-4"
                      size={32}
                    />
                    <p className="text-white/40 text-sm">
                      No items found for "{query}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-white/20 text-[10px] uppercase tracking-[0.2em] text-center mt-10">
                Type to explore the collection...
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
