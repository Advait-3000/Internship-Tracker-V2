export const validateInternshipForm = (values) => {
  const errors = {};

  if (!values.title?.trim()) {
    errors.title = "Title is required";
  }
  if (!values.companyName?.trim()) {
    errors.companyName = "Company name is required";
  }
  if (!values.location?.trim()) {
    errors.location = "Location is required";
  }
  if (!values.stipend || isNaN(values.stipend)) {
    errors.stipend = "Valid stipend amount is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
