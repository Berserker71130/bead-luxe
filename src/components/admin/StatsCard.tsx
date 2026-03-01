import { LucideIcon } from "lucide-react";

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
  return (
    <div className="bg-[#111111] border border-white/5 p-6 rounded-3xl">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl text-[#C9A84C]">
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
}
