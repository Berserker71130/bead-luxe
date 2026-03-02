"use client";

import { Edit, Trash2 } from "lucide-react";

export default function ProductsTable({
  products,
  onDelete,
}: {
  products: any[];
  onDelete: (id: number) => void;
}) {
  return (
    <div className="ng-[#111111] border border-white/5 rounded-[2.5rem] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40">
            <tr>
              <th className="px-8 py-5">
                <input type="checkbox" className="accent-[#C9A84C" />
              </th>
              <th className="px-4 py-5">Product</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5">Price</th>
              <th className="px-8 py-5">Stock</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-8 py-5">
                  <input type="checkbox" className="accent-[#C9A84C]" />
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-xl border border-white/5">
                      {product.image}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-white/60">{product.category}</td>
                <td className="px-8 py-5 font-mono">
                  ₦{product.price.toLocaleString()}
                </td>
                <td className="px-8 py-5">
                  <span
                    className={
                      product.stock < 10
                        ? "text-red-500 font-bold"
                        : "text-white/60"
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px]font-bold uppercase ${
                      product.status === "Active"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:text-[#C9A84C] transition-colors">
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
