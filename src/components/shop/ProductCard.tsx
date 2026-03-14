"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product } from "@/lib/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import Link from "next/link";
import { useToastStore } from "@/store/toastStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);
  const { addItem: addToWish, removeItem, items } = useWishlistStore();
  const isWishlisted = items.some((i) => i.id === product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeItem(product.id);
      addToast(
        "Removed from Wishlist",
        "info",
        `${product.name} has been removed.`,
      );
    } else {
      addToWish(product);
      addToast("Added to Wishlist", "info", `${product.name} saved for later.`);
    }
  };

  return (
    /* 1. MOVED HOVER EFFECTS TO THE VERY TOP WRAPPER */
    <div className="group relative flex flex-col bg-[#111111] border border-white/5 rounded-xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#C9A84C]/40 hover:shadow-[0_20px_40px_rgba(201,168,76,0.15)]">
      <div className="relative aspect-square w-full overflow-hidden">
        {/* 2. SIMPLIFIED LINK (Removing the conflicting lift classes here) */}
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
          />
          {/* Subtle Golden Overlay on hover */}
          <div className="absolute inset-0 bg-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Wishlist Toggle */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 z-20 transition-all hover:scale-110"
        >
          <Heart
            size={18}
            className={
              isWishlisted ? "fill-[#C9A84C] text-[#C9A84C]" : "text-white"
            }
          />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={() => {
            addItem(product);
            addToast(
              "Added to Cart",
              "success",
              `${product.name} is now in your cart.`,
            );
          }}
          className="absolute bottom-3 left-3 right-3 bg-[#FDFBF7] text-[#0A0A0A] py-1.5 rounded-md text-xs font-semibold translate-y-12 opacity-0 transition-all duration-500 z-20 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#C9A84C] hover:text-white"
        >
          Quick Add
        </button>
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col flex-grow relative z-10">
        <div className="flex items-center gap-0.5 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-[#C9A84C] text-[#C9A84C]" />
          ))}
          <span className="text-white/40 text-xs ml-1">(4.8)</span>
        </div>

        <h3 className="text-[#FDFBF7] font-medium text-sm mb-1 line-clamp-1 group-hover:text-[#C9A84C] transition-colors duration-300">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center gap-3">
          <span className="text-[#C9A84C] font-bold text-lg">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-white/30 line-through text-sm">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
