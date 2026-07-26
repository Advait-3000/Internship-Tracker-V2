import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class InternshipModeValidator {
  static createInternshipModeSchema = z.object({
    modeName: z.string().min(1, "Mode name must be provided"),
  });

  static updateInternshipModeSchema = z.object({
    modeName: z.string().min(1, "Mode name must be provided").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateInternshipMode(data) {
    const result = InternshipModeValidator.createInternshipModeSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateInternshipMode(data) {
    const result = InternshipModeValidator.updateInternshipModeSchema.safeParse(data);
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
