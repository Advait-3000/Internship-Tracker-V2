import React from "react";
import { Outlet, NavLink, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  LayoutDashboard,
  UserCircle,
  Star,
  FolderKanban,
  CheckSquare,
  MessageSquarePlus,
  LogOut,
  Search,
  Bell,
  Sun,
  LayoutGrid,
  Briefcase,
} from "lucide-react";

const STUDENT_NAV = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/student/profile", label: "My Profile", icon: UserCircle },
  { to: "/student/reviews", label: "Reviews", icon: MessageSquarePlus },
  { to: "/student/projects", label: "My Projects", icon: FolderKanban },
  { to: "/student/tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/student/companies", label: "Companies", icon: Briefcase },
];

function StudentLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "Student") {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => dispatch(logout());

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ───── Sidebar ───── */}
      <aside className="fixed inset-y-0 left-0 z-40 w-56 flex flex-col border-r border-gray-200 bg-white px-3 py-5">
        {/* Logo */}
        <div className="flex items-center gap-4 px-2 pb-6">
          <img src="/logo.png" alt="AUM Logo" className="h-11 w-auto object-contain" />
          <span className="text-xl font-extrabold tracking-wide text-black">AUM</span>
        </div>

        {/* Student badge */}
        <div className="mx-2 mb-4 flex items-center gap-2.5 rounded-xl bg-indigo-50 border border-indigo-100 p-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-extrabold shrink-0">
            {user.name?.charAt(0) || "S"}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
            <p className="text-[10px] text-indigo-600 font-semibold">Student</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 flex-1" aria-label="Student navigation">
          {STUDENT_NAV.map(({ to, label, icon: Icon, end }) => {
            const isActive = end
              ? location.pathname === to
              : location.pathname.startsWith(to);
            return (
              <NavLink
                key={to}
                to={to}
                className={() =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon size={18} strokeWidth={2} />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sign out at bottom */}
        <div className="mt-auto px-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut size={18} strokeWidth={2} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ───── Main wrapper ───── */}
      <div className="ml-56 flex flex-1 flex-col min-h-screen">
        {/* ───── Header ───── */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <LayoutGrid size={15} className="opacity-70" />
            <Star size={15} className="opacity-70" />
            <span className="text-gray-300">/</span>
            <span>Student Portal</span>
            <span className="text-gray-300">/</span>
            <span className="font-bold text-gray-900 capitalize">
              {location.pathname.split("/").pop() || "Dashboard"}
            </span>
          </div>

          {/* Search */}
          <div className="flex flex-1 max-w-sm items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-1.5 transition-colors focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, projects..."
              className="w-full border-none bg-transparent text-xs text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer" title="Toggle theme">
              <Sun size={16} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer" title="Notifications">
              <Bell size={16} />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Student
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* ───── Page content ───── */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
