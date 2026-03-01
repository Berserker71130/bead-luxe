"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  Camera,
  ChevronRight,
  LogOut,
  ShoppingBag,
  Trash2,
} from "lucide-react";

// Dummy Data for Orders
const DUMMY_ORDERS = [
  { id: "ORD-7721", date: "Oct 24, 2025", status: "Delivered", total: 150000 },
  { id: "ORD-8832", date: "Nov 12, 2025", status: "Processing", total: 85000 },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState("Profile");
  const [isHydrated, setIsHydrated] = useState(false);

  //1.   Wait for Zustand to load from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 2.  PROTECTED ROUTE CHECK
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show Nothing(or a spinner) untill we know the auth status
  if (!isHydrated || !isAuthenticated || !user) {
    return null;
  }

  const tabs = [
    { name: "Profile", icon: User },
    { name: "My Orders", icon: Package },
    { name: "Wishlist", icon: Heart },
    { name: "Addresses", icon: MapPin },
    { name: "Settings", icon: Settings },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#FDFBF7] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-serif mb-2">My Account</h1>
          <p className="text-white/40 uppercase tracking-[0.2em] text-xs">
            Welcome Back, {user.name}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${
                  activeTab === tab.name
                    ? "bg-[#C9A84C] text-black font-bold"
                    : "text-white/60 hover:bg-white/5"
                }`}
              >
                <tab.icon size={20} />
                <span className="text-sm uppercase tracking-widest">
                  {tab.name}
                </span>
              </button>
            ))}
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-red-500/60 hover:bg-red-500/10 transition-all mt-8"
            >
              <LogOut size={20} />
              <span className="text-sm uppercase tracking-widest">Logout</span>
            </button>
          </aside>

          {/* MAIN CONTENT AREA */}
          <section className="flex-1 bg-[#111111] rounded-[2.5em] border border-white/5 p-8 mf:p-12 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* PROFILE TAB */}
                {activeTab === "Profile" && (
                  <div className="space-y-10">
                    <div className="flex items-center gap-8">
                      <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border-2 border-[#C9A84C]/20 flex items-center justify-center overflow-hidden">
                          <User size={40} className="text-white/20" />
                        </div>
                        <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Camera size={20} className="text-[#C9A84C]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium">{user.name}</h3>
                        <p className="text-white/40 text-sm">{user.email}</p>
                      </div>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#C9A84C]">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full bg-black/40 border border-white/5 rounded-xl p-4 focus:outline-none focus:border-[#C9A84C]/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#C9A84C]">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full bg-black/40 border border-white/5 rounded-xl p-4 focus:outline-none focus:border-[#C9A84C]/50"
                        />
                      </div>
                      <button className="bg-[#C9A84C] text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all w-fit">
                        Update Profile
                      </button>
                    </form>
                  </div>
                )}

                {/* ORDERS TAB */}
                {activeTab === "My Orders" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif mb-6">Order History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/40">
                            <th className="pb-4">Order</th>
                            <th className="pb-4">Date</th>
                            <th className="pb-4">Statue</th>
                            <th className="pb-4">Total</th>
                            <th className="pb-4">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {DUMMY_ORDERS.map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-white/5 hover:b-white/[0.02] transition-colors"
                            >
                              <td className="py-6 font-mono text-[#C9A84C]">
                                {order.id}
                              </td>
                              <td className="py-6 text-white/60">
                                {order.date}
                              </td>
                              <td className="py-6">
                                <span
                                  className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold ${
                                    order.status === "Delivered"
                                      ? "bg-green-500/10 text-green-500"
                                      : "bg-orange-500/10 text-orange-500"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-6 text-white/90">
                                ₦{order.total.toLocaleString()}
                              </td>
                              <td className="py-6">
                                <button className="text-white/40 hover:text-[#C9A84C] flex items-center gap-1 group">
                                  View{" "}
                                  <ChevronRight
                                    size={14}
                                    className="group-hover:translate-x-1 transition-transform"
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* WISHLIST TAB */}
                {activeTab === "Wishlist" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex gap-6 group">
                      <div className="w-24 h-24 bg-[#1A1A1A] rounded-xl overflow-hidden shrink-0">
                        {/* Placeholder for product image */}
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-sm font-medium">
                            Luxe Gold Bead
                          </h4>
                          <p className="text-[#C9A84C] text-sm mt-1">₦45,000</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:text-[#C9A84C] transition-colors">
                            <ShoppingBag size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ADDRESSES TAB */}
                {activeTab === "Addresses" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-6 rounded-2xl relative">
                        <span className="absolute top-4 right-4 bg-[#C9A84C] text-black text-[9px] font-bold px-2 py-1 rounded uppercase">
                          Default
                        </span>
                        <p className="text-white/60 text-sm leading-relaxed">
                          123 Luxury Avenue, <br />
                          Victoria Island, Lagos, <br />
                          Nigeria
                        </p>
                      </div>
                      <button className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-white/20 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all group">
                        <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-2xl">+</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold">
                          Add New Address
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}
