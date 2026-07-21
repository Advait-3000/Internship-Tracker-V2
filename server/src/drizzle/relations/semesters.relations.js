import { relations } from "drizzle-orm";
import { semesters } from "../schema/semesters.schema.js";
import { users } from "../schema/users.schema.js";

export const semestersRelations = relations(semesters, ({ one, many }) => ({
  users: many(users),
}));
