import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class ProjectStatusValidator {
  static createProjectStatusSchema = z.object({
    statusName: z.string().min(1, "Status name must be provided"),
  });

  static updateProjectStatusSchema = z.object({
    statusName: z.string().min(1, "Status name must be provided").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateProjectStatus(data) {
    const result = ProjectStatusValidator.createProjectStatusSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateProjectStatus(data) {
    const result = ProjectStatusValidator.updateProjectStatusSchema.safeParse(data);
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
