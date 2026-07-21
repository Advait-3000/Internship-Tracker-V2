import { relations } from "drizzle-orm";
import { roles } from "../schema/roles.schema.js";
import { users } from "../schema/users.schema.js";

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
