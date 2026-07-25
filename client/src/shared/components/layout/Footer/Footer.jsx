import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6 text-center text-xs text-gray-500 dark:text-gray-400">
      <p>&copy; {new Date().getFullYear()} Internship Tracker Platform. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
