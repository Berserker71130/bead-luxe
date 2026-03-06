"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQty, getTotalPrice } = useCartStore();
  const subTotal = getTotalPrice();

  // Prevents the "Red Logo" (Hydration Error) by waiting for the browser
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal forceMount>
        <AnimatePresence mode="wait">
          {open && (
            <>
              {/* 1. Backdrop Overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              {/* 2. Slide-in Panel */}
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 z-[120] h-full w-full max-w-md bg-[#0A0A0A] outline-none border-l border-white/10 p-0 shadow-2xl flex flex-col"
                >
                  <Dialog.Title className="sr-only">Your Cart</Dialog.Title>

                  <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                      <h2 className="font-serif text-xl text-[#FDFBF7] flex items-center gap-3">
                        <ShoppingBag size={20} className="text-[#C9A84C]" />
                        Your Gallery Bag
                      </h2>
                      <Dialog.Close className="text-white/40 hover:text-white transition-colors">
                        <X size={24} />
                      </Dialog.Close>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                      {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                            <ShoppingBag size={32} className="text-white/10" />
                          </div>
                          <p className="text-white/40 uppercase tracking-widest text-xs">
                            Your bag is empty
                          </p>
                          <Dialog.Close className="text-[#C9A84C] text-sm hover:underline">
                            Start Shopping
                          </Dialog.Close>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded bg-white/5">
                                <Image
                                  src={item.images[0]}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div className="flex flex-1 flex-col justify-between py-1">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-medium text-white/90 leading-tight">
                                      {item.name}
                                    </h3>
                                    <button
                                      onClick={() => removeItem(item.id)}
                                      className="text-white/20 hover:text-red-400 transition-colors"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
                                    {item.category}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center border border-white/10 rounded-full px-2 py-1">
                                    <button
                                      onClick={() =>
                                        updateQty(item.id, item.quantity - 1)
                                      }
                                      className="p-1 hover:text-[#C9A84C]"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="w-8 text-center text-xs text-white">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQty(item.id, item.quantity + 1)
                                      }
                                      className="p-1 hover:text-[#C9A84C]"
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>
                                  <span className="text-sm font-medium text-[#C9A84C]">
                                    ₦
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer / Summary */}
                    {items.length > 0 && (
                      <div className="border-t border-white/10 bg-white/[0.02] px-6 py-8 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/40 uppercase tracking-wider">
                              Subtotal
                            </span>
                            <span className="text-white">
                              ₦{subTotal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/20">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                          </div>
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                          <Link
                            href="/cart/checkout"
                            onClick={() => setOpen(false)}
                            className="w-full bg-[#C9A84C] text-black text-center py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[#B3933D] transition-all"
                          >
                            Checkout Now
                          </Link>
                          <Link
                            href="/cart"
                            onClick={() => setOpen(false)}
                            className="w-full border border-white/10 text-white text-center py-4 rounded-full text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
                          >
                            View Full Bag
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
