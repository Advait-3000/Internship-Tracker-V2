import React from "react";
import Card from "@/shared/components/ui/Card";

const MentorCard = ({ mentor }) => {
  const { name, company, designation, activeMentees } = mentor || {};

  return (
    <Card>
      <h4 className="font-bold text-gray-900 dark:text-white">{name || "Sarah Jenkins"}</h4>
      <p className="text-xs text-blue-600 font-medium mt-0.5">{designation || "Senior Technical Lead"}</p>
      <p className="text-xs text-gray-500 mt-1">{company || "Acme Innovations"}</p>
      <div className="mt-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
        Active Mentees: {activeMentees || 4}
      </div>
    </Card>
  );
};

export default MentorCard;
