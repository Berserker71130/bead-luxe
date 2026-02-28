"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  Tag,
} from "lucide-react";

export default function CartPage() {
  const { items, updateQty, removeItem, getTotalPrice } = useCartStore();
  const [discountCode, setDiscountCode] = useState("");
  const subtotal = getTotalPrice();

  // Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 animate-pulse">
          <ShoppingBag size={40} className="text-white/20" />
        </div>

        <h1 className="text-4xl font-serif text-white mb-4">
          Your Bag Is Empty
        </h1>
        <p className="text-white/40 mb-10 max-w-md leading-relaxed">
          The gallery is waiting for your selection. Discover our handcrafted
          luxury pieces and start building your collection.
        </p>
        <Link
          href="/shop"
          className="group flex items-center gap-3 bg-[#C9A84C] text-black px-12 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[#B3933D] transition-all"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-5xl font-serif text-white mb-2">
              Shopping Bag
            </h1>
            <p className="text-white/40 text-sm tracking-widest uppercase">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              collection
            </p>
          </div>
          <Link
            href="/shop"
            className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] hover:underline flex item-center gap-2"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: Item List */}
          <div className="lg:col-span-8">
            <div className="space-y-10">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col sm:flex-row gap-8 py-8 border-b border-white/10 last:border-0"
                >
                  {/* Image */}
                  <div className="relative h-44 w-32 shrink-0 overflow-hidden rounded-sm bg-neutral-900">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium text-white group-hover:text-[#C9A84C] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2">
                          {item.category}
                        </p>
                      </div>
                      <span className="text-lg font-medium text-white">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-8 sm:mt-0">
                      {/* Qty Stepper */}
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="p-2 text-white/40 hover:text-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="p-2 text-white/40 hover:text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-widest text-white/20 mb-1">
                            Subtotal
                          </p>
                          <span className="text-[#C9A84C] font-bold">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <h2 className="text-xl font-serif text-white mb-8 italic">
                  Order Summary
                </h2>

                {/* Discount Input */}
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">
                    Promotional Code
                  </p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag
                        size={14}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                      />
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter code"
                        className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-xs text-white focus:border-[#C9A84C] outline-none transition-all"
                      />
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 uppercase tracking-tighter">
                      Subtotal
                    </span>
                    <span className="text-white font-medium">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 uppercase tracking-tighter">
                      Shipping Estimate
                    </span>
                    <span className="text-white/60 italic text-xs">
                      Calculated next
                    </span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                        Total
                      </span>
                      <p className="text-[10px] text-white/20 italic">
                        VAT Included
                      </p>
                    </div>
                    <span className="text-3xl font-serif text-[#C9A84C]">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-[#C9A84C] text-black flex items-center justify-center gap-4 py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-[#B3933D] transition-all group"
                >
                  Proceed to Checkout
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-4 py-4 px-8 border border-white/5 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                  Secure Checkout Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
