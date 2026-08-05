import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  X,
  LogOut
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/mentor/dashboard" },
  { name: "Interns", icon: Users, path: "/mentor/interns" },
  { name: "User Profile", icon: UserCircle, path: "/mentor/profile" },
];

const MentorSidebar = ({
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

export default MentorSidebar;
