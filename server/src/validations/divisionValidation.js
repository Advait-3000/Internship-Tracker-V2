import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class DivisionValidator {
  static createDivisionSchema = z.object({
    divisionName: z.string().min(1, "Division name must be provided"),
  });

  static updateDivisionSchema = z.object({
    divisionName: z.string().min(1, "Division name must be provided").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateDivision(data) {
    const result = DivisionValidator.createDivisionSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateDivision(data) {
    const result = DivisionValidator.updateDivisionSchema.safeParse(data);
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
