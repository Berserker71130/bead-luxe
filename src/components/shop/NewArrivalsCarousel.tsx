"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "@/lib/data/products";
import "swiper/css";
import "swiper/css/navigation";

export default function NewArrivalsCarousel() {
  const newArrivals = products.filter((product) => product.isNewArrival);

  return (
    // ADJUSTMENT: Added 'w-full' and 'relative' to ensure containment
    <section className="py-12 md:py-20 bg-[#0A0A0A] overflow-hidden w-full relative">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header Section: Adjusted for mobile spacing */}
        <div className="flex justify-between items-end mb-8 md:mb-10">
          <div>
            <h3 className="text-[#C9A84C] uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold mb-2">
              Just Landed
            </h3>
            <h2 className="text-[#FDFBF7] font-serif text-3xl md:text-4xl">
              New Arrivals
            </h2>
          </div>

          {/* Custom Navigation Arrows: Hidden on smallest mobile for cleaner UI */}
          <div className="hidden sm:flex gap-4">
            <button className="swiper-prev-btn p-2 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all rounded-full outline-none">
              <ChevronLeft size={20} />
            </button>
            <button className="swiper-next-btn p-2 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all rounded-full outline-none">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Swiper Container: Optimized breakpoints */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-prev-btn",
            nextEl: ".swiper-next-btn",
          }}
          spaceBetween={16} // Reduced gap for mobile
          slidesPerView={1.2} // Original 1.2 is perfect for mobile "hinting"
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 20 },
            640: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          // ADJUSTMENT: Overflow visible is fine as long as the Section parent is overflow-hidden
          className="!overflow-visible"
        >
          {newArrivals.map((product) => (
            <SwiperSlide key={product.id} className="pb-4">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
