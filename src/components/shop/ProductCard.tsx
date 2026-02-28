"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product } from "@/lib/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  // Connect to Wishlist Store
  const { addItem: addToWish, removeItem, items } = useWishlistStore();
  const isWishlisted = items.some((i) => i.id === product.id);

  const toggleWishlist = () => {
    isWishlisted ? removeItem(product.id) : addToWish(product);
  };

  return (
    <div className="group relative flex flex-col bg-[#111111] border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#C9A84C]/40">
      <div className="relative aspect-square overflow-hidden bg-[#1A1A1A]">
        {/* Image & Actions */}
        <Link
          href={`/product/${product.id}`}
          className="flex flex-col flex-grow"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        {/* Wishlist Toggle */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 transition-colors hover:bg-black/40"
        >
          <Heart
            size={18}
            className={
              isWishlisted ? "fill-[#C9A84C] text-[#C9A84C]" : "text-white"
            }
          />
        </button>

        {/* Quick Add Button (Hover) */}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-4 left-4 right-4 bg-[#FDFBF7] text-[#0A0A0A] py-2.5 rounded-lg font-semibold translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#C9A84C] hover:text-white"
        >
          Quick Add
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-[#C9A84C] text-[#C9A84C]" />
          ))}
          <span className="text-white/40 text-xs ml-1">(4.8)</span>
        </div>
        <h3 className="text-[#FDFBF7] font-medium text-base mb-2 line-clamp-1">
          {product.name}
        </h3>
        {/* ₦ */}
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
