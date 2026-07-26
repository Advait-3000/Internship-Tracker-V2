import { relations } from "drizzle-orm";
import { semesters } from "../schema/semestersSchema.js";
import { users } from "../schema/usersSchema.js";

export const semestersRelations = relations(semesters, ({ one, many }) => ({
  users: many(users),
}));
