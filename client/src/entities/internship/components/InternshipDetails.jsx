import React from "react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import { formatCurrency } from "@/shared/utils/formatters";

const InternshipDetails = ({ internship }) => {
  const { title, companyName, location, stipend, duration, description, requirements = [] } = internship || {};

  return (
    <Card className="space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title || "Software Engineering Intern"}</h2>
          <Badge variant="success">Active</Badge>
        </div>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">{companyName || "TechCorp"}</p>
        <p className="text-xs text-gray-500 mt-1">{location || "Remote"} • {duration || "6 Months"}</p>
      </div>

      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-3 flex justify-between text-sm">
        <div>
          <span className="text-xs text-gray-400 block">Stipend</span>
          <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(stipend || 25000)}/month</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Role Description</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
          {description || "No specific description provided for this internship."}
        </p>
      </div>

      {requirements.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Key Requirements</h4>
          <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-300 mt-1 space-y-1">
            {requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default InternshipDetails;
