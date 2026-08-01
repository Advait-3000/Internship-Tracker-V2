import React from "react";
import HeatMapImage from "@/assets/Student_Profile_Assets/HeatMap.png";

const AttendanceRecord = () => {
  return (
    <div className="pt-4">
      <h2 className="text-[#0f172a] font-bold text-lg mb-3">
        Attendance Record
      </h2>
      <img
        src={HeatMapImage}
        alt="Attendance Heatmap"
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default AttendanceRecord;
