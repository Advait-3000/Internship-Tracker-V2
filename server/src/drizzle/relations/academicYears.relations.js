import { relations } from "drizzle-orm";
import { academicYears } from "../schema/academicYears.schema.js";
import { users } from "../schema/users.schema.js";

export const academicYearsRelations = relations(academicYears, ({ one, many }) => ({
  users: many(users),
}));
