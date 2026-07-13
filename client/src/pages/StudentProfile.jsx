import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { assignFaculty } from '../features/students/studentSlice';
import {
  ArrowLeft,
  Building2,
  Briefcase,
  Clock,
  UserX,
  UserCheck,
  GraduationCap,
  RefreshCw,
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

const StudentProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list: internList } = useSelector((s) => s.interns);
  const { list: facultyList } = useSelector((s) => s.faculty);

  const student = useMemo(
    () => internList.find((s) => s.id === id),
    [id, internList],
  );

  const activeFaculty = useMemo(
    () => facultyList.filter((f) => f.status === 'Active'),
    [facultyList],
  );

  const assignedFaculty = useMemo(
    () =>
      student?.assignedFacultyId
        ? facultyList.find((f) => f.id === student.assignedFacultyId)
        : null,
    [student, facultyList],
  );

  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <UserX className="w-12 h-12 mb-3 text-gray-300" />
        <p className="text-lg font-semibold text-gray-600">Student not found</p>
        <p className="text-sm mt-1 mb-6">The student you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>
      </div>
    );
  }

  const handleAssign = () => {
    if (!selectedFacultyId) return;
    dispatch(assignFaculty({ studentId: student.id, facultyId: selectedFacultyId }));
    setSelectedFacultyId('');
    setIsChanging(false);
  };

  const showAssignForm = !assignedFaculty || isChanging;

  return (
    <div className="space-y-6">
      {/* ─── Back link ─── */}
      <Link
        to="/students"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Students
      </Link>

      {/* ─── Profile Header + Internship Info ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Student Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 text-2xl font-bold mb-4">
              {student.name
                .split(' ')
                .map((w) => w[0])
                .slice(0, 2)
                .join('')}
            </div>
            <h1 className="text-xl font-bold text-gray-900">{student.name}</h1>
            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(student.status)}`}
            >
              {student.status}
            </span>
            <div className="mt-4 w-full space-y-2.5 text-sm text-gray-500">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{student.department}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                  {student.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Internship Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h2 className="text-base font-bold text-gray-900 mb-4">Internship Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <Building2 className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Company</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{student.companyName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <Briefcase className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Role</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{student.internshipRole}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <Clock className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Work Hours</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{student.workHours}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <UserCheck className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Status</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{student.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Faculty Assignment Card ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Faculty Assignment</h2>

        {assignedFaculty && !isChanging ? (
          /* Currently assigned — show faculty info + change button */
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700 text-xs font-bold flex-shrink-0">
                {assignedFaculty.name
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{assignedFaculty.name}</p>
                <p className="text-xs text-gray-500">
                  {assignedFaculty.department} &middot; {assignedFaculty.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsChanging(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Change Faculty
            </button>
          </div>
        ) : (
          /* Unassigned or changing — show dropdown + assign button */
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
            <div className="flex-1 w-full sm:max-w-sm">
              <label htmlFor="faculty-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Faculty Member
              </label>
              <select
                id="faculty-select"
                value={selectedFacultyId}
                onChange={(e) => setSelectedFacultyId(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow appearance-none"
              >
                <option value="" disabled>
                  Choose a faculty...
                </option>
                {activeFaculty.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} — {f.department} ({f.assignedStudents?.length ?? 0}/{f.studentQuota})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAssign}
                disabled={!selectedFacultyId}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <UserCheck className="w-4 h-4" />
                Assign
              </button>
              {isChanging && (
                <button
                  onClick={() => setIsChanging(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
