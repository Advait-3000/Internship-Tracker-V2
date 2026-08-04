import { relations } from "drizzle-orm";
import { divisions } from "../schema/divisionsSchema.js";
import { users } from "../schema/usersSchema.js";

export const divisionsRelations = relations(divisions, ({ one, many }) => ({
  users: many(users),
}));
