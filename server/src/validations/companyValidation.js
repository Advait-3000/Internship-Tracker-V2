import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class CompanyValidator {
  static createCompanySchema = z.object({
    companyName: z.string().min(1, "Company name must be provided"),
    address: z.string().min(1, "Address must be provided"),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    hrName: z.string().min(1, "HR name must be provided"),
    hrContactNumber: z.string().min(1, "HR contact number must be provided"),
    hrEmail: z.string().email("Invalid HR email address"),
  });

  static updateCompanySchema = z.object({
    companyName: z.string().min(1, "Company name must be provided").optional(),
    address: z.string().min(1, "Address must be provided").optional(),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    hrName: z.string().min(1, "HR name must be provided").optional(),
    hrContactNumber: z.string().min(1, "HR contact number must be provided").optional(),
    hrEmail: z.string().email("Invalid HR email address").optional(),
  });

  static validateCreateCompany(data) {
    const result = CompanyValidator.createCompanySchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateCompany(data) {
    const result = CompanyValidator.updateCompanySchema.safeParse(data);
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
