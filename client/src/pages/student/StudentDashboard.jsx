import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CalendarDays,
  TrendingUp,
  CheckSquare,
  FolderKanban,
  Star,
  ChevronRight,
  Award,
  Zap,
  Activity,
  AlertCircle,
} from "lucide-react";

// ── Helpers ──
const formatTime = (d) => {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  const ap = h >= 12 ? "P.M." : "A.M.";
  h = h % 12 || 12;
  return `${h.toString().padStart(2, "0")}:${m}:${s} ${ap}`;
};
const formatDate = (d) =>
  d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

const statusColors = {
  "On Track": "bg-emerald-100 text-emerald-700",
  Completed: "bg-blue-100 text-blue-700",
  "Needs Review": "bg-amber-100 text-amber-700",
  "At Risk": "bg-red-100 text-red-700",
};

const priorityColors = {
  High: "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-amber-50 text-amber-600 border border-amber-200",
  Low: "bg-gray-100 text-gray-600 border border-gray-200",
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { assignedInterns, projects, reviews } = useSelector((s) => s.mentor);
  const { tasks, profile } = useSelector((s) => s.studentPortal);

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Parth's intern record
  const myIntern = assignedInterns.find((i) => i.name === user?.name) || assignedInterns[1];

  // My reviews
  const myReviews = reviews.filter((r) => r.internName === user?.name);

  // My projects
  const myProjects = projects.filter((p) => p.assignedInterns?.includes(user?.name));

  // My tasks summary
  const tasksDone = tasks.filter((t) => t.status === "Done").length;
  const tasksInProgress = tasks.filter((t) => t.status === "In Progress").length;
  const tasksTodo = tasks.filter((t) => t.status === "Todo").length;

  // Upcoming tasks (earliest deadlines, not done)
  const upcomingTasks = [...tasks]
    .filter((t) => t.status !== "Done")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const avgRating =
    myReviews.length > 0
      ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
      : "—";

  const stats = [
    {
      label: "Progress",
      value: `${myIntern?.progress ?? 78}%`,
      icon: TrendingUp,
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
      sub: "Internship completion",
    },
    {
      label: "Attendance",
      value: myIntern?.attendance ?? "92%",
      icon: Activity,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
      sub: "Overall attendance",
    },
    {
      label: "Tasks",
      value: `${tasksDone}/${tasks.length}`,
      icon: CheckSquare,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
      sub: "Completed tasks",
    },
    {
      label: "Rating",
      value: avgRating,
      icon: Star,
      color: "bg-rose-50",
      iconColor: "text-rose-500",
      sub: "Mentor rating",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* ── Welcome Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{profile.title}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight">
            {formatTime(currentTime)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{formatDate(currentTime)}</p>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, iconColor, sub }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 2: Progress Card + Clock/Status ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Internship Progress */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Internship Progress</h3>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[myIntern?.status] || "bg-gray-100 text-gray-600"}`}>
              {myIntern?.status || "On Track"}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <img
              src={myIntern?.avatar || "https://i.pravatar.cc/150?img=15"}
              alt={myIntern?.name}
              className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
              onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=15"; }}
            />
            <div>
              <p className="font-bold text-gray-900">{myIntern?.name}</p>
              <p className="text-xs text-gray-500">{myIntern?.department} · {myIntern?.project}</p>
              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                {(myIntern?.skills || []).map((s) => (
                  <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
              <span>Overall Completion</span>
              <span>{myIntern?.progress ?? 78}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                style={{ width: `${myIntern?.progress ?? 78}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5">
              Attendance: {myIntern?.attendance ?? "92%"} · Project: {myIntern?.project}
            </p>
          </div>

          {/* Task mini-summary */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-gray-100">
            {[
              { label: "To Do", value: tasksTodo, color: "text-gray-600", dot: "bg-gray-400" },
              { label: "In Progress", value: tasksInProgress, color: "text-amber-600", dot: "bg-amber-400" },
              { label: "Done", value: tasksDone, color: "text-emerald-600", dot: "bg-emerald-500" },
            ].map(({ label, value, color, dot }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className={`text-xs font-bold ${color}`}>{value}</span>
                </div>
                <p className="text-[10px] text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status / Quick Info Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-bold text-gray-900">Intern Status</span>
            </div>
            <p className="text-3xl font-extrabold tracking-tight text-gray-900">{myIntern?.status || "On Track"}</p>
            <p className="text-xs text-gray-500 mt-1">Current internship status</p>
          </div>
          <div className="space-y-3 mt-6">
            <div className="flex justify-between items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
              <span className="text-xs text-gray-600">Projects</span>
              <span className="text-sm font-bold text-gray-900">{myProjects.length}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
              <span className="text-xs text-gray-600">Reviews received</span>
              <span className="text-sm font-bold text-gray-900">{myReviews.length}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
              <span className="text-xs text-gray-600">Skills</span>
              <span className="text-sm font-bold text-gray-900">{(myIntern?.skills || []).length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Upcoming Tasks + Recent Reviews ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Upcoming Tasks</h3>
            <button
              onClick={() => navigate("/student/tasks")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {upcomingTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <CheckSquare className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm">All tasks completed! 🎉</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-amber-500" : "text-gray-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{task.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{task.project} · Due {task.deadline}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Mentor Reviews</h3>
            <button
              onClick={() => navigate("/student/reviews")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {myReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Star className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm">No reviews yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myReviews.slice(0, 2).map((review) => (
                <div key={review.id} className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{review.date}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Row 4: My Projects ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">My Projects</h3>
          <button
            onClick={() => navigate("/student/projects")}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {myProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <FolderKanban className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-sm">No projects assigned yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myProjects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {proj.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[proj.status] || "bg-gray-100 text-gray-600"}`}>
                    {proj.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{proj.title}</h4>
                <p className="text-[11px] text-gray-500 line-clamp-2 mb-3">{proj.description}</p>
                <div>
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>Progress</span>
                    <span className="font-bold">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">
                  <Zap className="w-3 h-3 inline mr-0.5" />
                  Deadline: {proj.deadline}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
