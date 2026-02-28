"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 ">
      {/* Thumbnail Strip */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative aspect-square w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
              selectedImage === index
                ? "border-[#C9A84C]"
                : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white/5">
        <Image
          src={images[selectedImage]}
          alt="Main product image"
          fill
          priority
          className="object-cover transition-all duration-500"
        />
      </div>
    </div>
  );
}
