import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateInternshipLetterStatus } from "../../features/faculty/facultySlice";
import {
  FileCheck,
  ExternalLink,
  Check,
  XCircle,
  Search,
  Sparkles,
  Filter,
} from "lucide-react";

const letterStatusClasses = (status) => {
  switch (status) {
    case "Approved": return "bg-green-100 text-green-800 border-green-200";
    case "Pending": return "bg-amber-100 text-amber-800 border-amber-200";
    case "Rejected": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

const FacultyLettersPage = () => {
  const dispatch = useDispatch();
  const { list: facultyList } = useSelector((state) => state.faculty);
  const { user } = useSelector((state) => state.auth);

  const currentFaculty = facultyList.find(f => f.id === user?.facultyId) || facultyList[0];
  const assignedInterns = currentFaculty?.assignedStudents || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [toastMessage, setToastMessage] = useState("");

  const handleUpdateLetter = (internId, newStatus) => {
    dispatch(updateInternshipLetterStatus({
      facultyId: currentFaculty.id,
      studentId: internId,
      status: newStatus,
    }));
    setToastMessage(`Letter ${newStatus.toLowerCase()} successfully!`);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const filtered = assignedInterns.filter((intern) => {
    const letterStatus = intern.internshipLetter?.status || "Not Uploaded";
    const matchSearch = intern.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filterStatus === "All" || letterStatus === filterStatus;
    return matchSearch && matchFilter;
  });

  const pendingCount = assignedInterns.filter(i => i.internshipLetter?.status === "Pending").length;
  const approvedCount = assignedInterns.filter(i => i.internshipLetter?.status === "Approved").length;
  const rejectedCount = assignedInterns.filter(i => i.internshipLetter?.status === "Rejected").length;
  const notUploadedCount = assignedInterns.filter(i => !i.internshipLetter?.status || i.internshipLetter?.status === "Not Uploaded").length;

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
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Internship Letters</h1>
        <p className="text-sm text-gray-500 mt-1">Review, approve, or reject internship letters uploaded by your assigned students.</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div onClick={() => setFilterStatus("Pending")}
          className={`bg-white rounded-2xl border p-4 shadow-xs hover:shadow-md transition-all cursor-pointer ${filterStatus === "Pending" ? "border-amber-400 shadow-amber-100" : "border-gray-200/80"}`}>
          <div className="text-xs font-medium text-gray-500">Pending</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{pendingCount}</div>
        </div>
        <div onClick={() => setFilterStatus("Approved")}
          className={`bg-white rounded-2xl border p-4 shadow-xs hover:shadow-md transition-all cursor-pointer ${filterStatus === "Approved" ? "border-green-400 shadow-green-100" : "border-gray-200/80"}`}>
          <div className="text-xs font-medium text-gray-500">Approved</div>
          <div className="text-2xl font-extrabold text-green-600 mt-1">{approvedCount}</div>
        </div>
        <div onClick={() => setFilterStatus("Rejected")}
          className={`bg-white rounded-2xl border p-4 shadow-xs hover:shadow-md transition-all cursor-pointer ${filterStatus === "Rejected" ? "border-red-400 shadow-red-100" : "border-gray-200/80"}`}>
          <div className="text-xs font-medium text-gray-500">Rejected</div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">{rejectedCount}</div>
        </div>
        <div onClick={() => setFilterStatus("All")}
          className={`bg-white rounded-2xl border p-4 shadow-xs hover:shadow-md transition-all cursor-pointer ${filterStatus === "All" ? "border-indigo-400 shadow-indigo-100" : "border-gray-200/80"}`}>
          <div className="text-xs font-medium text-gray-500">Not Uploaded</div>
          <div className="text-2xl font-extrabold text-gray-600 mt-1">{notUploadedCount}</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search students..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        {filterStatus !== "All" && (
          <button onClick={() => setFilterStatus("All")}
            className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Clear: {filterStatus}
          </button>
        )}
      </div>

      {/* Letters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((intern) => {
          const letter = intern.internshipLetter;
          const status = letter?.status || "Not Uploaded";

          return (
            <div key={intern.id} className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                {/* Student Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-amber-700">
                      {intern.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{intern.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{intern.project}</p>
                    </div>
                  </div>
                </div>

                {/* Letter Details */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-700">Letter Status</span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${letterStatusClasses(status)}`}>
                      {status}
                    </span>
                  </div>

                  {status !== "Not Uploaded" && letter?.url && (
                    <div className="mb-4">
                      <a href={letter.url} target="_blank" rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-indigo-600 transition-colors">
                        <ExternalLink className="w-4 h-4" /> View Document
                      </a>
                    </div>
                  )}

                  {/* Actions */}
                  {status === "Pending" && (
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => handleUpdateLetter(intern.id, "Approved")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer">
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button onClick={() => handleUpdateLetter(intern.id, "Rejected")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer">
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}

                  {status === "Approved" && (
                    <div className="flex items-center gap-2 text-green-700 text-xs font-bold bg-green-50 border border-green-200 rounded-xl p-2.5 mt-2">
                      <FileCheck className="w-4 h-4 text-green-600" /> Approved — no action needed
                    </div>
                  )}

                  {status === "Rejected" && (
                    <div className="flex items-center gap-2 text-red-700 text-xs font-bold bg-red-50 border border-red-200 rounded-xl p-2.5 mt-2">
                      <XCircle className="w-4 h-4 text-red-600" /> Rejected — awaiting re-upload
                    </div>
                  )}

                  {status === "Not Uploaded" && (
                    <div className="text-xs text-gray-400 italic mt-2">Student has not uploaded the letter yet.</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FileCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-gray-500">No letters found</h3>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
};

export default FacultyLettersPage;
