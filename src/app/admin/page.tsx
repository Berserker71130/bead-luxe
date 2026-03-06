"use client";

import {
  DollarSign,
  ShoppingBag,
  Box,
  Users,
  AlertTriangle,
  X, // Added for UI
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import RevenueChart from "@/components/admin/RevenueChart";

export default function AdminDashboard() {
  const recentOrders = [
    {
      id: "#ORD-9921",
      user: "Amara K.",
      date: "Oct 12, 2023",
      price: "₦15,000",
      status: "Paid",
    },
    {
      id: "#ORD-9922",
      user: "Tunde O.",
      date: "Oct 11, 2023",
      price: "₦42,500",
      status: "Processing",
    },
  ];

  return (
    // ADJUSTMENT: Added responsive padding (p-4 on mobile, p-10 on desktop)
    <div className="p-4 md:p-10 space-y-10 max-w-[1600px] mx-auto overflow-x-hidden">
      {/* 1. KPI Header - Grid adjusts columns based on screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          title="Total Revenue"
          value="₦2,450,000"
          icon={DollarSign}
          trend="12%"
          isUp={true}
        />
        <StatsCard
          title="Orders Today"
          value="48"
          icon={ShoppingBag}
          trend="5%"
          isUp={true}
        />
        <StatsCard
          title="Total Products"
          value="156"
          icon={Box}
          trend="2%"
          isUp={false}
        />
        <StatsCard
          title="Active Customers"
          value="1,240"
          icon={Users}
          trend="18%"
          isUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Main Revenue Chart */}
        <div className="lg:col-span-2 w-full overflow-hidden">
          <RevenueChart />
        </div>

        {/* 3. Orders by Category */}
        <div className="bg-[#111111] border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem]">
          <h3 className="text-lg font-medium mb-6">Orders by Category</h3>
          <div className="flex justify-center items-center h-48 relative">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/5"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="440"
                strokeDashoffset="110"
                className="text-[#C9A84C]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">75%</span>
              <span className="text-[10px] text-white/40 uppercase">
                Waist Beads
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-white/60">
              <span>Waist Beads</span>
              <span>75%</span>
            </div>
            <div className="flex justify-between text-xs text-white/20">
              <span>Anklets</span>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 4. Recent Orders Section - RESPONSIVE FIX */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <button className="text-xs text-[#C9A84C] hover:underline">
              View All
            </button>
          </div>

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40">
                <tr>
                  <th className="px-8 py-4">Order #</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-6 font-mono text-[#C9A84C]">
                      {order.id}
                    </td>
                    <td className="px-8 py-6">{order.user}</td>
                    <td className="px-8 py-6 text-white/40">{order.date}</td>
                    <td className="px-8 py-6">{order.price}</td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === "Paid" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Visible < 768px) */}
          <div className="md:hidden divide-y divide-white/5">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[#C9A84C] text-sm">
                    {order.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${order.status === "Paid" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white font-medium">{order.user}</span>
                  <span className="text-white/80">{order.price}</span>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                  {order.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Top Selling & Low Stock */}
        <div className="space-y-8 pb-10">
          <div className="bg-[#111111] border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem]">
            <h3 className="text-lg font-medium mb-6">Top Selling</h3>
            <div className="space-y-4">
              {[
                { name: "Royal Gold Bead", sales: "1,200 units", img: "👑" },
                { name: "Crystal Anklet", sales: "850 units", img: "✨" },
              ].map((prod) => (
                <div key={prod.name} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    {prod.img}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{prod.name}</p>
                    <p className="text-[10px] text-white/40">{prod.sales}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111111] border border-orange-500/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem]">
            <div className="flex items-center gap-3 mb-6 text-orange-500">
              <AlertTriangle size={20} />
              <h3 className="text-lg font-medium">Low Stock</h3>
            </div>
            <div className="space-y-4 text-sm font-medium">
              <p className="text-xs text-white/40 font-normal">
                Items with stock &lt; 10
              </p>
              <div className="flex justify-between items-center">
                <span>Golden Crystal Bead</span>
                <span className="text-orange-500 bg-orange-500/10 px-2 py-1 rounded text-xs">
                  4 Left
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
