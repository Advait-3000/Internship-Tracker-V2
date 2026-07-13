import { Outlet, NavLink } from "react-router-dom";
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
} from "lucide-react";

/* ──────────────────────────────────────────────
   Navigation link data
   ────────────────────────────────────────────── */
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/companies", label: "Companies", icon: Briefcase },
  { to: "/faculty", label: "Faculty", icon: GraduationCap },
  { to: "/profile", label: "User Profile", icon: UserCircle },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ───── Sidebar ───── */}
      <aside
        id="sidebar"
        className="fixed inset-y-0 left-0 z-40 w-52 flex flex-col border-r border-gray-200 bg-white px-3 py-5"
      >
        {/* Logo */}
        <div className="flex items-center gap-6 px-2 pb-6">
          <img
            src="/logo.png"
            alt="AUM Logo"
            className="h-12 w-auto object-contain"
          />
          <span className="text-xl font-extrabold tracking-wide text-black">
            AUM
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ───── Main wrapper (everything right of sidebar) ───── */}
      <div className="ml-52 flex flex-1 flex-col min-h-screen">
        {/* ───── Header ───── */}
        <header
          id="header"
          className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <LayoutGrid size={16} className="opacity-70" />
            <Star size={16} className="opacity-70" />
            <span className="text-gray-300">/</span>
            <span>Dashboards</span>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-900">Default</span>
          </div>

          {/* Search */}
          <div
            id="header-search"
            className="flex flex-1 max-w-sm items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-1.5 transition-colors focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              aria-label="Search"
              className="w-full border-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <Sun size={18} />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="History"
              title="History"
            >
              <Clock size={18} />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={18} />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Bookmarks"
              title="Bookmarks"
            >
              <Bookmark size={18} />
            </button>

            <button
              id="header-filter-btn"
              className="ml-2 flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-300"
            >
              <SlidersHorizontal size={16} />
              <span>Filter</span>
            </button>
          </div>
        </header>

        {/* ───── Page content ───── */}
        <main id="main-content" className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
