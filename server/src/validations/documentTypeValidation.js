import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class DocumentTypeValidator {
  static createDocumentTypeSchema = z.object({
    typeName: z.string().min(1, "Type name must be provided"),
  });

  static updateDocumentTypeSchema = z.object({
    typeName: z.string().min(1, "Type name must be provided").optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static validateCreateDocumentType(data) {
    const result = DocumentTypeValidator.createDocumentTypeSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateDocumentType(data) {
    const result = DocumentTypeValidator.updateDocumentTypeSchema.safeParse(data);
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
