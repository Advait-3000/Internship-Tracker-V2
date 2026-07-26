import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class ProjectValidator {
  static createProjectSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format"),
    projectTitle: z.string().min(1, "Project title must be provided"),
    projectDescription: z.string().optional(),
    moduleAssigned: z.string().min(1, "Module assigned must be provided"),
    expectedCompletionDate: z.string().min(1, "Expected completion date must be provided"),
    currentProgress: z.union([z.string(), z.number()]).optional(),
    completionPercentage: z.union([z.string(), z.number()]).optional(),
  });

  static updateProjectSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format").optional(),
    projectTitle: z.string().min(1, "Project title must be provided").optional(),
    projectDescription: z.string().optional(),
    moduleAssigned: z.string().min(1, "Module assigned must be provided").optional(),
    expectedCompletionDate: z.string().min(1, "Expected completion date must be provided").optional(),
    currentProgress: z.union([z.string(), z.number()]).optional(),
    completionPercentage: z.union([z.string(), z.number()]).optional(),
  });

  static validateCreateProject(data) {
    const result = ProjectValidator.createProjectSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateProject(data) {
    const result = ProjectValidator.updateProjectSchema.safeParse(data);
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
