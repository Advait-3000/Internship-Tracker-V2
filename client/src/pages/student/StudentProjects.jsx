import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FolderKanban,
  CalendarDays,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";

const statusColors = {
  "In Progress": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Planning": "bg-purple-50 text-purple-700 border border-purple-200",
  "Completed": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "At Risk": "bg-red-50 text-red-700 border border-red-200",
};

const categoryColors = [
  "from-indigo-500 to-violet-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
  "from-purple-500 to-fuchsia-600",
];

const StudentProjects = () => {
  const { user } = useSelector((s) => s.auth);
  const { projects } = useSelector((s) => s.mentor);

  const [expandedId, setExpandedId] = useState(null);

  // Filter projects assigned to this student
  const myProjects = projects.filter((p) =>
    p.assignedInterns?.includes(user?.name)
  );

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Projects you're currently working on during your internship.
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-indigo-600">{myProjects.length}</p>
          <p className="text-xs text-gray-400 font-medium">Active project{myProjects.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {myProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <FolderKanban className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No projects assigned</h3>
          <p className="text-sm text-gray-500">Your mentor hasn't assigned any projects yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myProjects.map((proj, idx) => {
            const isExpanded = expandedId === proj.id;
            const gradient = categoryColors[idx % categoryColors.length];

            return (
              <div
                key={proj.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Gradient Banner */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                <div className="p-6">
                  {/* Top Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0 shadow-md`}>
                        <FolderKanban className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{proj.title}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                            {proj.category}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${statusColors[proj.status] || "bg-gray-100 text-gray-600"}`}>
                            {proj.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expand toggle */}
                    <button
                      onClick={() => toggleExpand(proj.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 border border-gray-200 px-3 py-1.5 rounded-xl hover:border-indigo-300 transition-colors cursor-pointer shrink-0"
                    >
                      {isExpanded ? (
                        <><ChevronUp className="w-3.5 h-3.5" /> Collapse</>
                      ) : (
                        <><ChevronDown className="w-3.5 h-3.5" /> Expand</>
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{proj.description}</p>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                        Progress
                      </span>
                      <span className="text-indigo-600">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700`}
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Info row */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
                      Deadline: <strong className="text-gray-700">{proj.deadline}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      Team: {proj.assignedInterns?.join(", ")}
                    </span>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-gray-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <h4 className="text-sm font-bold text-gray-900">Project Timeline</h4>
                      <div className="space-y-3">
                        {[
                          { phase: "Kickoff & Planning", done: true },
                          { phase: "Environment Setup", done: proj.progress >= 20 },
                          { phase: "Core Development", done: proj.progress >= 50 },
                          { phase: "Testing & QA", done: proj.progress >= 80 },
                          { phase: "Deployment & Docs", done: proj.progress >= 100 },
                        ].map(({ phase, done }) => (
                          <div key={phase} className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${done ? "bg-indigo-600 border-indigo-600" : "border-gray-300 bg-white"}`}>
                              {done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className={`text-xs font-semibold ${done ? "text-gray-900" : "text-gray-400"}`}>
                              {phase}
                            </span>
                            {done && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                Complete
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 p-3 bg-indigo-50 rounded-xl border border-indigo-100 mt-3">
                        <Zap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-indigo-700 font-medium">
                          Keep up the great work! Your mentor is tracking your progress on this project. Current completion: <strong>{proj.progress}%</strong>.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentProjects;
