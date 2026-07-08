import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import { fetchDashboardStats } from "../../dashboard/dashboardSlice";
import {
  fetchStudents,
  fetchStudentProfiles,
  fetchDepartmentStats
} from "../studentsSlice";
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCircle,
  Search,
  Sun,
  Smile,
  Bell,
  Bookmark,
  Star,
  Menu,
  X,
  LogOut,
  TrendingUp,
  TrendingDown,
  Briefcase,
  CheckCircle,
  FileText,
  ClipboardCheck,
  List,
  LayoutGrid,
  Filter,
  Loader2,
  ChevronDown
} from "lucide-react";

// ============================================================
// STATIC CONFIG (UI-only, never comes from API)
// ============================================================

const UniversityLogoIcon = ({ className = "w-5 h-5" }) => (
  <img
    src="/logo.png"
    alt="Atharva University"
    className={`${className} object-contain shrink-0 drop-shadow-sm`}
  />
);

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Students", icon: Users, path: "/students" },
  { name: "Companies", icon: Building2, path: "/companies" },
  { name: "Faculty", icon: UniversityLogoIcon, path: "/faculty" },
  { name: "User Profile", icon: UserCircle, path: "/profile" },
];

// Icon + color mapping for each stat card title
const STAT_ICON_MAP = {
  "Total Students": {
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  "Active Internships": {
    icon: Briefcase,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  "Completed Internships": {
    icon: CheckCircle,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  Companies: {
    icon: Building2,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  "Pending Reports": {
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  "Pending Reviews": {
    icon: ClipboardCheck,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "P.M." : "A.M.";
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getStatusClasses = (status) => {
  switch (status) {
    case "Good":
      return "bg-[#DCFCEF] text-[#008236]";
    case "Average":
      return "bg-[#FFEDD4] text-[#CA3500]";
    case "Bad":
      return "bg-[#FFE2E2] text-[#C10007]";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
    <div className="flex justify-between items-start">
      <div>
        <div className="h-7 w-20 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-28 bg-gray-100 rounded" />
      </div>
      <div className="w-10 h-10 bg-gray-100 rounded-xl" />
    </div>
    <div className="mt-3 h-3 w-24 bg-gray-100 rounded" />
  </div>
);

const Sidebar = ({
  activeItem,
  sidebarOpen,
  onClose,
  onLogout,
  isCollapsed,
  isManual,
  onToggleManual,
  onMouseEnter,
  onMouseLeave,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile backdrop overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-300 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } w-64 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } shadow-xl lg:shadow-none`}
      >
        {/* Logo */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center px-2" : "gap-3 px-5"
          } py-5 border-b border-gray-100 transition-all duration-300 min-h-[73px]`}
        >
          <div className="w-11 h-11 flex items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="Atharva University"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 transition-opacity duration-200">
              <span className="text-base font-extrabold text-gray-900 tracking-tight leading-none truncate">
                ATHARVA
              </span>
              <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase mt-1">
                University
              </span>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={onToggleManual}
              title={
                isManual
                  ? "Switch to Auto-Collapse"
                  : "Pin Sidebar (Manual mode)"
              }
              className={`ml-auto hidden lg:flex p-1.5 rounded-lg transition-colors cursor-pointer ${
                isManual
                  ? "bg-indigo-50 text-indigo-600 shadow-xs"
                  : "text-gray-400 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
          )}
          <button
            className="ml-auto lg:hidden p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1.5 mt-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === activeItem;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                title={isCollapsed ? item.name : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2" : "gap-3 px-3.5"
                } py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group relative ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 font-semibold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-indigo-600 transition-colors"
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={onLogout}
            title={isCollapsed ? "Logout" : undefined}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center px-2" : "gap-3 px-3.5"
            } py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

const StatCard = ({ stat }) => {
  const mapping = STAT_ICON_MAP[stat.title] || {
    icon: FileText,
    iconBg: "bg-gray-50",
    iconColor: "text-gray-500",
  };
  const Icon = mapping.icon;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-xs text-gray-500 mt-1 font-medium">{stat.title}</p>
        </div>
        <div
          className={`w-10 h-10 rounded-xl ${mapping.iconBg} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${mapping.iconColor}`} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {stat.isUp ? (
          <TrendingUp className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-red-500" />
        )}
        <span
          className={`text-xs font-semibold ${stat.isUp ? "text-green-500" : "text-red-500"}`}
        >
          {stat.subtext}
        </span>
      </div>
    </div>
  );
};

// ============================================================
// MAIN STUDENTS PAGE COMPONENT
// ============================================================

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ── Redux state selectors ──
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    systemStatus,
    stats,
    loading: dashboardLoading,
  } = useSelector((state) => state.dashboard);
  const {
    list: studentsList,
    departmentStats,
    profiles: studentProfiles,
    loading: studentsLoading,
    profilesLoading,
    error: studentsError,
  } = useSelector((state) => state.students);

  // ── Local UI state (not Redux) ──
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSidebarMouseEnter = () => {
    if (!isManual && window.innerWidth >= 1024) {
      setIsCollapsed(false);
    }
  };

  const handleSidebarMouseLeave = () => {
    if (!isManual && window.innerWidth >= 1024) {
      setIsCollapsed(true);
    }
  };

  const handleToggleManual = () => {
    if (!isManual) {
      setIsManual(true);
      setIsCollapsed(false);
    } else {
      setIsManual(false);
      setIsCollapsed(true);
    }
  };

  // ── Auth guard ──
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // ── Fetch data on mount ──
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchStudents());
    dispatch(fetchStudentProfiles());
    dispatch(fetchDepartmentStats());
  }, [dispatch]);

  // ── Live clock ──
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  // ── Filtered students (local search over Redux data) ──
  const filteredStudents = useMemo(
    () =>
      studentsList.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.role.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, studentsList],
  );

  const filteredStudentProfiles = useMemo(
    () =>
      studentProfiles.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.achievements.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.badge.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, studentProfiles],
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeItem="Students"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        isCollapsed={isCollapsed}
        isManual={isManual}
        onToggleManual={handleToggleManual}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      />

      {/* Main content wrapper — offset by sidebar width on desktop */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isManual ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* ── Top Header ── */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#262626] tracking-tight">Students</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            {/* Filter */}
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            
            {/* Today Dropdown */}
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Today
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ── Error Banner ── */}
        {studentsError && (
          <div className="mx-4 sm:mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
            <span className="font-medium">Error:</span>
            {studentsError}
          </div>
        )}

        {/* ── Scrollable Main Content ── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Department Pills Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {departmentStats.map((dept, idx) => {
              const colors = [
                "bg-blue-600 shadow-blue-200", // AIDS
                "bg-green-600 shadow-green-200", // AIML
                "bg-amber-500 shadow-amber-200", // CSE
                "bg-purple-600 shadow-purple-200", // IT
                "bg-rose-500 shadow-rose-200", // ECS
                "bg-blue-500 shadow-blue-200", // R & A
                "bg-green-500 shadow-green-200", // EXTC
                "bg-amber-400 shadow-amber-200", // Civil
                "bg-indigo-500 shadow-indigo-200", // Electrical
                "bg-teal-500 shadow-teal-200", // Mechanical
              ];
              const color = colors[idx % colors.length];

              return (
                <div key={idx} className="bg-white border border-gray-100 rounded-[20px] px-4 py-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-white shadow-lg ${color} flex-shrink-0`}>
                    <Building2 className="w-6 h-6 stroke-[1.5px]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">{dept.count}</h4>
                    <p className="text-[11px] font-bold text-gray-500 tracking-wide uppercase">{dept.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 1 & 2: System Status + 6 Stat Cards */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* System Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:w-[26%] flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  System Status:
                </p>
                <div className="flex items-center gap-2.5 mt-1">
                  <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    {systemStatus.status}
                  </h2>
                  <span
                    className={`w-3.5 h-3.5 rounded-full inline-block shadow-sm ${
                      systemStatus.status === "Active"
                        ? "bg-green-500 shadow-green-300"
                        : "bg-red-500 shadow-red-300"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-5">
                <div>
                  <p className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight">
                    {formatTime(currentTime)}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {formatDate(currentTime)}
                  </p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="text-center flex flex-col items-stretch">
                    <img
                      src="/logo.png"
                      alt="Atharva University"
                      className="h-[150px] w-[119px] w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-800">Users:</p>
                <p className="text-xs text-gray-500">
                  {systemStatus.activeSessions} sessions active
                </p>
              </div>
            </div>

            {/* 6 Stat Cards (3×2 grid) — with loading skeletons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-[74%]">
              {dashboardLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
            </div>
          </div>

          {/* Row 4: Students Reports */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
              <h3 className="text-base font-bold text-gray-900">
                Students Reports
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                <button className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                  Recent
                </button>
                <button className="text-sm font-medium text-gray-400 hover:text-indigo-600 transition-colors">
                  Starred
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36"
                  />
                </div>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-1.5 transition-colors cursor-pointer ${
                      viewMode === "table"
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── TABLE VIEW ── */}
            {viewMode === "table" && (
              <div className="overflow-x-auto">
                {studentsLoading ? (
                  <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Loading students...</span>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-100">
                        <th className="py-3 px-3 font-medium">ID</th>
                        <th className="py-3 px-3 font-medium">Name</th>
                        <th className="py-3 px-3 font-medium">Role</th>
                        <th className="py-3 px-3 font-medium">Department</th>
                        <th className="py-3 px-3 font-medium">Status</th>
                        <th className="py-3 px-3 font-medium text-right">
                          Work Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                        >
                          <td className="py-3.5 px-3 text-gray-500">
                            {student.id}
                          </td>
                          <td className="py-3.5 px-3 text-gray-900 font-medium">
                            {student.name}
                          </td>
                          <td className="py-3.5 px-3 text-gray-500">
                            {student.role}
                          </td>
                          <td className="py-3.5 px-3 text-gray-500">
                            {student.department}
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                                student.status,
                              )}`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-gray-500 text-right">
                            {student.workHours}
                          </td>
                        </tr>
                      ))}
                      {filteredStudents.length === 0 && !studentsLoading && (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-8 text-center text-gray-400 text-sm"
                          >
                            No students found matching &quot;{searchQuery}&quot;
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* ── CARD / GRID VIEW ── */}
            {viewMode === "grid" && (
              <div>
                {profilesLoading ? (
                  <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Loading profiles...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredStudentProfiles.length === 0 ? (
                      <div className="col-span-1 md:col-span-2 py-8 text-center text-gray-400 text-sm">
                        No students found matching &quot;{searchQuery}&quot;
                      </div>
                    ) : (
                      filteredStudentProfiles.map((card, idx) => (
                        <div
                          key={card.id}
                          onClick={() => navigate(`/students/profile/${card.id}`)}
                          className={`flex gap-4 p-4 rounded-2xl border ${idx === 0 ? 'border-blue-500 shadow-sm' : 'border-gray-200'} bg-white hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group`}
                        >
                          <img
                            src={card.avatar}
                            alt={card.name}
                            className="w-20 h-24 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                                card.badgeType === "green"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              <Star className="w-2.5 h-2.5 fill-current" />
                              {card.badge}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-sm font-bold">
                                {card.rating}
                              </span>
                            </div>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {card.name}
                          </h4>
                          <p className="text-[11px] text-blue-600 leading-snug mt-1 line-clamp-2">
                            {card.achievements}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                            {card.tags.map((tag, j) => (
                              <span
                                key={j}
                                className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Students;
