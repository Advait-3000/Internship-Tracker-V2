import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Users,
  FileCheck,
  MessageSquarePlus,
  FolderKanban,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const FacultyDashboardPage = () => {
  const { list: facultyList } = useSelector((state) => state.faculty);
  const { reviews } = useSelector((state) => state.mentor);
  const { user } = useSelector((state) => state.auth);

  const currentFaculty = facultyList.find(f => f.id === user?.facultyId) || facultyList[0];
  const assignedInterns = currentFaculty?.assignedStudents || [];

  const pendingLetters = assignedInterns.filter(i => i.internshipLetter?.status === "Pending").length;
  const approvedLetters = assignedInterns.filter(i => i.internshipLetter?.status === "Approved").length;
  const onTrackCount = assignedInterns.filter(i => i.status === "On Track").length;
  const atRiskCount = assignedInterns.filter(i => i.status === "At Risk").length;
  const completedCount = assignedInterns.filter(i => i.status === "Completed").length;
  const needsReviewCount = assignedInterns.filter(i => i.status === "Needs Review").length;

  return (
    <div className="space-y-8 pb-12">
      {/* ─── Faculty Banner ─── */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#78350F] via-[#92400E] to-[#B45309] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full transform -translate-x-16 translate-y-16" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-200 backdrop-blur-md mb-3">
            <Award className="w-3.5 h-3.5" />
            Faculty Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {currentFaculty?.name || user?.name || "Faculty"}!
          </h1>
          <p className="text-sm sm:text-base text-amber-100 mt-1 max-w-xl">
            Monitor your assigned interns, evaluate progress, review projects, and approve internship letters — all from one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-medium text-amber-100">Assigned Interns</div>
            <div className="text-2xl font-black mt-1 text-white">{assignedInterns.length}</div>
            <div className="text-[11px] font-semibold text-emerald-300 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Quota: {currentFaculty?.studentQuota || 50}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-medium text-amber-100">Pending Letters</div>
            <div className="text-2xl font-black mt-1 text-white">{pendingLetters}</div>
            <div className="text-[11px] font-semibold text-yellow-300 mt-1">
              {approvedLetters} approved
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-medium text-amber-100">On Track</div>
            <div className="text-2xl font-black mt-1 text-white">{onTrackCount}</div>
            <div className="text-[11px] font-semibold text-red-300 mt-1">
              {atRiskCount} at risk
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-medium text-amber-100">Total Reviews</div>
            <div className="text-2xl font-black mt-1 text-white">{reviews.length}</div>
            <div className="text-[11px] font-semibold text-blue-300 mt-1">
              {completedCount} internships completed
            </div>
          </div>
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link to="/faculty/interns" className="group bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mt-4">Manage Interns</h3>
          <p className="text-xs text-gray-500 mt-1">View profiles and progress of your {assignedInterns.length} assigned students</p>
        </Link>

        <Link to="/faculty/letters" className="group bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <FileCheck className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mt-4">Internship Letters</h3>
          <p className="text-xs text-gray-500 mt-1">{pendingLetters} letters pending your approval</p>
        </Link>

        <Link to="/faculty/reviews" className="group bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <MessageSquarePlus className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mt-4">Performance Reviews</h3>
          <p className="text-xs text-gray-500 mt-1">{reviews.length} reviews submitted</p>
        </Link>

        <Link to="/faculty/projects" className="group bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FolderKanban className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mt-4">Projects</h3>
          <p className="text-xs text-gray-500 mt-1">Monitor ongoing internship projects</p>
        </Link>
      </div>

      {/* ─── Status Breakdown ─── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Intern Status Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
            <div>
              <div className="text-2xl font-extrabold text-gray-900">{onTrackCount}</div>
              <div className="text-xs font-bold text-emerald-700">On Track</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
            <Clock className="w-8 h-8 text-amber-600" />
            <div>
              <div className="text-2xl font-extrabold text-gray-900">{needsReviewCount}</div>
              <div className="text-xs font-bold text-amber-700">Needs Review</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50 border border-red-100">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-2xl font-extrabold text-gray-900">{atRiskCount}</div>
              <div className="text-xs font-bold text-red-700">At Risk</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
            <CheckCircle className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-extrabold text-gray-900">{completedCount}</div>
              <div className="text-xs font-bold text-blue-700">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Recent Interns Preview ─── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Recent Assigned Interns</h2>
          <Link to="/faculty/interns" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                <th className="pb-3 pr-4">Student</th>
                <th className="pb-3 pr-4">Project</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Letter</th>
              </tr>
            </thead>
            <tbody>
              {assignedInterns.slice(0, 6).map((intern) => (
                <tr key={intern.id} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-700">
                        {intern.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-gray-900">{intern.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-600">{intern.project}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      intern.status === "On Track" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      intern.status === "At Risk" ? "bg-red-50 text-red-700 border border-red-200" :
                      intern.status === "Completed" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                      "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {intern.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      intern.internshipLetter?.status === "Approved" ? "bg-green-100 text-green-800 border-green-200" :
                      intern.internshipLetter?.status === "Pending" ? "bg-amber-100 text-amber-800 border-amber-200" :
                      intern.internshipLetter?.status === "Rejected" ? "bg-red-100 text-red-800 border-red-200" :
                      "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>
                      {intern.internshipLetter?.status || "Not Uploaded"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboardPage;
