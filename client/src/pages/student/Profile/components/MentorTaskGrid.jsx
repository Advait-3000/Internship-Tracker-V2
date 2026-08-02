import React from "react";

const MentorTaskGrid = () => {
  const ongoingTags = [
    "#React Js", "#React Native", "#React Native",
    "#React Js", "#React Js", "#React Native",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 pt-6">
      {/* Left: About Mentor / Company */}
      <div className="flex items-start gap-4">
        {/* Marico logo mock */}
        <div className="w-14 h-14 shrink-0 rounded-xl border-2 border-[#2e7d32]/20 bg-white flex items-center justify-center">
          <div className="text-center leading-none">
            <span className="text-xl font-bold text-[#2e7d32] block">M</span>
            <span className="text-[8px] text-gray-400 font-medium tracking-wide">marico</span>
          </div>
        </div>
        <div>
          <h3 className="text-[#3b82f6] font-bold text-base mb-0.5">
            About Mentor / Company
          </h3>
          <p className="text-[13px] text-gray-700 leading-snug">
            Senior Associate At BCG & MBA From XLRI, Jamshedpur
          </p>
          <p className="text-[12px] text-gray-400 mt-0.5">
            1.10x National Case Competition Titles...
          </p>
        </div>
      </div>

      {/* Right: Ongoing Task */}
      <div>
        <h3 className="text-[#3b82f6] font-bold text-base mb-3">
          Ongoing Task
        </h3>
        <div className="flex flex-wrap gap-2">
          {ongoingTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-[11px] font-medium text-gray-500 border border-gray-200 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorTaskGrid;
