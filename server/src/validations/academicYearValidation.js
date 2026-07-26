import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class AcademicYearValidator {
  static createAcademicYearSchema = z.object({
    yearName: z.string().min(2, "Year name must be at least 2 characters"),
  });

  static updateAcademicYearSchema = z.object({
    yearName: z.string().min(2, "Year name must be at least 2 characters").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateAcademicYear(data) {
    const result = AcademicYearValidator.createAcademicYearSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateAcademicYear(data) {
    const result = AcademicYearValidator.updateAcademicYearSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateId(id, fieldName = "ID") {
    const result = z.string().uuid(`Invalid ${fieldName} format`).safeParse(id);
    if (!result.success) {
      handleValidationError(result, { id });
    }
    return result.data;
  }
}
