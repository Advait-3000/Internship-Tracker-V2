import React from "react";
import PlaceholderPic from "@/assets/Student_Profile_Assets/PlaceholderPic.png";

const ProfileHeaderBanner = ({ student }) => {
  // Fallbacks if no student prop is passed
  const name = student?.name || "Parth Bhalala";
  const isTopStudent = student ? student.topStudent : true;
  const isTopRank = student ? student.topRank : false;
  const rating = student?.rating || "4.9";
  
  const headline = student ? (
    <>
      {student.role}, {student.department} <span className="font-bold">{student.achievements}</span>
    </>
  ) : (
    <>
      UI/UX Developer, Third Year Engineering Student Atharva College Of
      Engineering <span className="font-bold">3x Hackathon Runner UP</span>
    </>
  );

  return (
    <div className="flex items-start gap-5">
      {/* Profile Image — rounded corners matching reference */}
      <div className="w-[100px] h-[100px] shrink-0 rounded-2xl overflow-hidden">
        <img
          src={PlaceholderPic}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col gap-1.5 pt-1">
        {/* Name + Top Student/Rank badge */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#0f172a]">{name}</h1>
          {isTopStudent && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-[#fff7ed] text-[#f59e0b] rounded-full font-semibold text-xs border border-[#fed7aa]">
              <span className="text-sm">🟠</span>
              <span>Top Student</span>
            </div>
          )}
          {isTopRank && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-[#fefce8] text-[#eab308] rounded-full font-semibold text-xs border border-[#fef08a]">
              <span className="text-sm">🟡</span>
              <span>Top Rank</span>
            </div>
          )}
        </div>

        {/* Headline */}
        <p className="text-[#3b82f6] font-medium text-sm leading-snug max-w-lg">
          {headline}
        </p>

        {/* Bottom badges row */}
        <div className="flex items-center gap-5 mt-1">
          {/* Experience badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#3b82f6] text-white rounded-md text-xs font-semibold">
            <span>💬</span>
            <span>2 Years</span>
          </div>

          {/* Star + Reviews */}
          <div className="flex items-center gap-1 text-sm font-semibold text-[#0f172a]">
            <span className="text-[#f59e0b]">★</span>
            <span>{rating} Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderBanner;
