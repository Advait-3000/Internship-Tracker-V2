import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class SemesterValidator {
  static createSemesterSchema = z.object({
    semesterName: z.string().min(1, "Semester name must be provided"),
  });

  static updateSemesterSchema = z.object({
    semesterName: z.string().min(1, "Semester name must be provided").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateSemester(data) {
    const result = SemesterValidator.createSemesterSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateSemester(data) {
    const result = SemesterValidator.updateSemesterSchema.safeParse(data);
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
