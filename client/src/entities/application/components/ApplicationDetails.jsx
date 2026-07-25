import React from "react";
import Card from "@/shared/components/ui/Card";
import ApplicationStatusBadge from "@/features/application/components/ApplicationStatusBadge";
import { formatDate } from "@/shared/utils/formatDate";

const ApplicationDetails = ({ application }) => {
  const { internshipTitle, studentName, status, appliedDate, coverLetter, resumeUrl } = application || {};

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white">{internshipTitle || "Full Stack Developer Intern"}</h3>
        <ApplicationStatusBadge status={status} />
      </div>
      <p className="text-xs text-gray-500">Applicant: {studentName || "Jane Doe"} • Applied on {formatDate(appliedDate || new Date())}</p>
      {coverLetter && (
        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-xs text-gray-700 dark:text-gray-300">
          <span className="font-semibold block mb-1">Cover Letter:</span>
          {coverLetter}
        </div>
      )}
      {resumeUrl && (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs font-semibold text-blue-600 hover:underline"
        >
          View Resume &rarr;
        </a>
      )}
    </Card>
  );
};

export default ApplicationDetails;
