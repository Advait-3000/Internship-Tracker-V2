import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../config/db.js";
import { roles } from "../drizzle/schema/roles.schema.js";
import { eq } from "drizzle-orm";

export const requireRole = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user.role) {
      throw new ApiError(401, "Unauthorized");
    }

    const roleRecord = await db.query.roles.findFirst({
      where: eq(roles.id, req.user.role)
    });

    if (!roleRecord || !allowedRoles.includes(roleRecord.roleName.toUpperCase())) {
      throw new ApiError(403, "Forbidden: You do not have the required permissions");
    }

    req.user.roleName = roleRecord.roleName;
    next();
  });
};
