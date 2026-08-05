import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toSlug } from './StudentProfile';
import {
  Search,
  Users,
  Building2,
  ChevronRight,
  UserCheck,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  GraduationCap
} from 'lucide-react';

const statusClasses = (status) => {
  switch (status) {
    case 'On Track':     return 'bg-green-100 text-green-700';
    case 'Completed':    return 'bg-blue-100 text-blue-700';
    case 'Needs Review': return 'bg-amber-100 text-amber-700';
    case 'At Risk':      return 'bg-red-100 text-red-700';
    default:             return 'bg-gray-100 text-gray-700';
  }
};

const StudentsList = () => {
  const navigate = useNavigate();
  const { list: internList } = useSelector((s) => s.interns);
  const { list: facultyList } = useSelector((s) => s.faculty);

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Department counts across all 8 core university departments
  const departmentStats = useMemo(() => {
    const counts = {
      'Computer Engineering': 0,
      'Information Technology': 0,
      'AIML': 0,
      'EXTC': 0,
      'AIDS': 0,
      'ECS': 0,
      'Civil Engineering': 0,
      'Mechanical Engineering': 0
    };
    internList.forEach((s) => {
      counts[s.department] = (counts[s.department] || 0) + 1;
    });
    return Object.entries(counts).map(([label, count]) => ({ label, count }));
  }, [internList]);

  // Dynamically calculate columns per row so items divide evenly into 2 rows (e.g. 8 depts -> 4 cols, 10 depts -> 5 cols)
  const colsPerRow = useMemo(() => Math.max(2, Math.ceil(departmentStats.length / 2)), [departmentStats.length]);
  const gridColsClass =
    colsPerRow === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : colsPerRow === 4
      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      : colsPerRow === 3
      ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"
      : colsPerRow === 6
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  const filteredStudents = useMemo(() => {
    return internList.filter((student) => {
      const matchSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.companyName.toLowerCase().includes(search.toLowerCase()) ||
        student.internshipRole.toLowerCase().includes(search.toLowerCase());
      const matchDept =
        departmentFilter === 'All' || student.department === departmentFilter;
      const matchStatus =
        statusFilter === 'All' || student.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [internList, search, departmentFilter, statusFilter]);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#262626] tracking-tight">
            Students & Internships
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Universal directory of all enrolled student interns and their faculty assignments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            Today
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Balanced 2-Row Department Cards Grid (e.g. 8 depts -> 4 per row, 10 depts -> 5 per row) ── */}
      <div className={`grid gap-4 w-full ${gridColsClass}`}>
        {departmentStats.map((dept, idx) => {
          const colors = [
            "bg-blue-600 shadow-blue-200",
            "bg-green-600 shadow-green-200",
            "bg-amber-500 shadow-amber-200",
            "bg-purple-600 shadow-purple-200",
            "bg-rose-500 shadow-rose-200",
          ];
          const color = colors[idx % colors.length];
          const isSelected = departmentFilter === dept.label;

          return (
            <div
              key={dept.label}
              onClick={() => setDepartmentFilter(isSelected ? 'All' : dept.label)}
              className={`bg-white rounded-[20px] px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer border-2 h-full ${
                isSelected ? 'border-indigo-500 shadow-indigo-100' : 'border-transparent'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-white shadow-lg ${color} shrink-0`}
              >
                <Building2 className="w-6 h-6 stroke-[1.5px]" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">
                  {dept.count}
                </h4>
                <p className="text-xs font-bold text-gray-600 tracking-wide uppercase leading-snug break-words">
                  {dept.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Legacy System Status + Quick Stats Row ── */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:w-[26%] flex flex-col justify-between min-h-[160px]">
          <div>
            <p className="text-sm text-gray-500 font-medium">System Status:</p>
            <div className="flex items-center gap-2.5 mt-1">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Active</h2>
              <span className="w-3.5 h-3.5 rounded-full inline-block bg-green-500 shadow-sm shadow-green-300" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            All internship data streams active and synced
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">Total Interns</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{internList.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">On Track</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">
                {internList.filter(s => s.status === 'On Track' || s.status === 'Completed').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400">Needs Review</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">
                {internList.filter(s => s.status === 'Needs Review' || s.status === 'At Risk').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student, company, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Departments</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">IT</option>
              <option value="AIML">AIML</option>
              <option value="EXTC">EXTC</option>
              <option value="AIDS">AIDS</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="On Track">On Track</option>
            <option value="Completed">Completed</option>
            <option value="Needs Review">Needs Review</option>
            <option value="At Risk">At Risk</option>
          </select>
        </div>
      </div>

      {/* ── Students Table ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="py-3.5 px-5">Student</th>
                <th className="py-3.5 px-5">Department</th>
                <th className="py-3.5 px-5">Company & Role</th>
                <th className="py-3.5 px-5">Assigned Faculty</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.map((student) => {
                const assignedFaculty = student.assignedFacultyId
                  ? facultyList.find((f) => f.id === student.assignedFacultyId)
                  : null;

                return (
                  <tr
                    key={student.id}
                    onClick={() => navigate(`/students/${toSlug(student.name)}`)}
                    className="hover:bg-gray-50/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-xs font-extrabold flex-shrink-0">
                          {student.name
                            .split(' ')
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block">
                            {student.name}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {student.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="inline-block rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                        {student.department}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <p className="font-semibold text-gray-900">
                        {student.companyName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {student.internshipRole}
                      </p>
                    </td>

                    <td className="py-4 px-5">
                      {assignedFaculty ? (
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-900 font-medium text-xs">
                            {assignedFaculty.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs italic text-gray-400">
                          Unassigned
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${statusClasses(
                          student.status
                        )}`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                        Profile
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <Users className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-semibold text-gray-600">
              No students found
            </p>
            <p className="text-xs mt-1">
              Try adjusting your search query or department/status filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;
