import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toSlug } from './StudentProfile';
import {
  fetchDashboardStats,
  fetchChartData,
  setViewType,
} from '../features/dashboard/dashboardSlice';
import {
  fetchStudents,
  fetchStudentProfiles,
} from '../features/students/studentsSlice';
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
  Plus,
  Edit2,
  Trash2,
  UserCog,
  Mail,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  X,
} from 'lucide-react';
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
} from 'recharts';

// ============================================================
// STATIC CONFIG (same as AdminDashboard)
// ============================================================

const STAT_ICON_MAP = {
  'Total Students':        { icon: Users,          iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  'Active Internships':    { icon: Briefcase,      iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  'Completed Internships': { icon: CheckCircle,    iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  'Companies':             { icon: Building2,      iconBg: 'bg-green-50',  iconColor: 'text-green-500' },
  'Pending Reports':       { icon: FileText,       iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  'Pending Reviews':       { icon: ClipboardCheck, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
};

const DEFAULT_AVATAR =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23e2e8f0"/><path d="M12 12.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%2394a3b8"/></svg>';

const DEPARTMENTS = [
  'Computer Engineering', 'Information Technology', 'AIML', 'EXTC',
  'AIDS', 'ECS', 'Civil Engineering', 'Mechanical Engineering',
];

const SEED_ADMINS = [
  { id: 'adm-1', name: 'Advait Warang',  email: 'advait@gmail.com',   role: 'Admin', department: 'Computer Engineering',  status: 'Active', joined: '2024-08-01' },
  { id: 'adm-2', name: 'Yashwant Singh', email: 'yashwant@gmail.com', role: 'Admin', department: 'Information Technology', status: 'Active', joined: '2024-08-01' },
];

const EMPTY_ADMIN_FORM = { name: '', email: '', department: '', role: 'Admin', status: 'Active', password: '' };

// ============================================================
// HELPERS
// ============================================================

const formatTime = (d) => {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const s = d.getSeconds().toString().padStart(2, '0');
  const ap = h >= 12 ? 'P.M.' : 'A.M.';
  h = h % 12 || 12;
  return `${h.toString().padStart(2, '0')}:${m}:${s} ${ap}`;
};

const formatDate = (d) =>
  d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

const statusClasses = (status) => {
  switch (status) {
    case 'Good':     return 'bg-green-100 text-green-700';
    case 'Average':  return 'bg-orange-100 text-orange-700';
    case 'Bad':      return 'bg-red-100 text-red-700';
    case 'Active':   return 'bg-emerald-100 text-emerald-700';
    case 'Inactive': return 'bg-gray-100 text-gray-500';
    case 'Suspended':return 'bg-red-100 text-red-600';
    default:         return 'bg-gray-100 text-gray-700';
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
  const mapping = STAT_ICON_MAP[stat.title] || { icon: FileText, iconBg: 'bg-gray-50', iconColor: 'text-gray-500' };
  const Icon = mapping.icon;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-xs text-gray-500 mt-1 font-medium">{stat.title}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl ${mapping.iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${mapping.iconColor}`} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {stat.isUp
          ? <TrendingUp className="w-3.5 h-3.5 text-green-500" />
          : <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
        <span className={`text-xs font-semibold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
          {stat.subtext}
        </span>
      </div>
    </div>
  );
};

const ReportSubmissionChart = ({ reportData, activeFilter, setActiveFilter }) => {
  const labels = reportData.labels || [];
  const datasets = reportData.datasets || {};
  const chartData = labels.map((day, i) => {
    const point = { day };
    Object.values(datasets).forEach((ds) => { point[ds.label] = ds.points[i]; });
    return point;
  });
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-[3] min-w-0">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-base font-bold text-gray-900">Report Submission</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {['Daily', 'Weekly', 'Monthly'].map((f) => (
            <label key={f} className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="saReportFilter" checked={activeFilter === f}
                onChange={() => setActiveFilter(f)} className="accent-indigo-600 w-3 h-3" />
              {f}
            </label>
          ))}
        </div>
      </div>
      {labels.length === 0 ? (
        <div className="h-52 flex items-center justify-center text-gray-400 text-sm">No chart data available</div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                {Object.values(datasets).map((ds) => (
                  <linearGradient key={ds.label} id={`sa-grad-${ds.label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ds.color} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={ds.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              {Object.values(datasets).map((ds) => (
                <Area key={ds.label} type="monotone" dataKey={ds.label} stroke={ds.color} strokeWidth={2.5}
                  fill={`url(#sa-grad-${ds.label})`} dot={{ r: 3, fill: '#fff', stroke: ds.color, strokeWidth: 2 }} activeDot={{ r: 5 }} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-3">
            {Object.values(datasets).map((ds) => (
              <div key={ds.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: ds.color }} />
                {ds.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const InternshipStatusChart = ({ statusData, activeFilter, setActiveFilter }) => {
  const radialData = [
    { name: 'EXTC',     value: statusData.extc,    fill: '#A78BFA' },
    { name: 'IT',       value: statusData.it,      fill: '#FB7185' },
    { name: 'Computer', value: statusData.computer, fill: '#38BDF8' },
  ];
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-[2] min-w-0">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-base font-bold text-gray-900">Internship Status</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {['Daily', 'Weekly', 'Monthly'].map((f) => (
            <label key={f} className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="saStatusFilter" checked={activeFilter === f}
                onChange={() => setActiveFilter(f)} className="accent-indigo-600 w-3 h-3" />
              {f}
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="100%" height={240}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="90%"
            data={radialData} startAngle={90} endAngle={-270} barSize={18}>
            <RadialBar background={{ fill: '#F3F4F6' }} dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-3">
          {[...radialData].reverse().map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs whitespace-nowrap">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: entry.fill }} />
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
    systemStatus, stats, reportSubmission, internshipStatus,
    loading: dashboardLoading, chartsLoading, viewType,
    error: dashboardError,
  } = useSelector((s) => s.dashboard);

  const {
    list: studentsList, profiles: studentProfiles,
    loading: studentsLoading, profilesLoading, error: studentsError,
  } = useSelector((s) => s.students);

  const { user } = useSelector((s) => s.auth);

  // Local UI state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [reportFilter, setReportFilter] = useState('Daily');
  const [statusFilter, setStatusFilter] = useState('Daily');

  // Admin management state
  const [adminList, setAdminList] = useState(SEED_ADMINS);
  const [adminSearch, setAdminSearch] = useState('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [adminForm, setAdminForm] = useState(EMPTY_ADMIN_FORM);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

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
    () => studentsList.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    [searchQuery, studentsList],
  );

  const filteredAdmins = useMemo(
    () => adminList.filter(
      (a) =>
        a.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
        a.email.toLowerCase().includes(adminSearch.toLowerCase()) ||
        a.department.toLowerCase().includes(adminSearch.toLowerCase()),
    ),
    [adminList, adminSearch],
  );

  // Admin CRUD
  const openAddAdminModal = () => { setEditingAdminId(null); setAdminForm(EMPTY_ADMIN_FORM); setShowAdminPassword(false); setIsAdminModalOpen(true); };
  const openEditAdminModal = (admin) => {
    setEditingAdminId(admin.id);
    setAdminForm({ name: admin.name, email: admin.email, department: admin.department, role: admin.role, status: admin.status, password: '' });
    setShowAdminPassword(false);
    setIsAdminModalOpen(true);
  };
  const handleAdminFormSubmit = (e) => {
    e.preventDefault();
    if (editingAdminId) {
      setAdminList((prev) => prev.map((a) => a.id === editingAdminId ? { ...a, ...adminForm } : a));
      showToast(`Admin "${adminForm.name}" updated.`);
    } else {
      setAdminList((prev) => [...prev, { id: `adm-${Date.now()}`, ...adminForm, joined: new Date().toISOString().split('T')[0] }]);
      showToast(`Admin "${adminForm.name}" added.`);
    }
    setIsAdminModalOpen(false);
  };
  const handleDeleteAdmin = (id) => {
    const admin = adminList.find((a) => a.id === id);
    setAdminList((prev) => prev.filter((a) => a.id !== id));
    showToast(`Admin "${admin?.name}" removed.`);
    setDeleteConfirmId(null);
  };
  const toggleAdminStatus = (id) => {
    setAdminList((prev) => prev.map((a) => a.id === id ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a));
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <ShieldCheck className="w-5 h-5 text-violet-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

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
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{systemStatus.status}</h2>
              <span className={`w-3.5 h-3.5 rounded-full inline-block shadow-sm ${systemStatus.status === 'Active' ? 'bg-green-500 shadow-green-300' : 'bg-red-500 shadow-red-300'}`} />
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div>
              <p className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight">{formatTime(currentTime)}</p>
              <p className="text-sm text-gray-400 mt-0.5">{formatDate(currentTime)}</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/logo.png" alt="Atharva University" className="h-[120px] w-auto object-contain drop-shadow-sm" onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Super Admin</p>
            <p className="text-xs text-gray-500">{user?.name} — {systemStatus.activeSessions} sessions active</p>
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
          <><SkeletonChart /><SkeletonChart /></>
        ) : (
          <>
            <ReportSubmissionChart reportData={reportSubmission} activeFilter={reportFilter} setActiveFilter={setReportFilter} />
            <InternshipStatusChart statusData={internshipStatus} activeFilter={statusFilter} setActiveFilter={setStatusFilter} />
          </>
        )}
      </div>

      {/* ─── Row 3: Students Reports ─── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <h3 className="text-base font-bold text-gray-900">Students Reports</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <button className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Recent</button>
            <button className="text-sm font-medium text-gray-400 hover:text-indigo-600 transition-colors">Starred</button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input type="text" placeholder="Search..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36" />
            </div>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => dispatch(setViewType('table'))}
                className={`p-1.5 transition-colors cursor-pointer ${viewType === 'table' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50'}`}
                aria-label="Table view"><List className="w-4 h-4" /></button>
              <button onClick={() => dispatch(setViewType('grid'))}
                className={`p-1.5 transition-colors cursor-pointer ${viewType === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50'}`}
                aria-label="Grid view"><LayoutGrid className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewType === 'table' && (
          <div className="overflow-x-auto">
            {studentsLoading ? (
              <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /><span className="text-sm">Loading students...</span>
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
                    <th className="py-3 px-3 font-medium text-right">Work Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr key={s.id} onClick={() => navigate('/students/' + toSlug(s.name))}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors cursor-pointer">
                      <td className="py-3.5 px-3 text-gray-500">{s.id}</td>
                      <td className="py-3.5 px-3 text-gray-900 font-medium">{s.name}</td>
                      <td className="py-3.5 px-3 text-gray-500">{s.role}</td>
                      <td className="py-3.5 px-3 text-gray-500">{s.department}</td>
                      <td className="py-3.5 px-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(s.status)}`}>{s.status}</span>
                      </td>
                      <td className="py-3.5 px-3 text-gray-500 text-right">{s.workHours}</td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && !studentsLoading && (
                    <tr><td colSpan={6} className="py-8 text-center text-gray-400 text-sm">No students found matching "{searchQuery}"</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* GRID VIEW */}
        {viewType === 'grid' && (
          <div>
            {profilesLoading ? (
              <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /><span className="text-sm">Loading profiles...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentProfiles
                  .filter((c) =>
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.department?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((card, i) => (
                    <div key={i} onClick={() => navigate('/students/' + toSlug(card.name))}
                      className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer">
                      <img src={card.avatar || DEFAULT_AVATAR} alt={card.name}
                        className="w-20 h-24 rounded-xl object-cover flex-shrink-0 bg-gray-100"
                        onError={(e) => { e.target.src = DEFAULT_AVATAR; }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${card.badgeType === 'green' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            <Star className="w-2.5 h-2.5 fill-current" />{card.badge}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold">{card.rating}</span>
                          </div>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 truncate">{card.name}</h4>
                        <p className="text-[11px] text-blue-600 leading-snug mt-1 line-clamp-2">{card.achievements}</p>
                        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                          {card.tags.map((tag, j) => (
                            <span key={j} className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">{tag}</span>
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

      {/* ─── Row 4: Admin Management ─── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-gray-900">Admin Management</h3>
            <p className="text-xs text-gray-500 mt-0.5">Add, edit or deactivate admin accounts across all departments.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input type="text" placeholder="Search admins..." value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 w-40" />
            </div>
            <button onClick={openAddAdminModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> Add Admin
            </button>
          </div>
        </div>

        {/* Admin Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-3 px-3 font-medium">Name</th>
                <th className="py-3 px-3 font-medium">Email</th>
                <th className="py-3 px-3 font-medium">Department</th>
                <th className="py-3 px-3 font-medium">Role</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-3 font-medium">Joined</th>
                <th className="py-3 px-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                        {admin.name.charAt(0)}
                      </div>
                      <span className="text-gray-900 font-medium">{admin.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-gray-500">{admin.email}</td>
                  <td className="py-3.5 px-3 text-gray-500">{admin.department}</td>
                  <td className="py-3.5 px-3 text-gray-500">{admin.role}</td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(admin.status)}`}>{admin.status}</span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-500">{admin.joined}</td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleAdminStatus(admin.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${admin.status === 'Active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                        {admin.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => openEditAdminModal(admin)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirmId(admin.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAdmins.length === 0 && (
                <tr><td colSpan={7} className="py-8 text-center text-gray-400 text-sm">No admins found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================
          ADD / EDIT ADMIN MODAL
         ============================================================ */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200" onClick={() => setIsAdminModalOpen(false)}>
          <div className="bg-white rounded-[28px] shadow-2xl max-w-md w-full border border-gray-100 p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsAdminModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{editingAdminId ? 'Edit Admin' : 'Add New Admin'}</h2>
            <p className="text-xs text-gray-500 mb-5">{editingAdminId ? 'Update admin account details.' : 'Create a new admin account.'}</p>
            <form onSubmit={handleAdminFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                <input required type="text" value={adminForm.name} onChange={(e) => setAdminForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Dr. Priya Sharma"
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input required type="email" value={adminForm.email} onChange={(e) => setAdminForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white" />
                </div>
              </div>
              {!editingAdminId && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input required type={showAdminPassword ? 'text' : 'password'} value={adminForm.password}
                      onChange={(e) => setAdminForm((f) => ({ ...f, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white" />
                    <button type="button" onClick={() => setShowAdminPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Department</label>
                <select required value={adminForm.department} onChange={(e) => setAdminForm((f) => ({ ...f, department: e.target.value }))}
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Role</label>
                  <select value={adminForm.role} onChange={(e) => setAdminForm((f) => ({ ...f, role: e.target.value }))}
                    className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
                    <option value="Admin">Admin</option>
                    <option value="Co-Admin">Co-Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Status</label>
                  <select value={adminForm.status} onChange={(e) => setAdminForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md cursor-pointer">
                  <CheckCircle className="w-4 h-4" />
                  {editingAdminId ? 'Save Changes' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200" onClick={() => setDeleteConfirmId(null)}>
          <div className="bg-white rounded-[28px] shadow-2xl max-w-sm w-full border border-gray-100 p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-base font-bold text-gray-900 mb-2">Remove Admin?</h2>
            <p className="text-xs text-gray-500 mb-6">
              This will permanently remove <span className="font-bold text-gray-800">{adminList.find((a) => a.id === deleteConfirmId)?.name}</span>. This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
              <button onClick={() => handleDeleteAdmin(deleteConfirmId)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer">
                <Trash2 className="w-4 h-4" /> Remove Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
