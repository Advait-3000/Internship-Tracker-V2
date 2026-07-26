import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

const allowedRoles = ["superadmin", "admin", "student", "faculty", "mentors", "company"];

export class AuthValidator {
  static registerSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    roleName: z.preprocess(
      (val) => (typeof val === "string" ? val.toLowerCase() : val),
      z.enum(allowedRoles, {
        errorMap: () => ({ message: `Role must be one of: ${allowedRoles.join(", ")}` })
      })
    )
  });

  static loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password is required")
  });

  static refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, "Refresh token is required")
  });

  static validateRegister(data) {
    const result = AuthValidator.registerSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateLogin(data) {
    const result = AuthValidator.loginSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateRefreshToken(data) {
    const result = AuthValidator.refreshTokenSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }
}
