import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import { fetchStudentProfiles } from "../studentsSlice";
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCircle,
  Menu,
  X,
  LogOut,
  Star,
  ChevronLeft,
  Filter,
  ChevronDown,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Briefcase,
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

// ============================================================
// SUB-COMPONENTS
// ============================================================

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

const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23e2e8f0"/><path d="M12 12.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%2394a3b8"/></svg>';
const KANBAN_IMG_1 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><rect width="300" height="150" fill="%23f1f5f9"/><rect x="20" y="20" width="100" height="80" rx="4" fill="%23cbd5e1"/><rect x="140" y="20" width="140" height="15" rx="4" fill="%2394a3b8"/><rect x="140" y="45" width="100" height="10" rx="4" fill="%23cbd5e1"/><rect x="140" y="65" width="120" height="10" rx="4" fill="%23cbd5e1"/></svg>';
const KANBAN_IMG_2 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><rect width="300" height="150" fill="%23f8fafc"/><circle cx="150" cy="75" r="40" fill="%23e2e8f0"/><circle cx="150" cy="75" r="25" fill="%23cbd5e1"/></svg>';

const Heatmap = ({ grid }) => {
  if (!grid || grid.length === 0) return null;

  const getColor = (intensity) => {
    switch(intensity) {
      case 4: return "#1e9e3c"; // 100% Active: Dark green
      case 3: return "#3dc25a"; // 75% Active: Medium green
      case 2: return "#7ddb8d"; // 50% Active: Light green
      case 1: return "#bcefc3"; // 25% Active: Very light green
      case 0: return "#ffb8b8"; // 0% Active: Red/Pink
      default: return "#f3f4f6";
    }
  };

  // Group columns into months (assuming 4 weeks per month)
  const MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const blocks = [];
  for (let i = 0; i < MONTHS.length; i++) {
    blocks.push(grid.slice(i * 4, (i + 1) * 4));
  }

  return (
    <div className="flex justify-between items-start pt-2">
      <div className="flex gap-[28px] overflow-x-auto pb-4">
        {blocks.map((monthGrid, monthIdx) => (
          <div key={monthIdx} className="flex flex-col gap-2">
            <div className="flex gap-[3px]">
              {monthGrid.map((col, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {col.map((intensity, j) => (
                    <div key={j} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: getColor(intensity) }} />
                  ))}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-gray-500 font-medium text-center">{MONTHS[monthIdx]}</span>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-col gap-[7px] ml-8 pr-4 pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: "#1e9e3c" }}></div>
          <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">100% Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: "#3dc25a" }}></div>
          <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">75% Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: "#7ddb8d" }}></div>
          <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">50% Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: "#bcefc3" }}></div>
          <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">25% Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: "#ffb8b8" }}></div>
          <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">0% Active</span>
        </div>
      </div>
    </div>
  );
};

const KanbanCard = ({ title, priority, comments, attachments, image }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priority === 'High' ? 'bg-red-50 text-red-600' : priority === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
          {priority}
        </span>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      {image && (
        <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 overflow-hidden">
          <img src={image} alt="Thumbnail" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <h5 className="text-sm font-semibold text-gray-900 mb-1">{title}</h5>
      <p className="text-[10px] text-gray-500 mb-3 line-clamp-2">Brainstorming brings team members' diverse experience into play.</p>
      
      <div className="flex items-center justify-between border-t border-gray-50 pt-2">
        <div className="flex -space-x-2">
          <img src={DEFAULT_AVATAR} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100" alt="Avatar" />
          <img src={DEFAULT_AVATAR} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100" alt="Avatar" />
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-medium">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            <span>{comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <Paperclip className="w-3 h-3" />
            <span>{attachments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

const StudentProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.students);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Fetch profiles if not already in state
  useEffect(() => {
    if (profiles.length === 0) {
      dispatch(fetchStudentProfiles());
    }
  }, [dispatch, profiles.length]);

  const profile = profiles.find((p) => p.id === id) || {
    name: "Parth Bhalala",
    avatar: "/parth.png",
    badge: "Top Student",
    badgeType: "orange",
    rating: 4.9,
  };

  const handleSidebarMouseEnter = () => {
    if (!isManual && window.innerWidth >= 1024) setIsCollapsed(false);
  };

  const handleSidebarMouseLeave = () => {
    if (!isManual && window.innerWidth >= 1024) setIsCollapsed(true);
  };

  const handleToggleManual = () => {
    setIsManual(!isManual);
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!isAuthenticated) navigate("/signin");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        activeItem="Students"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => {
          dispatch(logout());
          navigate("/signin");
        }}
        isCollapsed={isCollapsed}
        isManual={isManual}
        onToggleManual={handleToggleManual}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isManual ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <header className="sticky top-0 z-30 bg-white px-4 sm:px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Student Profile</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {/* Profile Header Card */}
          <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-100 rounded-3xl shadow-sm relative mb-8">
            <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-2xl object-cover" />
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-gray-900">{profile.name}</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
                UI/UX Developer, Third Year Engineering Student Atharva College Of Engineering 3x Hackathon Runner UP
              </p>
              <div className="flex items-center gap-4 mt-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 font-semibold text-xs rounded-md">
                  2 Years
                </span>
                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {profile.rating} <span className="text-gray-400 font-normal">Reviews</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-6 right-6">
              <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full inline-flex items-center gap-1.5 ${
                  profile.badgeType === "green" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                }`}
              >
                <Star className="w-3 h-3 fill-current" />
                {profile.badge}
              </span>
            </div>
          </div>

          {/* Mentor & Ongoing Task */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm flex-shrink-0">
                <span className="text-xl font-extrabold text-teal-600">M</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1a365d]">About Mentor / Company</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Senior Associate At BCG & MBA from XLRI, Jamshedpur<br/>
                  EX: National Case Competition Exec...
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a365d] mb-2">Ongoing Task</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-semibold px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-gray-600">#UI/UX</span>
                <span className="text-[10px] font-semibold px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-gray-600">#Web Dev</span>
                <span className="text-[10px] font-semibold px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-gray-600">#Mobile App</span>
              </div>
            </div>
          </div>

          {/* Current Status Heatmap */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#1a365d] mb-6">Attendance Record</h3>
            <Heatmap grid={profile.attendanceGrid} />
          </div>

          {/* Kanban Board */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#1a365d] mb-2 flex items-center gap-2">
                  Project Details
                </h3>
                <p className="text-sm text-gray-500 max-w-2xl">
                  A Full-Stack Web Application Designed To Provide A Seamless, Secure, And Scalable Platform For Managing Users, Data, And Real-Time Interactions Through A Modern And Intuitive Interface.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                    <Filter className="w-3.5 h-3.5" /> Filter
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                    Today <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex -space-x-2 hidden md:flex">
                <img src="https://i.pravatar.cc/150?img=5" className="w-8 h-8 rounded-full border-2 border-white" alt="Team" />
                <img src="https://i.pravatar.cc/150?img=6" className="w-8 h-8 rounded-full border-2 border-white" alt="Team" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-900 text-white flex items-center justify-center text-xs font-bold">+1</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do */}
              <div className="bg-gray-50/50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <h4 className="text-sm font-bold text-gray-900">To Do <span className="text-gray-400 font-normal ml-1">2</span></h4>
                </div>
                <div className="space-y-3">
                  <KanbanCard title="Brainstorming" priority="Low" comments="12 comments" attachments="0 files" />
                  <KanbanCard title="Wireframes" priority="High" comments="12 comments" attachments="0 files" />
                </div>
              </div>

              {/* In Progress */}
              <div className="bg-gray-50/50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <h4 className="text-sm font-bold text-gray-900">On Progress <span className="text-gray-400 font-normal ml-1">2</span></h4>
                </div>
                <div className="space-y-3">
                  <KanbanCard title="Onboarding Illustrations" priority="Low" comments="14 comments" attachments="15 files" image={KANBAN_IMG_1} />
                  <KanbanCard title="Moodboard" priority="Low" comments="12 comments" attachments="0 files" />
                </div>
              </div>

              {/* Done */}
              <div className="bg-gray-50/50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <h4 className="text-sm font-bold text-gray-900">Done <span className="text-gray-400 font-normal ml-1">2</span></h4>
                </div>
                <div className="space-y-3">
                  <KanbanCard title="Mobile App Design" priority="Completed" comments="12 comments" attachments="15 files" image={KANBAN_IMG_2} />
                  <KanbanCard title="Design System" priority="Completed" comments="12 comments" attachments="0 files" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Status Bar Chart */}
            <div className="border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-6">Project Status</h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {[40, 20, 60, 40, 80, 50, 40, 30, 20, 60, 90, 70, 50].map((val, i) => (
                  <div key={i} className="w-full h-full bg-gray-50 rounded-t-sm flex flex-col justify-end">
                    <div className="w-full bg-green-500 rounded-t-sm transition-all" style={{ height: `${val}%` }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[10px] text-gray-400 font-medium px-1">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>

            {/* Skills Learned */}
            <div className="border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-6">Skills Learned</h3>
              <div className="space-y-5">
                {[
                  { name: 'UI', val: '80%' },
                  { name: 'UX Research', val: '65%' },
                  { name: 'Figma', val: '90%' },
                  { name: 'HTML', val: '75%' },
                  { name: 'CSS', val: '70%' },
                  { name: 'React', val: '85%' },
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-700 w-20">{skill.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: skill.val }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;
