import React, { useState } from "react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";

const EvaluationForm = ({ onSubmit, studentName, isLoading = false }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    feedback: "",
    technicalSkills: 5,
    softSkills: 5,
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
      {studentName && (
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
          Evaluating Student: <span className="text-blue-600">{studentName}</span>
        </h4>
      )}
      <Input
        label="Overall Rating (1-10)"
        type="number"
        min="1"
        max="10"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        required
      />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Feedback & Remarks</label>
        <textarea
          name="feedback"
          rows={4}
          value={formData.feedback}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Submitting..." : "Submit Evaluation"}
      </Button>
    </form>
  );
};

export default EvaluationForm;
