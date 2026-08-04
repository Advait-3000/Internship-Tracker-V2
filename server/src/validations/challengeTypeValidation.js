import { z } from "zod";
import { handleValidationError } from "./validateHelper.js";

export class ChallengeTypeValidator {
  static createChallengeTypeSchema = z.object({
    challengeName: z.string().min(1, "Challenge name must be provided"),
  });

  static updateChallengeTypeSchema = z.object({
    challengeName: z.string().min(1, "Challenge name must be provided").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateChallengeType(data) {
    const result = ChallengeTypeValidator.createChallengeTypeSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateChallengeType(data) {
    const result = ChallengeTypeValidator.updateChallengeTypeSchema.safeParse(data);
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
