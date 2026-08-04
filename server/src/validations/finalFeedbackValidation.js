import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class FinalFeedbackValidator {
  static createFinalFeedbackSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format"),
    feedbackProviderId: z.string().uuid("Invalid feedback provider ID format"),
    feedbackType: z.enum(["company_mentor", "faculty_mentor", "student"], {
      errorMap: () => ({ message: "Feedback type must be 'company_mentor', 'faculty_mentor', or 'student'" })
    }),
    overallRating: z.union([z.string(), z.number()], { required_error: "Overall rating must be provided" }),
    strengths: z.string().min(1, "Strengths must be provided"),
    areasOfImprovement: z.string().min(1, "Areas of improvement must be provided"),
    additionalComments: z.string().optional(),
    feedbackDate: z.string().min(1, "Feedback date must be provided"),
  });

  static updateFinalFeedbackSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format").optional(),
    feedbackProviderId: z.string().uuid("Invalid feedback provider ID format").optional(),
    feedbackType: z.enum(["company_mentor", "faculty_mentor", "student"]).optional(),
    overallRating: z.union([z.string(), z.number()]).optional(),
    strengths: z.string().min(1, "Strengths must be provided").optional(),
    areasOfImprovement: z.string().min(1, "Areas of improvement must be provided").optional(),
    additionalComments: z.string().optional(),
    feedbackDate: z.string().min(1, "Feedback date must be provided").optional(),
  });

  static validateCreateFinalFeedback(data) {
    const result = FinalFeedbackValidator.createFinalFeedbackSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateFinalFeedback(data) {
    const result = FinalFeedbackValidator.updateFinalFeedbackSchema.safeParse(data);
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
