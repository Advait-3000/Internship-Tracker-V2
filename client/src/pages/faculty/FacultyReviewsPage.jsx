import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReview } from "../../features/mentor/mentorSlice";
import {
  Star,
  Send,
  Search,
  Sparkles,
  MessageSquarePlus,
  X,
} from "lucide-react";

const FacultyReviewsPage = () => {
  const dispatch = useDispatch();
  const { list: facultyList } = useSelector((state) => state.faculty);
  const { reviews } = useSelector((state) => state.mentor);
  const { user } = useSelector((state) => state.auth);

  const currentFaculty = facultyList.find(f => f.id === user?.facultyId) || facultyList[0];
  const assignedInterns = currentFaculty?.assignedStudents || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Quick review form
  const [showQuickReview, setShowQuickReview] = useState(false);
  const [selectedInternName, setSelectedInternName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!selectedInternName || !reviewComment.trim()) return;
    dispatch(addReview({
      id: `rev-${Date.now()}`,
      internName: selectedInternName,
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString().split("T")[0],
    }));
    setToastMessage(`Review submitted for ${selectedInternName}!`);
    setTimeout(() => setToastMessage(""), 3500);
    setShowQuickReview(false);
    setSelectedInternName("");
    setReviewRating(5);
    setReviewComment("");
  };

  const filteredReviews = reviews.filter((rev) =>
    rev.internName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-gray-700">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Performance Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">Review history and submit new performance evaluations for your interns.</p>
        </div>
        <button onClick={() => setShowQuickReview(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer">
          <MessageSquarePlus className="w-4 h-4" />
          New Review
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search reviews..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquarePlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-sm font-bold text-gray-500">No reviews found</h3>
            <p className="text-xs text-gray-400 mt-1">Click "New Review" to submit one.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base shrink-0 border border-amber-200">
                  {rev.internName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-gray-900">{rev.internName}</h4>
                    <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />{rev.rating}/5
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5 max-w-xl">{rev.comment}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-medium text-gray-400 block">{rev.date}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Review Modal */}
      {showQuickReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={() => setShowQuickReview(false)}>
          <div className="bg-white rounded-[28px] shadow-2xl max-w-lg w-full border border-gray-100 p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQuickReview(false)} className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="text-lg font-bold text-gray-900 mb-1">New Performance Review</h2>
            <p className="text-xs text-gray-500 mb-5">Select an intern and submit your evaluation.</p>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Intern</label>
                <select required value={selectedInternName} onChange={(e) => setSelectedInternName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer appearance-none">
                  <option value="">Choose an intern…</option>
                  {assignedInterns.map((intern) => (
                    <option key={intern.id} value={intern.name}>{intern.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setReviewRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                      className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
                      <Star className={`w-7 h-7 transition-colors ${star <= (hoverRating || reviewRating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                    </button>
                  ))}
                  <span className="ml-3 text-sm font-bold text-gray-800">{reviewRating}/5</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Feedback</label>
                <textarea rows="4" required value={reviewComment} onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write constructive feedback..."
                  className="w-full p-3.5 text-xs text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowQuickReview(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md cursor-pointer"><Send className="w-3.5 h-3.5" /><span>Submit Review</span></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyReviewsPage;
