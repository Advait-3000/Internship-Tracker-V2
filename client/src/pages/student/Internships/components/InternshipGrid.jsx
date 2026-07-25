import React from "react";
import InternshipCard from "@/features/internship/components/InternshipCard";
import EmptyState from "@/shared/components/ui/EmptyState";

const InternshipGrid = ({ internships = [], onApply, onViewDetails }) => {
  if (internships.length === 0) {
    return <EmptyState title="No internships found" description="Try adjusting your search criteria or check back later." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {internships.map((internship) => (
        <InternshipCard key={internship.id} internship={internship} onApply={onApply} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default InternshipGrid;
