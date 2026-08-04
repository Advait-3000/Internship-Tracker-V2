import { relations } from "drizzle-orm";
import { departments } from "../schema/departmentsSchema.js";
import { branches } from "../schema/branchesSchema.js";
import { users } from "../schema/usersSchema.js";

export const departmentsRelations = relations(departments, ({ one, many }) => ({
  branches: many(branches),
  users: many(users),
}));
