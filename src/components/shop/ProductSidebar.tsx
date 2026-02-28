"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductSidebar() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const categories = [
    "Beads",
    "Jewelry Supplies",
    "Art Tools",
    "Fabric & Thread",
    "Kits & Bundles",
  ];

  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-bold uppercase text-xs tracking-[0.2em] mb-6 text-[#C9A84C]">
          Categories
        </h3>
        <ul className="space-y-4">
          <li>
            <Link
              href="/products"
              className={`text-sm ${!currentCategory ? "text-white" : "text-white/40"} hover:text-[#C9A84C] transition-colors`}
            >
              All Products
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/products?category=${encodeURIComponent(cat.toLocaleLowerCase())}`}
                className={`text-sm ${currentCategory === cat.toLowerCase() ? "text-[#C9A84C]" : "text-white/40"} hover:text-[#C9A84C] transition-colors`}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-10 border-t border-white/5">
        <h3 className="font-bold uppercase text-xs tracking-[0.2em] mb-6 text-[#C9A84C]">
          Price Range
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            className="w-full accent-[#C9A84C]"
            min="0"
            max="100000"
          />
          <div className="flex justify-between text-[10px] text-white/30 uppercase">
            <span> ₦0</span>
            <span> ₦100k+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
