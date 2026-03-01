"use client";

import { useAuthStore } from "@/store/authStore";
import { Bell, User, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <header className="h-20 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Breadcrumb Placeholder */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
        <span className="text-white/40">Admin</span>
        <span className="text-white/20">/</span>
        <span className="text-[#C9A84C]">Dashboard</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="relative text-white/40 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#C9A84C] rounded-full"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-white/5 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              {user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-[#C9A84C] uppercase tracking-widest">
              Master Access
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#C9A84C]/20 flex items-center justify-center overflow-hidden">
            <User size={20} className="text-white/20" />
          </div>
        </div>
      </div>
    </header>
  );
}
