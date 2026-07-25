import React from "react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import { formatCurrency } from "@/shared/utils/formatters";

const InternshipCard = ({ internship, onApply, onViewDetails }) => {
  const { title, companyName, location, stipend, status, duration } = internship || {};

  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title || "Software Engineering Intern"}</h3>
          <Badge variant={status === "ACTIVE" ? "success" : "neutral"}>{status || "ACTIVE"}</Badge>
        </div>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">{companyName || "TechCorp Solutions"}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{location || "Remote / On-site"}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(stipend || 25000)}/mo</span>
          <span className="text-xs text-gray-500">{duration || "6 Months"}</span>
        </div>
      </div>
      <div className="mt-6 flex space-x-2">
        {onViewDetails && (
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewDetails(internship)}>
            View Details
          </Button>
        )}
        {onApply && (
          <Button size="sm" className="flex-1" onClick={() => onApply(internship)}>
            Apply Now
          </Button>
        )}
      </div>
    </Card>
  );
};

export default InternshipCard;
