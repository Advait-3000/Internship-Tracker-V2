import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class UserValidator {
  static updateUserSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
    mobileNumber: z.string().nullable().optional(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD").nullable().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    departmentId: z.string().uuid("Invalid Department ID format").nullable().optional(),
    branchId: z.string().uuid("Invalid Branch ID format").nullable().optional(),
    academicYearId: z.string().uuid("Invalid Academic Year ID format").nullable().optional(),
    divisionId: z.string().uuid("Invalid Division ID format").nullable().optional(),
    semesterId: z.string().uuid("Invalid Semester ID format").nullable().optional(),
    studentStatusId: z.string().uuid("Invalid Student Status ID format").nullable().optional(),
    imageUrl: z.string().url("Invalid image URL").nullable().optional(),
  });

  static uuidSchema = z.string().uuid("Invalid ID format");

  static getUsersQuerySchema = z.object({
    search: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    departmentId: z.string().uuid("Invalid Department ID format").optional(),
  });

  static validateUpdateUser(data) {
    const result = UserValidator.updateUserSchema.safeParse(data);
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

  static validateRoleId(roleId) {
    const result = z.string().uuid("Invalid Role ID format").safeParse(roleId);
    if (!result.success) {
      handleValidationError(result, { roleId });
    }
    return result.data;
  }

  static validateGetUsersQuery(query) {
    const result = UserValidator.getUsersQuerySchema.safeParse(query);
    if (!result.success) {
      handleValidationError(result, query);
    }
    return result.data;
  }
}
