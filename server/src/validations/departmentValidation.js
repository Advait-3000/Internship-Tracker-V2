import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class DepartmentValidator {
  static createDepartmentSchema = z.object({
    departmentName: z.string().min(2, "Department name must be at least 2 characters"),
    description: z.string().nullable().optional(),
  });

  static updateDepartmentSchema = z.object({
    departmentName: z.string().min(2, "Department name must be at least 2 characters").optional(),
    description: z.string().nullable().optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateDepartment(data) {
    const result = DepartmentValidator.createDepartmentSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateDepartmentId(data) {
    const result = this.uuidSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateDepartment(data) {
    const result = DepartmentValidator.updateDepartmentSchema.safeParse(data);
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
