"use client";

import { Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// DUMMY_DATA
const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Luxury Watches",
    slug: "luxury-watches",
    count: 24,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
  },
  {
    id: 2,
    name: "Diamond Rings",
    slug: "diamond-rings",
    count: 18,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
  },
  {
    id: 3,
    name: "Gold Bracelets",
    slug: "gold-bracelets",
    count: 12,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  //   Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    description: "",
  });

  // Auto generate Slug from Name
  useEffect(() => {
    const slug = formData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  }, [formData.name]);

  const handleSave = () => {
    if (editingId) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, ...formData } : cat,
        ),
      );
    } else {
      setCategories([...categories, { ...formData, id: Date.now(), count: 0 }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: "", slug: "", image: "", description: "" });
  };

  const deleteCategory = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
            Categories
          </h1>
          <p className="text-sm text-white/40">
            Manage your product groupings and hierarchy.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C9A84C] hover:bg-[#A88C3D] text-black px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm transition-all"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C9A84C]/30 transition-all"
          >
            <div className="h-40 overflow-hidden relative">
              <img
                src={cat.image || "api/placeholder/400/200"}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs text-[#C9A84c] font-bold uppercase tracking-widest">
                    {cat.count} Products
                  </p>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                </div>
              </div>
            </div>

            <div className="p-4 flex justify-between items-center">
              <span className="text-xs text-white/40 font-mono">
                /{cat.slug}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(cat.id);
                    setFormData(cat as any);
                    setIsModalOpen(true);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-[#0F0F0F] border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingId ? "Edit" : "Add"} Category
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/40 uppercase mb-2 block">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C9A84C]/50"
                  placeholder="e.g Luxury Watches"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/40 uppercase mb-2 block">
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  readOnly
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white/40 outline-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/40 uppercase mb-2 block">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C9A84C]/50"
                  placeholder="https://images..."
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-[#C9A84C] text-black font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Save size={18} /> {editingId ? "Update" : "Create"} Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
