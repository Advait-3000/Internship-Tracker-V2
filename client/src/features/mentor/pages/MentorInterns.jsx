import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import { fetchStudents } from "../../students/studentsSlice";
import MentorSidebar from "../components/MentorSidebar";
import MentorReviewForm from "../components/MentorReviewForm";
import {
  Menu,
  ChevronDown,
  ChevronUp,
  Star,
  ExternalLink
} from "lucide-react";

const MentorInterns = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { list: students, loading } = useSelector((state) => state.students);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isManual, setIsManual] = useState(true);

  // Expanded cards state
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const toggleSidebarManual = () => {
    setIsManual(!isManual);
    if (!isManual) setIsCollapsed(false);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Get a dummy subset of students to pretend they are the mentor's interns
  const mentorStudents = students.slice(0, 8); 

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      <MentorSidebar
        activeItem="Interns"
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
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Interns</h1>
              <p className="text-sm text-gray-500 font-medium hidden sm:block">
                Manage and review your assigned students
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center p-20">
                 <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {mentorStudents.map((student) => (
                  <div key={student.id} className={`bg-white rounded-2xl shadow-sm border ${expandedId === student.id ? 'border-indigo-200 ring-4 ring-indigo-50 xl:col-span-2' : 'border-gray-100'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                    
                    <div 
                      className="p-6 flex items-center justify-between cursor-pointer group relative"
                      onClick={() => toggleExpand(student.id)}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-tr-2xl"></div>
                      <div className="flex items-center gap-5 z-10">
                         <div className="relative">
                           <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm">
                             {student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                           </div>
                           <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${student.status === 'Good' ? 'bg-green-500' : student.status === 'Average' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                         </div>
                         <div>
                           <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{student.name}</h3>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-gray-500">{student.department}</span>
                             <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                             <span className="text-xs font-medium text-gray-400">Year {student.year || 3}</span>
                           </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-4 z-10">
                         <div className="hidden sm:flex flex-col items-end mr-2">
                           <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Performance</span>
                           <span className={`text-sm font-bold ${student.status === 'Good' ? 'text-green-600' : student.status === 'Average' ? 'text-yellow-600' : 'text-red-600'}`}>
                             {student.status}
                           </span>
                         </div>
                         <div className={`p-2 rounded-full transition-colors ${expandedId === student.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                           {expandedId === student.id ? (
                             <ChevronUp className="w-5 h-5" />
                           ) : (
                             <ChevronDown className="w-5 h-5" />
                           )}
                         </div>
                      </div>
                    </div>

                    {/* Expanded Section */}
                    {expandedId === student.id && (
                      <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                         <div className="flex flex-col md:flex-row gap-6 mt-2">
                            
                            {/* Feedback UI */}
                            <div className="flex-1">
                               <MentorReviewForm studentName={student.name} />
                            </div>

                            {/* Profile Link */}
                            <div className="w-full md:w-48 flex flex-col items-start justify-between border-t md:border-t-0 md:border-l border-gray-200 pt-5 md:pt-0 md:pl-6">
                               <div>
                                 <h4 className="text-sm font-bold text-gray-900 mb-1">Quick Stats</h4>
                                 <div className="space-y-2 mt-3">
                                   <div className="flex justify-between items-center text-xs">
                                     <span className="text-gray-500">Attendance</span>
                                     <span className="font-bold text-gray-900">85%</span>
                                   </div>
                                   <div className="w-full bg-gray-100 rounded-full h-1.5">
                                      <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '85%'}}></div>
                                   </div>
                                   <div className="flex justify-between items-center text-xs mt-3">
                                     <span className="text-gray-500">Tasks Done</span>
                                     <span className="font-bold text-gray-900">12/15</span>
                                   </div>
                                   <div className="w-full bg-gray-100 rounded-full h-1.5">
                                      <div className="bg-green-500 h-1.5 rounded-full" style={{width: '80%'}}></div>
                                   </div>
                                 </div>
                               </div>
                               
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   navigate(`/students/profile/${student.id}`);
                                 }}
                                 className="mt-6 inline-flex items-center justify-center w-full px-4 py-2.5 border-2 border-gray-100 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-200 hover:text-indigo-600 transition-all gap-2 group"
                               >
                                 Full Profile
                                 <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
                               </button>
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorInterns;
