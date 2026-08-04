import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class StudentStatusValidator {
  static createStudentStatusSchema = z.object({
    statusName: z.string().min(1, "Status name must be provided"),
    description: z.string().nullable().optional(),
  });

  static updateStudentStatusSchema = z.object({
    statusName: z.string().min(1, "Status name must be provided").optional(),
    description: z.string().nullable().optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateStudentStatus(data) {
    const result = StudentStatusValidator.createStudentStatusSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateStudentStatus(data) {
    const result = StudentStatusValidator.updateStudentStatusSchema.safeParse(data);
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
