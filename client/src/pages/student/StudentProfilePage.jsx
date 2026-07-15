import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/students/studentPortalSlice";
import {
  Edit2,
  X,
  CheckCircle,
  Upload,
  FileCheck,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Star,
  Folder,
  Quote,
  MessageSquare,
  Paperclip,
  Filter,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Activity,
} from "lucide-react";

// ── Heatmap (reused from StudentProfile.jsx) ──
const Heatmap = ({ grid }) => {
  const MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const defaultGrid = (() => {
    if (grid && grid.length > 0) return grid;
    const g = [];
    for (let c = 0; c < 44; c++) {
      const col = [];
      for (let r = 0; r < 7; r++) {
        const rnd = (c * 7 + r) % 5;
        col.push(rnd === 0 ? 4 : rnd === 1 ? 3 : rnd === 2 ? 2 : 1);
      }
      g.push(col);
    }
    return g;
  })();

  const getColor = (intensity) => {
    switch (intensity) {
      case 4: return "#1e9e3c";
      case 3: return "#3dc25a";
      case 2: return "#7ddb8d";
      case 1: return "#bcefc3";
      case 0: return "#ff6b6b";
      default: return "#f3f4f6";
    }
  };

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
      <div className="flex flex-col gap-[7px] shrink-0 pr-2 pt-1">
        {[
          { color: "#1e9e3c", label: "100% Active" },
          { color: "#3dc25a", label: "75% Active" },
          { color: "#7ddb8d", label: "50% Active" },
          { color: "#bcefc3", label: "25% Active" },
          { color: "#ff6b6b", label: "0% Active" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div className="w-[11px] h-[11px] rounded-[2.5px]" style={{ backgroundColor: color }} />
            <span className="text-[11px] font-medium text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Kanban Card ──
const KanbanCard = ({ title, tag, image, comments = 12, attachments = 0, priorityColor = "text-amber-600 bg-amber-50" }) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-center mb-2.5">
      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${priorityColor}`}>{tag || "Low"}</span>
      <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
    </div>
    {image && (
      <div className="w-full h-28 bg-gray-100 rounded-xl mb-3 overflow-hidden">
        <img src={image} alt="Thumbnail" className="w-full h-full object-cover" loading="lazy" />
      </div>
    )}
    <h5 className="text-sm font-bold text-gray-900 mb-1">{title}</h5>
    <p className="text-[11px] text-gray-500 mb-3.5 leading-relaxed line-clamp-2">Brainstorming brings team members' diverse experience into play.</p>
    <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
      <div className="flex -space-x-1.5">
        <img src="https://i.pravatar.cc/150?img=11" className="w-5 h-5 rounded-full border border-white" alt="Avatar" />
        <img src="https://i.pravatar.cc/150?img=12" className="w-5 h-5 rounded-full border border-white" alt="Avatar" />
      </div>
      <div className="flex items-center gap-3 text-gray-400 text-[11px] font-medium">
        <div className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /><span>{comments} comments</span></div>
        <div className="flex items-center gap-1"><Paperclip className="w-3.5 h-3.5" /><span>{attachments} files</span></div>
      </div>
    </div>
  </div>
);

// ── Edit Profile Modal ──
const EditProfileModal = ({ profile, onClose }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    displayName: profile.displayName,
    title: profile.title,
    bio: profile.bio,
    phone: profile.phone,
    avatarUrl: profile.avatarUrl,
    skills: profile.skills.join(", "),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        displayName: form.displayName.trim(),
        title: form.title.trim(),
        bio: form.bio.trim(),
        phone: form.phone.trim(),
        avatarUrl: form.avatarUrl.trim(),
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      })
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[28px] shadow-2xl max-w-lg w-full border border-gray-100 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-gray-900 mb-0.5">Edit Profile</h2>
        <p className="text-xs text-gray-500 mb-5">Update your student profile information.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar URL */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Avatar URL</label>
            <input
              type="url"
              value={form.avatarUrl}
              onChange={(e) => setForm((f) => ({ ...f, avatarUrl: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
          {/* Display Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
            <input
              required
              type="text"
              value={form.displayName}
              onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
              className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Title / Role</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Cloud Intern at TCS"
              className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none"
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+91 98XXX XXXXX"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>
          </div>
          {/* Skills */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Skills <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={form.skills}
              onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
              placeholder="AWS, Docker, Node.js"
              className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md cursor-pointer">
              <CheckCircle className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const StudentProfilePage = () => {
  const { profile } = useSelector((s) => s.studentPortal);
  const { reviews } = useSelector((s) => s.mentor);
  const { user } = useSelector((s) => s.auth);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [certificateUploaded, setCertificateUploaded] = useState(false);

  const myReviews = reviews.filter((r) => r.internName === user?.name);
  const avgRating =
    myReviews.length > 0
      ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
      : "N/A";

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">My Profile</h1>
        <button
          onClick={() => setIsEditOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit Profile
        </button>
      </div>

      {/* ── Main Card ── */}
      <div className="rounded-[36px] border border-blue-200/60 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-10">

        {/* 1. Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=15"; }}
              />
            </div>
            <div>
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">{profile.displayName}</h1>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-amber-50 text-amber-700 text-xs font-extrabold border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Top Student
                </span>
              </div>
              <p className="text-sm font-semibold text-[#1E56A0] mt-1.5 max-w-2xl leading-snug">{profile.title}</p>
              <p className="text-xs text-gray-500 mt-1 max-w-lg">{profile.bio}</p>
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1E56A0] text-white font-bold text-xs shadow-xs">
                  <Folder className="w-3.5 h-3.5" />
                  {profile.year}
                </span>
                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {avgRating} <span className="text-gray-500 font-medium">avg rating</span>
                </div>
              </div>

              {/* Contact info */}
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{profile.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{profile.phone}</span>
                <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />{profile.college}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Completion Certificate Upload (student only) */}
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

        {/* 3. Skills */}
        <div>
          <h3 className="text-sm font-bold text-[#1E56A0] mb-3.5">Skills & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-xl bg-blue-50/80 text-[#1E56A0] text-xs font-semibold border border-blue-200/50">
                #{skill}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Attendance Heatmap */}
        <div>
          <h3 className="text-xl font-extrabold text-[#0D3B66] mb-5">Attendance Record</h3>
          <Heatmap />
        </div>

        {/* 5. Project Kanban Board */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#0D3B66] mb-2">Project Details</h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
                Cloud Migration — Migrating legacy infrastructure to AWS with automated CI/CD deployment pipelines.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50/80 p-4 rounded-3xl border border-gray-100 space-y-3.5">
              <div className="flex justify-between items-center px-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">To Do</h4>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">4</span>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"><Plus className="w-4 h-4" /></button>
              </div>
              <KanbanCard title="Set up CloudWatch Monitoring" tag="Medium" priorityColor="text-amber-700 bg-amber-100" comments={5} attachments={0} />
              <KanbanCard title="Load Testing with k6" tag="Low" priorityColor="text-gray-700 bg-gray-100" comments={3} attachments={1} />
              <KanbanCard title="Write ADRs Documentation" tag="Low" priorityColor="text-gray-700 bg-gray-100" comments={2} attachments={0} />
            </div>
            <div className="bg-gray-50/80 p-4 rounded-3xl border border-gray-100 space-y-3.5">
              <div className="flex justify-between items-center px-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">In Progress</h4>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">3</span>
                </div>
              </div>
              <KanbanCard title="CI/CD Pipeline with GitHub Actions" tag="High" priorityColor="text-red-700 bg-red-100" comments={14} attachments={3} image="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&auto=format&fit=crop&q=80" />
              <KanbanCard title="Migrate PostgreSQL to RDS" tag="Medium" priorityColor="text-amber-700 bg-amber-100" comments={9} attachments={5} />
              <KanbanCard title="Weekly Progress Report" tag="Medium" priorityColor="text-amber-700 bg-amber-100" comments={4} attachments={1} />
            </div>
            <div className="bg-gray-50/80 p-4 rounded-3xl border border-gray-100 space-y-3.5">
              <div className="flex justify-between items-center px-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">Done</h4>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">2</span>
                </div>
              </div>
              <KanbanCard title="Set up AWS S3 Buckets" tag="Done" priorityColor="text-emerald-700 bg-emerald-100" comments={8} attachments={2} />
              <KanbanCard title="Dockerize Node.js Microservices" tag="Done" priorityColor="text-emerald-700 bg-emerald-100" comments={12} attachments={4} image="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </div>

        {/* 6. Project Status + Skills Learned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="border border-gray-200/80 rounded-3xl p-6 sm:p-7 bg-gray-50/30 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6">Project Status</h4>
              <div className="flex items-end justify-between h-44 gap-3 px-2">
                {[
                  { month: "Jan", val: 35, color: "bg-emerald-600" },
                  { month: "Feb", val: 100, color: "bg-emerald-600" },
                  { month: "Mar", val: 67, color: "bg-emerald-600" },
                  { month: "Apr", val: 100, color: "bg-emerald-600" },
                  { month: "May", val: 40, color: "bg-red-400" },
                  { month: "Jun", val: 80, color: "bg-emerald-600" },
                  { month: "Jul", val: 78, color: "bg-indigo-500" },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div className={`w-4 sm:w-6 rounded-t-lg transition-all ${item.color}`} style={{ height: `${item.val}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-3 pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-bold px-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
            </div>
          </div>
          <div className="border border-gray-200/80 rounded-3xl p-6 sm:p-7 bg-gray-50/30 flex flex-col justify-between">
            <h4 className="text-sm font-bold text-gray-900 mb-6">Skills Learned</h4>
            <div className="space-y-4">
              {[
                { name: "AWS", level: 3 },
                { name: "Docker", level: 4 },
                { name: "Node.js", level: 3 },
                { name: "CI/CD", level: 2 },
                { name: "Kubernetes", level: 2 },
                { name: "Linux", level: 3 },
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">{skill.name}</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <span key={step} className={`h-1.5 rounded-full ${step <= skill.level ? "w-4 bg-gray-800" : "w-4 bg-gray-200"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Reviews preview */}
        {myReviews.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-2">
            <div>
              <h4 className="text-sm font-bold text-[#1E56A0] mb-3.5">Expert In</h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-blue-50/80 text-[#1E56A0] text-xs font-semibold border border-blue-200/50">#{s}</span>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center shrink-0">
                <Quote className="w-6 h-6 fill-white" />
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {myReviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <img src="https://i.pravatar.cc/150?img=14" alt="Mentor" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h5 className="text-xs font-bold text-gray-900">Mentor Review</h5>
                        <p className="text-[10px] text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. Contact button */}
        <div className="pt-2">
          <button className="w-full py-4 rounded-2xl bg-[#0A192F] hover:bg-[#112240] text-white font-bold text-sm shadow-md transition-colors cursor-pointer">
            Contact Mentor
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && <EditProfileModal profile={profile} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
};

export default StudentProfilePage;
