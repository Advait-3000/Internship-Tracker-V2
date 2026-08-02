import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

const DashboardLayout = ({ user, sidebarLinks = [], onLogout, children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar is now on the far left, spanning full height */}
      {sidebarLinks.length > 0 && <Sidebar links={sidebarLinks} />}
      
      {/* Main content area containing Navbar, Page Content, and Footer */}
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar user={user} onLogout={onLogout} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
