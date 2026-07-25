import React from "react";

const Table = ({ headers = [], children, className = "" }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className={`w-full text-left text-sm text-gray-600 dark:text-gray-300 ${className}`}>
        <thead className="bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
