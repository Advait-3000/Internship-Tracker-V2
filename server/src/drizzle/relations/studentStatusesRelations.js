import { relations } from "drizzle-orm";
import { studentStatuses } from "../schema/studentStatusesSchema.js";
import { users } from "../schema/usersSchema.js";

export const studentStatusesRelations = relations(studentStatuses, ({ one, many }) => ({
  users: many(users),
}));
