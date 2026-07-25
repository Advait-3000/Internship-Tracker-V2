import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

const DashboardLayout = ({ user, sidebarLinks = [], onLogout, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        {sidebarLinks.length > 0 && <Sidebar links={sidebarLinks} />}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
