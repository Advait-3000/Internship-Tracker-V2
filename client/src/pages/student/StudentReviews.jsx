import React from "react";
import { useSelector } from "react-redux";
import { Star, MessageSquarePlus, Quote, Award, CalendarDays } from "lucide-react";

const StarRating = ({ rating, size = "w-4 h-4" }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`${size} ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
      />
    ))}
  </div>
);

const ratingLabel = (r) => {
  if (r >= 5) return { label: "Exceptional", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (r >= 4) return { label: "Excellent", color: "bg-blue-50 text-blue-700 border-blue-200" };
  if (r >= 3) return { label: "Good", color: "bg-amber-50 text-amber-700 border-amber-200" };
  return { label: "Needs Work", color: "bg-red-50 text-red-700 border-red-200" };
};

const StudentReviews = () => {
  const { user } = useSelector((s) => s.auth);
  const { reviews } = useSelector((s) => s.mentor);

  const myReviews = reviews.filter((r) => r.internName === user?.name);

  const avgRating =
    myReviews.length > 0
      ? myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length
      : 0;

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: myReviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">My Reviews</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Feedback left by your mentor throughout your internship.
        </p>
      </div>

      {myReviews.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <MessageSquarePlus className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No reviews yet</h3>
          <p className="text-sm text-gray-500 max-w-sm text-center">
            Your mentor hasn't left any reviews yet. Reviews will appear here once submitted.
          </p>
        </div>
      ) : (
        <>
          {/* ── Summary Stats ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Big rating display */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white text-center flex flex-col items-center justify-center">
              <p className="text-6xl font-black tracking-tight">{avgRating.toFixed(1)}</p>
              <StarRating rating={Math.round(avgRating)} size="w-5 h-5" />
              <p className="text-xs text-white/70 mt-2">{myReviews.length} review{myReviews.length !== 1 ? "s" : ""} from mentor</p>
            </div>

            {/* Rating Distribution */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Rating Breakdown</h3>
              <div className="space-y-2.5">
                {ratingDist.map(({ star, count }) => {
                  const pct = myReviews.length > 0 ? (count / myReviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-600 w-5 text-right">{star}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-4 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Review Cards ── */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">All Reviews</h3>
            {myReviews.map((review) => {
              const { label, color } = ratingLabel(review.rating);
              return (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Quote icon */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shrink-0">
                      <Quote className="w-5 h-5 fill-white" />
                    </div>

                    <div className="flex-1">
                      {/* Top row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-sm font-bold text-gray-900">Mentor Review</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <StarRating rating={review.rating} />
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
                                {label}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {review.date}
                        </div>
                      </div>

                      {/* Comment */}
                      <blockquote className="text-sm text-gray-700 leading-relaxed border-l-4 border-indigo-200 pl-4 italic">
                        "{review.comment}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Read-only notice ── */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <Award className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-700 font-medium">
              Reviews are submitted by your mentor and are <strong>read-only</strong>. Contact your mentor directly if you have questions about a review.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentReviews;
