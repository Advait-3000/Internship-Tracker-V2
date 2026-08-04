import { relations } from "drizzle-orm";
import { roles } from "../schema/rolesSchema.js";
import { users } from "../schema/usersSchema.js";

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
