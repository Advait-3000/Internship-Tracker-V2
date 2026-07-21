import { relations } from "drizzle-orm";
import { divisions } from "../schema/divisions.schema.js";
import { users } from "../schema/users.schema.js";

export const divisionsRelations = relations(divisions, ({ one, many }) => ({
  users: many(users),
}));
