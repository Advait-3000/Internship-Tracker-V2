import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateApplicationStatus } from "../../features/companies/companySlice";
import {
  ClipboardList,
  Users,
  TrendingUp,
  PlusCircle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  ChevronRight,
} from "lucide-react";

const formatTime = (d) => {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  const ap = h >= 12 ? "P.M." : "A.M.";
  h = h % 12 || 12;
  return `${h.toString().padStart(2, "0")}:${m}:${s} ${ap}`;
};
const formatDate = (d) =>
  d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

const statusConfig = {
  Applied: { color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  "Under Review": { color: "bg-amber-50 text-amber-700 border-amber-200", icon: Eye },
  Accepted: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle },
  Rejected: { color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
};

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { companies, listings, applications } = useSelector((s) => s.companies);

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const company = companies.find((c) => c.id === user?.companyId);
  const myListings = listings.filter((l) => l.companyId === user?.companyId);
  const activeListings = myListings.filter((l) => l.status === "Active");
  const myApplications = applications.filter((a) =>
    myListings.some((l) => l.id === a.listingId)
  );

  const stats = [
    { label: "Total Listings", value: myListings.length, icon: ClipboardList, color: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Active Listings", value: activeListings.length, icon: TrendingUp, color: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Applications", value: myApplications.length, icon: Users, color: "bg-amber-50", iconColor: "text-amber-600" },
    { label: "Accepted", value: myApplications.filter((a) => a.status === "Accepted").length, icon: CheckCircle, color: "bg-violet-50", iconColor: "text-violet-600" },
  ];

  const handleStatusChange = (applicationId, newStatus) => {
    dispatch(updateApplicationStatus({ applicationId, status: newStatus }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Welcome, {company?.name || "Company"} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{company?.industry} · {company?.location}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight">
            {formatTime(currentTime)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{formatDate(currentTime)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, iconColor }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick action */}
      <button
        onClick={() => navigate("/company/post")}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
      >
        <PlusCircle className="w-5 h-5" />
        Post a New Internship Listing
      </button>

      {/* Recent applications */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">Recent Applications</h3>
          <span className="text-xs text-gray-400 font-medium">{myApplications.length} total</span>
        </div>

        {myApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Users className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-sm">No applications received yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Applicant</th>
                  <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Listing</th>
                  <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Applied</th>
                  <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Status</th>
                  <th className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.slice(0, 10).map((app) => {
                  const listing = myListings.find((l) => l.id === app.listingId);
                  const cfg = statusConfig[app.status] || statusConfig.Applied;
                  const StatusIcon = cfg.icon;
                  return (
                    <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-3 pr-4">
                        <p className="text-xs font-bold text-gray-900">{app.studentName}</p>
                        <p className="text-[10px] text-gray-400">{app.studentEmail}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-xs font-semibold text-gray-700">{listing?.title || "—"}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-xs text-gray-500">{app.appliedAt}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="text-[10px] font-semibold rounded-lg border border-gray-200 bg-white px-2 py-1 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active listings preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">Your Active Listings</h3>
          <button
            onClick={() => navigate("/company/listings")}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeListings.slice(0, 4).map((listing) => {
            const appCount = applications.filter((a) => a.listingId === listing.id).length;
            return (
              <div key={listing.id} className="p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h4 className="text-sm font-bold text-gray-900 mb-1">{listing.title}</h4>
                <p className="text-[10px] text-gray-500 mb-2">{listing.location} · {listing.type}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {listing.stipend}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{appCount} applicant{appCount !== 1 ? "s" : ""}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
