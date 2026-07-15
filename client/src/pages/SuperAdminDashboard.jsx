import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toSlug } from "./StudentProfile";
import {
  fetchDashboardStats,
  fetchChartData,
  setViewType,
} from "../features/dashboard/dashboardSlice";
import {
  fetchStudents,
  fetchStudentProfiles,
} from "../features/students/studentsSlice";
import {
  Users,
  Briefcase,
  CheckCircle,
  Building2,
  FileText,
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  List,
  LayoutGrid,
  Star,
  Loader2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

// ============================================================
// STATIC CONFIG (same as AdminDashboard)
// ============================================================

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

const DEFAULT_AVATAR =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23e2e8f0"/><path d="M12 12.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%2394a3b8"/></svg>';

const DEPARTMENTS = [
  "Computer Engineering",
  "Information Technology",
  "AIML",
  "EXTC",
  "AIDS",
  "ECS",
  "Civil Engineering",
  "Mechanical Engineering",
];


// ============================================================
// HELPERS
// ============================================================

const formatTime = (d) => {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  const ap = h >= 12 ? "P.M." : "A.M.";
  h = h % 12 || 12;
  return `${h.toString().padStart(2, "0")}:${m}:${s} ${ap}`;
};

const formatDate = (d) =>
  d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const statusClasses = (status) => {
  switch (status) {
    case "Good":
      return "bg-green-100 text-green-700";
    case "Average":
      return "bg-orange-100 text-orange-700";
    case "Bad":
      return "bg-red-100 text-red-700";
    case "Active":
      return "bg-emerald-100 text-emerald-700";
    case "Inactive":
      return "bg-gray-100 text-gray-500";
    case "Suspended":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// ============================================================
// SUB-COMPONENTS (identical to AdminDashboard)
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

const SkeletonChart = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse flex-1">
    <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
    <div className="h-52 bg-gray-50 rounded-xl" />
  </div>
);

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

const ReportSubmissionChart = ({
  reportData,
  activeFilter,
  setActiveFilter,
}) => {
  const labels = reportData.labels || [];
  const datasets = reportData.datasets || {};
  const chartData = labels.map((day, i) => {
    const point = { day };
    Object.values(datasets).forEach((ds) => {
      point[ds.label] = ds.points[i];
    });
    return point;
  });
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-[3] min-w-0">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-base font-bold text-gray-900">Report Submission</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {["Daily", "Weekly", "Monthly"].map((f) => (
            <label key={f} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="saReportFilter"
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
        <div className="h-52 flex items-center justify-center text-gray-400 text-sm">
          No chart data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                {Object.values(datasets).map((ds) => (
                  <linearGradient
                    key={ds.label}
                    id={`sa-grad-${ds.label}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={ds.color} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={ds.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              {Object.values(datasets).map((ds) => (
                <Area
                  key={ds.label}
                  type="monotone"
                  dataKey={ds.label}
                  stroke={ds.color}
                  strokeWidth={2.5}
                  fill={`url(#sa-grad-${ds.label})`}
                  dot={{ r: 3, fill: "#fff", stroke: ds.color, strokeWidth: 2 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-3">
            {Object.values(datasets).map((ds) => (
              <div
                key={ds.label}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: ds.color }}
                />
                {ds.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const InternshipStatusChart = ({
  statusData,
  activeFilter,
  setActiveFilter,
}) => {
  const radialData = [
    { name: "EXTC", value: statusData.extc, fill: "#A78BFA" },
    { name: "IT", value: statusData.it, fill: "#FB7185" },
    { name: "Computer", value: statusData.computer, fill: "#38BDF8" },
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
                name="saStatusFilter"
                checked={activeFilter === f}
                onChange={() => setActiveFilter(f)}
                className="accent-indigo-600 w-3 h-3"
              />
              {f}
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="100%" height={240}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="25%"
            outerRadius="90%"
            data={radialData}
            startAngle={90}
            endAngle={-270}
            barSize={18}
          >
            <RadialBar
              background={{ fill: "#F3F4F6" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-3">
          {[...radialData].reverse().map((entry) => (
            <div
              key={entry.name}
              className="flex items-center gap-2 text-xs whitespace-nowrap"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-gray-600 font-medium">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state (same as AdminDashboard)
  const {
    systemStatus,
    stats,
    reportSubmission,
    internshipStatus,
    loading: dashboardLoading,
    chartsLoading,
    viewType,
    error: dashboardError,
  } = useSelector((s) => s.dashboard);

  const {
    list: studentsList,
    profiles: studentProfiles,
    loading: studentsLoading,
    profilesLoading,
    error: studentsError,
  } = useSelector((s) => s.students);

  const { user } = useSelector((s) => s.auth);

  // Local UI state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [reportFilter, setReportFilter] = useState("Daily");
  const [statusFilter, setStatusFilter] = useState("Daily");


  // Fetch on mount
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchChartData());
    dispatch(fetchStudents());
    dispatch(fetchStudentProfiles());
  }, [dispatch]);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtered students
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

  return (
    <div className="space-y-5">

      {/* Error Banner */}
      {(dashboardError || studentsError) && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
          <span className="font-medium">Error:</span>
          {dashboardError || studentsError}
        </div>
      )}

      {/* ─── Row 1: System Status + 6 Stat Cards ─── */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* System Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:w-[26%] flex flex-col justify-between min-h-[220px]">
          <div>
            <p className="text-sm text-gray-500 font-medium">System Status:</p>
            <div className="flex items-center gap-2.5 mt-1">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {systemStatus.status}
              </h2>
              <span
                className={`w-3.5 h-3.5 rounded-full inline-block shadow-sm ${systemStatus.status === "Active" ? "bg-green-500 shadow-green-300" : "bg-red-500 shadow-red-300"}`}
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
            <div className="flex flex-col items-center">
              <img
                src="/logo.png"
                alt="Atharva University"
                className="h-[120px] w-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Super Admin</p>
            <p className="text-xs text-gray-500">
              {user?.name} — {systemStatus.activeSessions} sessions active
            </p>
          </div>
        </div>

        {/* 6 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-[74%]">
          {dashboardLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
        </div>
      </div>

      {/* ─── Row 2: Charts ─── */}
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

      {/* ─── Row 3: Students Reports ─── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
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
              <Filter className="w-3.5 h-3.5" /> Filter
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
                onClick={() => dispatch(setViewType("table"))}
                className={`p-1.5 transition-colors cursor-pointer ${viewType === "table" ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:bg-gray-50"}`}
                aria-label="Table view"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(setViewType("grid"))}
                className={`p-1.5 transition-colors cursor-pointer ${viewType === "grid" ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:bg-gray-50"}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewType === "table" && (
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
                  {filteredStudents.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => navigate("/students/" + toSlug(s.name))}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-3 text-gray-500">{s.id}</td>
                      <td className="py-3.5 px-3 text-gray-900 font-medium">
                        {s.name}
                      </td>
                      <td className="py-3.5 px-3 text-gray-500">{s.role}</td>
                      <td className="py-3.5 px-3 text-gray-500">
                        {s.department}
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(s.status)}`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-gray-500 text-right">
                        {s.workHours}
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && !studentsLoading && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-400 text-sm"
                      >
                        No students found matching "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* GRID VIEW */}
        {viewType === "grid" && (
          <div>
            {profilesLoading ? (
              <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Loading profiles...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentProfiles
                  .filter(
                    (c) =>
                      c.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      c.department
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((card, i) => (
                    <div
                      key={i}
                      onClick={() => navigate("/students/" + toSlug(card.name))}
                      className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
                    >
                      <img
                        src={card.avatar || DEFAULT_AVATAR}
                        alt={card.name}
                        className="w-20 h-24 rounded-xl object-cover flex-shrink-0 bg-gray-100"
                        onError={(e) => {
                          e.target.src = DEFAULT_AVATAR;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${card.badgeType === "green" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
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
    </div>
  );
};

export default SuperAdminDashboard;
