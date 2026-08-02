import React from "react";

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-end sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-3">
            {/* User Profile Circle Placeholder */}
            <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
              <span className="text-sm font-semibold text-gray-600">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={onLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Empty fallback if no user */
          <div />
        )}
      </div>
    </header>
  );
};

export default Navbar;
