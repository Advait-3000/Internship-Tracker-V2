import React, { useState } from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import InternshipForm from "@/features/internship/components/InternshipForm";
import Modal from "@/shared/components/ui/Modal";
import Button from "@/shared/components/ui/Button";
import useAuth from "@/features/auth/hooks/useAuth";

const CompanyInternships = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sidebarLinks = [
    { label: "Dashboard", to: "/company/dashboard" },
    { label: "Manage Internships", to: "/company/internships" },
    { label: "Review Applications", to: "/company/applications" },
  ];

  return (
    <DashboardLayout user={user || { name: "Company Rep", role: "company" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Internship Postings</h1>
            <p className="text-sm text-gray-500">Post new internship opportunities for students.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>+ Post New Internship</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Internship Posting">
          <InternshipForm onSubmit={(data) => { console.log(data); setIsModalOpen(false); }} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default CompanyInternships;
