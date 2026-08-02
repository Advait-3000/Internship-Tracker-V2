import React from "react";
import BlockImage from "@/assets/Student_Profile_Assets/Block.png";

const skills = [
  { name: "UI", progress: 75 },
  { name: "UX", progress: 85 },
  { name: "UX Research", progress: 55 },
  { name: "Figma", progress: 90 },
  { name: "R&D", progress: 45 },
  { name: "Framer", progress: 65 },
];

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 pt-4">
      {/* Left: Project Status bar chart */}
      <div className="bg-[#f8fafc] rounded-2xl p-5 border border-gray-100">
        <h3 className="font-bold text-sm text-[#0f172a] mb-4">Project Status</h3>
        <img
          src={BlockImage}
          alt="Project Status Graph"
          className="w-full h-auto max-h-[250px] object-contain"
        />
      </div>

      {/* Right: Skills Learned */}
      <div className="bg-[#f8fafc] rounded-2xl p-5 border border-gray-100">
        <h3 className="font-bold text-sm text-[#0f172a] mb-6">Skills Learned</h3>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500 w-20 shrink-0 text-right">
                {skill.name}
              </span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1e293b] rounded-full transition-all duration-500"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsGrid;
