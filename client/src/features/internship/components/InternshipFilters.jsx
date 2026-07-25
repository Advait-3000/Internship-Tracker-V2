import React from "react";
import Input from "@/shared/components/ui/Input";

const InternshipFilters = ({ search, onSearchChange, statusFilter, onStatusChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex-1 w-full">
        <Input
          placeholder="Search by title, company, or skills..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="CLOSED">Closed</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default InternshipFilters;
