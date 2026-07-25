import React from "react";
import Card from "@/shared/components/ui/Card";

const StudentStats = ({ appliedCount = 0, interviewCount = 0, acceptedCount = 0 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <span className="text-xs text-gray-500 font-medium">Applied Internships</span>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{appliedCount}</p>
      </Card>
      <Card>
        <span className="text-xs text-gray-500 font-medium font-semibold">Interviews Scheduled</span>
        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{interviewCount}</p>
      </Card>
      <Card>
        <span className="text-xs text-gray-500 font-medium">Offers Accepted</span>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{acceptedCount}</p>
      </Card>
    </div>
  );
};

export default StudentStats;
