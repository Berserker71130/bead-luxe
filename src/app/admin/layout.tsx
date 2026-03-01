import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0F0F0F]">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Scrollable Content Area */}
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
