"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react"; // ADDED for better mobile tap affordance

const DUMMY_ORDERS = [
  {
    id: "ORD-7721",
    customer: "Amara Okoro",
    date: "2026-03-03",
    items: 3,
    total: 45000,
    pStatus: "Paid",
    fStatus: "Pending",
  },
  {
    id: "ORD-7722",
    customer: "Manasseh Elias",
    date: "2026-03-02",
    items: 1,
    total: 12000,
    pStatus: "Pending",
    fStatus: "Processing",
  },
  {
    id: "ORD-7723",
    customer: "Zainab Yusuf",
    date: "2026-03-01",
    items: 2,
    total: 25000,
    pStatus: "Paid",
    fStatus: "Shipped",
  },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Shipped: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  Delivered: "bg-green-500/10 text-green-500 border-green-500/20",
  Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function OrdersTable({
  activeTab,
  searchQuery,
}: {
  activeTab: string;
  searchQuery: string;
}) {
  const router = useRouter();

  const filteredOrders = DUMMY_ORDERS.filter((order) => {
    const matchesTab = activeTab === "All" || order.fStatus === activeTab;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
      {/* 1. DESKTOP VIEW: Standard Table (Visible on md and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-white/40 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Items</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Fulfillment</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                onClick={() => router.push(`/admin/orders/${order.id}`)}
                className="group hover:bg-white/[0.02] cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm text-white/60">
                  {order.customer}
                </td>
                <td className="px-6 py-4 text-sm text-white/60">
                  {order.items} items
                </td>
                <td className="px-6 py-4 text-sm font-bold text-[#C9A84C]">
                  ₦{order.total.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${statusStyles[order.fStatus]}`}
                  >
                    {order.fStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#C9A84C] text-xs hover:underline uppercase tracking-widest font-bold">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. MOBILE VIEW: Card Layout (Visible below md) */}
      <div className="md:hidden divide-y divide-white/5">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => router.push(`/admin/orders/${order.id}`)}
              className="p-5 flex flex-col gap-4 active:bg-white/5 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[#C9A84C] font-mono text-sm font-bold">
                    {order.id}
                  </p>
                  <p className="text-white font-medium mt-1">
                    {order.customer}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[9px] font-bold border ${statusStyles[order.fStatus]}`}
                >
                  {order.fStatus}
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter">
                    {order.items} items • {order.date}
                  </p>
                  <p className="text-lg font-bold text-white">
                    ₦{order.total.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
                  Details <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-white/20 text-sm">
            No orders found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
