"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Layers,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-[#0A0A0A] border-r border-white/5 flex flex-col sticky top-0 z-50 transition-all shadow-2xl overflow-hidden"
    >
      {/* Logo Area - FIXED: Removed isActive here because it doesn't belong in the logo */}
      <div className="p-6 flex items-center gap-4">
        <div className="w-8 h-8 bg-[#C9A84C] rounded-lg flex items-center justify-center shrink-0">
          <Crown size={20} className="text-black" />
        </div>
        {!isCollapsed && (
          <span className="font-serif text-lg tracking-widest text-white uppercase italic whitespace-nowrap">
            BeadLuxe
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="block">
              {/* FIXED: Removed *:flex and used standard flex for horizontal alignment */}
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-[#C9A84C] text-black"
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon
                  size={22}
                  className={
                    isActive ? "text-black" : "group-hover:text-[#C9A84C]"
                  }
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium tracking-wide whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="m-4 p-3 bg-white/5 rounded-xl text-white/40 hover:text-[#C9A84C] transition-colors flex justify-center"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </motion.aside>
  );
}
