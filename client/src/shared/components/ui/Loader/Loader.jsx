import React from "react";

const Loader = ({ size = "md", text = "Loading...", className = "" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 space-y-2 ${className}`}>
      <div
        className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizes[size] || sizes.md}`}
      />
      {text && <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{text}</p>}
    </div>
  );
};

export default Loader;
