import { z } from "zod";
import { handleValidationError } from "../utils/validateHelper.js";

export class NotificationValidator {
  static createNotificationSchema = z.object({
    userId: z.string().uuid("Invalid user ID format"),
    title: z.string().min(1, "Title must be provided"),
    message: z.string().min(1, "Message must be provided"),
    isRead: z.boolean().optional(),
  });

  static updateNotificationSchema = z.object({
    userId: z.string().uuid("Invalid user ID format").optional(),
    title: z.string().min(1, "Title must be provided").optional(),
    message: z.string().min(1, "Message must be provided").optional(),
    isRead: z.boolean().optional(),
  });

  static validateCreateNotification(data) {
    const result = NotificationValidator.createNotificationSchema.safeParse(data);
    if (!result.success) {
      handleValidationError(result, data);
    }
    return result.data;
  }

  static validateUpdateNotification(data) {
    const result = NotificationValidator.updateNotificationSchema.safeParse(data);
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
