import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class InternshipStatusValidator {
  static createInternshipStatusSchema = z.object({
    statusName: z.string().min(1, "Status name must be provided"),
  });

  static updateInternshipStatusSchema = z.object({
    statusName: z.string().min(1, "Status name must be provided").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateInternshipStatus(data) {
    const result = InternshipStatusValidator.createInternshipStatusSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateInternshipStatus(data) {
    const result = InternshipStatusValidator.updateInternshipStatusSchema.safeParse(data);
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
