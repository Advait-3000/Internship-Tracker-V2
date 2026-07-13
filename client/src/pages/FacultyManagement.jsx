import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFaculty } from '../features/faculty/facultySlice';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  UserX,
} from 'lucide-react';

const FacultyManagement = () => {
  const dispatch = useDispatch();
  const { list: facultyList } = useSelector((s) => s.faculty);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter faculties by name or department
  const filtered = useMemo(
    () =>
      facultyList.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.email.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, facultyList],
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this faculty member?')) {
      dispatch(deleteFaculty(id));
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            {facultyList.length} faculty members &middot;{' '}
            {facultyList.filter((f) => f.status === 'Active').length} active
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <Plus className="w-4 h-4" />
          Add New Faculty
        </button>
      </div>

      {/* ─── Search Bar ─── */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, department, or email..."
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
                <th className="py-3.5 px-5">Contact</th>
                <th className="py-3.5 px-5">Department</th>
                <th className="py-3.5 px-5 text-center">Assigned Students</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((faculty) => (
                <tr
                  key={faculty.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  {/* Name */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex-shrink-0">
                        {faculty.name
                          .split(' ')
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                      <span className="font-medium text-gray-900">{faculty.name}</span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-4 px-5 text-gray-500">{faculty.email}</td>

                  {/* Department */}
                  <td className="py-4 px-5">
                    <span className="inline-block rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {faculty.department}
                    </span>
                  </td>

                  {/* Assigned Students */}
                  <td className="py-4 px-5 text-center">
                    <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      {faculty.assignedStudentsCount}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5 text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        faculty.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {faculty.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        title="Edit faculty"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        title="Delete faculty"
                        onClick={() => handleDelete(faculty.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty / No Results State */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <UserX className="w-10 h-10 mb-3 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">No faculty members found</p>
              <p className="text-xs mt-1">
                {searchQuery
                  ? `No results matching "${searchQuery}"`
                  : 'Add a new faculty member to get started'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyManagement;
