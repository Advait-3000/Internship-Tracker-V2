import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class InternshipTypeValidator {
  static createInternshipTypeSchema = z.object({
    typeName: z.string().min(1, "Type name must be provided"),
  });

  static updateInternshipTypeSchema = z.object({
    typeName: z.string().min(1, "Type name must be provided").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateInternshipType(data) {
    const result = InternshipTypeValidator.createInternshipTypeSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateInternshipType(data) {
    const result = InternshipTypeValidator.updateInternshipTypeSchema.safeParse(data);
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
