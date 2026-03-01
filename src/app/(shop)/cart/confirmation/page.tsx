"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";

export default function ConfirmationPage() {
  // Generated a dummy order number for the UI
  const [orderNumber, setOrderNumber] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const generatedNumber = `BL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedNumber);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#0A0A0A]" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 pt-20">
      <div className="max-w-2xl w-full text-center space-y-10 bg-[#111111] p-12 rounded-3xl border border-[#C9A84C]/10 shadow-2xl">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-[#C9A84C]/10 ounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="text-[#C9A84C] w-14 h-14" />
            </div>
            <div className="absolute -top-2 -right-2 bg-[#C9A84C] text-[#0A0A0A] p-2 rounded-full">
              <Package size={16} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-[#FDFBF7] tracking-tight">
            Thank You for Your Purchase
          </h1>
          <p className="text-[#C9A84C] font-medium tracking-[0.2em] uppercase text-xs">
            Your Luxury Order is Confirmed
          </p>
          <div className="py-4 px-6 bg-white/5 rounded-2xl inline-block border border-white/5">
            <span className="text-white/40 text-sm mr-2">Order Number:</span>
            <span className="text-white font-mono font-bold">
              {orderNumber}
            </span>
          </div>
        </div>

        <p className="text-white/50 max-w-md mx-auto leading-relaxed">
          We are currently preparing your handcrafted beads for shipment. A
          confirmation email with tracking details has been sent to your inbox.
        </p>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0A0A0A] py-5 font-bold uppercase tracking-widest hover:bg-[#b39540] transition-all group"
          >
            Continue Shopping
            <ShoppingBag
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-white/10 text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Back to Home
          </Link>
        </div>

        <div className="pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-white/20 text-xs tracking-widest uppercase">
          <Package size={14} /> Estimated Delivery: 3 - 5 Business Days
        </div>
      </div>
    </div>
  );
}
