import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class FacultyMentorValidator {
  static createFacultyMentorSchema = z.object({
    userId: z.string().uuid("Invalid user ID format"),
    designation: z.string().min(1, "Designation must be provided"),
    officeEmail: z.string().email("Invalid office email address"),
    phone: z.string().min(1, "Phone number must be provided"),
  });

  static updateFacultyMentorSchema = z.object({
    userId: z.string().uuid("Invalid user ID format").optional(),
    designation: z.string().min(1, "Designation must be provided").optional(),
    officeEmail: z.string().email("Invalid office email address").optional(),
    phone: z.string().min(1, "Phone number must be provided").optional(),
  });

  static validateCreateFacultyMentor(data) {
    const result = FacultyMentorValidator.createFacultyMentorSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateFacultyMentor(data) {
    const result = FacultyMentorValidator.updateFacultyMentorSchema.safeParse(data);
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
