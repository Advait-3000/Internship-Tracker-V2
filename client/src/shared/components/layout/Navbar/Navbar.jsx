import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          InternshipTracker
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {user.name || user.email} ({user.role})
            </span>
            <button
              onClick={onLogout}
              className="text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-md font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <Link
              to="/login"
              className="text-sm px-3 py-1.5 text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
