import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus } from "../../features/students/studentPortalSlice";
import {
  CheckSquare,
  Clock,
  CalendarDays,
  Tag,
  ChevronRight,
  AlertCircle,
  Circle,
  CheckCircle2,
} from "lucide-react";

// ── Priority config ──
const priorityConfig = {
  High: {
    pill: "bg-red-50 text-red-600 border border-red-200",
    icon: "text-red-500",
    dot: "bg-red-500",
  },
  Medium: {
    pill: "bg-amber-50 text-amber-600 border border-amber-200",
    icon: "text-amber-500",
    dot: "bg-amber-400",
  },
  Low: {
    pill: "bg-gray-100 text-gray-600 border border-gray-200",
    icon: "text-gray-400",
    dot: "bg-gray-400",
  },
};

// ── Status columns ──
const COLUMNS = [
  {
    id: "Todo",
    label: "To Do",
    color: "bg-gray-500",
    headerBg: "bg-gray-50",
    headerBorder: "border-gray-200",
    count_color: "bg-gray-200 text-gray-600",
  },
  {
    id: "In Progress",
    label: "In Progress",
    color: "bg-amber-400",
    headerBg: "bg-amber-50",
    headerBorder: "border-amber-200",
    count_color: "bg-amber-100 text-amber-700",
  },
  {
    id: "Done",
    label: "Done",
    color: "bg-emerald-500",
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-200",
    count_color: "bg-emerald-100 text-emerald-700",
  },
];

// ── Task Card ──
const TaskCard = ({ task, onMove }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = priorityConfig[task.priority] || priorityConfig.Low;
  const isDone = task.status === "Done";
  const isInProgress = task.status === "In Progress";

  return (
    <div
      className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer hover:shadow-md ${
        isDone ? "border-emerald-100 opacity-80" : "border-gray-100 shadow-sm"
      }`}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Cycle status: Todo → In Progress → Done → Todo
              const next =
                task.status === "Todo"
                  ? "In Progress"
                  : task.status === "In Progress"
                  ? "Done"
                  : "Todo";
              onMove(task.id, next);
            }}
            className="mt-0.5 shrink-0 cursor-pointer"
            title="Cycle status"
          >
            {isDone ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : isInProgress ? (
              <Clock className="w-4 h-4 text-amber-500" />
            ) : (
              <Circle className="w-4 h-4 text-gray-300 hover:text-indigo-400 transition-colors" />
            )}
          </button>
          <h4 className={`text-xs font-bold leading-snug ${isDone ? "line-through text-gray-400" : "text-gray-900"}`}>
            {task.title}
          </h4>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${cfg.pill}`}>
          {task.priority}
        </span>
      </div>

      {/* Expanded description */}
      {expanded && (
        <p className="text-[11px] text-gray-500 leading-relaxed mb-2.5 pl-6 animate-in fade-in duration-150">
          {task.description}
        </p>
      )}

      {/* Meta row */}
      <div className="flex items-center gap-3 pl-6 flex-wrap">
        <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
          <CalendarDays className="w-3 h-3" />
          {task.deadline}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-indigo-500 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded-md border border-indigo-100">
          <Tag className="w-2.5 h-2.5" />
          {task.project}
        </span>
      </div>

      {/* Tags */}
      {task.tags?.length > 0 && (
        <div className="flex gap-1.5 mt-2 pl-6 flex-wrap">
          {task.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Move buttons */}
      {!isDone && (
        <div className="flex gap-1.5 mt-3 pl-6" onClick={(e) => e.stopPropagation()}>
          {task.status === "Todo" && (
            <button
              onClick={() => onMove(task.id, "In Progress")}
              className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              Start <ChevronRight className="w-3 h-3" />
            </button>
          )}
          {task.status === "In Progress" && (
            <button
              onClick={() => onMove(task.id, "Done")}
              className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              Mark Done <CheckSquare className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const StudentTasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((s) => s.studentPortal);

  const handleMove = (taskId, status) => {
    dispatch(updateTaskStatus({ taskId, status }));
  };

  const tasksByStatus = (status) => tasks.filter((t) => t.status === status);
  const totalDone = tasks.filter((t) => t.status === "Done").length;
  const completionPct = tasks.length > 0 ? Math.round((totalDone / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Tasks</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            All tasks assigned to you during your internship.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3 text-right min-w-40">
          <p className="text-2xl font-extrabold text-indigo-600">{completionPct}%</p>
          <p className="text-xs text-gray-400 font-medium">Overall completion</p>
        </div>
      </div>

      {/* ── Global progress bar ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2">
          <span>Task Progress — {totalDone} of {tasks.length} done</span>
          <span className="text-indigo-600">{completionPct}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <div className="flex gap-4 mt-3 text-[10px] font-semibold text-gray-400">
          <span><span className="text-gray-500 font-bold">{tasksByStatus("Todo").length}</span> To Do</span>
          <span><span className="text-amber-600 font-bold">{tasksByStatus("In Progress").length}</span> In Progress</span>
          <span><span className="text-emerald-600 font-bold">{totalDone}</span> Done</span>
        </div>
      </div>

      {/* ── Tip ── */}
      <div className="flex items-center gap-2.5 p-3.5 bg-indigo-50 rounded-xl border border-indigo-100">
        <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0" />
        <p className="text-xs text-indigo-700 font-medium">
          Click a task card to expand its description. Use the <strong>Start</strong> / <strong>Mark Done</strong> buttons or the status icon to move tasks between columns.
        </p>
      </div>

      {/* ── Kanban Board ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COLUMNS.map((col) => {
          const colTasks = tasksByStatus(col.id);
          return (
            <div key={col.id} className={`rounded-2xl border ${col.headerBorder} ${col.headerBg} overflow-hidden`}>
              {/* Column header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                  <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                    {col.label}
                  </h3>
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${col.count_color}`}>
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-3 min-h-32">
                {colTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-300">
                    <CheckSquare className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-[11px] font-medium">No tasks here</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onMove={handleMove} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentTasks;
