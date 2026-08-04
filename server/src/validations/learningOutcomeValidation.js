import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class LearningOutcomeValidator {
  static createLearningOutcomeSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format"),
    newSkills: z.string().min(1, "New skills must be provided"),
    softwareTools: z.string().optional(),
    certifications: z.string().optional(),
    workshops: z.string().optional(),
    githubRepository: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    documentationLink: z.string().url("Invalid documentation URL").optional().or(z.literal("")),
    demoLink: z.string().url("Invalid demo URL").optional().or(z.literal("")),
    presentationLink: z.string().url("Invalid presentation URL").optional().or(z.literal("")),
  });

  static updateLearningOutcomeSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format").optional(),
    newSkills: z.string().min(1, "New skills must be provided").optional(),
    softwareTools: z.string().optional(),
    certifications: z.string().optional(),
    workshops: z.string().optional(),
    githubRepository: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    documentationLink: z.string().url("Invalid documentation URL").optional().or(z.literal("")),
    demoLink: z.string().url("Invalid demo URL").optional().or(z.literal("")),
    presentationLink: z.string().url("Invalid presentation URL").optional().or(z.literal("")),
  });

  static validateCreateLearningOutcome(data) {
    const result = LearningOutcomeValidator.createLearningOutcomeSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateLearningOutcome(data) {
    const result = LearningOutcomeValidator.updateLearningOutcomeSchema.safeParse(data);
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
