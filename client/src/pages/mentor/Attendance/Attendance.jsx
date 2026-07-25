import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import AttendanceTracker from "@/features/attendance/components/AttendanceTracker";
import useAuth from "@/features/auth/hooks/useAuth";

const MentorAttendance = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/mentor/dashboard" },
    { label: "Mentees", to: "/mentor/mentees" },
    { label: "Attendance Log", to: "/mentor/attendance" },
  ];

  const dummyRecords = [
    { date: "2026-07-25", status: "PRESENT" },
    { date: "2026-07-24", status: "PRESENT" },
    { date: "2026-07-23", status: "ABSENT" },
  ];

  return (
    <DashboardLayout user={user || { name: "Industry Mentor", role: "mentor" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mentee Attendance Log</h1>
          <p className="text-sm text-gray-500">Record and verify daily attendance for your mentees.</p>
        </div>

        <AttendanceTracker records={dummyRecords} onMarkAttendance={() => alert("Marked attendance for today!")} />
      </div>
    </DashboardLayout>
  );
};

export default MentorAttendance;
