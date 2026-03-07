import { products } from "@/lib/data/products";
import { ChevronRight } from "lucide-react";
import SortDropdown from "@/components/shop/SortDropdown";
import FilterSidebar from "@/components/shop/FilterSidebar";
import FilterChips from "@/components/shop/FilterChips";
import ProductGrid from "@/components/shop/ProductGrid";
import Pagination from "@/components/shop/Pagination";
import { Suspense } from "react";

// 1. This is a small internal loading component so we don't need a separate file
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] bg-white/5 rounded-2xl relative overflow-hidden"
        >
          {/* This div creates the shimmer effect */}
          <div className="absolute inset-0-translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 tp-transparent" />
        </div>
      ))}
    </div>
  );
}

export default async function ProductPage(props: {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    page?: string;
  }>;
}) {
  const params = await props.searchParams;
  const categoryParam = params.category;
  const sort = params.sort;
  const minPrice = Number(params.min) || 0;
  const maxPrice = Number(params.max) || 1000000;

  const ITEMS_PER_PAGE = 12;
  const currentPage = Number(params.page) || 1;

  let filteredProducts = [...products];

  // FILTERING
  if (categoryParam) {
    const selectedCategories = categoryParam.split(",");
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.category.toLowerCase()),
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice,
  );

  // SORTING
  if (sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-24 pb-20 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 mb-4">
          <span>Home</span> <ChevronRight size={12} />{" "}
          <span className="text-[#C9A84C]">The Collection</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="font-serif text-5xl mb-2">The Collection</h1>
            <p className="text-white/50 text-sm">
              Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
              products
            </p>
          </div>
          <SortDropdown />
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <aside className="w-full md:w-64 shrink-0">
            <FilterSidebar />
          </aside>

          <div className="flex-1">
            <FilterChips
              categoryParam={categoryParam}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />

            {/* KEY FIX: We use Suspense with a key to force re-render on navigation */}
            <Suspense key={JSON.stringify(params)} fallback={<GridSkeleton />}>
              {filteredProducts.length > 0 ? (
                <>
                  <ProductGrid products={paginatedProducts} />
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl">
                  <p className="text-white/30 italic">
                    No products match your current filters.
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
