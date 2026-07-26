import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class MentorReviewValidator {
  static createMentorReviewSchema = z.object({
    weeklyReportId: z.string().uuid("Invalid weekly report ID format"),
    reviewDate: z.string().min(1, "Review date must be provided"),
    rating: z.union([z.string(), z.number()], { required_error: "Rating must be provided" }),
    feedback: z.string().min(1, "Feedback must be provided"),
  });

  static updateMentorReviewSchema = z.object({
    weeklyReportId: z.string().uuid("Invalid weekly report ID format").optional(),
    reviewDate: z.string().min(1, "Review date must be provided").optional(),
    rating: z.union([z.string(), z.number()]).optional(),
    feedback: z.string().min(1, "Feedback must be provided").optional(),
  });

  static validateCreateMentorReview(data) {
    const result = MentorReviewValidator.createMentorReviewSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateMentorReview(data) {
    const result = MentorReviewValidator.updateMentorReviewSchema.safeParse(data);
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
