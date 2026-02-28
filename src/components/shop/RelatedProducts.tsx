import { products } from "@/lib/data/products";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export default function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {
  // Logic 1. Find products in the same category
  const related = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 pt-20 border-t border-white/10">
      <h2 className="text-2xl font-serif mb-10 text-[#FDFBF7]">
        You May Also Like
      </h2>

      {/* 4-col grid on desktop, scrollable on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 overflow-x-auto pb-4 md:pb-0">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
