import React from "react";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@/assets/Sidebar/Dashboard.png";
import StudentsIcon from "@/assets/Sidebar/Students.png";
import CompaniesIcon from "@/assets/Sidebar/Companies.png";
import FacultyIcon from "@/assets/Sidebar/Faculty.png";
import UserProfileIcon from "@/assets/Sidebar/UserProfile.png";
import AUMLogo from "@/assets/Sidebar/AUM LOG WITH BORDER 1.png";
import AUMText from "@/assets/Sidebar/AUM.png";

/**
 * Maps a nav link label to the most appropriate PNG icon from assets/Sidebar/.
 * Only 5 icons are available — each is assigned to the closest semantic match.
 * To swap an icon for a label in future, update only the matching condition here.
 */
const getIcon = (label) => {
  const l = label.toLowerCase();

  if (
    l.includes("dashboard") ||
    l.includes("report") ||
    l.includes("log") ||
    l.includes("audit")
  )
    return DashboardIcon;

  if (
    l.includes("student") ||
    l.includes("user management") ||
    l.includes("mentee") ||
    l.includes("attendance")
  )
    return StudentsIcon;

  if (
    l.includes("internship") ||
    l.includes("application") ||
    l.includes("company") ||
    l.includes("companies")
  )
    return CompaniesIcon;

  if (l.includes("faculty") || l.includes("evaluation")) return FacultyIcon;

  if (l.includes("profile") || l.includes("setting")) return UserProfileIcon;

  // Fallback — generic dashboard icon
  return DashboardIcon;
};

const Sidebar = ({ links = [] }) => {
  return (
    <aside className="sticky top-0 w-[220px] h-screen bg-white border-r border-gray-200 min-h-[calc(100vh-65px)] p-4 flex flex-col">
      {/* AUM Logo Header */}
      <div className="flex items-center gap-6 px-5 pb-5 border-b border-gray-100 mb-4 h-[12.5vh]">
        <img
          src={AUMLogo}
          alt="AUM Logo"
          className="w-[60px] h-[70px] object-contain"
        />
        <img src={AUMText} alt="AUM" className="h-[20px] object-contain" />
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1.5 px-[16px] py-[20px]">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-[12px] transition-all duration-150 ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <img
              src={getIcon(link.label)}
              alt={link.label}
              className="w-7 h-7 shrink-0 object-contain"
            />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
