import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyToListing } from "../features/companies/companySlice";
import {
  Search,
  Building2,
  MapPin,
  Globe,
  Star,
  CheckCircle,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const SharedCompaniesPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { companies, listings, applications } = useSelector((s) => s.companies);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || null);

  const isStudent = user?.role === "Student";

  // Filter companies
  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);
  const companyListings = listings.filter(
    (l) => l.companyId === selectedCompanyId && l.status === "Active"
  );

  const handleApply = (listingId) => {
    if (!isStudent) return;
    dispatch(
      applyToListing({
        studentName: user.name,
        studentEmail: user.email,
        listingId,
      })
    );
  };

  const getApplicationStatus = (listingId) => {
    if (!isStudent) return null;
    const app = applications.find(
      (a) => a.studentEmail === user.email && a.listingId === listingId
    );
    return app ? app.status : null;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Companies & Internships</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Discover top companies and active internship opportunities.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-64 shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
        {/* ── Left Panel: Company List ── */}
        <div className="w-1/3 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 shrink-0">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              {filteredCompanies.length} Companies
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <Building2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No companies found.</p>
              </div>
            ) : (
              filteredCompanies.map((company) => {
                const isActive = selectedCompanyId === company.id;
                const activeJobsCount = listings.filter(
                  (l) => l.companyId === company.id && l.status === "Active"
                ).length;

                return (
                  <button
                    key={company.id}
                    onClick={() => setSelectedCompanyId(company.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all border cursor-pointer ${
                      isActive
                        ? "bg-indigo-50 border-indigo-200 shadow-sm"
                        : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br ${company.gradient} text-white flex items-center justify-center font-extrabold text-sm shadow-sm`}>
                        {company.logoText}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-bold truncate ${isActive ? "text-indigo-900" : "text-gray-900"}`}>
                          {company.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">{company.industry}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between pl-13">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {company.location.split(",")[0]}
                      </div>
                      {activeJobsCount > 0 && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {activeJobsCount} Jobs
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ── Right Panel: Details & Listings ── */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {selectedCompany ? (
            <>
              {/* Company Header Info */}
              <div className="p-6 border-b border-gray-100 shrink-0 relative overflow-hidden">
                {/* Decorative background blur */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${selectedCompany.gradient} opacity-[0.03] blur-3xl rounded-full -mr-20 -mt-20`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedCompany.gradient} text-white flex items-center justify-center font-extrabold text-2xl shadow-md`}>
                        {selectedCompany.logoText}
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-gray-900">{selectedCompany.name}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm font-semibold text-indigo-600">{selectedCompany.industry}</p>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {selectedCompany.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors cursor-pointer shadow-sm">
                      <Globe className="w-4 h-4" /> Visit Website
                    </a>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mb-4">
                    {selectedCompany.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" /> {selectedCompany.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-gray-400" /> Founded {selectedCompany.founded}</span>
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-gray-400" /> {selectedCompany.employees} Employees</span>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {selectedCompany.specialties.map(s => (
                      <span key={s} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Jobs List */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  Active Opportunities ({companyListings.length})
                </h3>

                {companyListings.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                    <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-sm font-bold text-gray-900">No active listings</h4>
                    <p className="text-xs text-gray-500 mt-1">This company isn't hiring interns right now.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {companyListings.map((listing) => {
                      const appStatus = getApplicationStatus(listing.id);
                      
                      return (
                        <div key={listing.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h4 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {listing.title}
                              </h4>
                              <p className="text-[11px] text-gray-400 font-medium mt-0.5">Posted {listing.postedAt}</p>
                            </div>
                            
                            {/* Apply Button / Status Badge (Only for Students) */}
                            {isStudent && (
                              <div className="shrink-0">
                                {appStatus ? (
                                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    {appStatus}
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleApply(listing.id)}
                                    className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                                  >
                                    Apply Now
                                  </button>
                                )}
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-gray-600 leading-relaxed mb-4">
                            {listing.description}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                              <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <span className="truncate">{listing.location} · {listing.type}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                              <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <span className="truncate">{listing.stipend}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                              <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <span className="truncate">{listing.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-gray-600">
                              <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <span className="truncate">Apply by {listing.deadline}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {listing.requirements.map(req => (
                              <span key={req} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-200">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <p>Select a company to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedCompaniesPage;
