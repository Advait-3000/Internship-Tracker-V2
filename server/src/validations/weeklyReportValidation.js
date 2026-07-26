import { z } from "zod";
import { handleValidationError } from "./validate.helper.js";

export class WeeklyReportValidator {
  static createWeeklyReportSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format"),
    weekNumber: z.union([z.string(), z.number()], { required_error: "Week number must be provided" }),
    startDate: z.string().min(1, "Start date must be provided"),
    endDate: z.string().min(1, "End date must be provided"),
    summary: z.string().min(1, "Summary must be provided"),
    tasksCompleted: z.string().optional(),
    challengesFaced: z.string().optional(),
    learnings: z.string().optional(),
  });

  static updateWeeklyReportSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format").optional(),
    weekNumber: z.union([z.string(), z.number()]).optional(),
    startDate: z.string().min(1, "Start date must be provided").optional(),
    endDate: z.string().min(1, "End date must be provided").optional(),
    summary: z.string().min(1, "Summary must be provided").optional(),
    tasksCompleted: z.string().optional(),
    challengesFaced: z.string().optional(),
    learnings: z.string().optional(),
  });

  static validateCreateWeeklyReport(data) {
    const result = WeeklyReportValidator.createWeeklyReportSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateWeeklyReport(data) {
    const result = WeeklyReportValidator.updateWeeklyReportSchema.safeParse(data);
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
