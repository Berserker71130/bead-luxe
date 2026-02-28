import { products } from "@/lib/data/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="py-16 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[#FDFBF7] font-serif text-4xl mb-8 text-center">
          Curated Selections
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="text-[#C9A84C] border border-[#C9A84C] px-6 py-2 rounded-full hover:bg-[#C9A84C] hover:text-white transition-all"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
