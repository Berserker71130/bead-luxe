"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`, { scroll: true });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <button
        onClick={() => createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 border border-white/10 rounded-full disabled:opacity-20 hover:border-[#C9A84C] transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => createPageURL(page)}
            className={`w-10 h-10 rounded-full text-sm font-mono transition-all ${
              currentPage === page
                ? "bg-[#C9A84C] text-black fold-bold"
                : "hover: bg-white/5 text-white/60"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 border border-white/10 rounded-full disabled:opacity-20 hover:border-[#C9A84C] transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
