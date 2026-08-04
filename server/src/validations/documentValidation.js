import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class DocumentValidator {
  static createDocumentSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format"),
    documentTypeId: z.string().uuid("Invalid document type ID format"),
    title: z.string().min(1, "Title must be provided"),
  });

  static updateDocumentSchema = z.object({
    internshipId: z.string().uuid("Invalid internship ID format").optional(),
    documentTypeId: z.string().uuid("Invalid document type ID format").optional(),
    title: z.string().min(1, "Title must be provided").optional(),
  });

  static validateCreateDocument(data) {
    const result = DocumentValidator.createDocumentSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateDocument(data) {
    const result = DocumentValidator.updateDocumentSchema.safeParse(data);
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
