import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  UserX,
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
  const [searchQuery, setSearchQuery] = useState('');

  // Build faculty lookup map
  const facultyMap = useMemo(
    () => Object.fromEntries(facultyList.map((f) => [f.id, f])),
    [facultyList],
  );

  // Filter interns
  const filtered = useMemo(
    () =>
      internList.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.internshipRole.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, internList],
  );

  return (
    <div className="space-y-6">
      {/* ─── Header ─── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <p className="text-sm text-gray-500 mt-1">
          {internList.length} students with active internships &middot;{' '}
          {internList.filter((s) => s.assignedFacultyId).length} assigned to faculty
        </p>
      </div>

      {/* ─── Search ─── */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, department, company, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
        />
      </div>

      {/* ─── Table ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="py-3.5 px-5">Name</th>
                <th className="py-3.5 px-5">Department</th>
                <th className="py-3.5 px-5">Company</th>
                <th className="py-3.5 px-5">Role</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5">Assigned Faculty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((student) => {
                const faculty = student.assignedFacultyId
                  ? facultyMap[student.assignedFacultyId]
                  : null;

                return (
                  <tr
                    key={student.id}
                    onClick={() => navigate(`/student/${student.id}`)}
                    className="hover:bg-gray-50/60 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold flex-shrink-0">
                          {student.name
                            .split(' ')
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-block rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        {student.department}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-gray-700 font-medium">{student.companyName}</td>
                    <td className="py-4 px-5 text-gray-500">{student.internshipRole}</td>
                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(student.status)}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      {faculty ? (
                        <span className="text-gray-700 font-medium">{faculty.name}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium bg-amber-50 px-2.5 py-1 rounded-lg">
                          <Users className="w-3 h-3" />
                          Unassigned
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <UserX className="w-10 h-10 mb-3 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">No students found</p>
              <p className="text-xs mt-1">
                {searchQuery
                  ? `No results matching "${searchQuery}"`
                  : 'No intern students available'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
