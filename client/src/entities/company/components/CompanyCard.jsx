import React from "react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";

const CompanyCard = ({ company }) => {
  const { name, industry, location, activePostingsCount, verified } = company || {};

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-900 dark:text-white">{name || "TechCorp Global"}</h4>
        {verified && <Badge variant="success">Verified</Badge>}
      </div>
      <p className="text-xs text-gray-500 mt-1">{industry || "Software & Technology"} • {location || "Bangalore, India"}</p>
      <div className="mt-3 text-xs font-semibold text-blue-600">
        Active Postings: {activePostingsCount || 8}
      </div>
    </Card>
  );
};

export default CompanyCard;
