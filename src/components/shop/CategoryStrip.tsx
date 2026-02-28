"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data/categories";

const CategoryStrip = () => {
  return (
    <section className="bg-[#0A0A0A] py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center font-serif text-3xl tracking-widest text-[#FDFBF7] uppercase">
          Our Collections
        </h2>

        <div className="no-scrollbar flex snap-x gap-8 overflow-x-auto pb-10">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] min-w-[300px] flex-shrink-0 snap-center"
            >
              <Link href={`/products?category=${cat.slug}`}>
                <div className="relative h-full w-full overflow-hidden border border-[#C9A84C]/20 transition-all duration-500 group-hover:border-[#C9A84C]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-8">
                    <h3 className="mb-1 font-serif text-2xl text-[#FDFBF7]">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] font-bold tracking-[0.4em] text-[#C9A84C] uppercase">
                      Explore
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryStrip;
