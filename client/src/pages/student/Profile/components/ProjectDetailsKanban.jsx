import React, { useState } from "react";

const initialTasks = [
  {
    id: "t1",
    status: "todo",
    priority: "Low",
    priorityColor: "text-[#f59e0b] bg-[#fffbeb]",
    title: "Brainstorming",
    description: "Brainstorming brings team members' diverse experience into play.",
    comments: 12,
    files: 0,
    avatarColors: ["bg-pink-300", "bg-blue-300", "bg-yellow-300"],
  },
  {
    id: "t2",
    status: "todo",
    priority: "High",
    priorityColor: "text-[#ef4444] bg-[#fef2f2]",
    title: "Research",
    description: "User research helps you to create an optimal product for users.",
    comments: 10,
    files: 3,
    avatarColors: ["bg-orange-300", "bg-teal-300"],
  },
  {
    id: "t3",
    status: "todo",
    priority: "High",
    priorityColor: "text-[#ef4444] bg-[#fef2f2]",
    title: "Wireframes",
    description: "Low fidelity wireframes include the most basic content and visuals.",
    comments: 0,
    files: 0,
    avatarColors: ["bg-purple-300", "bg-pink-300", "bg-sky-300"],
  },
  {
    id: "p1",
    status: "progress",
    priority: "Low",
    priorityColor: "text-[#f59e0b] bg-[#fffbeb]",
    title: "Onboarding Illustrations",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    comments: 14,
    files: 15,
    avatarColors: ["bg-green-300", "bg-red-300", "bg-blue-300"],
  },
  {
    id: "p2",
    status: "progress",
    priority: "Low",
    priorityColor: "text-[#f59e0b] bg-[#fffbeb]",
    title: "Moodboard",
    images: [
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&cs=tinysrgb&w=300",
    ],
    comments: 9,
    files: 10,
    avatarColors: ["bg-indigo-300"],
  },
  {
    id: "d1",
    status: "done",
    priority: "Completed",
    priorityColor: "text-[#10b981] bg-[#ecfdf5]",
    title: "Mobile App Design",
    images: [
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300",
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300",
    ],
    comments: 12,
    files: 15,
    avatarColors: ["bg-rose-300", "bg-sky-300"],
  },
  {
    id: "d2",
    status: "done",
    priority: "Completed",
    priorityColor: "text-[#10b981] bg-[#ecfdf5]",
    title: "Design System",
    description: "It just needs to adapt the UI from what you did before",
    comments: 12,
    files: 15,
    avatarColors: ["bg-amber-300", "bg-violet-300", "bg-emerald-300"],
  },
];

const columns = [
  { key: "todo", title: "To Do", dotColor: "bg-[#3b82f6]", borderColor: "#3b82f6" },
  { key: "progress", title: "On Progress", dotColor: "bg-[#f59e0b]", borderColor: "#f59e0b" },
  { key: "done", title: "Done", dotColor: "bg-[#10b981]", borderColor: "#10b981" },
];

const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2.5">
    {/* Priority + Menu */}
    <div className="flex justify-between items-center">
      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${task.priorityColor}`}>
        {task.priority}
      </span>
      <span className="text-gray-300 cursor-pointer text-lg leading-none">⋯</span>
    </div>

    {/* Title */}
    <h4 className="font-bold text-[15px] text-[#0f172a]">{task.title}</h4>

    {/* Description */}
    {task.description && (
      <p className="text-xs text-gray-400 leading-relaxed">{task.description}</p>
    )}

    {/* Single image */}
    {task.image && (
      <img src={task.image} alt={task.title} className="w-full h-[130px] object-cover rounded-xl" />
    )}

    {/* Double images */}
    {task.images && (
      <div className="flex gap-2">
        {task.images.map((img, i) => (
          <img key={i} src={img} alt="task" className="w-1/2 h-[90px] object-cover rounded-xl" />
        ))}
      </div>
    )}

    {/* Footer: Avatars + stats */}
    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
      <div className="flex -space-x-1.5">
        {task.avatarColors.map((color, i) => (
          <div key={i} className={`w-6 h-6 rounded-full ${color} border-2 border-white`} />
        ))}
      </div>
      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
        <span>💬 {task.comments} comments</span>
        <span>📁 {task.files} files</span>
      </div>
    </div>
  </div>
);

const ProjectDetailsKanban = () => {
  const [tasks] = useState(initialTasks);

  return (
    <div className="pt-6">
      {/* Section Header */}
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-3">
          <h2 className="text-[#0f172a] font-bold text-2xl">Project Details</h2>
          <div className="flex gap-1.5">
            <button className="w-7 h-7 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#3b82f6] text-sm hover:bg-blue-100 transition-colors">✎</button>
            <button className="w-7 h-7 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#3b82f6] text-sm hover:bg-blue-100 transition-colors">🔗</button>
          </div>
        </div>

        {/* Team avatars */}
        <div className="flex items-center -space-x-2">
          <div className="w-8 h-8 rounded-full bg-pink-200 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-yellow-200 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-[#0f172a] border-2 border-white text-white text-[10px] flex items-center justify-center font-semibold">+1</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm max-w-2xl leading-relaxed mb-5">
        A Full-Stack Web Application Designed To Provide A Seamless, Secure, And
        Scalable Platform For Managing Users, Data, And Real-Time Interactions
        Through A Modern And Intuitive Interface.
      </p>

      {/* Filter buttons */}
      <div className="flex gap-2.5 mb-5">
        <button className="px-3.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
          ▤ Filter ▾
        </button>
        <button className="px-3.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
          📅 Today ▾
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="bg-[#f8fafc] rounded-2xl p-3 flex flex-col" style={{ maxHeight: "520px" }}>
              {/* Column header */}
              <div
                className="flex items-center justify-between pb-3 mb-3"
                style={{ borderBottom: `3px solid ${col.borderColor}` }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                  <h3 className="font-semibold text-sm text-[#0f172a]">{col.title}</h3>
                  <span className="w-5 h-5 rounded-full bg-[#e2e8f0] text-gray-500 text-[10px] flex items-center justify-center font-semibold">
                    {colTasks.length}
                  </span>
                </div>
                {col.key === "todo" && (
                  <button className="w-5 h-5 rounded bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center font-bold text-sm">+</button>
                )}
              </div>

              {/* Scrollable task list */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-0.5" style={{ scrollbarWidth: "thin" }}>
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectDetailsKanban;
