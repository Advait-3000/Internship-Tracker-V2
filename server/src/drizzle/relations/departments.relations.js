import { relations } from "drizzle-orm";
import { departments } from "../schema/departments.schema.js";
import { branches } from "../schema/branches.schema.js";
import { users } from "../schema/users.schema.js";

export const departmentsRelations = relations(departments, ({ one, many }) => ({
  branches: many(branches),
  users: many(users),
}));
