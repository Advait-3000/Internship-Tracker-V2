import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { addReview, updateInternStatus } from "../features/mentor/mentorSlice";
import { toSlug } from "./StudentProfile";
import {
  Users,
  FolderKanban,
  MessageSquarePlus,
  Star,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Search,
  Filter,
  ExternalLink,
  X,
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Briefcase
} from "lucide-react";

const statusClasses = (status) => {
  switch (status) {
    case "On Track":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "Completed":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "Needs Review":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "At Risk":
      return "bg-red-50 text-red-700 border border-red-200";
    case "In Progress":
      return "bg-indigo-50 text-indigo-700 border border-indigo-200";
    case "Planning":
      return "bg-purple-50 text-purple-700 border border-purple-200";
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200";
  }
};

const MentorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { assignedInterns, projects, reviews } = useSelector((state) => state.mentor);
  const { user } = useSelector((state) => state.auth);

  // Tab state (url-based or default 'interns')
  const activeTab = searchParams.get("tab") || "interns";
  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Review Modal state
  const [selectedInternForReview, setSelectedInternForReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleOpenReviewModal = (intern) => {
    setSelectedInternForReview(intern);
    setReviewRating(5);
    setReviewComment("");
  };

  const handleCloseReviewModal = () => {
    setSelectedInternForReview(null);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!selectedInternForReview || !reviewComment.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      internName: selectedInternForReview.name,
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    dispatch(addReview(newReview));
    setToastMessage(`Review submitted successfully for ${selectedInternForReview.name}!`);
    setTimeout(() => setToastMessage(""), 3500);
    handleCloseReviewModal();
  };

  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departmentStats = React.useMemo(() => {
    const counts = {
      "Computer Engineering": 0,
      "Information Technology": 0,
      "AIML": 0,
      "EXTC": 0,
      "AIDS": 0,
      "ECS": 0,
      "Civil Engineering": 0,
      "Mechanical Engineering": 0,
    };
    assignedInterns.forEach((intern) => {
      counts[intern.department] = (counts[intern.department] || 0) + 1;
    });
    return Object.entries(counts).map(([label, count]) => ({ label, count }));
  }, [assignedInterns]);

  const colsPerRow = React.useMemo(
    () => Math.max(2, Math.ceil(departmentStats.length / 2)),
    [departmentStats.length]
  );

  const gridColsClass =
    colsPerRow === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : colsPerRow === 4
      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      : colsPerRow === 3
      ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"
      : colsPerRow === 6
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  // Filtered lists
  const filteredInterns = assignedInterns.filter((intern) => {
    const matchesSearch =
      intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || intern.status === selectedStatus;
    const matchesDept = selectedDepartment === "All" || intern.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ─── Mentor Banner & Stats ─── */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0A192F] via-[#1E293B] to-[#312E81] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md mb-3">
              <Award className="w-3.5 h-3.5" />
              Mentor Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name || "Faculty Mentor"}!
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mt-1 max-w-xl">
              Monitor your assigned interns, track live project milestones, and leave official performance reviews.
            </p>
          </div>

          {/* Quick Tab Switch Buttons in Banner */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("interns")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "interns"
                  ? "bg-white text-gray-900 shadow-md"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Users className="w-4 h-4" />
              Interns List ({assignedInterns.length})
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-white text-gray-900 shadow-md"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              Project Lists ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "bg-white text-gray-900 shadow-md"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              Reviews Log ({reviews.length})
            </button>
          </div>
        </div>

        {/* 4 Quick Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-medium text-gray-300">Assigned Interns</div>
            <div className="text-2xl font-black mt-1 text-white">{assignedInterns.length}</div>
            <div className="text-[11px] font-semibold text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2 this month
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-medium text-gray-300">Active Projects</div>
            <div className="text-2xl font-black mt-1 text-white">{projects.length}</div>
            <div className="text-[11px] font-semibold text-blue-300 mt-1">
              4 In Progress
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-medium text-gray-300">Avg Intern Progress</div>
            <div className="text-2xl font-black mt-1 text-white">76%</div>
            <div className="text-[11px] font-semibold text-emerald-400 mt-1">
              On track rate 88%
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-medium text-gray-300">Total Reviews Left</div>
            <div className="text-2xl font-black mt-1 text-white">{reviews.length}</div>
            <div className="text-[11px] font-semibold text-purple-300 mt-1">
              Last review today
            </div>
          </div>
        </div>
      </div>

      {/* ─── Tab Header & Search/Filter Bar ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="inline-flex rounded-2xl bg-gray-200/60 p-1.5 gap-1 self-start">
          <button
            onClick={() => setActiveTab("interns")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "interns"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users className="w-4 h-4" />
            Interns List
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            Project Lists
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "reviews"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <MessageSquarePlus className="w-4 h-4" />
            Reviews Log
          </button>
        </div>

        {/* Search & Status Filter */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === "interns" ? "Search interns..." : "Search projects..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {activeTab === "interns" && (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="Needs Review">Needs Review</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
            </select>
          )}
        </div>
      </div>

      {/* ============================================================
          TAB 1: INTERNS LIST (Interactive Cards with Leave Review)
         ============================================================ */}
      {activeTab === "interns" && (
        <div className="space-y-6">
          {/* Balanced 2-Row Department Filter Cards (e.g. 8 depts -> 4 per row, 10 depts -> 5 per row) */}
          <div className={`grid gap-4 w-full ${gridColsClass}`}>
            {departmentStats.map((dept, idx) => {
              const colors = [
                "bg-blue-600 shadow-blue-200",
                "bg-emerald-600 shadow-emerald-200",
                "bg-amber-500 shadow-amber-200",
                "bg-purple-600 shadow-purple-200",
                "bg-rose-500 shadow-rose-200",
              ];
              const color = colors[idx % colors.length];
              const isSelected = selectedDepartment === dept.label;

              return (
                <div
                  key={dept.label}
                  onClick={() => setSelectedDepartment(isSelected ? "All" : dept.label)}
                  className={`bg-white rounded-[20px] px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer border-2 h-full ${
                    isSelected ? "border-indigo-500 shadow-indigo-100" : "border-transparent"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-white shadow-lg ${color} shrink-0`}
                  >
                    <Users className="w-6 h-6 stroke-[1.5px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">
                      {dept.count}
                    </h4>
                    <p className="text-xs font-bold text-gray-600 tracking-wide uppercase leading-snug break-words">
                      {dept.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <h2 className="text-lg font-bold text-gray-900">
              Assigned Interns ({filteredInterns.length})
              {selectedDepartment !== "All" && (
                <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {selectedDepartment}
                </span>
              )}
            </h2>
            <p className="text-xs text-gray-500">
              Click on any intern card to inspect their status or leave a review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredInterns.map((intern) => {
              const internReviews = reviews.filter((r) => r.internName === intern.name);
              const latestReview = internReviews[0];

              return (
                <div
                  key={intern.id}
                  onClick={() => handleOpenReviewModal(intern)}
                  className="group relative bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Avatar + Name + Status Pill */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={intern.avatar}
                          alt={intern.name}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                            {intern.name}
                          </h3>
                          <p className="text-xs text-gray-500">{intern.department}</p>
                        </div>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusClasses(intern.status)}`}>
                        {intern.status}
                      </span>
                    </div>

                    {/* Assigned Project */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Assigned Project
                      </div>
                      <div className="text-xs font-bold text-gray-800 mt-0.5 flex items-center justify-between">
                        <span>{intern.project}</span>
                        <span className="text-blue-600 font-extrabold">{intern.progress}%</span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1.5">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${intern.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Skills pills */}
                    {intern.skills && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {intern.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50/80 text-blue-700 border border-blue-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Reviews Info & Actions */}
                  <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs">
                      {latestReview ? (
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{latestReview.rating}/5</span>
                          <span className="text-gray-400 font-normal ml-1">({internReviews.length} reviews)</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs italic">No reviews yet</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/students/${toSlug(intern.name)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View Full Profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenReviewModal(intern);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <MessageSquarePlus className="w-3.5 h-3.5" />
                        <span>Leave Review</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 2: PROJECT LISTS
         ============================================================ */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Internship Projects ({filteredProjects.length})
            </h2>
            <p className="text-xs text-gray-500">
              Overview of all active internship projects and assigned mentee teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                        {proj.category || "Project"}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 mt-2">{proj.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusClasses(proj.status)}`}>
                      {proj.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Deadline: {proj.deadline || "Aug 30, 2026"}
                    </span>
                    <span className="font-bold text-gray-700">{proj.progress || 70}% Completed</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${proj.progress || 70}%` }}
                    />
                  </div>
                </div>

                {/* Assigned Interns */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Assigned Interns
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.assignedInterns?.map((name, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 flex items-center gap-1.5"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 3: REVIEWS LOG
         ============================================================ */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Submitted Performance Reviews ({reviews.length})
            </h2>
          </div>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
                    {rev.internName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900">{rev.internName}</h4>
                      <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                        {rev.rating}/5
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1.5">{rev.comment}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-medium text-gray-400 block">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          INTERACTIVE REVIEW MODAL / DRAWER
         ============================================================ */}
      {selectedInternForReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={handleCloseReviewModal}
        >
          <div
            className="bg-white rounded-[28px] shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseReviewModal}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Intern Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
              <img
                src={selectedInternForReview.avatar}
                alt={selectedInternForReview.name}
                className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedInternForReview.department}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  {selectedInternForReview.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Project: <span className="font-semibold text-gray-800">{selectedInternForReview.project}</span>
                </p>
              </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Performance Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= (hoverRating || reviewRating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm font-bold text-gray-800">
                    {reviewRating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Feedback & Review Comments
                </label>
                <textarea
                  rows="4"
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write constructive feedback, project milestones achieved, or recommendations for improvement..."
                  className="w-full p-3.5 text-xs text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Past reviews for this intern */}
              {(() => {
                const past = reviews.filter((r) => r.internName === selectedInternForReview.name);
                if (past.length === 0) return null;
                return (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Previous Reviews ({past.length})
                    </div>
                    <div className="max-h-28 overflow-y-auto space-y-2 pr-1">
                      {past.map((pr) => (
                        <div key={pr.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                          <div className="flex items-center justify-between font-bold text-gray-700">
                            <span className="flex items-center text-amber-500">
                              <Star className="w-3 h-3 fill-amber-400 mr-1" /> {pr.rating}/5
                            </span>
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
                <button
                  type="button"
                  onClick={handleCloseReviewModal}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Performance Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
