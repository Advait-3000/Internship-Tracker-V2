import React from "react";
import Card from "@/shared/components/ui/Card";

const FacultyCard = ({ faculty }) => {
  const { name, designation, department, assignedStudentsCount } = faculty || {};

  return (
    <Card>
      <h4 className="font-bold text-gray-900 dark:text-white">{name || "Dr. Alex Smith"}</h4>
      <p className="text-xs text-blue-600 font-medium mt-0.5">{designation || "Associate Professor"}</p>
      <p className="text-xs text-gray-500 mt-1">{department || "Department of Information Technology"}</p>
      <div className="mt-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
        Assigned Mentees: {assignedStudentsCount || 12}
      </div>
    </Card>
  );
};

export default FacultyCard;
