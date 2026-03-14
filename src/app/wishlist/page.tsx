"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import { Trash2 } from "lucide-react"; // Import the trash icon
import PageTransition from "@/components/ui/PageTransition";

export default function WishlistPage() {
  // Pull both 'items' and 'removeItem' from existing store
  const { items, removeItem } = useWishlistStore();

  return (
    <PageTransition>
      <main className="bg-[#0A0A0A] min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl mb-8 text-[#FDFBF7]">
            Your Wishlist
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40 mb-6">
                Your wishlist is currently empty.
              </p>
              <Link
                href="/products"
                className="bg-[#C9A84C] text-black px-8 py-3 rounded-full font-bold hover:bg-[#B3933D] transition-all"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {items.map((product) => (
                <div key={product.id} className="relative group">
                  {/* THE DELETE BUTTON: Only shows on hover */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute top-4 right-4 z-30 bg-black/80 backdrop-blur-md p-2.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10 hover:bg-red-500 hover:text-white shadow-xl"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/*EXISTING CARD */}
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
