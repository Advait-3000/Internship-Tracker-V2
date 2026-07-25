import React from "react";
import Button from "@/shared/components/ui/Button";
import Badge from "@/shared/components/ui/Badge";
import { ATTENDANCE_STATUS } from "@/shared/constants/status";

const AttendanceTracker = ({ records = [], onMarkAttendance }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attendance Log</h3>
        {onMarkAttendance && (
          <Button size="sm" onClick={onMarkAttendance}>
            Mark Today's Attendance
          </Button>
        )}
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        {records.length > 0 ? (
          records.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-200">{item.date}</span>
              <Badge variant={item.status === ATTENDANCE_STATUS.PRESENT ? "success" : "danger"}>
                {item.status}
              </Badge>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">No attendance records found.</div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
