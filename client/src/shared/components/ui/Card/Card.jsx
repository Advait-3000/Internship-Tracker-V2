import React from "react";

const Card = ({ children, className = "", title, subtitle, footer }) => {
  return (
    <div className={`rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-5 shadow-sm transition-shadow hover:shadow-md ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3">{footer}</div>}
    </div>
  );
};

export default Card;
