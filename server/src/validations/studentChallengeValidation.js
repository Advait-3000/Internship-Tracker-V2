import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class StudentChallengeValidator {
  static createStudentChallengeSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format"),
    challengeTypeId: z.string().uuid("Invalid challenge type ID format"),
    description: z.string().min(1, "Description must be provided"),
    supportRequired: z.string().optional(),
    createdAt: z.string().optional(),
  });

  static updateStudentChallengeSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format").optional(),
    challengeTypeId: z.string().uuid("Invalid challenge type ID format").optional(),
    description: z.string().min(1, "Description must be provided").optional(),
    supportRequired: z.string().optional(),
    createdAt: z.string().optional(),
  });

  static validateCreateStudentChallenge(data) {
    const result = StudentChallengeValidator.createStudentChallengeSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateStudentChallenge(data) {
    const result = StudentChallengeValidator.updateStudentChallengeSchema.safeParse(data);
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
