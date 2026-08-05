import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import { fetchDashboardStats, fetchChartData } from "../dashboardSlice";
import {
  fetchStudents,
  fetchStudentProfiles,
} from "../../students/studentsSlice";
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
  ChevronDown,
  GraduationCap
} from "lucide-react";

// ============================================================
// STATIC CONFIG (UI-only, never comes from API)
// ============================================================

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Students", icon: Users, path: "/students" },
  { name: "Companies", icon: Building2, path: "/companies" },
  { name: "Faculty", icon: GraduationCap, path: "/faculty" },
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

// ---- Loading Skeleton ----

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

const SkeletonChart = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse flex-1">
    <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
    <div className="h-48 bg-gray-50 rounded-xl" />
  </div>
);

// ---- Sidebar ----

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

// ---- Stat Card ----

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

// ---- Report Submission Line Chart ----

const ReportSubmissionChart = ({
  reportData,
  activeFilter,
  setActiveFilter,
}) => {
  const padL = 40;
  const padR = 20;
  const padT = 10;
  const padB = 30;
  const chartW = 560;
  const chartH = 220;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;
  const yLabels = [0, 20, 40, 60, 80, 100];

  const labels = reportData.labels || [];
  const datasets = reportData.datasets || {};

  const xStep = labels.length > 1 ? plotW / (labels.length - 1) : plotW;
  const yScale = plotH / 100;

  const toPoints = (data) =>
    data
      .map((v, i) => `${padL + i * xStep},${padT + plotH - v * yScale}`)
      .join(" ");

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-[3] min-w-0">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-base font-bold text-gray-900">Report Submission</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {["Daily", "Weekly", "Monthly"].map((f) => (
            <label key={f} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="reportFilter"
                checked={activeFilter === f}
                onChange={() => setActiveFilter(f)}
                className="accent-indigo-600 w-3 h-3"
              />
              {f}
            </label>
          ))}
        </div>
      </div>

      {labels.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
          No chart data available
        </div>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${chartW} ${chartH + 20}`}
            className="w-full h-auto"
          >
            {/* Horizontal grid lines & Y-axis labels */}
            {yLabels.map((val) => {
              const y = padT + plotH - val * yScale;
              return (
                <g key={val}>
                  <line
                    x1={padL}
                    y1={y}
                    x2={chartW - padR}
                    y2={y}
                    stroke="#F3F4F6"
                    strokeWidth="1"
                  />
                  <text
                    x={padL - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill="#9CA3AF"
                    fontSize="10"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Vertical grid lines */}
            {labels.map((_, i) => {
              const x = padL + i * xStep;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={padT}
                  x2={x}
                  y2={padT + plotH}
                  stroke="#F3F4F6"
                  strokeWidth="1"
                />
              );
            })}

            {/* Shaded area fills under each line */}
            {Object.entries(datasets).map(([key, line]) => {
              const pts = line.points.map(
                (v, i) => `${padL + i * xStep},${padT + plotH - v * yScale}`,
              );
              const d = `M ${pts[0]} ${pts
                .slice(1)
                .map((p) => `L ${p}`)
                .join(
                  " ",
                )} L ${padL + (labels.length - 1) * xStep},${padT + plotH} L ${padL},${padT + plotH} Z`;
              return (
                <path
                  key={`area-${key}`}
                  d={d}
                  fill={line.color}
                  opacity="0.06"
                />
              );
            })}

            {/* Lines */}
            {Object.entries(datasets).map(([key, line]) => (
              <polyline
                key={key}
                fill="none"
                stroke={line.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={toPoints(line.points)}
              />
            ))}

            {/* Data dots */}
            {Object.entries(datasets).map(([key, line]) =>
              line.points.map((v, i) => (
                <circle
                  key={`${key}-${i}`}
                  cx={padL + i * xStep}
                  cy={padT + plotH - v * yScale}
                  r="3"
                  fill="white"
                  stroke={line.color}
                  strokeWidth="2"
                />
              )),
            )}

            {/* X-axis labels */}
            {labels.map((day, i) => (
              <text
                key={day}
                x={padL + i * xStep}
                y={chartH + 12}
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9"
              >
                {day}
              </text>
            ))}
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-3">
            {Object.values(datasets).map((line) => (
              <div
                key={line.label}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: line.color }}
                />
                {line.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ---- Internship Status Donut Chart ----

const InternshipStatusChart = ({
  statusData,
  activeFilter,
  setActiveFilter,
}) => {
  const cx = 150;
  const cy = 150;

  const rings = [
    {
      label: "Computer",
      color: "#38BDF8",
      bgColor: "#E0F2FE",
      radius: 105,
      percentage: statusData.computer,
      strokeW: 22,
    },
    {
      label: "IT",
      color: "#FB7185",
      bgColor: "#FFE4E6",
      radius: 78,
      percentage: statusData.it,
      strokeW: 22,
    },
    {
      label: "EXTC",
      color: "#A78BFA",
      bgColor: "#EDE9FE",
      radius: 51,
      percentage: statusData.extc,
      strokeW: 22,
    },
  ];

  const circumLabels = [
    0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550,
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-[2] min-w-0">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-base font-bold text-gray-900">Internship Status</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {["Daily", "Weekly", "Monthly"].map((f) => (
            <label key={f} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="statusFilter"
                checked={activeFilter === f}
                onChange={() => setActiveFilter(f)}
                className="accent-indigo-600 w-3 h-3"
              />
              {f}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <svg
          viewBox="0 0 300 300"
          className="w-full max-w-[240px] h-auto mx-auto flex-shrink-0"
        >
          {/* Circumference numeric labels */}
          {circumLabels.map((label, i) => {
            const angle = ((i * 30 - 90) * Math.PI) / 180;
            const lx = cx + 138 * Math.cos(angle);
            const ly = cy + 138 * Math.sin(angle);
            return (
              <text
                key={label}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#9CA3AF"
                fontSize="8"
              >
                {label}
              </text>
            );
          })}

          {/* Background rings (unfilled track) */}
          {rings.map((ring) => (
            <circle
              key={`bg-${ring.label}`}
              cx={cx}
              cy={cy}
              r={ring.radius}
              fill="none"
              stroke={ring.bgColor}
              strokeWidth={ring.strokeW}
            />
          ))}

          {/* Foreground arcs (filled portion) */}
          {rings.map((ring) => {
            const circ = 2 * Math.PI * ring.radius;
            const dashLen = (ring.percentage / 100) * circ;
            return (
              <circle
                key={`fg-${ring.label}`}
                cx={cx}
                cy={cy}
                r={ring.radius}
                fill="none"
                stroke={ring.color}
                strokeWidth={ring.strokeW}
                strokeLinecap="round"
                strokeDasharray={`${dashLen} ${circ}`}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            );
          })}

          {/* Center white circle (donut hole) */}
          <circle cx={cx} cy={cy} r="28" fill="white" />
        </svg>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-shrink-0">
          {rings.map((ring) => (
            <div
              key={ring.label}
              className="flex items-center gap-2 text-xs whitespace-nowrap"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: ring.color }}
              />
              <span className="text-gray-600 font-medium">{ring.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN DASHBOARD COMPONENT
// ============================================================

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ── Redux state selectors ──
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    systemStatus,
    stats,
    reportSubmission,
    internshipStatus,
    loading: dashboardLoading,
    chartsLoading,
    error: dashboardError,
  } = useSelector((state) => state.dashboard);
  const {
    list: studentsList,
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
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState("Daily");
  const [reportFilter, setReportFilter] = useState("Daily");
  const [statusFilter, setStatusFilter] = useState("Daily");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedAttendance, setSelectedAttendance] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    dispatch(fetchChartData());
    dispatch(fetchStudents());
    dispatch(fetchStudentProfiles());
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

  const checkAttendance = (percentage, filterValue) => {
    if (filterValue === "All") return true;
    if (filterValue === "Above 90%") return percentage >= 90;
    if (filterValue === "75% - 90%") return percentage >= 75 && percentage < 90;
    if (filterValue === "Below 75%") return percentage < 75;
    return true;
  };

  // ── Filtered students (local search over Redux data) ──
  const filteredStudents = useMemo(
    () =>
      studentsList.filter(
        (s) => {
          const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              s.role.toLowerCase().includes(searchQuery.toLowerCase());
          const matchDept = selectedDepartment !== "All" ? s.department === selectedDepartment : true;
          const matchStatus = selectedStatus !== "All" ? s.status === selectedStatus : true;
          const matchAttendance = checkAttendance(s.attendancePercentage, selectedAttendance);
          return matchSearch && matchDept && matchStatus && matchAttendance;
        }
      ),
    [searchQuery, selectedDepartment, selectedStatus, selectedAttendance, studentsList],
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeItem="Dashboard"
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
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Breadcrumb & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleManual}
              title={
                isManual
                  ? "Sidebar: Manual (Pinned) - Click for Auto-Collapse"
                  : "Sidebar: Auto-Collapse - Click to Pin Open"
              }
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 group border ${
                isManual
                  ? "bg-indigo-50 text-indigo-600 border-indigo-200 shadow-2xs font-semibold"
                  : "text-gray-600 border-transparent hover:bg-gray-100 hover:text-indigo-600"
              }`}
            >
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-md bg-white/80 border border-gray-200/60 text-gray-700 shadow-3xs">
                {/* {isManual ? 'Manual' : 'Auto'} */}
              </span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Dashboards</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-800 font-medium">Default</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Right icon buttons */}
          <div className="hidden sm:flex items-center gap-1">
            {[Sun, Smile, Bell, Bookmark].map((Icon, i) => (
              <button
                key={i}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Icon className="w-[18px] h-[18px] text-gray-500" />
                {Icon === Bell && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* ── Error Banner ── */}
        {(dashboardError || studentsError) && (
          <div className="mx-4 sm:mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
            <span className="font-medium">Error:</span>
            {dashboardError || studentsError}
          </div>
        )}

        {/* ── Scrollable Main Content ── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
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

          {/* Row 3: Charts — with loading skeletons */}
          <div className="flex flex-col lg:flex-row gap-4">
            {chartsLoading ? (
              <>
                <SkeletonChart />
                <SkeletonChart />
              </>
            ) : (
              <>
                <ReportSubmissionChart
                  reportData={reportSubmission}
                  activeFilter={reportFilter}
                  setActiveFilter={setReportFilter}
                />
                <InternshipStatusChart
                  statusData={internshipStatus}
                  activeFilter={statusFilter}
                  setActiveFilter={setStatusFilter}
                />
              </>
            )}
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
                <div className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    Filter
                  </button>
                  
                  {isFilterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl p-4 z-50 flex flex-col gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Department</label>
                        <select
                          value={selectedDepartment || "All"}
                          onChange={(e) => setSelectedDepartment(e.target.value === "All" ? "All" : e.target.value)}
                          className="w-full appearance-none px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="All">All Departments</option>
                          <option value="B. Tech AIDS">AIDS</option>
                          <option value="AIML">AIML</option>
                          <option value="CSE(Cyber)">CSE</option>
                          <option value="COMPS">COMPS</option>
                          <option value="IT">IT</option>
                          <option value="R & A">R & A</option>
                          <option value="EXTC">EXTC</option>
                          <option value="Civil">Civil</option>
                          <option value="ECS">ECS</option>
                          <option value="ELEC">ELEC</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Status</label>
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="w-full appearance-none px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="All">All Status</option>
                          <option value="Good">Good</option>
                          <option value="Average">Average</option>
                          <option value="Bad">Bad</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Attendance</label>
                        <select
                          value={selectedAttendance}
                          onChange={(e) => setSelectedAttendance(e.target.value)}
                          className="w-full appearance-none px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="All">All Attendance</option>
                          <option value="Above 90%">Above 90%</option>
                          <option value="75% - 90%">75% - 90%</option>
                          <option value="Below 75%">Below 75%</option>
                        </select>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setSelectedDepartment("All");
                            setSelectedStatus("All");
                            setSelectedAttendance("All");
                          }}
                          className="w-full text-center px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
                    {studentProfiles.map((card, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200"
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
                          <h4 className="text-sm font-bold text-gray-900 truncate">
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
                    ))}
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

export default Dashboard;
