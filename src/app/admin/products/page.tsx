"use client";

import ProductForm from "@/components/admin/ProductForm";
import ProductsTable from "@/components/admin/ProductsTable";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

// Dummy Data
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Royal Gold Waist Bead",
    category: "Waist Beads",
    price: 15000,
    stock: 45,
    status: "Active",
    image: "👑",
  },
  {
    id: 2,
    name: "Crystal Anklet",
    category: "Anklets",
    price: 8000,
    stock: 4,
    status: "Active",
    image: "✴",
  },
  {
    id: 3,
    name: "Matte Black Set",
    category: "Sets",
    price: 25000,
    stock: 0,
    status: "Draft",
    image: "❤",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
            Inventory
          </h1>
          <p className="text-sm text-white/40">
            Manage your product catalog and stock levels.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-[#C9A84C] text-black px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#E5C364] transition-all shrink-0"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#C9A84C]/50 outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="bg-[#111111] border border-white/5 rounded-xl px-4 py-3 text-sm outline-none">
          <option>All Categories</option>
          <option>Waist Beads</option>
          <option>Anklets</option>
        </select>
      </div>

      <ProductsTable
        products={products.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )}
        onDelete={handleDelete}
      />

      {/* Slide over from overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl h-full shadow-[-20px_0_50px_rgba(0,0,0,0.5)">
            <ProductForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
