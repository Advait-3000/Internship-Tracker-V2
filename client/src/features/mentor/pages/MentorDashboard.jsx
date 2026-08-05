import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import MentorSidebar from "../components/MentorSidebar";
import {
  Menu,
  FileText,
  ClipboardCheck,
  Building2,
  Users,
  CheckCircle,
  Briefcase
} from "lucide-react";

// Dummy data for Mentor Dashboard
const STATS = [
  { title: "Total Interns", value: "24", subtext: "+3 this month", isUp: true, icon: Users, bg: "bg-blue-50", color: "text-blue-500" },
  { title: "Pending Reviews", value: "8", subtext: "-2 since last week", isUp: true, icon: ClipboardCheck, bg: "bg-orange-50", color: "text-orange-500" },
  { title: "Active Projects", value: "5", subtext: "On track", isUp: true, icon: Briefcase, bg: "bg-green-50", color: "text-green-500" },
];

const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-xs text-gray-500 mt-1 font-medium">{stat.title}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${stat.color}`} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <span className={`text-xs font-semibold ${stat.isUp ? "text-green-500" : "text-red-500"}`}>
          {stat.subtext}
        </span>
      </div>
    </div>
  );
};

const MentorDashboard = () => {
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
        activeItem="Dashboard"
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
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mentor Dashboard</h1>
              <p className="text-sm text-gray-500 font-medium hidden sm:block">
                Welcome back, {user?.name || "Mentor"}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {STATS.map((stat, i) => (
                <StatCard key={i} stat={stat} />
              ))}
            </div>

            {/* Active Projects Enhanced Grid */}
            <div>
               <h3 className="text-xl font-bold text-gray-900 mb-4">Your Active Projects</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 
                 {/* Project Card 1 */}
                 <div onClick={() => navigate('/mentor/project/alpha')} className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                       <Briefcase className="w-6 h-6" />
                     </div>
                     <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">On Track</span>
                   </div>
                   <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">Project Alpha</h4>
                   <p className="text-sm text-gray-500 mb-6">AI-driven analytics platform</p>
                   
                   <div className="space-y-2">
                     <div className="flex justify-between text-sm font-medium text-gray-700">
                       <span>Progress</span>
                       <span>75%</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-2">
                       <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                     </div>
                   </div>
                   
                   <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                     <div className="flex -space-x-2">
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-200 flex items-center justify-center text-xs font-bold text-blue-700">A</div>
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-green-200 flex items-center justify-center text-xs font-bold text-green-700">B</div>
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-200 flex items-center justify-center text-xs font-bold text-orange-700">+10</div>
                     </div>
                     <span className="text-sm text-gray-500 font-medium">12 Interns</span>
                   </div>
                 </div>

                 {/* Project Card 2 */}
                 <div onClick={() => navigate('/mentor/project/beta')} className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all duration-300 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                       <Building2 className="w-6 h-6" />
                     </div>
                     <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">In Review</span>
                   </div>
                   <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">Project Beta</h4>
                   <p className="text-sm text-gray-500 mb-6">Enterprise resource planning</p>
                   
                   <div className="space-y-2">
                     <div className="flex justify-between text-sm font-medium text-gray-700">
                       <span>Progress</span>
                       <span>90%</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-2">
                       <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                     </div>
                   </div>
                   
                   <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                     <div className="flex -space-x-2">
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-200 flex items-center justify-center text-xs font-bold text-pink-700">S</div>
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">M</div>
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">+6</div>
                     </div>
                     <span className="text-sm text-gray-500 font-medium">8 Interns</span>
                   </div>
                 </div>

                 {/* Project Card 3 */}
                 <div onClick={() => navigate('/mentor/project/gamma')} className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-rose-200 transition-all duration-300 group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                       <CheckCircle className="w-6 h-6" />
                     </div>
                     <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Delayed</span>
                   </div>
                   <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">Project Gamma</h4>
                   <p className="text-sm text-gray-500 mb-6">Mobile healthcare application</p>
                   
                   <div className="space-y-2">
                     <div className="flex justify-between text-sm font-medium text-gray-700">
                       <span>Progress</span>
                       <span>35%</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-2">
                       <div className="bg-rose-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                     </div>
                   </div>
                   
                   <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                     <div className="flex -space-x-2">
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-teal-200 flex items-center justify-center text-xs font-bold text-teal-700">K</div>
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-200 flex items-center justify-center text-xs font-bold text-yellow-700">R</div>
                       <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">+2</div>
                     </div>
                     <span className="text-sm text-gray-500 font-medium">4 Interns</span>
                   </div>
                 </div>

               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
