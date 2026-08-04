import { ApiError } from "./ApiError.js";

export const handleValidationError = (result, data) => {
  const missingFields = [];
  const otherErrors = [];

  for (const err of result.error.issues) {
    const fieldPath = err.path.join(".");
    if (!(fieldPath in data) || data[fieldPath] === undefined || data[fieldPath] === null) {
      missingFields.push(fieldPath);
    } else {
      otherErrors.push(`${fieldPath}: ${err.message}`);
    }
  }

  let errorMsg = "";
  if (missingFields.length > 0) {
    errorMsg += `${missingFields.join(", ")} ${missingFields.length === 1 ? "is" : "are"} required`;
  }
  if (otherErrors.length > 0) {
    if (errorMsg) errorMsg += ", ";
    errorMsg += otherErrors.join(", ");
  }

  throw new ApiError(400, errorMsg || "Validation Error", result.error.issues);
};
