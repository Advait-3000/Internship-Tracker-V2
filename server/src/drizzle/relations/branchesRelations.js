import { relations } from "drizzle-orm";
import { branches } from "../schema/branchesSchema.js";
import { departments } from "../schema/departmentsSchema.js";
import { users } from "../schema/usersSchema.js";

export const branchesRelations = relations(branches, ({ one, many }) => ({
  Departments: one(departments, {
    fields: [branches.departmentId],
    references: [departments.id],
  }),
  users: many(users),
}));
