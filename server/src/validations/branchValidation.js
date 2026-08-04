import { z } from "zod";
import { handleValidationError } from "./validateHelper.js";

export class BranchValidator {
  static createBranchSchema = z.object({
    departmentId: z.string().uuid("Invalid Department ID format"),
    branchName: z.string().min(2, "Branch name must be at least 2 characters"),
    description: z.string().nullable().optional(),
  });

  static updateBranchSchema = z.object({
    departmentId: z.string().uuid("Invalid Department ID format").optional(),
    branchName: z.string().min(2, "Branch name must be at least 2 characters").optional(),
    description: z.string().nullable().optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateBranch(data) {
    const result = BranchValidator.createBranchSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateBranch(data) {
    const result = BranchValidator.updateBranchSchema.safeParse(data);
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
