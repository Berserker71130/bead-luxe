import { keyframes } from "framer-motion";

export default function Marquee() {
  const text =
    "Handcrafted · Premium Quality · Artisan Beads · Free Shipping Over ₦50,000 ·";

  return (
    <div className="bg-[#0A0A0A] border-y border-[#C9A84C]/20 py-4 overflow-hidden white space-nowrap">
      <div className="flex animate-marquee">
        <span className="text-[#C9A84C] uppercase tracking-[0.3em] text-sm font-medium pr-4">
          {text + text + text}
        </span>
      </div>
    </div>
  );
}
