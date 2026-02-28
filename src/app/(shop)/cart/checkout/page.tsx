"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import {
  Check,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  Truck,
  Icon,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, name: "Shipping", icon: Truck },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Review", icon: ShoppingBag },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [hasMounted, setHasMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const subTotal = getTotalPrice();
  const shipping = 2500; //Flat rate for luxury delivery
  const total = subTotal + shipping;

  if (!hasMounted) {
    return <div className="min-h-screen bg-[#0A0A0A]" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 1. Step Indicator */}
        <div className="flex items-center justify-center mb-16">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    currentStep >= step.id
                      ? "border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A]"
                      : "border-white/10 text-white/30"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                <span
                  className={`absolute -bottom-7 text-[10px] uppercase tracking-widest font-medium whitespace-nowrap ${
                    currentStep >= step.id ? "text-[#C9A84C]" : "text-white/20"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {idx !== steps.length - 1 && (
                <div
                  className={`w-20 h-[2px] mx-4 transition-colors duration-500 ${
                    currentStep > step.id ? "bg-[#C9A84C]" : "bg-white/10"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap--12 items-start">
          {/* 2. Main Form Area (Left) */}
          <div className="lg:col-span-2 bg-[#111111] border border-white/5 p-8 rounded-2xl">
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif text-[#FDFBF7]">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="bg-black/40 border border-white/10 p-4 rounded.xl text-white outline-none focus:border-[#C9A84C]/50"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-black/40 border border-white/10 p-4 rounded.xl text-white outline-none focus:border-[#C9A84C]/50"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-black/40 border border-white/10 p-4 rounded.xl text-white outline-none focus:border-[#C9A84C]/50"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="bg-black/40 border border-white/10 p-4 rounded.xl text-white outline-none focus:border-[#C9A84C]/50"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C9A84C]/50"
                />

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="save"
                    className="accent-[#C9A84C] w-4 h-4"
                  />
                  <label htmlFor="save" className="text-white/60 text-sm">
                    Save this address for future luxury orders
                  </label>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-[#C9A84C] text-[#0A0A0A] py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#b39540] transition-all flex items-center justify-center gap-2"
                >
                  Continue to Payment <ChevronRight size={18} />
                </button>
              </div>
            )}
            {/* --- STEP 2: PAYMENT --- */}
            {currentStep === 2 && (
              <div className="bg-[#111111] border border-white/5 p-8 rounded-2xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-4 mb-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[#C9A84C] hover:underline text-sm flex items-center gap-1"
                  >
                    <ArrowLeft size={16} /> Back to Shipping
                  </button>
                </div>

                <h2 className="text-2xl font-serif text-[#FDFBF7]">
                  Payment Method
                </h2>

                {/* Payment Tabs */}
                <div className="flex flex-wrap gap-3 border-b border-white/5 pb-8">
                  {["Card", "Bank Transfer", "Pay on Delivery"].map(
                    (method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method.toLowerCase())}
                        className={`px-6 py-3 rounded-xl border text-xs uppercase tracking-widest transition-all ${
                          paymentMethod === method.toLowerCase()
                            ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/5"
                            : "border-white/10 text-white/40 hover:border-white/20"
                        }`}
                      >
                        {method}
                      </button>
                    ),
                  )}
                </div>

                {/* Card Details (Mockup) */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C9A84C]/50"
                    />
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C9A84C]/50"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C9A84C]/50"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C9A84C]/50"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank transfer" && (
                  <div className="p-6 bg-black/40 border border-white/10 rounded-xl text-white/60 text-sm">
                    <p>Transfer to: **BeadLuxe Luxury Ltd**</p>
                    <p>Bank: **Zenith Bank**</p>
                    <p>Account: **1234567890**</p>
                  </div>
                )}

                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full bg-[#C9A84C] text-[#0A0A0A] py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#b39540] transition-all flex items-center justify-center gap-2"
                >
                  Review Order <ChevronRight size={18} />
                </button>
              </div>
            )}
            {/* STEP:3 REVIEW */}
            currentStep === 3 && (
            <div className="bg-[#111111] border border-white/5 p-8 rounded-2xl space-y-8 animate-in fade-in skide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 mb-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-[#C9A84C] hover:underline text-sm flex items-center gap-1"
                >
                  <ArrowLeft size={16} />
                  Back to Payment
                </button>
              </div>

              <h2 className="text-2xl font-serif text-[#FDFBF7]">
                Review Your Order
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A84C]">
                    Shipping To
                  </p>
                  <p className="text-white/80 text-sm">
                    Edges Enterprises <br />
                    123 Bead Street, Abuja
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A84C]">
                    Payment Method
                  </p>
                  <p className="text-white/80 text-sm uppercase">
                    {paymentMethod}
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/5 pt-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-black/20 p-4 rounded-xl"
                  >
                    <span className="text-white/70 text-sm">
                      {item.name}
                      <span className="text-[#C9A84C] ml-2">
                        x{item.quantity}
                      </span>
                    </span>

                    <span className="text-white font-medium">
                      ₦ {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  clearCart();
                  router.push("/cart/confirmation");
                }}
                className="w-full bg-[#C9A84C] text-[#0A0A0A] py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#b39540] transition-all flex items-center justify-center gap-2"
              >
                Place Luxury Order
              </button>
            </div>
            )
          </div>

          {/* 3. Order Summary (Right) */}
          <div className="bg-[#111111] border border-[#C9A84C]/10 p-8 rounded-2xl sticky top-32">
            <h3 className="text-xl font-serif text-[#FDFBF7] mb-6">
              Order Summary
            </h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/60">
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="text-white">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 pt-4 space-y-3">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>₦{subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span>₦{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#C9A84C] pt-2">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
