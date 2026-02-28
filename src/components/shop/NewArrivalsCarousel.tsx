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
  // Filter new arrivals
  const newArrivals = products.filter((product) => product.isNewArrival);

  return (
    <section className="py-20 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-[#C9A84C] uppercase tracking-[0.3em] text-xs font-semibold mb-2">
              Just Landed
            </h3>
            <h2 className="text-[#FDFBF7] font-serif text-4xl ">
              New Arrivals
            </h2>
          </div>

          {/* Custom Navigation Arrows */}
          <div className="flex gap-4">
            <button className="swiper-prev-btn p-2 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all rounded-full">
              <ChevronLeft size={20} />
            </button>
            <button className="swiper-next-btn p-2 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[0A0A0A] transition-all rounded-full">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-prev-btn",
            nextEl: ".swiper-next-btn",
          }}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="!overflow-visible"
        >
          {newArrivals.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
