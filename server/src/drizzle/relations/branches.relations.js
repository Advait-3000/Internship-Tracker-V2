import { relations } from "drizzle-orm";
import { branches } from "../schema/branches.schema.js";
import { departments } from "../schema/departments.schema.js";
import { users } from "../schema/users.schema.js";

export const branchesRelations = relations(branches, ({ one, many }) => ({
  Departments: one(departments, {
    fields: [branches.departmentId],
    references: [departments.id],
  }),
  users: many(users),
}));
