"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // 1. Added Autoplay module
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "@/lib/data/products";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // 2. Added autoplay css

export default function NewArrivalsCarousel() {
  const newArrivals = products.filter((product) => product.isNewArrival);

  return (
    <section className="py-12 md:py-20 bg-[#0A0A0A] overflow-hidden w-full relative">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex justify-between items-end mb-8 md:mb-10">
          <div>
            <h3 className="text-[#C9A84C] uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold mb-2">
              Just Landed
            </h3>
            <h2 className="text-[#FDFBF7] font-serif text-3xl md:text-4xl">
              New Arrivals
            </h2>
          </div>

          <div className="hidden sm:flex gap-4">
            <button className="swiper-prev-btn p-2 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all rounded-full outline-none">
              <ChevronLeft size={20} />
            </button>
            <button className="swiper-next-btn p-2 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all rounded-full outline-none">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]} // 3. Added Autoplay to modules
          navigation={{
            prevEl: ".swiper-prev-btn",
            nextEl: ".swiper-next-btn",
          }}
          // 4. Autoplay Logic
          autoplay={{
            delay: 3000, // Moves every 3 seconds
            disableOnInteraction: false, // Restart autoplay after user interaction
            pauseOnMouseEnter: true, // IMPORTANT: Stops when Bianca hovers over a card
          }}
          loop={true} // Makes it an infinite scroll
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 20 }, // Adjusted to match "smaller cards" vibe
            640: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 5, spaceBetween: 24 }, // Show more on desktop since they are smaller
          }}
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
