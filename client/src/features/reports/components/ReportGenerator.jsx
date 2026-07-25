import React, { useState } from "react";
import Button from "@/shared/components/ui/Button";

const ReportGenerator = ({ onGenerate, isGenerating = false }) => {
  const [reportType, setReportType] = useState("INTERNSHIP_SUMMARY");
  const [format, setFormat] = useState("PDF");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onGenerate) onGenerate({ reportType, format });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm space-y-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">Generate Analytical Report</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
          >
            <option value="INTERNSHIP_SUMMARY">Internship Summary</option>
            <option value="STUDENT_PLACEMENT">Student Placement Rates</option>
            <option value="ATTENDANCE_COMPLIANCE">Attendance Compliance</option>
            <option value="MENTOR_EVALUATION">Mentor Evaluation Report</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
          >
            <option value="PDF">PDF Document</option>
            <option value="CSV">CSV Spreadsheet</option>
            <option value="EXCEL">Excel Workbook</option>
          </select>
        </div>
      </div>
      <Button type="submit" disabled={isGenerating}>
        {isGenerating ? "Exporting..." : "Generate Report"}
      </Button>
    </form>
  );
};

export default ReportGenerator;
