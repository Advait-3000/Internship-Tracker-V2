import React from "react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";

const StudentCard = ({ student, onClick }) => {
  const { name, rollNo, department, gpa, status } = student || {};

  return (
    <Card className="hover:border-blue-500 cursor-pointer" onClick={() => onClick && onClick(student)}>
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-900 dark:text-white">{name || "Student Name"}</h4>
        <Badge variant={status === "PLACED" ? "success" : "neutral"}>{status || "SEEKING"}</Badge>
      </div>
      <p className="text-xs text-gray-500 mt-1">Roll No: {rollNo || "2024-CS-01"}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>{department || "Computer Science"}</span>
        <span className="font-semibold text-blue-600">CGPA: {gpa || "3.8"}</span>
      </div>
    </Card>
  );
};

export default StudentCard;
