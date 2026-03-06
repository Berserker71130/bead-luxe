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

  // Live filtering logic
  const filteredResults = useMemo(() => {
    if (query.length < 2) return [];
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 6); //Limit to 6 results for clean UI
  }, [query]);

  //Reset query when modal closes
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[-100] animate-in fade-in duration-300" />

        <Dialog.Content className="fixed inset-0 z-[101] flex flex-col p-6 md:p-20 outline-none">
          <Dialog.Title className="sr-only">Search our Collection</Dialog.Title>
          <Dialog.Description className="sr-only">
            Type to search for jewelry, beads and luxury accessories.
          </Dialog.Description>
          {/* Header & Input */}
          <div className="max-w-4xl w-full mx-auto relative">
            <Search
              className="absolute left-0 top-1/2 -translate-y-1-1/2 text-[#C9A84C]"
              size={28}
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for luxury beads, watches, rings..."
              className="w-full bg-transparent border-b border-white/10 py-6 pl-12 pr-12 text-2xl md:text-4xl text-white outline-none focus:border-[#C9A84C] transition-colors font-light"
            />
            <Dialog.Close className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
              <X size={28} />
            </Dialog.Close>
          </div>

          {/* Result Area */}
          <div className="max-w-4xl w-full mx-auto mt-12 overflow-y-auto">
            {query.length > 2 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResults.length > 0 ? (
                  filteredResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C9A84C]/30 transition-all"
                    >
                      <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-white/5">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  ))
                ) : (
                  // No Results Empty State
                  <div className="col-span-full py-20 text-center">
                    <ShoppingBag
                      className="mx-auto text-white/10 mb-4"
                      size={48}
                    />
                    <p className="text-white/40">
                      No items found for '{query}'
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-white/20 text-sm uppercasetracking-[0.2em]">
                Type at least 2 characters to search...
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
