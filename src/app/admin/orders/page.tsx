"use client";

import OrdersTable from "@/components/admin/OrdersTable";
import { Search } from "lucide-react";
import { useState } from "react";

const TABS = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
          Orders
        </h1>
        <p className="text-sm text-white/40">
          Track and manage customer purchases.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === tab
                ? "bg-[#C9A84C] text-black font-bold"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by Order # or Customer..."
          className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#C9A84C]/50 outline-none text-white"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <OrdersTable activeTab={activeTab} searchQuery={searchQuery} />
    </div>
  );
}
