"use client";
import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Review } from "@/lib/data/reviews";

interface ReviewsSectionProps {
  productId: string;
  reviews: Review[];
}

export default function ReviewsSection({
  productId,
  reviews,
}: ReviewsSectionProps) {
  const [sortBy, setSortBy] = useState<"newest" | "helpful">("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Calculate stats (Simple & direct, no useMemo needed!)
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage:
      totalReviews > 0
        ? (reviews.filter((r) => r.rating === star).length / totalReviews) * 100
        : 0,
  }));

  // 2. Sorting Logic
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "helpful") return b.isHelpful - a.isHelpful;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section className="mt-20 pt-20 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEFT: Summary */}
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-serif mb-6 text-[#FDFBF7]">
            Customer Reviews
          </h2>
          <div className="flex items-end gap-4 mb-8">
            <span className="text-6xl font-light text-[#C9A84C]">
              {averageRating.toFixed(1)}
            </span>
            <div className="mb-2">
              <div className="flex text-[#C9A84C] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.floor(averageRating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-white/40">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {ratingCounts.map((item) => (
              <div key={item.star} className="flex items-center gap-4 text-sm">
                <span className="text-white/60 w-4">{item.star}</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A84C] rounded-full" // Fixed missing #
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-white/30 w-8">{item.count}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 border border-[#C9A84C] text-[#C9A84C] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C9A84C] hover:text-black transition-all"
          >
            Write a Review
          </button>
        </div>

        {/* RIGHT: List */}
        <div className="lg:col-span-8">
          <div className="flex gap-6 border-b border-white/5 mb-8">
            {["newest", "helpful"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSortBy(tab as any)}
                className={`text-xs uppercase tracking-[0.2em] pb-4 transition-all border-b-2 ${
                  sortBy === tab
                    ? "border-[#C9A84C] text-[#FDFBF7]"
                    : "border-transparent text-white/40"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex text-[#C9A84C] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium text-[#FDFBF7]">
                      {review.userName}
                    </h4>
                  </div>
                  <span className="text-xs text-white/30">{review.date}</span>
                </div>
                <p className="text-white/60 leading-relaxed mb-4 text-sm">
                  {review.comment}
                </p>
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-[#C9A84C] transition-colors">
                  <ThumbsUp size={12} />
                  Helpful ({review.isHelpful})
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL (Fixed structure) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-[#111111] border border-white/10 p-8 rounded-2xl w-full max-w-lg animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-serif mb-6 text-[#FDFBF7]">
              Share your experience
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#C9A84C]"
              />
              <textarea
                placeholder="Your Review"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#C9A84C]"
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-[#C9A84C] text-black font-bold py-4 rounded-full uppercase tracking-widest text-xs"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
