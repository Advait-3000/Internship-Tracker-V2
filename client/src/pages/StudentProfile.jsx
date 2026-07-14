import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { assignFaculty } from "../features/students/studentSlice";
import {
  ArrowLeft,
  Building2,
  Briefcase,
  Clock,
  UserX,
  UserCheck,
  GraduationCap,
  RefreshCw,
  Upload,
  FileCheck,
  Mail,
  Star,
  Filter,
  ChevronDown,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Folder,
  Quote,
  CheckCircle2,
  Plus
} from "lucide-react";

// ── Helpers ──

const toSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const fromSlug = (slug) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const statusClasses = (status) => {
  switch (status) {
    case "On Track":     return "bg-green-100 text-green-700";
    case "Completed":    return "bg-blue-100 text-blue-700";
    case "Needs Review": return "bg-amber-100 text-amber-700";
    case "At Risk":      return "bg-red-100 text-red-700";
    default:             return "bg-gray-100 text-gray-700";
  }
};

const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23e2e8f0"/><path d="M12 12.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%2394a3b8"/></svg>';

// ── Heatmap Component (Legacy Attendance Record UI matching reference) ──
const Heatmap = ({ grid }) => {
  const defaultGrid = useMemo(() => {
    if (grid && grid.length > 0) return grid;
    const g = [];
    for (let c = 0; c < 44; c++) {
      const col = [];
      for (let r = 0; r < 7; r++) {
        // Create an organic attendance pattern matching the screenshot
        if ((c === 10 && r === 3) || (c === 20 && r === 5)) {
          col.push(0); // 0% active red dot
        } else {
          const rnd = (c * 7 + r) % 5;
          col.push(rnd === 0 ? 4 : rnd === 1 ? 3 : rnd === 2 ? 2 : 1);
        }
      }
      g.push(col);
    }
    return g;
  }, [grid]);

  const getColor = (intensity) => {
    switch (intensity) {
      case 4: return "#1e9e3c"; // 100% Active: Dark green
      case 3: return "#3dc25a"; // 75% Active: Medium green
      case 2: return "#7ddb8d"; // 50% Active: Light green
      case 1: return "#bcefc3"; // 25% Active: Very light green
      case 0: return "#ff6b6b"; // 0% Active: Coral red
      default: return "#f3f4f6";
    }
  };

  const MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const blocks = [];
  for (let i = 0; i < MONTHS.length; i++) {
    blocks.push(defaultGrid.slice(i * 4, (i + 1) * 4));
  }

  return (
    <div className="flex flex-col xl:flex-row justify-between items-start pt-2 gap-6 overflow-hidden">
      <div className="flex gap-[22px] sm:gap-[28px] overflow-x-auto pb-4 w-full">
        {blocks.map((monthGrid, monthIdx) => (
          <div key={monthIdx} className="flex flex-col gap-2">
            <div className="flex gap-[3px]">
              {monthGrid.map((col, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {col.map((intensity, j) => (
                    <div key={j} className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: getColor(intensity) }} />
                  ))}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-gray-400 font-medium text-center">{MONTHS[monthIdx]}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-[7px] shrink-0 pr-2 pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "#1e9e3c" }}></div>
          <span className="text-[11px] font-medium text-gray-600">100% Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "#3dc25a" }}></div>
          <span className="text-[11px] font-medium text-gray-600">75% Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "#7ddb8d" }}></div>
          <span className="text-[11px] font-medium text-gray-600">50% Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "#bcefc3" }}></div>
          <span className="text-[11px] font-medium text-gray-600">25% Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: "#ff6b6b" }}></div>
          <span className="text-[11px] font-medium text-gray-600">0% Active</span>
        </div>
      </div>
    </div>
  );
};

