import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import MentorSidebar from "../components/MentorSidebar";
import { Menu } from "lucide-react";

const MentorProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isManual, setIsManual] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const toggleSidebarManual = () => {
    setIsManual(!isManual);
    if (!isManual) setIsCollapsed(false);
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      <MentorSidebar
        activeItem="User Profile"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        isCollapsed={isCollapsed}
        isManual={isManual}
        onToggleManual={toggleSidebarManual}
        onMouseEnter={() => !isManual && setIsCollapsed(false)}
        onMouseLeave={() => !isManual && setIsCollapsed(true)}
      />

      <main
        className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mentor Profile</h1>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
             <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4">
               {user?.name?.charAt(0) || "M"}
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name || "Mentor User"}</h2>
             <p className="text-gray-500 mb-6">{user?.email || "mentor@gmail.com"}</p>
             
             <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4">
               <h3 className="font-semibold text-gray-700">Account Details</h3>
               <div className="flex justify-between border-b border-gray-200 pb-2">
                 <span className="text-gray-500">Role</span>
                 <span className="font-medium text-gray-900 capitalize">{user?.role || "Mentor"}</span>
               </div>
               <div className="flex justify-between border-b border-gray-200 pb-2">
                 <span className="text-gray-500">Department</span>
                 <span className="font-medium text-gray-900">Computer Science</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500">Joined</span>
                 <span className="font-medium text-gray-900">August 2025</span>
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorProfile;
