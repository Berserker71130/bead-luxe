"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* 1. BACKGROUND IMAGE & OVERLAY (Self-contained) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />{" "}
      {/* <--- CLOSED HERE! No content should be inside this div */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
      {/* 2. CONTENT (Now this can be centered properly) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 container flex flex-col items-center justify-center px-6 text-center"
      >
        <span className="mb-4 block text-xs font-medium tracking-[0.4em] text-[#C9A84C] uppercase">
          Est. 2024 -- Artisan Crafted
        </span>

        <h1 className="mb-6 font-serif text-5xl text-[#FDFBF7] md:text-7xl lg:text-8xl">
          Crafted For The Devoted
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-sm tracking-widest text-[#FDFBF7]/80 uppercase md:text-base">
          Rare beads and premium jewelry supplies for the modern visionary.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="w-full bg-[#C9A84C] px-10 py-4 text-xs font-bold tracking-widest text-black uppercase transition-all hover:bg-[#FDFBF7] sm:w-auto"
          >
            Shop Collection
          </Link>

          <Link
            href="/about"
            className="w-full border border-[#FDFBF7]/30 px-10 py-4 text-xs font-bold tracking-widest text-[#FDFBF7] uppercase transition-all hover:bg-[#FDFBF7]/10 sm:w-auto"
          >
            Our Story
          </Link>
        </div>
      </motion.div>
      {/* 3. SCROLL INDICATOR ARROW */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 z-20 flex flex-col items-center text-[#C9A84C]"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
