import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
  assignFacultyToAdmin,
  removeFacultyFromAdmin,
} from '../features/admins/adminSlice';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Users,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Lock,
  X,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  Briefcase,
  GraduationCap,
  UserCog,
  TrendingUp,
  AlertTriangle,
  Building2,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────
const DEPARTMENTS = [
  'Computer Engineering', 'Information Technology', 'AIML', 'EXTC',
  'AIDS', 'ECS', 'Civil Engineering', 'Mechanical Engineering',
];

const EMPTY_FORM = {
  name: '', email: '', phone: '', department: '',
  role: 'Admin', status: 'Active', facultyQuota: 4, password: '',
};

const statusPill = (status) =>
  status === 'Active'
    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    : status === 'Inactive'
    ? 'bg-gray-100 text-gray-500 border border-gray-200'
    : 'bg-red-100 text-red-600 border border-red-200';

// A nice avatar gradient per admin index
const AVATAR_GRADIENTS = [
  'from-violet-500 to-indigo-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-500',
  'from-purple-500 to-fuchsia-600',
];

// ─────────────────────────────────────────────────────────────
// Progress Bar sub-component
// ─────────────────────────────────────────────────────────────
const FacultyProgressBar = ({ current, quota }) => {
  const pct = quota > 0 ? Math.min((current / quota) * 100, 100) : 0;
  const color =
    pct >= 90 ? 'bg-red-500'
    : pct >= 60 ? 'bg-amber-500'
    : 'bg-emerald-500';
  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] font-semibold mb-1">
        <span className="text-gray-500">Faculty Load</span>
        <span className={`font-bold ${pct >= 90 ? 'text-red-600' : pct >= 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
          {current} / {quota}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const AdminManagement = () => {
  const dispatch = useDispatch();
  const { list: adminList } = useSelector((s) => s.admins);
  const { list: facultyList } = useSelector((s) => s.faculty);

  // ── Search & filter ──
  const [searchQuery, setSearchQuery]   = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // ── Modals ──
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingId, setEditingId]             = useState(null);
  const [form, setForm]                       = useState(EMPTY_FORM);
  const [showPassword, setShowPassword]       = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [detailAdmin, setDetailAdmin]         = useState(null); // faculty drawer
  const [toast, setToast]                     = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3200); };

  // ── Filtered list ──
  const filtered = useMemo(
    () =>
      adminList.filter((a) => {
        const q = searchQuery.toLowerCase();
        const matchQ =
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q);
        const matchS = statusFilter === 'All' || a.status === statusFilter;
        return matchQ && matchS;
      }),
    [adminList, searchQuery, statusFilter],
  );

  // ── Summary stats ──
  const totalAdmins    = adminList.length;
  const activeAdmins   = adminList.filter((a) => a.status === 'Active').length;
  const totalFaculties = facultyList.length;
  const assignedFacs   = new Set(adminList.flatMap((a) => a.managedFacultyIds)).size;

  // ── CRUD handlers ──
  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowPassword(false);
    setIsFormModalOpen(true);
  };
  const openEdit = (admin) => {
    setEditingId(admin.id);
    setForm({
      name: admin.name, email: admin.email, phone: admin.phone || '',
      department: admin.department, role: admin.role, status: admin.status,
      facultyQuota: admin.facultyQuota, password: '',
    });
    setShowPassword(false);
    setIsFormModalOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateAdmin({ id: editingId, ...form }));
      showToast(`Admin "${form.name}" updated.`);
    } else {
      dispatch(addAdmin({
        id: `adm-${Date.now()}`,
        ...form,
        managedFacultyIds: [],
        avatarInitials: form.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
        joined: new Date().toISOString().split('T')[0],
      }));
      showToast(`Admin "${form.name}" created.`);
    }
    setIsFormModalOpen(false);
  };
  const handleDelete = (id) => {
    const a = adminList.find((x) => x.id === id);
    dispatch(deleteAdmin(id));
    showToast(`Admin "${a?.name}" removed.`);
    setDeleteConfirmId(null);
  };
  const handleToggleStatus = (id) => {
    dispatch(toggleAdminStatus(id));
  };

  // ── Faculty assignment (in drawer) ──
  const handleAssign   = (adminId, facId) => dispatch(assignFacultyToAdmin({ adminId, facultyId: facId }));
  const handleUnassign = (adminId, facId) => dispatch(removeFacultyFromAdmin({ adminId, facultyId: facId }));

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <ShieldCheck className="w-5 h-5 text-violet-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-300 backdrop-blur-md mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> S-Admin Control Centre
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Admin Management</h1>
            <p className="text-sm text-gray-300 mt-1 max-w-lg">
              Create and manage admin accounts. Each admin oversees a set of faculty members who in turn guide students.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 text-sm font-bold rounded-xl shadow hover:bg-gray-100 transition-colors cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" /> Add Admin
          </button>
        </div>

        {/* Quick metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-7 pt-5 border-t border-white/10">
          {[
            { label: 'Total Admins',       value: totalAdmins,   icon: UserCog,    color: 'text-violet-300' },
            { label: 'Active Admins',       value: activeAdmins,  icon: CheckCircle,color: 'text-emerald-400' },
            { label: 'Total Faculties',     value: totalFaculties,icon: GraduationCap, color: 'text-blue-300' },
            { label: 'Faculties Assigned',  value: assignedFacs,  icon: Briefcase,  color: 'text-amber-300' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs text-gray-300">{label}</span>
              </div>
              <div className="text-2xl font-black text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
          />
        </div>
        <div className="inline-flex rounded-xl bg-gray-100 p-1 gap-1">
          {['All', 'Active', 'Inactive'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                statusFilter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} admin{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* ── Admin Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((admin, idx) => {
          const managed   = admin.managedFacultyIds.length;
          const quota     = admin.facultyQuota;
          const managedFaculties = facultyList.filter((f) => admin.managedFacultyIds.includes(f.id));
          const gradient  = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];

          return (
            <div
              key={admin.id}
              className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all duration-200 flex flex-col gap-4"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-sm font-extrabold shrink-0 group-hover:scale-105 transition-transform shadow-md`}>
                    {admin.avatarInitials || admin.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">{admin.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{admin.role}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusPill(admin.status)}`}>
                  {admin.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span className="truncate">{admin.email}</span>
                </div>
                {admin.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                    <span>{admin.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span>{admin.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span>Joined {admin.joined}</span>
                </div>
              </div>

              {/* Faculty Progress Bar */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <FacultyProgressBar current={managed} quota={quota} />
                {managedFaculties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {managedFaculties.slice(0, 3).map((f) => (
                      <span key={f.id} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 border border-violet-100">
                        {f.name}
                      </span>
                    ))}
                    {managedFaculties.length > 3 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">
                        +{managedFaculties.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleToggleStatus(admin.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                    admin.status === 'Active'
                      ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200'
                  }`}
                >
                  {admin.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setDetailAdmin(admin)}
                    className="p-2 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer"
                    title="Manage Faculty"
                  >
                    <GraduationCap className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openEdit(admin)}
                    className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                    title="Edit Admin"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(admin.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Admin"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center gap-3 text-gray-400">
            <UserCog className="w-10 h-10 opacity-30" />
            <p className="text-sm">No admins found matching your search.</p>
          </div>
        )}
      </div>

      {/* ============================================================
          ADD / EDIT MODAL
         ============================================================ */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setIsFormModalOpen(false)}>
          <div className="bg-white rounded-[28px] shadow-2xl max-w-lg w-full border border-gray-100 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsFormModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 mb-0.5">{editingId ? 'Edit Admin' : 'Add New Admin'}</h2>
            <p className="text-xs text-gray-500 mb-5">{editingId ? 'Update this admin account.' : 'Create a new admin who will oversee faculty members.'}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                <input required type="text" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Dr. Samridhi Kapoor"
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white" />
              </div>
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input required type="email" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="admin@aum.edu.in"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white" />
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white" />
                </div>
              </div>
              {/* Password (only for create) */}
              {!editingId && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input required type={showPassword ? 'text' : 'password'} value={form.password}
                      onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white" />
                    <button type="button" onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Department</label>
                <select required value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {/* Role + Status in grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Role</label>
                  <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
                    <option value="Admin">Admin</option>
                    <option value="Co-Admin">Co-Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              {/* Faculty Quota */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Faculty Quota <span className="text-gray-400 font-normal">(max faculties this admin can oversee)</span>
                </label>
                <input type="number" min={1} max={20} value={form.facultyQuota}
                  onChange={(e) => setForm((f) => ({ ...f, facultyQuota: Number(e.target.value) }))}
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white" />
              </div>
              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md cursor-pointer">
                  <CheckCircle className="w-4 h-4" />
                  {editingId ? 'Save Changes' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          DELETE CONFIRM
         ============================================================ */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setDeleteConfirmId(null)}>
          <div className="bg-white rounded-[28px] shadow-2xl max-w-sm w-full border border-gray-100 p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1.5">Remove Admin?</h2>
            <p className="text-xs text-gray-500 mb-6">
              Permanently remove <span className="font-bold text-gray-800">{adminList.find((a) => a.id === deleteConfirmId)?.name}</span>? All faculty assignments will be lost.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirmId)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer">
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          FACULTY ASSIGNMENT DRAWER / MODAL
         ============================================================ */}
      {detailAdmin && (() => {
        const admin = adminList.find((a) => a.id === detailAdmin.id);
        if (!admin) return null;
        const assignedIds  = new Set(admin.managedFacultyIds);
        const unassignedFac = facultyList.filter((f) => !assignedIds.has(f.id));
        const assignedFac   = facultyList.filter((f) => assignedIds.has(f.id));
        const gradient = AVATAR_GRADIENTS[adminList.indexOf(admin) % AVATAR_GRADIENTS.length];
        return (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/40 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200" onClick={() => setDetailAdmin(null)}>
            <div className="bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl w-full sm:w-[480px] max-h-[90vh] overflow-y-auto border border-gray-100" onClick={(e) => e.stopPropagation()}>
              {/* Drawer header */}
              <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Manage Faculty</p>
                    <h2 className="text-xl font-extrabold">{admin.name}</h2>
                    <p className="text-xs text-white/70 mt-1">{admin.department} · {admin.role}</p>
                  </div>
                  <button onClick={() => setDetailAdmin(null)} className="p-2 rounded-xl bg-white/20 hover:bg-white/30 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4">
                  <FacultyProgressBar current={assignedFac.length} quota={admin.facultyQuota} />
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Assigned faculties */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                    Assigned Faculties ({assignedFac.length})
                  </h3>
                  {assignedFac.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No faculties assigned yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {assignedFac.map((f) => (
                        <div key={f.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div>
                            <p className="text-xs font-bold text-gray-900">{f.name}</p>
                            <p className="text-[11px] text-gray-500">{f.department} · {f.assignedStudents.length} students</p>
                          </div>
                          <button
                            onClick={() => handleUnassign(admin.id, f.id)}
                            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 cursor-pointer"
                          >
                            Unassign
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Unassigned faculties (can assign) */}
                {unassignedFac.length > 0 && assignedFac.length < admin.facultyQuota && (
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                      Available to Assign
                    </h3>
                    <div className="space-y-2">
                      {unassignedFac.map((f) => (
                        <div key={f.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-dashed border-gray-200">
                          <div>
                            <p className="text-xs font-bold text-gray-900">{f.name}</p>
                            <p className="text-[11px] text-gray-500">{f.department} · {f.assignedStudents.length} students</p>
                          </div>
                          <button
                            onClick={() => handleAssign(admin.id, f.id)}
                            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Assign
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {assignedFac.length >= admin.facultyQuota && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <p className="text-xs text-amber-700 font-semibold">Faculty quota reached. Increase quota or unassign a faculty first.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default AdminManagement;
