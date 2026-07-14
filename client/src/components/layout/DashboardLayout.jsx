import React from "react";
import { Outlet, NavLink, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  UserCircle,
  Search,
  Sun,
  Clock,
  Bell,
  Bookmark,
  SlidersHorizontal,
  LayoutGrid,
  Star,
  LogOut,
  FolderKanban,
  MessageSquarePlus,
  Award
} from "lucide-react";

function DashboardLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // ENFORCE AUTHENTICATION: Cannot access any dashboard pages until logged in
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const isMentor = user?.role === "Mentor";

  // Dynamic navigation items based on role
  const navItems = isMentor
    ? [
        { to: "/mentor", label: "Mentor Portal", icon: Award, end: true },
        { to: "/mentor?tab=interns", label: "Interns List", icon: Users },
        { to: "/mentor?tab=projects", label: "Project Lists", icon: FolderKanban },
        { to: "/mentor?tab=reviews", label: "Reviews Log", icon: MessageSquarePlus },
        { to: "/students", label: "Student Directory", icon: GraduationCap },
        { to: "/profile", label: "User Profile", icon: UserCircle },
      ]
    : [
        { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/students", label: "Students", icon: Users },
        { to: "/companies", label: "Companies", icon: Briefcase },
        { to: "/faculty", label: "Faculty", icon: GraduationCap },
        { to: "/profile", label: "User Profile", icon: UserCircle },
      ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ───── Sidebar ───── */}
      <aside
        id="sidebar"
        className="fixed inset-y-0 left-0 z-40 w-56 flex flex-col border-r border-gray-200 bg-white px-3 py-5"
      >
        {/* Logo */}
        <div className="flex items-center gap-4 px-2 pb-6">
          <img
            src="/logo.png"
            alt="AUM Logo"
            className="h-11 w-auto object-contain"
          />
          <span className="text-xl font-extrabold tracking-wide text-black">
            AUM
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5" aria-label="Main navigation">
          {navItems.map(({ to, label, icon: Icon, end }) => {
            // Determine active state including search params for mentor tabs
            const isActiveLink =
              to.includes("?tab=")
                ? location.pathname === "/mentor" && location.search === to.substring(to.indexOf("?"))
                : end
                ? location.pathname === to && !location.search
                : location.pathname.startsWith(to.split("?")[0]) && to !== "/mentor";

            return (
              <NavLink
                key={to}
                to={to}
                className={() =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-150 ${
                    isActiveLink
                      ? "bg-blue-600 text-white shadow-sm"
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
      </aside>

      {/* ───── Main wrapper (everything right of sidebar) ───── */}
      <div className="ml-56 flex flex-1 flex-col min-h-screen">
        {/* ───── Header ───── */}
        <header
          id="header"
          className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <LayoutGrid size={15} className="opacity-70" />
            <Star size={15} className="opacity-70" />
            <span className="text-gray-300">/</span>
            <span>Dashboards</span>
            <span className="text-gray-300">/</span>
            <span className="font-bold text-gray-900">{isMentor ? "Mentor Portal" : "Default"}</span>
          </div>

          {/* Search */}
          <div
            id="header-search"
            className="flex flex-1 max-w-sm items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-1.5 transition-colors focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search interns, projects..."
              aria-label="Search"
              className="w-full border-none bg-transparent text-xs text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <Sun size={16} />
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={16} />
            </button>

            {/* User info & Sign Out */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {user?.role || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* ───── Page content ───── */}
        <main id="main-content" className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