// ── Kanban Card Component (Legacy Project UI) ──
const KanbanCard = ({ title, tag, image, comments = 12, attachments = 0, priorityColor = "text-amber-600 bg-amber-50" }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-2.5">
        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${priorityColor}`}>
          {tag || "Low"}
        </span>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      {image && (
        <div className="w-full h-28 bg-gray-100 rounded-xl mb-3 overflow-hidden">
          <img src={image} alt="Thumbnail" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <h5 className="text-sm font-bold text-gray-900 mb-1">{title}</h5>
      <p className="text-[11px] text-gray-500 mb-3.5 leading-relaxed line-clamp-2">
        Brainstorming brings team members&apos; diverse experience into play.
      </p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
        <div className="flex -space-x-1.5">
          <img src="https://i.pravatar.cc/150?img=11" className="w-5 h-5 rounded-full border border-white" alt="Avatar" />
          <img src="https://i.pravatar.cc/150?img=12" className="w-5 h-5 rounded-full border border-white" alt="Avatar" />
        </div>
        <div className="flex items-center gap-3 text-gray-400 text-[11px] font-medium">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{comments} comments</span>
          </div>
          <div className="flex items-center gap-1">
            <Paperclip className="w-3.5 h-3.5" />
            <span>{attachments} files</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// COMPONENT
// ============================================================

const StudentProfile = () => {
  const { nameSlug } = useParams();
  const dispatch = useDispatch();

  const { list: internList } = useSelector((s) => s.interns);
  const { list: facultyList } = useSelector((s) => s.faculty);
  const currentUser = useSelector((s) => s.auth.user);

  const role = currentUser?.role || "Student";

  // Look up student by slug match
  const student = useMemo(
    () =>
      internList.find((s) => toSlug(s.name) === nameSlug) || {
        id: "stu-default",
        name: fromSlug(nameSlug || "parth-bhalala"),
        department: "Computer Engineering",
        companyName: "Marico",
        internshipRole: "UI/UX Developer",
        status: "On Track",
        workHours: "40 Hrs/Wk"
      },
    [nameSlug, internList]
  );

  const activeFaculty = useMemo(
    () => facultyList.filter((f) => f.status === "Active"),
    [facultyList]
  );

  const assignedFaculty = useMemo(
    () =>
      student?.assignedFacultyId
        ? facultyList.find((f) => f.id === student.assignedFacultyId)
        : null,
    [student, facultyList]
  );

  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [certificateUploaded, setCertificateUploaded] = useState(false);

  const handleAssign = () => {
    if (!selectedFacultyId) return;
    dispatch(assignFaculty({ studentId: student.id, facultyId: selectedFacultyId }));
    setSelectedFacultyId("");
    setIsChanging(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Nav Row */}
      <div className="flex items-center justify-between">
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>
        <span className={`inline-block rounded-full px-3.5 py-1 text-xs font-bold ${statusClasses(student.status)}`}>
          {student.status}
        </span>
      </div>

      {/* ── Main Outer White Card matching reference image ── */}
      <div className="rounded-[36px] border border-blue-200/60 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-10">
        
        {/* 1. Profile Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Rounded square avatar matching screenshot */}
            <div className="w-28 h-28 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">{student.name}</h1>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-amber-50 text-amber-700 text-xs font-extrabold border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Top Student
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-[#1E56A0] mt-1.5 max-w-2xl leading-snug">
                {student.internshipRole}, Third Year Engineering Student Atharva College Of Engineering{" "}
                <span className="font-extrabold text-[#0D3B66]">3x Hackathon Runner UP</span>
              </p>

              <div className="flex items-center gap-4 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1E56A0] text-white font-bold text-xs shadow-xs">
                  <Folder className="w-3.5 h-3.5" />
                  2 Years
                </span>
                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  4.9 <span className="text-gray-500 font-medium">Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RBAC Conditional Block (Admin / Student) ── */}
        {role === "Admin" && (
          <div className="bg-gray-50/80 rounded-2xl border border-gray-200/80 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Faculty Assignment <span className="text-xs font-normal text-gray-400">(Admin only)</span>
            </h2>
            {assignedFaculty && !isChanging ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-900">{assignedFaculty.name} ({assignedFaculty.department})</span>
                </div>
                <button
                  onClick={() => setIsChanging(true)}
                  className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Change Faculty
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <select
                  value={selectedFacultyId}
                  onChange={(e) => setSelectedFacultyId(e.target.value)}
                  className="flex-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800"
                >
                  <option value="" disabled>Select faculty member...</option>
                  {activeFaculty.map((f) => (
                    <option key={f.id} value={f.id}>{f.name} — {f.department}</option>
                  ))}
                </select>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleAssign}
                    disabled={!selectedFacultyId}
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 disabled:opacity-40"
                  >
                    Assign
                  </button>
                  {isChanging && (
                    <button
                      onClick={() => setIsChanging(false)}
                      className="px-4 py-2 border border-gray-200 bg-white text-gray-700 font-semibold text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {role === "Student" && (
          <div className="bg-gray-50/80 rounded-2xl border border-gray-200/80 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Completion Certificate Proof <span className="text-xs font-normal text-gray-400">(Student only)</span>
            </h2>
            {certificateUploaded ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold">
                <FileCheck className="w-5 h-5 text-green-600" />
                Certificate submitted successfully — pending verification
              </div>
            ) : (
              <button
                onClick={() => setCertificateUploaded(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white py-4 text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Upload Completion Certificate
              </button>
            )}
          </div>
        )}

        {/* 2. Company / Lead Info + Ongoing Task Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex gap-4 items-start">
            {/* Hexagonal/rounded company logo matching screenshot */}
            <div className="w-14 h-14 rounded-2xl border border-blue-100 bg-white shadow-sm flex items-center justify-center shrink-0">
              <span className="text-2xl font-extrabold text-[#1E56A0]">M</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1E56A0]">About Mentor / Company</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed font-medium">
                Senior Associate At BCG & MBA From XLRI, Jamshedpur<br />
                110x National Case Competition Titles...
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1E56A0] mb-2.5">Ongoing Task</h3>
            <div className="flex flex-wrap gap-2">
              {["#React Js", "#React Native", "#React Native", "#React Js", "#React Js", "#React Native"].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-50/80 text-[#1E56A0] border border-blue-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Attendance Record Heatmap */}
        <div>
          <h3 className="text-xl font-extrabold text-[#0D3B66] mb-5">Attendance Record</h3>
          <Heatmap />
        </div>

        {/* 4. Project Details Kanban Board */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#0D3B66] mb-2">Project Details</h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
                A Full-Stack Web Application Designed To Provide A Seamless, Secure, And Scalable Platform For Managing Users, Data, And Real-Time Interactions Through A Modern And Intuitive Interface.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <button className="flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <Filter className="w-3.5 h-3.5" /> Filter
                </button>
                <button className="flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">
                  Today <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex -space-x-2">
              <img src="https://i.pravatar.cc/150?img=11" className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="Team" />
              <img src="https://i.pravatar.cc/150?img=12" className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="Team" />
              <img src="https://i.pravatar.cc/150?img=13" className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="Team" />
              <div className="w-9 h-9 rounded-full border-2 border-white bg-[#0A192F] text-white flex items-center justify-center text-xs font-extrabold">+1</div>
            </div>
          </div>

          {/* 3 Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: To Do */}
            <div className="bg-gray-50/80 p-4 rounded-3xl border border-gray-100 space-y-3.5">
              <div className="flex justify-between items-center px-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">To Do</h4>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">4</span>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <KanbanCard title="Brainstorming" tag="Low" priorityColor="text-amber-700 bg-amber-100" comments={12} attachments={0} />
              <KanbanCard title="Research" tag="High" priorityColor="text-purple-700 bg-purple-100" comments={10} attachments={3} />
              <KanbanCard title="Wireframes" tag="High" priorityColor="text-red-700 bg-red-100" comments={9} attachments={10} />
            </div>

            {/* Column 2: On Progress */}
            <div className="bg-gray-50/80 p-4 rounded-3xl border border-gray-100 space-y-3.5">
              <div className="flex justify-between items-center px-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">On Progress</h4>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">3</span>
                </div>
              </div>
              <KanbanCard
                title="Onboarding Illustrations"
                tag="Low"
                priorityColor="text-amber-700 bg-amber-100"
                comments={14}
                attachments={15}
                image="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80"
              />
              <KanbanCard
                title="Moodboard"
                tag="Low"
                priorityColor="text-amber-700 bg-amber-100"
                comments={9}
                attachments={10}
                image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=80"
              />
            </div>

            {/* Column 3: Done */}
            <div className="bg-gray-50/80 p-4 rounded-3xl border border-gray-100 space-y-3.5">
              <div className="flex justify-between items-center px-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">Done</h4>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">2</span>
                </div>
              </div>
              <KanbanCard
                title="Mobile App Design"
                tag="Completed"
                priorityColor="text-emerald-700 bg-emerald-100"
                comments={12}
                attachments={15}
                image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&auto=format&fit=crop&q=80"
              />
              <KanbanCard title="Design System" tag="Completed" priorityColor="text-emerald-700 bg-emerald-100" comments={12} attachments={15} />
            </div>
          </div>
        </div>

        {/* 5. Project Status Bar Chart & Skills Learned Box matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Project Status Bar Chart */}
          <div className="border border-gray-200/80 rounded-3xl p-6 sm:p-7 bg-gray-50/30 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6">Project Status</h4>
              <div className="flex items-end justify-between h-44 gap-3 px-2">
                {[
                  { month: "Jan", val: 35, color: "bg-emerald-600" },
                  { month: "Feb", val: 100, color: "bg-emerald-600" },
                  { month: "Mar", val: 67, color: "bg-emerald-600" },
                  { month: "Apr", val: 100, color: "bg-emerald-600" },
                  { month: "May", val: 40, color: "bg-red-400" }, // Red bar as in screenshot
                  { month: "Jun", val: 80, color: "bg-emerald-600" },
                  { month: "Jul", val: 50, color: "bg-emerald-600" },
                  { month: "Aug", val: 100, color: "bg-emerald-600" },
                  { month: "Sep", val: 67, color: "bg-emerald-600" },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      className={`w-4 sm:w-6 rounded-t-lg transition-all ${item.color}`}
                      style={{ height: `${item.val}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-3 pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-bold px-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
            </div>
          </div>

          {/* Skills Learned Box */}
          <div className="border border-gray-200/80 rounded-3xl p-6 sm:p-7 bg-gray-50/30 flex flex-col justify-between">
            <h4 className="text-sm font-bold text-gray-900 mb-6">Skills Learned</h4>
            <div className="space-y-4">
              {[
                { name: "UI", level: 2 },
                { name: "UX", level: 3 },
                { name: "UX Research", level: 2 },
                { name: "Figma", level: 4 },
                { name: "R&D", level: 2 },
                { name: "Framer", level: 3 },
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">{skill.name}</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <span
                        key={step}
                        className={`h-1.5 rounded-full ${
                          step <= skill.level ? "w-4 bg-gray-800" : "w-4 bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Expert In & Mentee Reviews Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-2">
          {/* Left: Expert In Tags */}
          <div>
            <h4 className="text-sm font-bold text-[#1E56A0] mb-3.5">Expert In</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "#Case Study Competitions And Innovation Challenges",
                "#Consulting",
                "#Case Competitions",
                "#Case Study",
                "#Sales And Marketing",
                "#XAT Preparation",
                "#Case Study",
                "#Case Study",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-blue-50/80 text-[#1E56A0] text-xs font-semibold border border-blue-200/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Mentee Reviews */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center shrink-0">
              <Quote className="w-6 h-6 fill-white" />
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2].map((cardId) => (
                <div
                  key={cardId}
                  className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://i.pravatar.cc/150?img=14"
                      alt="Chris Hughes"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">Chris Hughes</h5>
                      <p className="text-[10px] text-gray-400">Engineering Lead</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">
                    Demonstrates remarkable ownership of user research and UI implementation across milestones.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Full Width Dark Blue Contact Button */}
        <div className="pt-2">
          <button className="w-full py-4 rounded-2xl bg-[#0A192F] hover:bg-[#112240] text-white font-bold text-sm shadow-md transition-colors cursor-pointer">
            Contact
          </button>
        </div>

      </div>
    </div>
  );
};

export { toSlug };
export default StudentProfile;
