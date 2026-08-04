import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class CompanyMentorValidator {
  static createCompanyMentorSchema = z.object({
    companyId: z.string().uuid("Invalid company ID format"),
    mentorName: z.string().min(1, "Mentor name must be provided"),
    designation: z.string().min(1, "Designation must be provided"),
    contactNumber: z.string().min(1, "Contact number must be provided"),
    email: z.string().email("Invalid email address"),
  });

  static updateCompanyMentorSchema = z.object({
    companyId: z.string().uuid("Invalid company ID format").optional(),
    mentorName: z.string().min(1, "Mentor name must be provided").optional(),
    designation: z.string().min(1, "Designation must be provided").optional(),
    contactNumber: z.string().min(1, "Contact number must be provided").optional(),
    email: z.string().email("Invalid email address").optional(),
  });

  static validateCreateCompanyMentor(data) {
    const result = CompanyMentorValidator.createCompanyMentorSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateCompanyMentor(data) {
    const result = CompanyMentorValidator.updateCompanyMentorSchema.safeParse(data);
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
