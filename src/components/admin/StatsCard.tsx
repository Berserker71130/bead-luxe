"use client";

import { LucideIcon } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  isUp: boolean;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  isUp,
}: StatsCardProps) {
  // 1. Convert string (e.g., "₦2,450,000") to number (2450000)
  const numericValue = Number(value.replace(/[^0-9.-]+/g, ""));
  const count = useMotionValue(0);

  // 2. Format back to string with currency/commas as it animates
  const displayValue = useTransform(count, (latest) => {
    const formatted = Math.round(latest).toLocaleString();
    return value.includes("₦") ? `₦${formatted}` : formatted;
  });

  useEffect(() => {
    // Animate from 0 to the target value over 2 seconds
    const controls = animate(count, numericValue, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1], // Luxury "expo" ease out
    });
    return () => controls.stop();
  }, [numericValue, count]);

  return (
    <div className="bg-[#111111] border border-white/5 p-6 rounded-3xl transition-all hover:border-[#C9A84C]/20 group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl text-[#C9A84C] group-hover:bg-[#C9A84C]/10 group-hover:scale-110 transition-all">
          <Icon size={24} />
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            isUp
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {isUp ? "↑" : "↓"} {trend}
        </span>
      </div>

      <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-1 font-medium">
        {title}
      </p>

      {/* 3. The Animated Number */}
      <motion.h3 className="text-2xl font-bold text-white tabular-nums">
        {displayValue}
      </motion.h3>
    </div>
  );
}
