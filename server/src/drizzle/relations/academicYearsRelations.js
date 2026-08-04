import { relations } from "drizzle-orm";
import { academicYears } from "../schema/academicYearsSchema.js";
import { users } from "../schema/usersSchema.js";

export const academicYearsRelations = relations(academicYears, ({ one, many }) => ({
  users: many(users),
}));
