import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import useAuth from "@/features/auth/hooks/useAuth";

import ProfileHeaderBanner from "./components/ProfileHeaderBanner";
import MentorTaskGrid from "./components/MentorTaskGrid";
import AttendanceRecord from "./components/AttendanceRecord";
import ProjectDetailsKanban from "./components/ProjectDetailsKanban";
import MetricsGrid from "./components/MetricsGrid";
import FooterSection from "./components/FooterSection";

/**
 * StudentProfile — pure content component, no layout shell.
 *
 * @param {object} student  Optional student data from the parent context.
 *   Fields used dynamically:
 *     - name        {string}  Student's full name
 *     - role        {string}  e.g. "Manager", "Engineer"
 *     - department  {string}  e.g. "Operations", "IT"
 *     - company     {string}  e.g. "BCG / XLRI / National Winner"
 *     - rating      {number}  e.g. 4.9
 *     - achievements {string} One-line achievements text
 *     - topStudent  {boolean} Show "Top Student" badge
 *     - topRank     {boolean} Show "Top Rank" badge
 *     - tags        {string[]} Skill/expertise tags
 *
 *   Fields that stay static (pulled from assets / hardcoded):
 *     - Heatmap, Kanban tasks, project status graph, skills bars,
 *       mentor info, mentee reviews.
 *
 *   If no student prop is provided, the component falls back to
 *   the default "Parth Bhalala" static data (useful for dev/preview).
 */
const StudentProfile = ({ student = null }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-[1100px] mx-auto">
      <ProfileHeaderBanner student={student} />
      <MentorTaskGrid />
      <AttendanceRecord />
      <ProjectDetailsKanban />
      <MetricsGrid />
      <FooterSection />
    </div>
  );
};

export default StudentProfile;
