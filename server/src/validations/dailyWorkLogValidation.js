import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class DailyWorkLogValidator {
  static createDailyWorkLogSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format"),
    workDate: z.string().min(1, "Work date must be provided"),
    hoursWorked: z.union([z.string(), z.number()], { required_error: "Hours worked must be provided" }),
    taskPerformed: z.string().min(1, "Task performed must be provided"),
    status: z.string().min(1, "Status must be provided"),
    remarks: z.string().optional(),
  });

  static updateDailyWorkLogSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format").optional(),
    workDate: z.string().min(1, "Work date must be provided").optional(),
    hoursWorked: z.union([z.string(), z.number()]).optional(),
    taskPerformed: z.string().min(1, "Task performed must be provided").optional(),
    status: z.string().min(1, "Status must be provided").optional(),
    remarks: z.string().optional(),
  });

  static validateCreateDailyWorkLog(data) {
    const result = DailyWorkLogValidator.createDailyWorkLogSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateDailyWorkLog(data) {
    const result = DailyWorkLogValidator.updateDailyWorkLogSchema.safeParse(data);
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
