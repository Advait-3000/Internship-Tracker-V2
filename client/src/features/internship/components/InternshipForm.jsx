import React, { useState } from "react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";

const InternshipForm = ({ onSubmit, initialData = {}, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    companyName: initialData.companyName || "",
    location: initialData.location || "",
    stipend: initialData.stipend || "",
    description: initialData.description || "",
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
      <Input label="Internship Title" name="title" value={formData.title} onChange={handleChange} required />
      <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required />
      <Input label="Location" name="location" value={formData.location} onChange={handleChange} required />
      <Input label="Stipend Amount" type="number" name="stipend" value={formData.stipend} onChange={handleChange} required />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : "Save Internship"}
      </Button>
    </form>
  );
};

export default InternshipForm;
