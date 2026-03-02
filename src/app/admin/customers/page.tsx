"use client";

import { useState } from "react";
import { Search, UserCircle, X, ShoppingBag, TrendingUp } from "lucide-react";

const DUMMY_CUSTOMERS = [
  {
    id: 1,
    name: "Amara Okoro",
    email: "amara@example.com",
    joined: "Jan 12, 2026",
    orders: 12,
    spent: 155000,
    status: "Active",
    address: "Lekki, Lagos",
    phone: "+234 801 234 5678",
  },
  {
    id: 2,
    name: "Kofi Mensah",
    email: "kofi.m@gmail.com",
    joined: "Feb 05, 2026",
    orders: 3,
    spent: 42000,
    status: "Active",
    address: "Accra, Ghana",
    phone: "+233 241 000 0000",
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null); // State for the Drawer

  const filteredCustomers = DUMMY_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="relative min-h-screen">
      <div className="space-y-8 pb-20">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
            Customer Directory
          </h1>
          <p className="text-sm text-white/40">Manage your member base.</p>
        </div>

        {/* Search Header */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#C9A84C]/50 outline-none text-white"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-white/40 text-xs uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedCustomer(user)}
                  className="group hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <UserCircle size={32} className="text-[#C9A84C]" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-white/40">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#C9A84C]">
                    ₦{user.spent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold border bg-green-500/10 text-green-500 border-green-500/20">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER DETAIL DRAWER */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay to close */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCustomer(null)}
          />

          {/* Side Panel */}
          <div className="relative w-full max-w-md bg-[#0F0F0F] border-l border-white/10 h-full p-8 shadow-2xl animate-in slide-in-from-right duration-300">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-6 right-6 text-white/40 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="mt-10 space-y-8">
              {/* Profile Info */}
              <div className="text-center">
                <div className="w-20 h-20 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C9A84C]/20">
                  <UserCircle size={48} className="text-[#C9A84C]" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {selectedCustomer.name}
                </h2>
                <p className="text-white/40 text-sm">
                  {selectedCustomer.email}
                </p>
              </div>

              {/* Total Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <ShoppingBag size={16} className="text-[#C9A84C] mb-2" />
                  <p className="text-xs text-white/40 uppercase">Orders</p>
                  <p className="text-lg font-bold text-white">
                    {selectedCustomer.orders}
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <TrendingUp size={16} className="text-[#C9A84C] mb-2" />
                  <p className="text-xs text-white/40 uppercase">Spent</p>
                  <p className="text-lg font-bold text-white">
                    ₦{selectedCustomer.spent.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Order History List */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                  Order History
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex justify-between items-center text-sm">
                    <span className="text-white/60 font-mono">#ORD-7721</span>
                    <span className="text-[#C9A84C]">₦15,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
