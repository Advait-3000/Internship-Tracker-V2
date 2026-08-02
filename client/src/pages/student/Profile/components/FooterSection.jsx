import React from "react";
import QuoteBg from "@/assets/Student_Profile_Assets/Group 3817.png";
import PlaceholderPic from "@/assets/Student_Profile_Assets/PlaceholderPic.png";

const expertTags = [
  "#Case Study Competitions And Innovation Challenges",
  "#Consulting",
  "#Case Competitions",
  "#Case Study",
  "#Sales And Marketing",
  "#XAT Preparation",
  "#Case Study",
  "#Case Study",
];

const FooterSection = () => {
  return (
    <div className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Expert In */}
        <div>
          <h3 className="text-[#3b82f6] font-bold text-base mb-3">Expert In</h3>
          <div className="flex flex-wrap gap-2">
            {expertTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[10px] font-medium text-gray-500 border border-gray-200 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Mentee Reviews */}
        <div>
          <h3 className="text-sm font-bold text-[#0f172a] mb-3">
            Mentee <span className="text-[#3b82f6]">Reviews</span>
          </h3>

          {/* Review layout: quote marks left, cards stacked right */}
          <div className="flex items-start gap-4">
            {/* Large quotation marks */}
            <img
              src={QuoteBg}
              alt="Quote marks"
              className="w-16 h-auto shrink-0 mt-2"
            />

            {/* Stacked review cards */}
            <div className="flex flex-col gap-2.5 flex-1">
              {/* Card 1 — offset right slightly */}
              <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 flex items-center gap-3 ml-6">
                <img
                  src={PlaceholderPic}
                  alt="Chris Hughes"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <h4 className="text-[11px] font-bold text-[#0f172a]">Chris Hughes</h4>
                  <p className="text-[9px] text-gray-400">Designation</p>
                </div>
              </div>

              {/* Card 2 — no extra offset */}
              <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 flex items-center gap-3">
                <img
                  src={PlaceholderPic}
                  alt="Chris Hughes"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <h4 className="text-[11px] font-bold text-[#0f172a]">Chris Hughes</h4>
                  <p className="text-[9px] text-gray-400">Designation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Button */}
      <div className="flex justify-center mt-10 mb-4">
        <button className="w-full max-w-[400px] py-3.5 bg-[#0f3460] text-white font-semibold text-sm rounded-full hover:bg-[#1a4a7a] transition-colors shadow-md tracking-wide">
          Contact
        </button>
      </div>
    </div>
  );
};

export default FooterSection;
