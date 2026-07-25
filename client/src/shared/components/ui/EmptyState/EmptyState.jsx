import React from "react";

const EmptyState = ({ title = "No data found", description = "There are no records to display at this time.", action, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 ${className}`}>
      <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
