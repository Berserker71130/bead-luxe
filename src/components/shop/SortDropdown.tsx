"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);

    //This pushes the new sort value into the URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      onChange={handleSortChange}
      defaultValue={searchParams.get("sort") || "featured"}
      className="bg-white/5 border border-white/10 px-4 py-2 text-sm rounded-sm focus:outline-none focus:border-[#C9A84C] text-white cursor-pointer "
    >
      <option value="featured" className="bg-[#0A0A0A]">
        Featured
      </option>
      <option value="price-asc" className="bg-[#0A0A0A]">
        Price: Low to High
      </option>
      <option value="price-desc" className="bg-[#0A0A0A]">
        Price: High to Low
      </option>
    </select>
  );
}
