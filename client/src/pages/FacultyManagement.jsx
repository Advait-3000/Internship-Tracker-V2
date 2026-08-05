import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFaculty, updateFaculty, deleteFaculty } from '../features/faculty/facultySlice';
import Modal from '../components/common/Modal';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  UserX,
} from 'lucide-react';

// ── Department options ──
const DEPARTMENTS = [
  'Computer Engineering',
  'Information Technology',
  'EXTC',
  'AIML',
  'AIDS',
  'Civil',
  'ECS',
  'ELEC',
  'CSE (Cyber)',
  'R & A',
];

// ── Empty form state ──
const EMPTY_FORM = { name: '', email: '', department: '', studentQuota: 50, status: 'Active' };

const FacultyManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: facultyList } = useSelector((s) => s.faculty);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = adding, string = editing
  const [form, setForm] = useState(EMPTY_FORM);

  const isEditing = editingId !== null;

  // Filter faculties by name, department, or email
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

  // ── Modal open helpers ──
  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const openEditModal = (faculty, e) => {
    e.stopPropagation(); // prevent row click navigation
    setEditingId(faculty.id);
    setForm({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department,
      studentQuota: faculty.studentQuota,
      status: faculty.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  // ── Form handlers ──
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.department) return;

    if (isEditing) {
      dispatch(
        updateFaculty({
          id: editingId,
          name: form.name.trim(),
          email: form.email.trim(),
          department: form.department,
          studentQuota: form.studentQuota,
          status: form.status,
        }),
      );
    } else {
      dispatch(
        addFaculty({
          id: `fac-${Date.now()}`,
          name: form.name.trim(),
          email: form.email.trim(),
          department: form.department,
          studentQuota: form.studentQuota,
          assignedStudents: [],
          status: 'Active',
        }),
      );
    }

    closeModal();
  };

  const handleDelete = (id, e) => {
    e.stopPropagation(); // prevent row click navigation
    if (window.confirm('Are you sure you want to remove this faculty member?')) {
      dispatch(deleteFaculty(id));
    }
  };

  // ── Capacity helpers ──
  const getCapacityColor = (assigned, quota) => {
    const pct = quota > 0 ? (assigned / quota) * 100 : 0;
    if (pct >= 90) return 'bg-red-500';
    if (pct >= 70) return 'bg-amber-500';
    return 'bg-green-500';
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
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
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
                <th className="py-3.5 px-5">Assigned Students</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((faculty) => {
                const assigned = faculty.assignedStudents?.length ?? 0;
                const quota = faculty.studentQuota ?? 50;
                const pct = quota > 0 ? Math.round((assigned / quota) * 100) : 0;

                return (
                  <tr
                    key={faculty.id}
                    onClick={() => navigate(`/faculty/${faculty.id}`)}
                    className="hover:bg-gray-50/60 transition-colors cursor-pointer"
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

                    {/* Assigned Students — ratio + progress bar */}
                    <td className="py-4 px-5">
                      <div className="min-w-[120px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="inline-flex items-center gap-1 text-gray-700 font-medium text-xs">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            {assigned} / {quota}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">{pct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${getCapacityColor(assigned, quota)}`}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                      </div>
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
                          onClick={(e) => openEditModal(faculty, e)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          title="Delete faculty"
                          onClick={(e) => handleDelete(faculty.id, e)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Empty / No Results */}
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

      {/* ─── Add / Edit Faculty Modal ─── */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? 'Edit Faculty' : 'Add New Faculty'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="fac-name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              id="fac-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Dr. Sunil Rane"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="fac-email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              id="fac-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. sunil.rane@aum.edu.in"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="fac-dept" className="block text-sm font-medium text-gray-700 mb-1.5">
              Department
            </label>
            <select
              id="fac-dept"
              name="department"
              required
              value={form.department}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow appearance-none"
            >
              <option value="" disabled>
                Select a department
              </option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Max Student Quota */}
          <div>
            <label htmlFor="fac-quota" className="block text-sm font-medium text-gray-700 mb-1.5">
              Max Student Quota
            </label>
            <input
              id="fac-quota"
              name="studentQuota"
              type="number"
              min={1}
              max={200}
              required
              value={form.studentQuota}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>

          {/* Status — only shown when editing */}
          {isEditing && (
            <div>
              <label htmlFor="fac-status" className="block text-sm font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <select
                id="fac-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow appearance-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isEditing ? 'Save Changes' : 'Add Faculty'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FacultyManagement;
