import React from "react";

import ProfileHeaderBanner from "./components/ProfileHeaderBanner";
import MentorTaskGrid from "./components/MentorTaskGrid";
import AttendanceRecord from "./components/AttendanceRecord";
import ProjectDetailsKanban from "./components/ProjectDetailsKanban";
import MetricsGrid from "./components/MetricsGrid";
import FooterSection from "./components/FooterSection";

const StudentProfile = () => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-[1100px] mx-auto">
      <ProfileHeaderBanner />
      <MentorTaskGrid />
      <AttendanceRecord />
      <ProjectDetailsKanban />
      <MetricsGrid />
      <FooterSection />
    </div>
  );
};

export default StudentProfile;
