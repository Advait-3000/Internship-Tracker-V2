import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FolderKanban,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  PlayCircle,
  FileCheck
} from "lucide-react";

const statusClasses = (status) => {
  switch (status) {
    case "Completed": return "bg-blue-50 text-blue-700 border-blue-200";
    case "In Progress": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Planning": return "bg-purple-50 text-purple-700 border-purple-200";
    default: return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const statusIcon = (status) => {
  switch (status) {
    case "Completed": return <CheckCircle className="w-3.5 h-3.5" />;
    case "In Progress": return <PlayCircle className="w-3.5 h-3.5" />;
    case "Planning": return <Clock className="w-3.5 h-3.5" />;
    default: return <AlertTriangle className="w-3.5 h-3.5" />;
  }
};

const FacultyProjectsPage = () => {
  const { projects } = useSelector((state) => state.mentor);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredProjects = projects.filter((proj) => {
    const matchSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        proj.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = selectedStatus === "All" || proj.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Internship Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor the status and progress of all projects assigned to interns.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer">
            <option value="All">All Statuses</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs">
          <div className="text-xs font-medium text-gray-500">Total Projects</div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">{projects.length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs">
          <div className="text-xs font-medium text-gray-500">In Progress</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{projects.filter(p => p.status === "In Progress").length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs">
          <div className="text-xs font-medium text-gray-500">Planning</div>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">{projects.filter(p => p.status === "Planning").length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs">
          <div className="text-xs font-medium text-gray-500">Completed</div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{projects.filter(p => p.status === "Completed").length}</div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/80">
          <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-gray-500">No projects found</h3>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => (
            <div key={proj.id} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                      {proj.category || "Project"}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mt-3 leading-tight">{proj.title}</h3>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${statusClasses(proj.status)}`}>
                    {statusIcon(proj.status)}
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed line-clamp-3">{proj.description}</p>
                
                <div className="mt-4 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-gray-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Deadline: {proj.deadline}</span>
                  <span className="text-amber-600">{proj.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${proj.progress}%` }} />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">Assigned Interns</span>
                <div className="flex flex-wrap gap-2">
                  {proj.assignedInterns?.map((name, idx) => (
                    <span key={idx} className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />{name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyProjectsPage;
