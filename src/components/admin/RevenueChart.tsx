"use client";

export default function RevenueChart() {
  const data = [40, 70, 45, 90, 65, 80, 95];

  return (
    <div className="bg-[#111111] border border-white/5 p-8 rounded-[2.5rem] h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-lg font-medium text-white">Revenue Growth</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">
            Weekly Analytics
          </p>
        </div>
        <select className="bg-black text-[10px] text-white/40 border border-white/10 rounded-lg px-3 py-1.5 outline-none hover:border-[#C9A84C]/50 transition-colors cursor-pointer uppercase tracking-wider">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      {/* Chart Area */}
      <div className="flex items-end justify-between h-64 gap-3">
        {data.map((height, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-4 group h-full justify-end"
          >
            {/* The Bar */}
            <div
              className="w-full bg-[#C9A84C]/10 group-hover:bg-[#C9A84C] transition-all duration-500 rounded-t-xl relative"
              style={{ height: `${height}%` }}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-extrabold px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10">
                ₦{height}k
              </div>
            </div>

            {/* Label */}
            <span className="text-[10px] text-white/20 uppercase tracking-tighter font-medium">
              Day {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
