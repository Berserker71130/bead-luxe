"use client";

import { Upload, X } from "lucide-react";
import { useState } from "react";

export default function ProductForm({ onClose }: { onClose: () => void }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full max-w-xl bg-[#0F0F0F] h-full shadow-2xl p-8 overflow-y-auto border-l border-white/5 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold uppercase tracking-wider">
          Product Details
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
          <X size={20} />
        </button>
      </div>

      <form className="space-y-6">
        {/* Image Upload Preview */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase text-white/40 font-bold">
            Product Image
          </label>
          <div className="h-40 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
            {imagePreview ? (
              <img
                src={imagePreview}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              <>
                <Upload size={24} className="text-white/20 mb-2" />
                <span className="text-xs text-white/20">
                  Click to upload image
                </span>
              </>
            )}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-white/40 font-bold">
              Product Name
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm focus:border-[#C9A84C]/50 outline-none"
              placeholder="e.g Royal Gold Bead"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold">
                Category
              </label>
              <select className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm outline-none">
                <option className="bg-[#111111] text-white">Waist Beads</option>
                <option className="bg-[#111111] text-white">Anklets</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold">
                Stock
              </label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold">
                Sale Price (₦)
              </label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm outline-none"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <button className="w-full bg-[#C9A84C] text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform">
          Save Product
        </button>
      </form>
    </div>
  );
}
