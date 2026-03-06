"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  // 1. ANIMATION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each element appearing
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* BACKGROUND IMAGE & OVERLAY */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

      {/* 2. STAGGERED CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 container flex flex-col items-center justify-center px-6 text-center max-w-full"
      >
        <motion.span
          variants={itemVariants}
          className="mb-4 block text-[10px] md:text-xs font-medium tracking-[0.4em] text-[#C9A84C] uppercase"
        >
          Est. 2024 -- Artisan Crafted
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="mb-6 font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#FDFBF7] leading-tight break-words"
        >
          Crafted For <br className="sm:hidden" /> The Devoted
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-[280px] sm:max-w-lg text-[10px] md:text-sm tracking-widest text-[#FDFBF7]/80 uppercase md:text-base leading-relaxed"
        >
          Rare beads and premium jewelry supplies for the modern visionary.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto px-4 sm:px-0"
        >
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-[#C9A84C] px-10 py-4 text-[10px] md:text-xs font-bold tracking-widest text-black uppercase transition-all hover:bg-[#FDFBF7]"
          >
            Shop Collection
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto border border-[#FDFBF7]/30 px-10 py-4 text-[10px] md:text-xs font-bold tracking-widest text-[#FDFBF7] uppercase transition-all hover:bg-[#FDFBF7]/10"
          >
            Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* 3. SCROLL INDICATOR ARROW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { repeat: Infinity, duration: 2 },
        }}
        className="absolute bottom-10 z-20 flex flex-col items-center text-[#C9A84C]"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
