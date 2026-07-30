import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class WeeklyReportValidator {
  static createWeeklyReportSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format"),
    projectId: z.string().uuid("Invalid project ID format").optional().nullable(),
    weekNumber: z.union([z.string(), z.number()], { required_error: "Week number must be provided" }),
    reportingFrom: z.string().min(1, "Reporting from date must be provided"),
    reportingTo: z.string().min(1, "Reporting to date must be provided"),
    totalHoursWorked: z.union([z.string(), z.number()]).optional().nullable(),
    workingDays: z.union([z.string(), z.number()]).optional().nullable(),
    attendancePercentage: z.union([z.string(), z.number()]).optional().nullable(),
    leaveTaken: z.union([z.string(), z.number()]).optional().nullable(),
    leaveReason: z.string().optional().nullable(),
    keyTasksCompleted: z.string().optional().nullable(),
    technologiesUsed: z.any().optional().nullable(), // For JSON
    deliverablesSubmitted: z.string().optional().nullable(),
    skillsLearned: z.string().optional().nullable(),
    ongoingTasks: z.string().optional().nullable(),
    targetGoals: z.string().optional().nullable(),
    projectStatusId: z.string().uuid("Invalid project status ID format").optional().nullable(),
  });

  static updateWeeklyReportSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format").optional(),
    projectId: z.string().uuid("Invalid project ID format").optional().nullable(),
    weekNumber: z.union([z.string(), z.number()]).optional(),
    reportingFrom: z.string().min(1, "Reporting from date must be provided").optional(),
    reportingTo: z.string().min(1, "Reporting to date must be provided").optional(),
    totalHoursWorked: z.union([z.string(), z.number()]).optional().nullable(),
    workingDays: z.union([z.string(), z.number()]).optional().nullable(),
    attendancePercentage: z.union([z.string(), z.number()]).optional().nullable(),
    leaveTaken: z.union([z.string(), z.number()]).optional().nullable(),
    leaveReason: z.string().optional().nullable(),
    keyTasksCompleted: z.string().optional().nullable(),
    technologiesUsed: z.any().optional().nullable(),
    deliverablesSubmitted: z.string().optional().nullable(),
    skillsLearned: z.string().optional().nullable(),
    ongoingTasks: z.string().optional().nullable(),
    targetGoals: z.string().optional().nullable(),
    projectStatusId: z.string().uuid("Invalid project status ID format").optional().nullable(),
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
