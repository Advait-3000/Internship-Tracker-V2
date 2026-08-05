import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addReview } from "../../features/mentor/mentorSlice";
import { toSlug } from "../StudentProfile";
import {
  Users,
  Star,
  Send,
  Search,
  ExternalLink,
  X,
  MessageSquarePlus,
  Sparkles,
} from "lucide-react";

const statusClasses = (status) => {
  switch (status) {
    case "On Track": return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "Completed": return "bg-blue-50 text-blue-700 border border-blue-200";
    case "Needs Review": return "bg-amber-50 text-amber-700 border border-amber-200";
    case "At Risk": return "bg-red-50 text-red-700 border border-red-200";
    default: return "bg-gray-50 text-gray-700 border border-gray-200";
  }
};

const FacultyInternsPage = () => {
  const dispatch = useDispatch();
  const { list: facultyList } = useSelector((state) => state.faculty);
  const { reviews } = useSelector((state) => state.mentor);
  const { user } = useSelector((state) => state.auth);

  const currentFaculty = facultyList.find(f => f.id === user?.facultyId) || facultyList[0];
  const assignedInterns = currentFaculty?.assignedStudents || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [toastMessage, setToastMessage] = useState("");

  // Review Modal
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const openReviewModal = (intern) => {
    setSelectedIntern(intern);
    setReviewRating(5);
    setReviewComment("");
  };

  const closeReviewModal = () => setSelectedIntern(null);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!selectedIntern || !reviewComment.trim()) return;
    dispatch(addReview({
      id: `rev-${Date.now()}`,
      internName: selectedIntern.name,
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString().split("T")[0],
    }));
    setToastMessage(`Review submitted for ${selectedIntern.name}!`);
    setTimeout(() => setToastMessage(""), 3500);
    closeReviewModal();
  };

  const filtered = assignedInterns.filter((intern) => {
    const matchSearch = intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = selectedStatus === "All" || intern.status === selectedStatus;
    return matchSearch && matchStatus;
  });

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
          <h1 className="text-2xl font-extrabold text-gray-900">My Assigned Interns</h1>
          <p className="text-sm text-gray-500 mt-1">View student profiles, track progress, and leave performance reviews.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search interns..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer">
            <option value="All">All Statuses</option>
            <option value="On Track">On Track</option>
            <option value="Needs Review">Needs Review</option>
            <option value="At Risk">At Risk</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Count badge */}
      <div className="text-sm font-bold text-gray-700">
        Showing <span className="text-amber-600">{filtered.length}</span> of {assignedInterns.length} interns
      </div>

      {/* Intern Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((intern) => {
          const internReviews = reviews.filter((r) => r.internName === intern.name);
          const latestReview = internReviews[0];

          return (
            <div key={intern.id} onClick={() => openReviewModal(intern)}
              className="group relative bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-200 cursor-pointer flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 group-hover:scale-105 transition-transform flex items-center justify-center text-xl font-bold text-amber-700">
                      {intern.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{intern.name}</h3>
                      <p className="text-xs text-gray-500">{intern.department || "Information Technology"}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusClasses(intern.status)}`}>{intern.status}</span>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Assigned Project</div>
                  <div className="text-xs font-bold text-gray-800 mt-0.5">{intern.project}</div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${intern.progress || 60}%` }} />
                  </div>
                  <div className="text-right text-[10px] font-bold text-amber-600 mt-1">{intern.progress || 60}%</div>
                </div>

                {/* Letter status */}
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-gray-500 font-medium">Letter:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-md border ${
                    intern.internshipLetter?.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" :
                    intern.internshipLetter?.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    intern.internshipLetter?.status === "Rejected" ? "bg-red-50 text-red-700 border-red-200" :
                    "bg-gray-50 text-gray-500 border-gray-200"
                  }`}>{intern.internshipLetter?.status || "Not Uploaded"}</span>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs">
                  {latestReview ? (
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{latestReview.rating}/5</span>
                      <span className="text-gray-400 font-normal ml-1">({internReviews.length})</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">No reviews yet</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/students/${toSlug(intern.name)}`} onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="View Full Profile">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button type="button" onClick={(e) => { e.stopPropagation(); openReviewModal(intern); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer">
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    <span>Review</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {selectedIntern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={closeReviewModal}>
          <div className="bg-white rounded-[28px] shadow-2xl max-w-lg w-full border border-gray-100 p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeReviewModal} className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl font-bold text-amber-700">{selectedIntern.name.charAt(0)}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedIntern.name}</h3>
                <p className="text-xs text-gray-500">Project: <span className="font-semibold text-gray-800">{selectedIntern.project}</span></p>
              </div>
            </div>
            <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Performance Rating</label>
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
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Feedback & Comments</label>
                <textarea rows="4" required value={reviewComment} onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write constructive feedback..."
                  className="w-full p-3.5 text-xs text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
              </div>
              {/* Previous reviews */}
              {(() => {
                const past = reviews.filter((r) => r.internName === selectedIntern.name);
                if (past.length === 0) return null;
                return (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Previous Reviews ({past.length})</div>
                    <div className="max-h-28 overflow-y-auto space-y-2 pr-1">
                      {past.map((pr) => (
                        <div key={pr.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                          <div className="flex items-center justify-between font-bold text-gray-700">
                            <span className="flex items-center text-amber-500"><Star className="w-3 h-3 fill-amber-400 mr-1" /> {pr.rating}/5</span>
                            <span className="text-[10px] text-gray-400 font-normal">{pr.date}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{pr.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeReviewModal} className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md cursor-pointer"><Send className="w-3.5 h-3.5" /><span>Submit Review</span></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyInternsPage;
