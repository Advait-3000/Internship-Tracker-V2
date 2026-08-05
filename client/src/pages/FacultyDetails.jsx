import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toSlug } from './StudentProfile';
import {
  ArrowLeft,
  Mail,
  Building2,
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

const FacultyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { list: facultyList } = useSelector((s) => s.faculty);

  const faculty = useMemo(
    () => facultyList.find((f) => f.id === id),
    [id, facultyList],
  );

  if (!faculty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <UserX className="w-12 h-12 mb-3 text-gray-300" />
        <p className="text-lg font-semibold text-gray-600">Faculty not found</p>
        <p className="text-sm mt-1 mb-6">The faculty member you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to="/faculty"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Faculty List
        </Link>
      </div>
    );
  }

  const assigned = faculty.assignedStudents?.length ?? 0;
  const quota = faculty.studentQuota ?? 50;

  return (
    <div className="space-y-6">
      {/* ─── Back link ─── */}
      <Link
        to="/faculty"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Faculty List
      </Link>

      {/* ─── Faculty Header Card ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 text-lg font-bold flex-shrink-0">
              {faculty.name
                .split(' ')
                .map((w) => w[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{faculty.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {faculty.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {faculty.department}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {assigned} / {quota} students
                </span>
              </div>
            </div>
          </div>
          <span
            className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold ${
              faculty.status === 'Active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {faculty.status}
          </span>
        </div>
      </div>

      {/* ─── Assigned Students Table ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            Assigned Students
            <span className="ml-2 text-sm font-normal text-gray-400">({assigned})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          {assigned === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Users className="w-10 h-10 mb-3 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">No students assigned yet</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <th className="py-3.5 px-5">Student ID</th>
                  <th className="py-3.5 px-5">Name</th>
                  <th className="py-3.5 px-5">Current Project / Internship</th>
                  <th className="py-3.5 px-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {faculty.assignedStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => navigate(`/students/${toSlug(student.name)}`)}
                    className="hover:bg-gray-50/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-5 text-gray-400 font-mono text-xs">
                      {student.id}
                    </td>
                    <td className="py-3.5 px-5 text-gray-900 font-medium">
                      {student.name}
                    </td>
                    <td className="py-3.5 px-5 text-gray-500">
                      {student.project}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(student.status)}`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
