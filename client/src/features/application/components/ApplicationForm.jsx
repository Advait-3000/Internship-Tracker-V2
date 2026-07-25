import React, { useState } from "react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";

const ApplicationForm = ({ onSubmit, internshipTitle, isLoading = false }) => {
  const [formData, setFormData] = useState({
    coverLetter: "",
    resumeUrl: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {internshipTitle && (
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Applying for: <span className="font-bold text-blue-600">{internshipTitle}</span>
        </p>
      )}
      <Input
        label="Resume Link (URL)"
        type="url"
        name="resumeUrl"
        value={formData.resumeUrl}
        onChange={handleChange}
        placeholder="https://drive.google.com/your-resume"
        required
      />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Letter</label>
        <textarea
          name="coverLetter"
          rows={4}
          value={formData.coverLetter}
          onChange={handleChange}
          placeholder="Why are you a good fit for this role?"
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default ApplicationForm;
