import React, { useState, useMemo } from "react";
import { Search, Filter, LayoutGrid, LayoutList, Star } from "lucide-react";

// --- Mock student data ---
const STUDENTS = [
  {
    id: 1258, name: "Aarav Shah", role: "Director", department: "Creative",
    status: "Average", workHours: "2.5 h", rating: 4.2,
    tags: ["#Case Study Competi...", "#Consulting", "+11"],
    avatar: "AS", avatarBg: "bg-[var(--primary-light)] text-[var(--primary)]",
    company: "BCG / XLRI / National Winner", starred: true,
    achievements: "National Winner Citi Leadership Award'21 & P&G ELP'21",
    image: null,
  },
  {
    id: 1321, name: "Sarah Gupta", role: "Manager", department: "HR",
    status: "Good", workHours: "8.5 h", rating: 4.9,
    tags: ["#Case Study Competi...", "#Consulting", "+11"],
    avatar: "SG", avatarBg: "bg-[var(--purple-light)] text-[var(--purple)]",
    company: "BCG / XLRI / National Winner", starred: true,
    achievements: "National Winner Citi Leadership Award'21 & P&G ELP'21",
    image: null,
  },
  {
    id: 1255, name: "Michael D'Souza", role: "Engineer", department: "IT",
    status: "Average", workHours: "3.9 h", rating: 3.8,
    tags: ["#Development", "#Engineering", "+5"],
    avatar: "MD", avatarBg: "bg-[var(--green-light)] text-[var(--green)]",
    company: "Infosys / TCS / National Finalist", starred: false,
    achievements: "National Runner-Up Ideathon 2022",
    image: null,
  },
  {
    id: 1159, name: "Priya Mehta", role: "Analyst", department: "Finance",
    status: "Bad", workHours: "1.5 h", rating: 2.4,
    tags: ["#Finance", "#Analytics", "+3"],
    avatar: "PM", avatarBg: "bg-[var(--red-light)] text-[var(--red)]",
    company: "Deloitte / EY", starred: false,
    achievements: "Campus Finance Champion 2023",
    image: null,
  },
  {
    id: 1088, name: "David Kumar", role: "Developer", department: "IT",
    status: "Good", workHours: "8.75 h", rating: 4.6,
    tags: ["#Development", "#Cloud", "+8"],
    avatar: "DK", avatarBg: "bg-[var(--cyan-light)] text-[var(--cyan)]",
    company: "Google / Microsoft", starred: true,
    achievements: "Winner Google Hackathon 2024",
    image: null,
  },
  {
    id: 1234, name: "Lisa Rodrigues", role: "Coordinator", department: "Marketing",
    status: "Average", workHours: "4 h", rating: 3.5,
    tags: ["#Marketing", "#Branding", "+6"],
    avatar: "LR", avatarBg: "bg-[var(--yellow-light)] text-[var(--yellow)]",
    company: "HUL / P&G", starred: false,
    achievements: "Regional Marketing Champion 2023",
    image: null,
  },
  {
    id: 1197, name: "Raj Patil", role: "Technician", department: "Maintenance",
    status: "Good", workHours: "8.6 h", rating: 4.4,
    tags: ["#Operations", "#Maintenance", "+4"],
    avatar: "RP", avatarBg: "bg-[var(--yellow-light)] text-[var(--yellow)]",
    company: "L&T / Siemens", starred: false,
    achievements: "Best Technician Award 2022",
    image: null,
  },
  {
    id: 1412, name: "Emma Wilson", role: "Designer", department: "Creative",
    status: "Average", workHours: "2.5 h", rating: 3.9,
    tags: ["#Design", "#UX", "+7"],
    avatar: "EW", avatarBg: "bg-[var(--purple-light)] text-[var(--purple)]",
    company: "Adobe / Figma", starred: true,
    achievements: "National Design Award 2023",
    image: null,
  },
  {
    id: 1345, name: "Ahmed Khan", role: "Supervisor", department: "Operations",
    status: "Bad", workHours: "2.25 h", rating: 2.1,
    tags: ["#Operations", "#Logistics", "+2"],
    avatar: "AK", avatarBg: "bg-[var(--surface-hover)] text-[var(--text-secondary)]",
    company: "Amazon / Flipkart", starred: false,
    achievements: "Operations Improvement Lead 2024",
    image: null,
  },
  {
    id: 1078, name: "Sunita Iyer", role: "Associate", department: "Finance",
    status: "Good", workHours: "7.5 h", rating: 4.1,
    tags: ["#Finance", "#Investment", "+5"],
    avatar: "SI", avatarBg: "bg-[var(--cyan-light)] text-[var(--cyan)]",
    company: "HDFC / ICICI / Kotak", starred: false,
    achievements: "Best Finance Intern 2023",
    image: null,
  },
  {
    id: 1502, name: "Advait Warabg", role: "Director", department: "Strategy",
    status: "Good", workHours: "9.0 h", rating: 5.1,
    tags: ["#Case Study Competi...", "#Consulting", "+11"],
    avatar: "AW", avatarBg: "bg-[var(--purple-light)] text-[var(--purple)]",
    company: "BCG / XLRI / National Winner", starred: true,
    achievements: "National Winner Citi Leadership Award'21 & P&G ELP'21 / National Runners-Up...",
    image: null,
    topRank: true,
  },
  {
    id: 1503, name: "Parth Bhalala", role: "Manager", department: "Operations",
    status: "Good", workHours: "8.5 h", rating: 4.9,
    tags: ["#Case Study Competi...", "#Consulting", "+11"],
    avatar: "PB", avatarBg: "bg-[var(--primary-light)] text-[var(--primary)]",
    company: "BCG / XLRI / National Winner", starred: true,
    achievements: "National Winner Citi Leadership Award'21 & P&G ELP'21 / National Runners-Up...",
    image: null,
    topStudent: true,
  },
  {
    id: 1504, name: "Sahil Panchigar", role: "Analyst", department: "Finance",
    status: "Good", workHours: "8.5 h", rating: 5.1,
    tags: ["#Case Study Competi...", "#Consulting", "+11"],
    avatar: "SP", avatarBg: "bg-[var(--green-light)] text-[var(--green)]",
    company: "BCG / XLRI / National Winner", starred: true,
    achievements: "National Winner Citi Leadership Award'21 & P&G ELP'21 / National Runners-Up...",
    image: null,
    topRank: true,
  },
  {
    id: 1505, name: "Yashwant Singh", role: "Engineer", department: "IT",
    status: "Good", workHours: "8.5 h", rating: 5.1,
    tags: ["#Case Study Competi...", "#Consulting", "+11"],
    avatar: "YS", avatarBg: "bg-[var(--yellow-light)] text-[var(--yellow)]",
    company: "BCG / XLRI / National Winner", starred: true,
    achievements: "National Winner Citi Leadership Award'21 & P&G ELP'21 / National Runners-Up...",
    image: null,
    topRank: true,
  },
];

