"use client";

import { ArrowLeft, CreditCard, MapPin, Package, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // In real world App, data will be fetched based on the id
  const order = {
    id: id,
    customer: "Amara Okoro",
    email: "amara@example.com",
    date: "March 03, 2026",
    status: "Pending",
    payment: "Paid(Flutterwave)",
    address: "123 Luxury Estate, Lekki Phase 1, Lagos",
    items: [
      { name: "Gold Waist Beads", price: 15000, qty: 2 },
      { name: "Crystal Anklet", price: 15000, qty: 1 },
    ],
    total: 45000,
  };

  return (
    <div className="max-w-5xl space-y-8 pb-20">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white/40 hover:text-[#C9A84C] transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>Back to Orders</span>
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="txt-3xl font-bold text-white uppercase tracking-tighter">
            Order {id}
          </h1>
          <p className="text-white/40">Placed on {order.date}</p>
        </div>

        {/* Status Update Dropdown */}
        <div className="flex items-center gap-3 bg-[#111111] border border-white/5 p-2 rounded-xl">
          <span className="text-xs text-white/40 ml-2">Status</span>
          <select className="bg-transparent text-sm font-bold text-[#C9A84C] outline-none cursor-pointer">
            <option className="bg-[#0F0F0F]">Pending</option>
            <option className="bg-[#0F0F0F]">Processing</option>
            <option className="bg-[#0F0F0F]">Shipped</option>
            <option className="bg-[#0F0F0F]">Delivered</option>
            <option className="bg-[#0F0F0F]">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Item List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 text-white font-bold mb-6">
              <Package size={18} className="text-[#C9A84C]" />
              Order Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-4 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-xs text-white/40">Qty: {item.qty}</p>
                  </div>
                  <p className="text-white">
                    ₦{(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 flex justify-between">
              <span className="text-white/40 font-bold uppercase tracking-widest text-xs">
                Total Amount
              </span>
              <span className="text-xl font-bold text-[#C9A84C]">
                ₦{order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: customer Info */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 text-white font-bold mb-4">
              <User size={18} className="text-[#C9A84C]" />
              Customer
            </h3>
            <p className="text-white">{order.customer}</p>
            <p className="text-sm text-white/40">{order.email}</p>
          </div>

          {/* Shipping Card */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 text-white font-bold mb-4">
              <MapPin size={18} className="text-[#C9A84C]" />
              Shipping Address
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {order.address}
            </p>
          </div>

          {/* Payment Card */}
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 text-white font-bold mb-4">
              <CreditCard size={18} className="text-[#C9A84C]" />
              Payment
            </h3>
            <p className="text-sm text-green-500 font-bold">{order.payment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
