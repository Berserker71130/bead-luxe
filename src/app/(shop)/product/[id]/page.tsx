import { products } from "@/lib/data/products";
import { notFound } from "next/navigation";
import {
  Star,
  Heart,
  Share2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import ImageGallery from "@/components/shop/ImageGallery";
import ReviewsSection from "@/components/shop/ReviewsSection";
import { reviews } from "@/lib/data/reviews";
import RelatedProducts from "@/components/shop/RelatedProducts";

// Generate Static Params for SEO & Speed
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const product = products.find((p) => p.id === id);

  if (!product) {
    console.log("Product not found in data array");
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-28 pb-20 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT: Image Gallery */}
          <ImageGallery images={product.images} />

          {/* RIGHT: Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="font-serif text-4xl md:text-5xl mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-[#C9A84C]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={
                        i < Math.floor(product.rating) ? "currentColor" : "none"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-white/60">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-white/20">|</span>
                <span className="text-xs uppercase tracking-widest text-[#C9A84C]">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-light">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-white/30 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-[#C9A84C]/10 text-[#C9A84C] text-xs px-2 py-1 rounded">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-white/60 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-white/10 rounded-full px-4 py-2">
                  <button className="hover:text-[#C9A84C] transition-colors">
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium">1</span>
                  <button className="hover:text-[#C9A84c] transition-colors">
                    <Plus size={18} />
                  </button>
                </div>
                <button className="flex-1 bg-[#C9A84C] hover:bg-[#B3933D] text-black font-bold py-4 rounded-full transition-all active:scale-[0.98]">
                  ADD TO CART
                </button>
                <button className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Product Details Accordion */}
            <div className="border-t border-white/10 mt-10">
              {[
                {
                  id: "description",
                  title: "Description & Details",
                  content: product.description,
                  bullets: product.details,
                },
                {
                  id: "materials",
                  title: "Materials & Care",
                  content:
                    "Crafted with the finest materials selected for their durability and aesthetic appeal.",
                  bullets: [
                    "Premium Gold Plating",
                    "Grade AAA Gemstones",
                    "Hand-polished finish",
                  ],
                },
                {
                  id: "shipping",
                  title: "Shipping & Returns",
                  content:
                    "We offer secure, insured shipping worldwide to ensure your masterpiece arrives safely.",
                  bullets: [
                    "Free express shipping over ₦150,000",
                    "30-day return policy",
                    "Insured packaging",
                  ],
                },
              ].map((section) => (
                <details
                  key={section.id}
                  className="group border-b border-white/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between py-5 cursor-pointer list-none">
                    <span className="text-sm uppercase tracking-[0.2em] font-medium text-white/90 group-hover:text-[#C9A84C] transition-colors">
                      {section.title}
                    </span>
                    <span className="relative flex items-center justify-center w-5 h-5">
                      <Plus
                        size={16}
                        className="absolute transition-transform duration-300 group-open:rotate-90 group-open:opacity-0"
                      />
                      <Minus
                        size={16}
                        className="absolute transition-transform duration-300 opacity-0 rotate-[-90deg] group-open:rotate-0 group-open:opacity-100"
                      />
                    </span>
                  </summary>
                  <div className="pb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {section.content}
                    </p>
                    {section.bullets && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                        {section.bullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-white/40"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#C9A84C] shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
            </div>

            {/* Trust Badges & Sharing */}
            <div className="mt-10 flex flex-wrap items-center gap-8 py-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/40">
                <ShieldCheck size={18} className="text-[#C9A84C]" />
                Secure Checkout
              </div>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/40">
                <Share2
                  size={18}
                  className="text-[#C9A84C] cursor-pointer hover:text-white transition-colors"
                />
                Share Piece
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-8 mb-8">
          <RelatedProducts
            currentProductId={product.id}
            category={product.category}
          />
        </div>

        {/* --- REVIEW SECTION --- */}
        <div className="mt-8">
          <ReviewsSection
            productId={product.id}
            reviews={reviews.filter((r) => r.productId === product.id)}
          />
        </div>
      </div>

      {/* --- STICKY MOBILE BAR --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 animate-in slide-in-from-bottom-full duration-500">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-white/40">
              Total
            </span>
            <span className="text-lg font-bold text-[#C9A84C]">
              ₦{product.price.toLocaleString()}
            </span>
          </div>
          <button className="flex-1 bg-[#C9A84C] text-black text-[10px] font-black py-4 rounded-full tracking-[0.2em] uppercase active:scale-95 transition-all shadow-[0_10px_20px_rgba(201,168,76,0.2)]">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