const STATUS_COLORS = {
  Good: "bg-[var(--green-light)] text-[var(--green)]",
  Average: "bg-[var(--yellow-light)] text-[var(--yellow)]",
  Bad: "bg-[var(--red-light)] text-[var(--red)]",
};

const DEPARTMENTS = ["All", "Creative", "HR", "IT", "Finance", "Marketing", "Maintenance", "Operations", "Strategy"];
const STATUSES = ["All", "Good", "Average", "Bad"];

// ---- List Row ----
const ListRow = ({ student }) => (
  <tr className="border-b border-[var(--border-light)] hover:bg-[var(--surface-hover)] transition-colors">
    <td className="py-3 px-4 text-[length:var(--fs-xs)] text-[var(--text-muted)] font-[var(--fw-medium)]">{student.id}</td>
    <td className="py-3 px-4">
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded-[var(--radius-full)] flex items-center justify-center text-[length:var(--fs-xs)] font-[var(--fw-bold)] flex-shrink-0 ${student.avatarBg}`}>
          {student.avatar}
        </div>
        <span className="text-[length:var(--fs-sm)] font-[var(--fw-medium)] text-[var(--text-primary)]">{student.name}</span>
      </div>
    </td>
    <td className="py-3 px-4 text-[length:var(--fs-xs)] text-[var(--text-secondary)]">{student.role}</td>
    <td className="py-3 px-4 text-[length:var(--fs-xs)] text-[var(--text-secondary)]">{student.department}</td>
    <td className="py-3 px-4">
      <span className={`text-[length:var(--fs-xs)] font-[var(--fw-medium)] px-2.5 py-0.5 rounded-[var(--radius-full)] ${STATUS_COLORS[student.status]}`}>
        {student.status}
      </span>
    </td>
    <td className="py-3 px-4 text-[length:var(--fs-xs)] text-[var(--text-secondary)] text-right">{student.workHours}</td>
  </tr>
);

// ---- Grid Card ----
const GridCard = ({ student }) => (
  <div className={`bg-[var(--surface)] rounded-[var(--radius-xl)] border-2 p-4 flex flex-col gap-3 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all ${student.topRank || student.topStudent ? "border-[var(--primary)]" : "border-[var(--border-light)]"}`}>
    <div className="flex items-start gap-3">
      {/* Avatar / image */}
      <div className={`w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center text-[length:var(--fs-base)] font-[var(--fw-bold)] flex-shrink-0 overflow-hidden ${student.avatarBg}`}>
        {student.avatar}
      </div>
      <div className="flex-1 min-w-0">
        {/* Rank badge */}
        <div className="flex items-center gap-1.5 mb-1">
          {student.topRank && (
            <span className="bg-[var(--yellow)] text-[var(--text-white)] text-[length:var(--fs-xs)] font-[var(--fw-bold)] px-2 py-0.5 rounded-[var(--radius-sm)] flex items-center gap-1">
              <Star className="w-3 h-3 fill-[var(--text-white)]" /> Top Rank
            </span>
          )}
          {student.topStudent && (
            <span className="bg-[var(--primary)] text-[var(--text-white)] text-[length:var(--fs-xs)] font-[var(--fw-bold)] px-2 py-0.5 rounded-[var(--radius-sm)] flex items-center gap-1">
              <Star className="w-3 h-3 fill-[var(--text-white)]" /> Top Student
            </span>
          )}
          {student.starred && !student.topRank && !student.topStudent && (
            <Star className="w-4 h-4 text-[var(--yellow)] fill-[var(--yellow)]" />
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[length:var(--fs-sm)] font-[var(--fw-bold)] text-[var(--text-primary)] truncate">{student.name}</span>
          <span className="text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--yellow)] ml-2 flex-shrink-0">{student.rating}</span>
        </div>
        <div className="text-[length:var(--fs-xs)] text-[var(--text-muted)] mt-0.5 line-clamp-2">{student.company} / {student.achievements}</div>
      </div>
    </div>
    {/* Tags */}
    <div className="flex flex-wrap gap-1.5 mt-1">
      {student.tags.map((tag, i) => (
        <span key={i} className="text-[length:var(--fs-xs)] bg-[var(--surface-hover)] text-[var(--text-secondary)] px-2 py-0.5 rounded-[var(--radius-sm)]">{tag}</span>
      ))}
    </div>
  </div>
);

// ---- Main Component ----
const StudentReports = () => {
  const [view, setView] = useState("list"); // "list" | "grid"
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("Recent"); // "Recent" | "Starred"
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const filtered = useMemo(() => {
    let result = [...STUDENTS];

    // Tab filter
    if (filterTab === "Starred") {
      result = result.filter((s) => s.starred);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          String(s.id).includes(q)
      );
    }

    // Department filter
    if (filterDept !== "All") {
      result = result.filter((s) => s.department === filterDept);
    }

    // Status filter
    if (filterStatus !== "All") {
      result = result.filter((s) => s.status === filterStatus);
    }

    return result;
  }, [search, filterTab, filterDept, filterStatus]);

  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius-xl)] border border-[var(--border-light)] shadow-[var(--shadow-sm)] overflow-hidden">
      {/* Header toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-[var(--border-light)]">
        <span className="text-[length:var(--fs-sm)] font-[var(--fw-bold)] text-[var(--text-primary)] flex-shrink-0">Students Reports</span>

        {/* Tab toggles */}
        <div className="flex gap-1 ml-2">
          {["Recent", "Starred"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1 text-[length:var(--fs-xs)] font-[var(--fw-medium)] rounded-[var(--radius-md)] transition-all ${
                filterTab === tab
                  ? "bg-[var(--surface-hover)] text-[var(--text-primary)] font-[var(--fw-semibold)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter button */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[length:var(--fs-xs)] font-[var(--fw-medium)] rounded-[var(--radius-md)] border transition-all ${
              showFilterPanel || filterDept !== "All" || filterStatus !== "All"
                ? "bg-[var(--primary-light)] border-[var(--primary)] text-[var(--primary)]"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>

          {/* Filter panel dropdown */}
          {showFilterPanel && (
            <div className="absolute top-full left-0 mt-2 bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-lg)] p-4 z-50 min-w-[220px]">
              <div className="mb-3">
                <div className="text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-2">Department</div>
                <div className="flex flex-wrap gap-1.5">
                  {DEPARTMENTS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setFilterDept(d)}
                      className={`px-2.5 py-1 text-[length:var(--fs-xs)] rounded-[var(--radius-sm)] transition-all ${
                        filterDept === d
                          ? "bg-[var(--primary)] text-[var(--text-white)]"
                          : "bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:bg-[var(--border-light)]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-2">Status</div>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-2.5 py-1 text-[length:var(--fs-xs)] rounded-[var(--radius-sm)] transition-all ${
                        filterStatus === s
                          ? "bg-[var(--primary)] text-[var(--text-white)]"
                          : "bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:bg-[var(--border-light)]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { setFilterDept("All"); setFilterStatus("All"); setShowFilterPanel(false); }}
                className="mt-3 text-[length:var(--fs-xs)] text-[var(--red)] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Search bar */}
        <div className="relative flex-1 min-w-[140px] max-w-[220px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-[length:var(--fs-xs)] bg-[var(--surface-hover)] border border-[var(--border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] text-[var(--text-primary)] transition-all"
          />
        </div>

        {/* View toggle */}
        <div className="flex gap-1 ml-auto border border-[var(--border)] rounded-[var(--radius-md)] p-0.5">
          <button
            onClick={() => setView("list")}
            title="List view"
            className={`p-1.5 rounded-[var(--radius-sm)] transition-all ${view === "list" ? "bg-[var(--text-primary)] text-[var(--text-white)]" : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"}`}
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setView("grid")}
            title="Grid view"
            className={`p-1.5 rounded-[var(--radius-sm)] transition-all ${view === "grid" ? "bg-[var(--text-primary)] text-[var(--text-white)]" : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"}`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      {(filterDept !== "All" || filterStatus !== "All") && (
        <div className="flex items-center gap-2 px-5 py-2 bg-[var(--primary-light)] border-b border-[var(--border-light)] flex-wrap">
          <span className="text-[length:var(--fs-xs)] text-[var(--primary)] font-[var(--fw-medium)]">Active filters:</span>
          {filterDept !== "All" && (
            <span className="flex items-center gap-1 bg-[var(--surface)] text-[var(--primary)] text-[length:var(--fs-xs)] px-2 py-0.5 rounded-[var(--radius-full)] border border-[var(--primary)]">
              Dept: {filterDept}
              <button onClick={() => setFilterDept("All")} className="ml-1 hover:text-[var(--red)]">×</button>
            </span>
          )}
          {filterStatus !== "All" && (
            <span className="flex items-center gap-1 bg-[var(--surface)] text-[var(--primary)] text-[length:var(--fs-xs)] px-2 py-0.5 rounded-[var(--radius-full)] border border-[var(--primary)]">
              Status: {filterStatus}
              <button onClick={() => setFilterStatus("All")} className="ml-1 hover:text-[var(--red)]">×</button>
            </span>
          )}
        </div>
      )}

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <div className="text-[var(--text-muted)] text-4xl mb-3">🔍</div>
          <div className="text-[length:var(--fs-sm)] text-[var(--text-secondary)] font-[var(--fw-medium)]">No students found</div>
          <div className="text-[length:var(--fs-xs)] text-[var(--text-muted)] mt-1">Try adjusting your search or filters</div>
        </div>
      ) : view === "list" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[560px]">
            <thead>
              <tr className="border-b border-[var(--border-light)] bg-[var(--surface-hover)]">
                <th className="py-2.5 px-4 text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-muted)] uppercase tracking-wider">ID</th>
                <th className="py-2.5 px-4 text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-muted)] uppercase tracking-wider">Name</th>
                <th className="py-2.5 px-4 text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-muted)] uppercase tracking-wider">Role</th>
                <th className="py-2.5 px-4 text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-muted)] uppercase tracking-wider">Department</th>
                <th className="py-2.5 px-4 text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                <th className="py-2.5 px-4 text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-muted)] uppercase tracking-wider text-right">Work Hours</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <ListRow key={student.id} student={student} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
          {filtered.map((student) => (
            <GridCard key={student.id} student={student} />
          ))}
        </div>
      )}

      {/* Footer summary */}
      <div className="px-5 py-3 border-t border-[var(--border-light)] bg-[var(--surface-hover)] flex items-center justify-between">
        <span className="text-[length:var(--fs-xs)] text-[var(--text-muted)]">
          Showing <span className="font-[var(--fw-semibold)] text-[var(--text-primary)]">{filtered.length}</span> of {STUDENTS.length} students
        </span>
        {(search || filterDept !== "All" || filterStatus !== "All") && (
          <button
            onClick={() => { setSearch(""); setFilterDept("All"); setFilterStatus("All"); }}
            className="text-[length:var(--fs-xs)] text-[var(--primary)] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentReports;
