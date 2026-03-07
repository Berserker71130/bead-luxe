"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  DollarSign,
  ShoppingBag,
  Box,
  Users,
  AlertTriangle,
} from "lucide-react";
import RevenueChart from "@/components/admin/RevenueChart";

// 1. INTERNAL ANIMATION COMPONENT
const AnimatedStat = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericTarget = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const isCurrency = value.includes("₦");

  useEffect(() => {
    let start = 0;
    const end = numericTarget;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericTarget]);

  return (
    <span>
      {isCurrency ? "₦" : ""}
      {displayValue.toLocaleString()}
    </span>
  );
};

// 2. INTERNAL STATS CARD (Merged with your styling)
interface StatsCardProps {
  title: string;
  value: ReactNode; // Changed to ReactNode to accept the Animated component
  icon: any;
  trend: string;
  isUp: boolean;
}

const LocalStatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  isUp,
}: StatsCardProps) => (
  <div className="bg-[#111111] border border-white/5 p-6 rounded-3xl transition-all hover:border-[#C9A84C]/20 group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/5 rounded-2xl text-[#C9A84C] group-hover:bg-[#C9A84C]/10 transition-colors">
        <Icon size={24} />
      </div>
      <span
        className={`text-xs font-medium px-2 py-1 rounded-lg ${isUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
      >
        {isUp ? "↑" : "↓"} {trend}
      </span>
    </div>
    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
      {title}
    </p>
    <h3 className="text-2xl font-bold text-white">{value}</h3>
  </div>
);

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
    <div className="p-4 md:p-10 space-y-10 max-w-[1600px] mx-auto overflow-x-hidden">
      {/* 1. KPI Header - Using the LocalStatsCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <LocalStatsCard
          title="Total Revenue"
          value={<AnimatedStat value="₦2,450,000" />}
          icon={DollarSign}
          trend="12%"
          isUp={true}
        />
        <LocalStatsCard
          title="Orders Today"
          value={<AnimatedStat value="48" />}
          icon={ShoppingBag}
          trend="5%"
          isUp={true}
        />
        <LocalStatsCard
          title="Total Products"
          value={<AnimatedStat value="156" />}
          icon={Box}
          trend="2%"
          isUp={false}
        />
        <LocalStatsCard
          title="Active Customers"
          value={<AnimatedStat value="1,240" />}
          icon={Users}
          trend="18%"
          isUp={true}
        />
      </div>

      {/* 2. Charts & Other Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 w-full overflow-hidden">
          <RevenueChart />
        </div>

        <div className="bg-[#111111] border border-white/5 p-6 md:p-8 rounded-[2rem]">
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
        </div>
      </div>

      {/* 3. Recent Activity Table */}
      <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-medium">Recent Activity</h3>
        </div>
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
      </div>

      {/* 4. Bottom Section: Low Stock */}
      <div className="bg-[#111111] border border-orange-500/10 p-6 md:p-8 rounded-[2rem]">
        <div className="flex items-center gap-3 mb-6 text-orange-500">
          <AlertTriangle size={20} />
          <h3 className="text-lg font-medium">Low Stock</h3>
        </div>
        <div className="flex justify-between items-center text-sm font-medium">
          <span>Golden Crystal Bead</span>
          <span className="text-orange-500 bg-orange-500/10 px-2 py-1 rounded text-xs">
            4 Left
          </span>
        </div>
      </div>
    </div>
  );
}
