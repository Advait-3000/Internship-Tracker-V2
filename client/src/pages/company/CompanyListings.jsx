import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeListing, updateListing } from "../../features/companies/companySlice";
import {
  Trash2,
  Edit2,
  X,
  CheckCircle,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Tag,
} from "lucide-react";

const CompanyListings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { listings, applications } = useSelector((s) => s.companies);

  const myListings = listings.filter((l) => l.companyId === user?.companyId);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (listing) => {
    setEditingId(listing.id);
    setEditForm({
      title: listing.title,
      description: listing.description,
      requirements: listing.requirements.join(", "),
      location: listing.location,
      type: listing.type,
      stipend: listing.stipend,
      duration: listing.duration,
      deadline: listing.deadline,
      status: listing.status,
    });
  };

  const handleSaveEdit = () => {
    dispatch(
      updateListing({
        id: editingId,
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        requirements: editForm.requirements.split(",").map((r) => r.trim()).filter(Boolean),
        location: editForm.location.trim(),
        type: editForm.type,
        stipend: editForm.stipend.trim(),
        duration: editForm.duration.trim(),
        deadline: editForm.deadline,
        status: editForm.status,
      })
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this listing and all its applications?")) {
      dispatch(removeListing(id));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">My Listings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your internship job postings. {myListings.length} listing{myListings.length !== 1 ? "s" : ""} total.
        </p>
      </div>

      {myListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <ClipboardList className="w-10 h-10 text-gray-300 mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No listings yet</h3>
          <p className="text-sm text-gray-500">Post your first internship listing to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myListings.map((listing) => {
            const appCount = applications.filter((a) => a.listingId === listing.id).length;
            const isEditing = editingId === listing.id;

            return (
              <div key={listing.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Status indicator bar */}
                <div className={`h-1 ${listing.status === "Active" ? "bg-emerald-500" : listing.status === "Closed" ? "bg-red-400" : "bg-gray-300"}`} />

                <div className="p-6">
                  {isEditing ? (
                    /* ── Edit Mode ── */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-900">Edit Listing</h3>
                        <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                          <input
                            value={editForm.title}
                            onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                          <input
                            value={editForm.location}
                            onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Stipend</label>
                          <input
                            value={editForm.stipend}
                            onChange={(e) => setEditForm((f) => ({ ...f, stipend: e.target.value }))}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Duration</label>
                          <input
                            value={editForm.duration}
                            onChange={(e) => setEditForm((f) => ({ ...f, duration: e.target.value }))}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                          <select
                            value={editForm.type}
                            onChange={(e) => setEditForm((f) => ({ ...f, type: e.target.value }))}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option>On-site</option>
                            <option>Remote</option>
                            <option>Hybrid</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option>Active</option>
                            <option>Closed</option>
                            <option>Draft</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Deadline</label>
                          <input
                            type="date"
                            value={editForm.deadline}
                            onChange={(e) => setEditForm((f) => ({ ...f, deadline: e.target.value }))}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Requirements (comma-separated)</label>
                          <input
                            value={editForm.requirements}
                            onChange={(e) => setEditForm((f) => ({ ...f, requirements: e.target.value }))}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editForm.description}
                          onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                          className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                          Cancel
                        </button>
                        <button onClick={handleSaveEdit} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer">
                          <CheckCircle className="w-3.5 h-3.5" /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── View Mode ── */
                    <>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{listing.title}</h3>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${listing.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                              {listing.status}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">Posted {listing.postedAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button onClick={() => startEdit(listing)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-indigo-600 cursor-pointer" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(listing.id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 cursor-pointer" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">{listing.description}</p>

                      <div className="flex flex-wrap gap-3 text-[10px] text-gray-500 font-medium mb-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{listing.duration}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{listing.stipend}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Deadline: {listing.deadline}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{appCount} applicant{appCount !== 1 ? "s" : ""}</span>
                      </div>

                      <div className="flex gap-1.5 flex-wrap">
                        {listing.requirements.map((r) => (
                          <span key={r} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200">
                            {r}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CompanyListings;
