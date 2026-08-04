import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class InternshipValidator {
  static createInternshipSchema = z.object({
    studentId: z.string().uuid("Invalid student ID format"),
    companyId: z.string().uuid("Invalid company ID format"),
    companyMentorId: z.string().uuid("Invalid company mentor ID format").optional().nullable(),
    facultyMentorId: z.string().uuid("Invalid faculty mentor ID format").optional().nullable(),
    internshipModeId: z.string().uuid("Invalid internship mode ID format").optional().nullable(),
    internshipTypeId: z.string().uuid("Invalid internship type ID format").optional().nullable(),
    internshipStatusId: z.string().uuid("Invalid internship status ID format").optional().nullable(),
    internshipDomain: z.string().min(1, "Internship domain must be provided"),
    startDate: z.string().min(1, "Start date must be provided"),
    endDate: z.string().min(1, "End date must be provided"),
    duration: z.string().min(1, "Duration must be provided"),
    stipend: z.union([z.string(), z.number()]).optional(),
  });

  static updateInternshipSchema = z.object({
    studentId: z.string().uuid("Invalid student ID format").optional(),
    companyId: z.string().uuid("Invalid company ID format").optional(),
    companyMentorId: z.string().uuid("Invalid company mentor ID format").optional().nullable(),
    facultyMentorId: z.string().uuid("Invalid faculty mentor ID format").optional().nullable(),
    internshipModeId: z.string().uuid("Invalid internship mode ID format").optional().nullable(),
    internshipTypeId: z.string().uuid("Invalid internship type ID format").optional().nullable(),
    internshipStatusId: z.string().uuid("Invalid internship status ID format").optional().nullable(),
    internshipDomain: z.string().min(1, "Internship domain must be provided").optional(),
    startDate: z.string().min(1, "Start date must be provided").optional(),
    endDate: z.string().min(1, "End date must be provided").optional(),
    duration: z.string().min(1, "Duration must be provided").optional(),
    stipend: z.union([z.string(), z.number()]).optional(),
  });

  static validateCreateInternship(data) {
    const result = InternshipValidator.createInternshipSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateInternship(data) {
    const result = InternshipValidator.updateInternshipSchema.safeParse(data);
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
