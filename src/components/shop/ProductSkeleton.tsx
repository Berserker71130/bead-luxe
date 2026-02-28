export default function ProductSkeleton() {
  <div className="space-y-4">
    {/* Pulse Image */}
    <div className="aspect-[4/5] bg-white/5 rounded-2xl animate-pulse" />

    {/* Pulse Title */}
    <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse" />

    {/* Pulse Price */}
    <div className="h-4 bg-white/5 rounded-full w-1/4 animate-pulse" />
  </div>;
}
