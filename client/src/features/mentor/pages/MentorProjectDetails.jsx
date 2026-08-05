import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import MentorSidebar from "../components/MentorSidebar";
import MentorReviewForm from "../components/MentorReviewForm";
import { Menu, ArrowLeft, CheckCircle, Clock, AlertTriangle, ListTodo, ExternalLink, Star, ChevronDown, ChevronUp } from "lucide-react";

// Dummy project data
const PROJECT_DATA = {
  alpha: {
    name: "Project Alpha",
    description: "AI-driven analytics platform aimed at helping small businesses predict market trends with 90% accuracy.",
    status: "On Track",
    tasks: { total: 120, completed: 85, ongoing: 25, delayed: 10 },
    interns: [
      { id: "1", name: "Advait Warang", dept: "B. Tech AIDS", status: "Good", avatar: "/image.png" },
      { id: "2", name: "Yashwant Singh", dept: "AIML", status: "Good", avatar: "/image.png" },
      { id: "3", name: "Parth Bhalala", dept: "CSE(Cyber)", status: "Average", avatar: "/image.png" },
    ]
  },
  beta: {
    name: "Project Beta",
    description: "Enterprise resource planning software designed for seamless logistics management.",
    status: "In Review",
    tasks: { total: 85, completed: 40, ongoing: 40, delayed: 5 },
    interns: [
      { id: "4", name: "Sharvari", dept: "COMPS", status: "Average", avatar: "/image.png" },
      { id: "5", name: "DK", dept: "IT", status: "Bad", avatar: "/image.png" },
    ]
  },
  gamma: {
    name: "Project Gamma",
    description: "Mobile healthcare application that connects patients directly with available specialists in their vicinity.",
    status: "Delayed",
    tasks: { total: 60, completed: 10, ongoing: 20, delayed: 30 },
    interns: [
      { id: "6", name: "Aarav", dept: "R & A", status: "Average", avatar: "/image.png" },
    ]
  }
};

const StatCircle = ({ icon: Icon, title, value, color, bg }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4 shadow-sm">
    <div className={`p-4 rounded-full ${bg} ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const MentorProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const project = PROJECT_DATA[id] || PROJECT_DATA["alpha"];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isManual, setIsManual] = useState(true);
  const [expandedInternId, setExpandedInternId] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const toggleSidebarManual = () => {
    setIsManual(!isManual);
    if (!isManual) setIsCollapsed(false);
  };

  const toggleInternExpand = (internId) => {
    setExpandedInternId(expandedInternId === internId ? null : internId);
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
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/mentor/dashboard')} className="p-2 bg-gray-50 text-gray-500 hover:text-indigo-600 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Project Details</h1>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Project Header */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-bl-full -z-10 pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h2 className="text-3xl font-extrabold text-gray-900">{project.name}</h2>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                  project.status === 'On Track' ? 'bg-green-100 text-green-700' :
                  project.status === 'In Review' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Task Stats */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Task Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCircle icon={ListTodo} title="Total Tasks" value={project.tasks.total} bg="bg-blue-100" color="text-blue-600" />
                <StatCircle icon={CheckCircle} title="Completed" value={project.tasks.completed} bg="bg-green-100" color="text-green-600" />
                <StatCircle icon={Clock} title="Ongoing" value={project.tasks.ongoing} bg="bg-yellow-100" color="text-yellow-600" />
                <StatCircle icon={AlertTriangle} title="Delayed" value={project.tasks.delayed} bg="bg-red-100" color="text-red-600" />
              </div>
              
              {/* Simple progress bar */}
              <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                 <div className="flex justify-between text-sm font-semibold mb-3">
                   <span className="text-gray-600">Completion Progress</span>
                   <span className="text-indigo-600">{Math.round((project.tasks.completed / project.tasks.total) * 100)}%</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden flex">
                    <div className="bg-green-500 h-full" style={{ width: `${(project.tasks.completed / project.tasks.total) * 100}%` }}></div>
                    <div className="bg-yellow-400 h-full" style={{ width: `${(project.tasks.ongoing / project.tasks.total) * 100}%` }}></div>
                    <div className="bg-red-500 h-full" style={{ width: `${(project.tasks.delayed / project.tasks.total) * 100}%` }}></div>
                 </div>
                 <div className="flex gap-4 mt-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Completed</div>
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Ongoing</div>
                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Delayed</div>
                 </div>
              </div>
            </div>

            {/* Interns List */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Assigned Interns ({project.interns.length})</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {project.interns.map((intern) => {
                  const initials = intern.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  return (
                  <div key={intern.id} className={`bg-white rounded-2xl shadow-sm border ${expandedInternId === intern.id ? 'border-indigo-200 ring-4 ring-indigo-50 xl:col-span-2' : 'border-gray-100'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                    
                    {/* Card Header (Always visible) */}
                    <div 
                      className="p-6 flex items-center justify-between cursor-pointer group relative"
          
                      onClick={() => toggleInternExpand(intern.id)}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-tr-2xl"></div>
                      <div className="flex items-center gap-5 z-10">
                         <div className="relative">
                           <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm">
                             {initials}
                           </div>
                           <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${intern.status === 'Good' ? 'bg-green-500' : intern.status === 'Average' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                         </div>
                         <div>
                           <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{intern.name}</h3>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-gray-500">{intern.dept}</span>
                           </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-4 z-10">
                         <div className="hidden sm:flex flex-col items-end mr-2">
                           <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Performance</span>
                           <span className={`text-sm font-bold ${intern.status === 'Good' ? 'text-green-600' : intern.status === 'Average' ? 'text-yellow-600' : 'text-red-600'}`}>
                             {intern.status}
                           </span>
                         </div>
                         <div className={`p-2 rounded-full transition-colors ${expandedInternId === intern.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                           {expandedInternId === intern.id ? (
                             <ChevronUp className="w-5 h-5" />
                           ) : (
                             <ChevronDown className="w-5 h-5" />
                           )}
                         </div>
                      </div>
                    </div>

                    {/* Expanded Section */}
                    {expandedInternId === intern.id && (
                      <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                         <div className="flex flex-col md:flex-row gap-6 mt-2">
                            
                            {/* Feedback UI */}
                            <div className="flex-1">
                               <MentorReviewForm studentName={intern.name} />
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
                                   navigate(`/students/profile/${intern.id}`);
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
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorProjectDetails;
